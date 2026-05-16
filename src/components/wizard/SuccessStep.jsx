import React from 'react';
import Button from '../Button';

const SuccessStep = () => {
  return (
    <div className="py-12 animate-fade-in text-center">
      <div className="bg-white rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-w-xl mx-auto border border-slate-100 overflow-hidden group">
        
        {/* Hero Image Banner */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src="/website-images/hero-bg.webp" 
            alt="Success Banner" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[10s]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20"></div>
        </div>

        {/* Floating Success Badge with Neon Glow (Moved outside overflow-hidden) */}
        <div className="relative h-0">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
            <div className="w-24 h-24 bg-white rounded-full p-2 shadow-xl border border-slate-50 relative group/icon">
              {/* Outer Pulsing Glow - Intense */}
              <div className="absolute inset-0 bg-green-400/40 rounded-full blur-2xl animate-zoom-pulse"></div>
              
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-4xl shadow-[0_0_40px_rgba(34,197,94,0.8)] relative z-10 transition-transform group-hover/icon:scale-110 animate-zoom-pulse">
                <i className="fas fa-check drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-12 px-10 md:px-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-none">
            ส่งข้อมูล <span className="text-orange-500">สำเร็จ!</span>
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              เราได้รับข้อมูลรถของคุณแล้ว <br />
              เจ้าหน้าที่จะติดต่อกลับเพื่อแจ้งเบี้ยประกันที่ดีที่สุด
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 rounded-full border border-slate-100 mb-10">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[11px]">
              Processing your best quotes...
            </p>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            ใบเสนอราคาจะถูกเตรียมภายในเวลาอันรวดเร็ว <br />
            โปรดรอรับสายจากเจ้าหน้าที่ของเราครับ
          </p>

          <Button 
            onClick={() => window.location.reload()} 
            variant="accent" 
            className="w-full py-5 text-xl font-bold rounded-2xl shadow-xl shadow-orange-100 hover:scale-105 transition-all"
          >
            <i className="fas fa-home mr-3 text-sm"></i>
            กลับสู่หน้าแรก
          </Button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-300">
            <i className="fas fa-shield-halved text-xs"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure Transmission</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
