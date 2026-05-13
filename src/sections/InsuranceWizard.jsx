import React, { useState, useEffect } from 'react';
import { getCarBrands, getCarModels, getPlansByType, writeClient, urlFor } from '../lib/sanity';
import Button from '../components/Button';
import Input from '../components/Input';

const InsuranceWizard = () => {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    brandId: '',
    brandName: '',
    customBrand: '',
    modelId: '',
    modelName: '',
    customModel: '',
    year: '2024',
    insuranceType: '1',
    carGroup: '5', // Default to 5 (Eco Car)
    selectedPlanId: '',
    selectedPlanName: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        console.log('Fetching brands...');
        const data = await getCarBrands();
        console.log('Brands fetched:', data);
        setBrands(data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (formData.brandId && formData.brandId !== 'other') {
      const fetchModels = async () => {
        setLoading(true);
        try {
          const data = await getCarModels(formData.brandId);
          setModels(data);
        } catch (err) {
          console.error('Failed to fetch models:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [formData.brandId]);

  // Fetch plans when step becomes 3
  useEffect(() => {
    if (step === 3) {
      const fetchPlans = async () => {
        setLoading(true);
        try {
          const data = await getPlansByType(formData.insuranceType, formData.carGroup, formData.year);
          setAvailablePlans(data);
        } catch (err) {
          console.error('Failed to fetch plans:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [step, formData.insuranceType]);

  const handleBrandChange = (e) => {
    const selectedBrandId = e.target.value;
    const brandName = brands.find(b => b._id === selectedBrandId)?.name || '';
    setFormData({ 
      ...formData, 
      brandId: selectedBrandId, 
      brandName: brandName,
      modelId: '',
      modelName: '',
      customBrand: '',
      customModel: ''
    });
  };

  const handleModelChange = (e) => {
    const selectedModelId = e.target.value;
    const modelObj = models.find(m => m._id === selectedModelId);
    const modelName = modelObj?.name || '';
    const carGroup = modelObj?.group || '5'; // Use group from DB or default to 5
    
    setFormData({ 
      ...formData, 
      modelId: selectedModelId, 
      modelName: modelName,
      carGroup: carGroup,
      customModel: ''
    });
  };

  const selectPlan = (plan) => {
    setFormData({
      ...formData,
      selectedPlanId: plan._id,
      selectedPlanName: plan.companyName
    });
    setStep(4);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const finalBrand = formData.brandId === 'other' ? formData.customBrand : formData.brandName;
      const finalModel = formData.modelId === 'other' ? formData.customModel : formData.modelName;

      const leadDoc = {
        _type: 'customerLead',
        name: formData.name,
        phone: formData.phone,
        carDetails: {
          brand: finalBrand,
          model: finalModel,
          year: formData.year,
          isCustom: formData.brandId === 'other' || formData.modelId === 'other'
        },
        insuranceType: formData.insuranceType,
        selectedPlan: formData.selectedPlanName || 'General Inquiry',
        status: 'new'
      };

      await writeClient.create(leadDoc);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('ขออภัย เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-slate-50 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg mx-auto border border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">ส่งข้อมูลสำเร็จ!</h2>
            <p className="text-slate-600 mb-8">เจ้าหน้าที่ได้รับข้อมูลความสนใจของคุณแล้ว และจะติดต่อกลับเพื่อให้ใบเสนอราคาที่แม่นยำที่สุดโดยเร็วที่สุดครับ</p>
            <Button onClick={() => window.location.reload()} variant="primary">กลับสู่หน้าแรก</Button>
          </div>
        </div>
      </section>
    );
  }

  const isOtherBrand = formData.brandId === 'other';
  const isOtherModel = formData.modelId === 'other';

  return (
    <section className="py-20 bg-slate-50" id="check-premium">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative px-4 max-w-md mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                  ${step >= num ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 animate-fade-in overflow-hidden">
            {/* Step 1: Car Selection */}
            {step === 1 && (
              <div className="space-y-6 max-w-lg mx-auto">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">เลือกข้อมูลรถของคุณ</h2>
                  <p className="text-slate-500">ขั้นตอนที่ 1: ยี่ห้อและรุ่นรถ</p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">ยี่ห้อรถ</label>
                    <select 
                      value={formData.brandId}
                      onChange={handleBrandChange}
                      disabled={loading && brands.length === 0}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white text-slate-900 disabled:opacity-50"
                    >
                      <option value="">{loading && brands.length === 0 ? 'กำลังโหลดข้อมูล...' : 'เลือกยี่ห้อ'}</option>
                      {brands.map((b) => <option key={b._id} value={b._id} className="text-slate-900">{b.name}</option>)}
                      <option value="other" className="text-slate-900">อื่นๆ (ระบุเอง)</option>
                    </select>
                  </div>
                  {isOtherBrand && <Input label="ระบุยี่ห้อรถ" placeholder="เช่น Tesla, BYD" value={formData.customBrand} onChange={(e) => setFormData({...formData, customBrand: e.target.value})} className="animate-fade-in" />}
                  {(formData.brandId || isOtherBrand) && (
                    <div className="flex flex-col gap-1.5 animate-fade-in">
                      <label className="text-sm font-semibold text-slate-700 ml-1">รุ่นรถ</label>
                      <select 
                        disabled={loading && !isOtherBrand}
                        value={formData.modelId}
                        onChange={handleModelChange}
                        className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white disabled:opacity-50"
                      >
                        <option value="">เลือกรุ่น</option>
                        {models.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
                        <option value="other">อื่นๆ (ระบุเอง)</option>
                      </select>
                    </div>
                  )}
                  {isOtherModel && <Input label="ระบุรุ่นรถ" placeholder="เช่น Atto 3, Model 3" value={formData.customModel} onChange={(e) => setFormData({...formData, customModel: e.target.value})} className="animate-fade-in" />}
                </div>
                <Button 
                  onClick={nextStep} 
                  disabled={!((formData.brandId && (formData.modelId || isOtherModel)) || (isOtherBrand && formData.customBrand && (formData.modelId || isOtherModel)))}
                  className="w-full py-4 text-lg"
                >ถัดไป</Button>
              </div>
            )}

            {/* Step 2: Year & Insurance Class */}
            {step === 2 && (
              <div className="space-y-8 max-w-lg mx-auto">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">ระบุรายละเอียดเพิ่มเติม</h2>
                  <p className="text-slate-500">ขั้นตอนที่ 2: ปีรถและประเภทประกันที่ต้องการ</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">ปีรถ</label>
                    <select 
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                    >
                      {Array.from({ length: 15 }, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">ประเภทประกัน</label>
                    <select 
                      value={formData.insuranceType}
                      onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="1">ชั้น 1</option>
                      <option value="2plus">ชั้น 2+</option>
                      <option value="3plus">ชั้น 3+</option>
                      <option value="3">ชั้น 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="secondary" className="flex-1 py-4">กลับ</Button>
                  <Button onClick={nextStep} className="flex-1 py-4">ค้นหาแผนประกัน</Button>
                </div>
              </div>
            )}

            {/* Step 3: Plan Selection (NEW) */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">เลือกแผนประกันที่น่าสนใจ</h2>
                  <p className="text-slate-500">เราคัดสรรแผนที่คุ้มค่าที่สุดมาให้คุณเลือกเบื้องต้น</p>
                </div>
                
                {loading ? (
                  <div className="flex flex-col items-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500">กำลังค้นหาแผนประกันที่ดีที่สุด...</p>
                  </div>
                ) : availablePlans.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availablePlans.map((plan) => (
                        <div key={plan._id} className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 group shadow-sm hover:shadow-xl">
                          <div className="flex items-center gap-3 mb-4">
                            {plan.logo ? (
                              <img src={plan.logo} alt={plan.companyName} className="w-10 h-10 object-contain" />
                            ) : (
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">{plan.companyName[0]}</div>
                            )}
                            <div>
                              <h3 className="font-bold text-slate-900">{plan.companyName}</h3>
                              <div className="flex gap-1 items-center">
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">ชั้น {plan.planType === '1' ? '1' : plan.planType.replace('plus', '+')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <p className="text-xs text-slate-500 mb-1">เบี้ยประกันเริ่มต้นประมาณ</p>
                            <p className="text-2xl font-bold text-blue-600">{plan.premium?.toLocaleString() || '-'} <span className="text-sm font-normal text-slate-400">บาท/ปี</span></p>
                          </div>
                          <ul className="space-y-2 mb-8">
                            {plan.features?.slice(0, 3).map((f, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="text-green-500 flex-shrink-0">✓</span> {f}
                              </li>
                            ))}
                          </ul>
                          <Button onClick={() => selectPlan(plan)} className="w-full py-3">สนใจแผนนี้</Button>
                        </div>
                      ))}
                      
                      {/* Special Card: Request Custom Plan */}
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:border-slate-400 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:text-blue-500 group-hover:scale-110 transition-all">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-slate-700 mb-2">ยังไม่มีแผนที่ถูกใจ?</h3>
                        <p className="text-sm text-slate-500 mb-6">ให้เจ้าหน้าที่ผู้เชี่ยวชาญของเราช่วยหาแผนประกันที่คุ้มค่าและตรงใจคุณที่สุด</p>
                        <Button 
                          onClick={() => selectPlan({ _id: 'custom_request', companyName: 'ขอให้เจ้าหน้าที่แนะนำแผนเพิ่มเติม' })} 
                          variant="secondary" 
                          className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200"
                        >
                          ให้เจ้าหน้าที่ติดต่อกลับ
                        </Button>
                      </div>
                    </div>
                    <div className="mt-6 text-center text-xs text-slate-500 bg-amber-50 rounded-xl p-4 border border-amber-100">
                      * ราคาข้างต้นเป็นเพียง <b>ราคาเริ่มต้นคร่าวๆ ของกลุ่มรถนี้</b> ราคาจริงจะขึ้นอยู่กับ <b>ปีรถและรุ่นย่อย</b> ของคุณ เจ้าหน้าที่จะติดต่อกลับพร้อมใบเสนอราคาที่แม่นยำอีกครั้ง
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl">
                    <p className="text-slate-500 mb-4">ขออภัย ไม่พบแผนตัวอย่างสำหรับประเภทที่คุณเลือก</p>
                    <Button onClick={nextStep} variant="primary">ข้ามขั้นตอนนี้และติดต่อเจ้าหน้าที่</Button>
                  </div>
                )}
                
                <div className="flex justify-center pt-4 border-t border-slate-100">
                  <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 transition-colors">กลับไปแก้ไขข้อมูลรถ</button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info (Moved from 3) */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">ข้อมูลติดต่อของคุณ</h2>
                  <p className="text-slate-500">ขั้นตอนสุดท้าย: เพื่อให้เจ้าหน้าที่ส่งใบเสนอราคาตัวจริงให้คุณ</p>
                </div>

                <div className="space-y-4">
                  <Input 
                    label="ชื่อ-นามสกุล"
                    placeholder="กรอกชื่อและนามสกุล"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input 
                    label="เบอร์โทรศัพท์"
                    placeholder="08X-XXX-XXXX"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
                  <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-[10px]">!</span>
                    สรุปข้อมูลที่ต้องการ:
                  </h4>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>🚗 <strong>รถ:</strong> {isOtherBrand ? formData.customBrand : formData.brandName} {isOtherModel ? formData.customModel : formData.modelName} ({formData.year})</p>
                    <p>📋 <strong>ประเภท:</strong> ชั้น {formData.insuranceType === '1' ? '1' : formData.insuranceType.replace('plus', '+')}</p>
                    {formData.selectedPlanName && <p>🏆 <strong>สนใจแผน:</strong> {formData.selectedPlanName}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => setStep(3)} variant="secondary" className="flex-1 py-4">กลับ</Button>
                  <Button 
                    type="submit" 
                    variant="success" 
                    disabled={submitting || !formData.name || !formData.phone}
                    className="flex-1 py-4 shadow-green-200"
                  >
                    {submitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลให้เจ้าหน้าที่'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceWizard;
