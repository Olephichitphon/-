import React from 'react';
import Input from '../Input';
import Button from '../Button';

const DetailsStep = ({ 
  formData, 
  setFormData, 
  models, 
  loading, 
  onNext, 
  onPrev 
}) => {
  const isOtherBrand = formData.brandId === 'other';
  const isOtherModel = formData.modelId === 'other';
  const isOtherCc = formData.engineCc === 'other';
  const isCcValid = formData.engineCc && (formData.engineCc !== 'other' || (formData.customCc && formData.customCc.trim() !== ''));

  const handleModelChange = (e) => {
    const selectedModelId = e.target.value;
    const modelObj = models.find(m => m._id === selectedModelId);
    const modelName = modelObj?.name || '';
    const carGroup = modelObj?.group || '5';
    
    setFormData({ 
      ...formData, 
      modelId: selectedModelId, 
      modelName: modelName,
      carGroup: carGroup,
      customModel: '',
      engineCc: '',
      customCc: ''
    });
  };

  const years = Array.from({ length: 15 }, (_, i) => 2026 - i);

  return (
    <div className="space-y-8 animate-fade-in max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">ระบุรายละเอียดเพิ่มเติม</h2>
        <p className="text-slate-500">รุ่นรถ ปี ขนาดเครื่องยนต์ และประเภทประกัน</p>
      </div>

      <div className="space-y-6">
        {isOtherBrand && (
          <Input 
            label="ระบุยี่ห้อรถ" 
            placeholder="เช่น Tesla, BYD" 
            value={formData.customBrand} 
            onChange={(e) => setFormData({...formData, customBrand: e.target.value})} 
          />
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">รุ่นรถ</label>
          <select 
            disabled={loading && !isOtherBrand}
            value={formData.modelId}
            onChange={handleModelChange}
            className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all bg-white disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="">เลือกรุ่น</option>
            {models.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
            <option value="other">อื่นๆ (ระบุเอง)</option>
          </select>
        </div>

        {isOtherModel && (
          <Input 
            label="ระบุรุ่นรถ" 
            placeholder="เช่น Atto 3, Model 3" 
            value={formData.customModel} 
            onChange={(e) => setFormData({...formData, customModel: e.target.value})} 
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">ปีรถ</label>
            <select 
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all bg-white cursor-pointer appearance-none"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">ขนาดเครื่องยนต์ (CC)</label>
            <select 
              value={formData.engineCc}
              onChange={(e) => setFormData({...formData, engineCc: e.target.value})}
              className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all bg-white cursor-pointer appearance-none"
            >
              <option value="">เลือก CC</option>
              <option value="1000">1,000 CC</option>
              <option value="1200">1,200 CC</option>
              <option value="1300">1,300 CC</option>
              <option value="1500">1,500 CC</option>
              <option value="1600">1,600 CC</option>
              <option value="1800">1,800 CC</option>
              <option value="1900">1,900 CC</option>
              <option value="2000">2,000 CC</option>
              <option value="2200">2,200 CC</option>
              <option value="2400">2,400 CC</option>
              <option value="2500">2,500 CC</option>
              <option value="2800">2,800 CC</option>
              <option value="3000">3,000 CC</option>
              <option value="EV">รถยนต์ไฟฟ้า EV</option>
              <option value="other">อื่นๆ (ระบุเอง)</option>
            </select>
          </div>
        </div>

        {isOtherCc && (
          <Input 
            label="ระบุขนาดเครื่องยนต์ (CC)" 
            placeholder="เช่น 1498, 1197" 
            value={formData.customCc} 
            onChange={(e) => setFormData({...formData, customCc: e.target.value})} 
          />
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">ประเภทประกัน</label>
          <select 
            value={formData.insuranceType}
            onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
            className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white cursor-pointer appearance-none"
          >
            <option value="1">ชั้น 1</option>
            <option value="2plus">ชั้น 2+</option>
            <option value="3plus">ชั้น 3+</option>
            <option value="3">ชั้น 3</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={onPrev} variant="secondary" className="flex-1 py-4 rounded-2xl">กลับ</Button>
        <Button 
          onClick={onNext} 
          variant="accent"
          disabled={!(formData.modelId || isOtherModel) || !isCcValid}
          className="flex-1 py-4 rounded-2xl shadow-lg shadow-orange-100"
        >
          ถัดไป
        </Button>
      </div>
    </div>
  );
};

export default DetailsStep;
