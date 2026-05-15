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

  return (
    <form onSubmit={onSubmit} className="space-y-8 animate-fade-in max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">ข้อมูลติดต่อของคุณ</h2>
        <p className="text-slate-500">เพื่อให้เจ้าหน้าที่ส่งใบเสนอราคาตัวจริงให้คุณ</p>
      </div>

      <div className="space-y-5">
        <Input 
          label="ชื่อ-นามสกุล"
          placeholder="กรอกชื่อและนามสกุล"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="rounded-2xl"
        />
        <Input 
          label="เบอร์โทรศัพท์"
          placeholder="08X-XXX-XXXX"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="rounded-2xl"
        />
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
          disabled={submitting || !formData.name || !formData.phone}
          className="flex-1 py-4 rounded-2xl shadow-xl shadow-orange-100 font-bold text-lg"
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
