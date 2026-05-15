import React from 'react';

const Hero = () => {
  const scrollToWizard = () => {
    document.getElementById('check-premium')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/website-images/hero-bg.webp" 
          alt="Insurance Background" 
          className="w-full h-full object-cover object-[center_25%] scale-105" 
        />
        {/* Very light overlay to maintain text readability while showing full image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center pt-20">

        
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
          
          <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl p-4 px-8 rounded-2xl border border-white/10 shadow-2xl">
            <a href="tel:0812345678" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-phone text-xl"></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">โทรเลย</span>
            </a>

            <div className="w-[1px] h-8 bg-white/10"></div>

            <a href="https://line.me/ti/p/~yourid" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-[#00c300] hover:scale-110 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-[#00c300]/10 flex items-center justify-center">
                <i className="fab fa-line text-2xl"></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">Line ID</span>
            </a>

            <div className="w-[1px] h-8 bg-white/10"></div>

            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-[#1877f2] hover:scale-110 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-[#1877f2]/10 flex items-center justify-center">
                <i className="fab fa-facebook-f text-2xl"></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">Facebook</span>
            </a>
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
