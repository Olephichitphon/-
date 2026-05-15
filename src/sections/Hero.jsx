import React from 'react';

const Hero = () => {
  const scrollToWizard = () => {
    document.getElementById('check-premium')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/website-images/hero-bg.webp" 
          alt="Insurance Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
          <span className="text-orange-400 text-sm font-bold tracking-wider uppercase">
            Fairdee Insurance By พงศกร
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
          เช็คเบี้ยประกัน <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            ในราคาที่ดีที่สุด
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          เปรียบเทียบแผนประกันภัยชั้นนำที่คัดมาเพื่อคุณโดยเฉพาะ 
          คุ้มครองครบจบในที่เดียว พร้อมดูแลคุณทุกย่างก้าว
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={scrollToWizard} 
            className="neon-border-btn text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            เช็คเบี้ยเลยตอนนี้
          </button>
          
          <div className="flex flex-col items-start gap-1 text-left bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-orange-500 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                ))}
              </div>
              <span className="ml-2 text-sm">ลูกค้ากว่า 10,000+ รายไว้วางใจ</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400 text-xs">
              {"★★★★★"} <span className="text-gray-400 ml-1">รีวิวระดับ 5 ดาว</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </section>
  );
};

export default Hero;
