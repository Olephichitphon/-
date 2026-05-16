import React from 'react';
import Button from '../Button';

const SuccessStep = () => {
  return (
    <div className="py-12 animate-fade-in text-center md:text-left">
      <div className="bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] max-w-xl md:max-w-4xl mx-auto border border-slate-100 overflow-hidden group flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Side: Hero Image Banner (Desktop) / Top Banner (Mobile) */}
        <div className="relative w-full md:w-1/2 h-56 md:h-auto">
          {/* Image Container with clipping */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/website-images/hero-bg.webp" 
              alt="Success Banner" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[15s]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/40 md:from-transparent to-transparent"></div>
          </div>
          
          {/* Floating Success Badge (Positioned for Desktop, moved outside overflow) */}
          <div className="absolute top-1/2 left-1/2 md:left-full -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="w-24 h-24 bg-white rounded-full p-2 shadow-2xl border border-slate-50 relative group/icon">
              <div className="absolute inset-0 bg-green-400/40 rounded-full blur-2xl animate-zoom-pulse"></div>
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-4xl shadow-[0_0_40px_rgba(34,197,94,0.8)] relative z-10 animate-zoom-pulse">
                <i className="fas fa-check drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full md:w-1/2 pt-16 md:pt-0 pb-12 px-10 md:px-16 flex flex-col justify-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none">
              ส่งข้อมูล <br className="hidden md:block" />
              <span className="text-orange-500">สำเร็จ!</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                เราได้รับข้อมูลรถของคุณเรียบร้อยแล้ว <br />
                เจ้าหน้าที่จะรีบติดต่อกลับโดยเร็วที่สุดครับ
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 rounded-full border border-slate-100 mb-8">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[10px]">
                Matching with best agents...
              </p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              เตรียมพบกับเบี้ยประกันที่คุ้มค่าที่สุด <br />
              โปรดรอรับสายจากผู้เชี่ยวชาญของเราครับ
            </p>

            <Button 
              onClick={() => window.location.reload()} 
              variant="accent" 
              className="w-full py-5 text-xl font-bold rounded-2xl shadow-xl shadow-orange-100 hover:scale-105 transition-all"
            >
              <i className="fas fa-home mr-3 text-sm"></i>
              กลับสู่หน้าแรก
            </Button>
            
            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-slate-300">
              <i className="fas fa-shield-halved text-xs"></i>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure Transmission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
