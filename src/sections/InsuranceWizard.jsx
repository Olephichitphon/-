import React, { useState, useEffect } from 'react';
import { getCarBrands, getCarModels, writeClient } from '../lib/sanity';

// Modular Components
import StepIndicator from '../components/wizard/StepIndicator';
import BrandSelection from '../components/wizard/BrandSelection';
import DetailsStep from '../components/wizard/DetailsStep';
import ContactStep from '../components/wizard/ContactStep';
import SuccessStep from '../components/wizard/SuccessStep';

const InsuranceWizard = () => {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
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
    carGroup: '5',
    name: '',
    phone: '',
  });

  // Fetch Brands on Mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const data = await getCarBrands();
        setBrands(data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  // Fetch Models when Brand Changes
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

  const handleBrandSelect = (id, name) => {
    setFormData({ 
      ...formData, 
      brandId: id, 
      brandName: name,
      modelId: '',
      modelName: '',
      customBrand: '',
      customModel: ''
    });
  };

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

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (isSuccess) {
    return (
      <section className="py-20 bg-slate-50 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <SuccessStep />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50 min-h-screen" id="check-premium">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          <StepIndicator currentStep={step} totalSteps={3} />

          <div className="bg-white p-6 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
            {/* Step Content */}
            {step === 1 && (
              <BrandSelection 
                brands={brands}
                formData={formData}
                setFormData={setFormData}
                onBrandSelect={handleBrandSelect}
                loading={loading}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <DetailsStep 
                formData={formData}
                setFormData={setFormData}
                models={models}
                loading={loading}
                onNext={nextStep}
                onPrev={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <ContactStep 
                formData={formData}
                setFormData={setFormData}
                submitting={submitting}
                onSubmit={handleSubmit}
                onPrev={prevStep}
              />
            )}
          </div>

          <p className="mt-12 text-center text-slate-400 text-sm">
            🛡️ ข้อมูลส่วนบุคคลของคุณจะถูกเก็บเป็นความลับตามนโยบาย PDPA
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsuranceWizard;
