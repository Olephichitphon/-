import React, { useState, useEffect } from 'react';
import { getCarBrands, getCarModels } from '../lib/sanity';
import Button from '../components/Button';
import Input from '../components/Input';

const InsuranceWizard = () => {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    brandId: '',
    brandName: '',
    customBrand: '',
    modelId: '',
    modelName: '',
    customModel: '',
    year: '2024',
    insuranceType: '1',
    name: '',
    phone: '',
  });

  // Fetch brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getCarBrands();
        setBrands(data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch models when brand changes
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
    const modelName = models.find(m => m._id === selectedModelId)?.name || '';
    setFormData({ 
      ...formData, 
      modelId: selectedModelId, 
      modelName: modelName,
      customModel: ''
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const isOtherBrand = formData.brandId === 'other';
  const isOtherModel = formData.modelId === 'other';

  return (
    <section className="py-20 bg-slate-50" id="check-premium">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                  ${step >= num ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 animate-fade-in">
            {/* Step 1: Car Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">เลือกข้อมูลรถของคุณ</h2>
                  <p className="text-slate-500">ข้อมูลรถที่ถูกต้องช่วยให้เราคำนวณเบี้ยได้แม่นยำขึ้น</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">ยี่ห้อรถ</label>
                    <select 
                      value={formData.brandId}
                      onChange={handleBrandChange}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="">เลือกยี่ห้อ</option>
                      {brands.map((b) => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                      <option value="other">อื่นๆ (ระบุเอง)</option>
                    </select>
                  </div>

                  {isOtherBrand && (
                    <Input 
                      label="ระบุยี่ห้อรถ"
                      placeholder="เช่น Tesla, BYD"
                      value={formData.customBrand}
                      onChange={(e) => setFormData({...formData, customBrand: e.target.value})}
                      className="animate-fade-in"
                    />
                  )}

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
                        {models.map((m) => (
                          <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                        <option value="other">อื่นๆ (ระบุเอง)</option>
                      </select>
                    </div>
                  )}

                  {isOtherModel && (
                    <Input 
                      label="ระบุรุ่นรถ"
                      placeholder="เช่น Atto 3, Model 3"
                      value={formData.customModel}
                      onChange={(e) => setFormData({...formData, customModel: e.target.value})}
                      className="animate-fade-in"
                    />
                  )}
                </div>

                <Button 
                  onClick={nextStep} 
                  disabled={!((formData.brandId && (formData.modelId || isOtherModel)) || (isOtherBrand && formData.customBrand && (formData.modelId || isOtherModel)))}
                  className="w-full py-4 text-lg"
                >
                  ถัดไป
                </Button>
              </div>
            )}

            {/* Step 2: Year & Insurance Class */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">ระบุรายละเอียดเพิ่มเติม</h2>
                  <p className="text-slate-500">ปีที่จดทะเบียนและประเภทประกันที่ต้องการ</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">ปีรถ</label>
                    <select 
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                    >
                      {Array.from({ length: 12 }, (_, i) => 2026 - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
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
                  <Button onClick={nextStep} className="flex-1 py-4">ถัดไป</Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">ข้อมูลติดต่อของคุณ</h2>
                  <p className="text-slate-500">เพื่อให้เจ้าหน้าที่ส่งใบเสนอราคาให้คุณโดยเร็วที่สุด</p>
                </div>

                <div className="space-y-4">
                  <Input 
                    label="ชื่อ-นามสกุล"
                    placeholder="กรอกชื่อและนามสกุล"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input 
                    label="เบอร์โทรศัพท์"
                    placeholder="08X-XXX-XXXX"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
                  <h4 className="text-sm font-bold text-blue-900 mb-1">สรุปข้อมูล:</h4>
                  <p className="text-xs text-blue-700">
                    รถ: {isOtherBrand ? formData.customBrand : formData.brandName} {isOtherModel ? formData.customModel : formData.modelName} ({formData.year})
                    <br />ประกัน: ชั้น {formData.insuranceType === '1' ? '1' : formData.insuranceType.replace('plus', '+')}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="secondary" className="flex-1 py-4">กลับ</Button>
                  <Button variant="success" className="flex-1 py-4 shadow-green-200">
                    ขอใบเสนอราคา
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceWizard;
