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

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100/50">
        <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-[10px] font-black">!</span>
          สรุปข้อมูลที่คุณเลือก:
        </h4>
        <div className="text-sm text-blue-800/80 space-y-2 font-medium">
          <p className="flex items-center gap-2">
            <span className="text-lg">🚗</span> 
            <strong>รถ:</strong> {isOtherBrand ? formData.customBrand : formData.brandName} {isOtherModel ? formData.customModel : formData.modelName} ({formData.year})
          </p>
          <p className="flex items-center gap-2">
            <span className="text-lg">📋</span> 
            <strong>ประเภท:</strong> ชั้น {formData.insuranceType === '1' ? '1' : formData.insuranceType.replace('plus', '+')}
          </p>
        </div>
      </div>

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
