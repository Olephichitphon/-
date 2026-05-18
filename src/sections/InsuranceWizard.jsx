import React, { useState, useEffect, useRef } from 'react';
import { getCarBrands, getCarModels, writeClient } from '../lib/sanity';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// Modular Components
import StepIndicator from '../components/wizard/StepIndicator';
import BrandSelection from '../components/wizard/BrandSelection';
import DetailsStep from '../components/wizard/DetailsStep';
import ContactStep from '../components/wizard/ContactStep';
import SuccessStep from '../components/wizard/SuccessStep';

const InsuranceWizard = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const wizardRef = useRef(null);

  // Rate Limiting Config (1 minute)
  const SUBMISSION_COOLDOWN = 60 * 1000;

  // Scroll to top of wizard when step changes
  useEffect(() => {
    if (step > 1) {
      const offset = 100; // Account for sticky header
      const elementPosition = wizardRef.current?.getBoundingClientRect().top;
      const offsetPosition = (elementPosition || 0) + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [step]);
  
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
    engineCc: '',
    customCc: '',
    name: '',
    phone: '',
    lineId: '',
    brandLogo: '',
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

  const handleBrandSelect = (id, name, logoUrl) => {
    setFormData({ 
      ...formData, 
      brandId: id, 
      brandName: name,
      brandLogo: logoUrl || '',
      modelId: '',
      modelName: '',
      customBrand: '',
      customModel: '',
      engineCc: '',
      customCc: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Client-side Rate Limiting Check
    const lastSubmission = localStorage.getItem('last_insurance_submission');
    const now = Date.now();
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < SUBMISSION_COOLDOWN) {
      const remainingSeconds = Math.ceil((SUBMISSION_COOLDOWN - (now - parseInt(lastSubmission))) / 1000);
      alert(`กรุณารอสักครู่ (อีก ${remainingSeconds} วินาที) ก่อนส่งข้อมูลใหม่อีกครั้ง เพื่อป้องกันข้อมูลซ้ำซ้อน`);
      return;
    }

    if (!executeRecaptcha) {
      alert('ระบบความปลอดภัยยังไม่พร้อม กรุณาลองใหม่อีกครั้งในภายหลัง');
      return;
    }

    setSubmitting(true);

    try {
      // 2. Generate reCAPTCHA Token
      const captchaToken = await executeRecaptcha('insurance_lead');

      const finalBrand = formData.brandId === 'other' ? formData.customBrand : formData.brandName;
      const finalModel = formData.modelId === 'other' ? formData.customModel : formData.modelName;
      const finalEngineCc = formData.engineCc === 'other' ? formData.customCc : formData.engineCc;

      const leadDoc = {
        _type: 'customerLead',
        name: formData.name,
        phone: formData.phone,
        lineId: formData.lineId || '-',
        carDetails: {
          brand: finalBrand,
          model: finalModel,
          year: formData.year,
          engineCc: finalEngineCc || '-',
          isCustom: formData.brandId === 'other' || formData.modelId === 'other' || formData.engineCc === 'other'
        },
        insuranceType: formData.insuranceType,
        status: 'new',
        security: {
          captchaToken: captchaToken,
          submittedAt: new Date().toISOString()
        }
      };

      await writeClient.create(leadDoc);

      // Store submission time for Rate Limiting
      localStorage.setItem('last_insurance_submission', Date.now().toString());

      // ------------------------------------------
      // Send Email Notification via Web3Forms
      // ------------------------------------------
      const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3formsAccessKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              access_key: web3formsAccessKey,
              subject: `แจ้งเตือนลูกค้าใหม่: ${formData.name}`,
              from_name: "Fairdee Insurance Broker By พงศกร",
              "ชื่อลูกค้า": formData.name,
              "เบอร์โทรศัพท์": formData.phone,
              "ไอดีไลน์": formData.lineId || '-',
              "รถยนต์": `${finalBrand} ${finalModel} (${formData.year})`,
              "ขนาดเครื่องยนต์": finalEngineCc ? (finalEngineCc === 'EV' ? 'รถยนต์ไฟฟ้า EV' : `${finalEngineCc} CC`) : '-',
              "ประเภทประกัน": `ชั้น ${formData.insuranceType === '1' ? '1' : formData.insuranceType.replace('plus', '+')}`
            })
          });
        } catch (emailErr) {
          console.error('Failed to send email notification:', emailErr);
          // ไม่ต้อง alert error ตรงนี้ เพราะเก็บลง Sanity สำเร็จแล้ว ให้แสดงหน้า Success เลย
        }
      }

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
    <section className="py-20 bg-slate-50 min-h-screen scroll-mt-24" id="check-premium" ref={wizardRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Sticky Step Indicator Wrapper */}
          <div className="sticky top-20 z-30 pt-4 pb-2 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 transition-all duration-300">
            <StepIndicator currentStep={step} totalSteps={3} />
          </div>

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
