import React, { useRef, useEffect } from 'react';
import Input from '../Input';
import Button from '../Button';

const BrandSelection = ({ 
  brands, 
  formData, 
  setFormData, 
  onBrandSelect, 
  loading,
  onNext
}) => {
  const selectedBrandId = formData.brandId;
  const bottomRef = useRef(null);
  
  // Auto-scroll to bottom when a brand is selected
  useEffect(() => {
    if (selectedBrandId) { // Enable for all devices
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedBrandId]);

  // Common brands that we want to show in the grid
  const popularBrandNames = [
    'Toyota', 'Honda', 'Mazda', 'Nissan', 'Isuzu', 
    'Mitsubishi', 'Ford', 'Suzuki', 'MG', 'Mercedes-Benz'
  ];

  // Filter brands from Sanity that match our popular list
  const popularBrands = popularBrandNames.map(name => {
    const found = brands.find(b => b.name.trim().toLowerCase() === name.trim().toLowerCase());
    const localLogo = `/assets/logos/${name.toLowerCase()}.png`;
    
    if (found) {
      return { 
        ...found, 
        logoUrl: found.logoUrl || localLogo 
      };
    }
    
    return { 
      name, 
      _id: name.toLowerCase(), 
      placeholder: true, 
      logoUrl: localLogo 
    };
  });

  if (loading && brands.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">กำลังโหลดรายชื่อยี่ห้อรถ...</p>
      </div>
    );
  }

  // Brands for the dropdown (Show all brands for easy searching)
  const otherBrands = brands;

  const isOtherBrand = selectedBrandId === 'other';

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">เลือกยี่ห้อรถ</h2>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {popularBrands.map((brand) => (
          <button
            key={brand._id}
            onClick={() => onBrandSelect(brand.placeholder ? 'other' : brand._id, brand.name, brand.logoUrl)}
            className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border-2
              ${selectedBrandId === brand._id 
                ? 'border-orange-500 bg-orange-50 shadow-md scale-105' 
                : 'border-transparent bg-slate-50 hover:bg-white hover:shadow-xl hover:border-slate-100'}`}
          >
            <div className="w-full h-24 mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 transition-all duration-300">
              {brand.logoUrl ? (
                <img 
                  src={brand.logoUrl} 
                  alt={brand.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 rounded-xl shadow-inner" 
                />
              ) : (
                <div className="text-slate-300 font-bold text-3xl transition-all">
                  {brand.name[0]}
                </div>
              )}
            </div>
            <span className={`text-[10px] font-black tracking-widest mt-auto pb-1 transition-colors ${selectedBrandId === brand._id ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-900'}`}>
              {brand.name.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Other Brands Dropdown & Custom Input */}
      <div className="max-w-md mx-auto space-y-4 pt-4" ref={bottomRef}>
        <div className="relative">
          <select
            value={selectedBrandId || ''}
            onChange={(e) => {
              const id = e.target.value;
              const brand = brands.find(b => b._id === id);
              onBrandSelect(id, brand?.name || '', brand?.logoUrl || '');
            }}
            className="w-full p-4 pl-6 pr-12 appearance-none bg-white border-2 border-blue-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
          >
            <option value="">เลือกยี่ห้อรถอื่นๆ</option>
            {otherBrands.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
            <option value="other">อื่นๆ (ระบุเอง)</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {selectedBrandId && (
          <div className="animate-fade-in space-y-4">
            {isOtherBrand && (
              <Input 
                label="ระบุยี่ห้อรถ" 
                placeholder="เช่น Tesla, BYD" 
                value={formData.customBrand} 
                onChange={(e) => setFormData({...formData, customBrand: e.target.value})} 
              />
            )}
            <Button 
              onClick={onNext}
              variant="accent"
              disabled={isOtherBrand && !formData.customBrand}
              className="w-full py-4 rounded-2xl shadow-lg shadow-orange-100 font-bold"
            >
              ถัดไป
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSelection;
