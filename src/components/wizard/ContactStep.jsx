import React from 'react';
import Input from '../Input';
import Button from '../Button';

const ContactStep = ({ 
  formData, 
  setFormData, 
  submitting, 
  onSubmit, 
  onPrev 
}) => {
  const isOtherBrand = formData.brandId === 'other';
  const isOtherModel = formData.modelId === 'other';

  // Validation Regex
  const phoneRegex = /^0[0-9]{9}$/;
  const nameRegex = /^[a-zA-Z\u0E00-\u0E7F\s.]+$/;

  const isPhoneValid = phoneRegex.test(formData.phone);
  const isNameValid = formData.name.trim().length >= 2 && nameRegex.test(formData.name);

  const handlePhoneChange = (e) => {
    // Only allow numbers and limit to 10 digits
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  const handleNameChange = (e) => {
    // Only allow letters, spaces, and dots
    const value = e.target.value;
    if (value === '' || nameRegex.test(value)) {
      setFormData({ ...formData, name: value });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 animate-fade-in max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">ข้อมูลติดต่อของคุณ</h2>
        <p className="text-slate-500">เพื่อให้เจ้าหน้าที่ส่งใบเสนอราคาตัวจริงให้คุณ</p>
      </div>

      <div className="space-y-5">
        <div>
          <Input 
            label="ชื่อ-นามสกุล"
            placeholder="กรอกชื่อและนามสกุล"
            required
            value={formData.name}
            onChange={handleNameChange}
            className={`rounded-2xl transition-all ${formData.name && !isNameValid ? 'border-red-400 bg-red-50' : ''}`}
          />
          {formData.name && !isNameValid && (
            <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase tracking-tight">รูปแบบชื่อไม่ถูกต้อง (ห้ามมีตัวเลข)</p>
          )}
        </div>

        <div>
          <Input 
            label="เบอร์โทรศัพท์"
            placeholder="08XXXXXXXX"
            type="tel"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`rounded-2xl transition-all ${formData.phone && !isPhoneValid ? 'border-red-400 bg-red-50' : ''}`}
          />
          {formData.phone && !isPhoneValid && (
            <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase tracking-tight">กรุณากรอกเบอร์โทรให้ครบ 10 หลัก (เช่น 0812345678)</p>
          )}
        </div>

        <Input 
          label="ไอดีไลน์ (Optional)"
          placeholder="ระบุ Line ID เพื่อความสะดวกในการติดต่อกลับ"
          value={formData.lineId}
          onChange={(e) => setFormData({...formData, lineId: e.target.value})}
          className="rounded-2xl"
        />
      </div>

      <div className="relative group">
        {/* Extreme Thick Neon Glow Background - Multi-layered */}
        <div className="absolute -inset-2 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 rounded-[2.2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-700"></div>
        
        <div className="relative overflow-hidden bg-slate-950 rounded-[2rem] border-2 border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.3)] relative">
          {/* Thickest Animated Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-400 bg-[length:200%_100%] animate-[gradient_2s_linear_infinite]"></div>
          
          <div className="p-10">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
              <i className="fas fa-clipboard-check text-blue-400 text-lg animate-pulse"></i>
              ข้อมูลที่คุณเลือก (สรุป)
            </h4>
            
            <div className="grid gap-8">
              <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-blue-400/40 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(37,99,235,0.8)] group-hover:bg-blue-600/30 group-hover:scale-105 overflow-hidden">
                {formData.brandLogo ? (
                  <img 
                    src={formData.brandLogo} 
                    alt={formData.brandName} 
                    className="w-full h-full object-cover p-2 transform group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <i className="fas fa-car-side text-blue-400 text-3xl"></i>
                )}
              </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1.5 shadow-blue-500/50">รุ่นรถและปีที่ผลิต</span>
                  <p className="text-2xl font-black text-white leading-none tracking-tight">
                    {isOtherBrand ? formData.customBrand : formData.brandName} 
                    <span className="text-blue-400 block mt-1 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">
                      {isOtherModel ? formData.customModel : formData.modelName}
                    </span>
                    <span className="text-slate-500 font-bold ml-1 text-lg italic">({formData.year})</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-blue-400/40 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] group-hover:bg-cyan-600/30 group-hover:scale-105">
                  <i className="fas fa-shield-halved text-cyan-400 text-3xl"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-1.5">ประเภทความคุ้มครอง</span>
                  <p className="text-2xl font-black text-white leading-none tracking-tight">
                    ประกันภัยชั้น <span className="text-blue-400 underline decoration-blue-500 decoration-4 underline-offset-4 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">{formData.insuranceType === '1' ? '1' : formData.insuranceType.replace('plus', '+')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thicker Bottom Pattern */}
          <div className="bg-blue-600/10 py-4 px-10 border-t-2 border-blue-500/20 flex items-center gap-3">
            <i className="fas fa-fingerprint text-blue-400 text-sm animate-pulse"></i>
            <span className="text-[11px] font-black text-blue-400/60 uppercase tracking-widest italic">SECURED DATA ENCRYPTION</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="flex gap-4 pt-4">
        <Button onClick={onPrev} variant="secondary" className="flex-1 py-4 rounded-2xl">กลับ</Button>
        <Button 
          type="submit" 
          variant="accent" 
          disabled={submitting || !isNameValid || !isPhoneValid}
          className={`flex-1 py-4 rounded-2xl shadow-xl font-bold text-lg transition-all ${(!isNameValid || !isPhoneValid) ? 'opacity-50 grayscale' : 'shadow-orange-100'}`}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              กำลังส่ง...
            </span>
          ) : 'ส่งข้อมูลทันที'}
        </Button>
      </div>
    </form>
  );
};

export default ContactStep;
