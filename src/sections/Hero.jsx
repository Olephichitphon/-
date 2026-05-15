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

      <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center md:text-left pt-32 pb-20 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="max-w-4xl md:max-w-2xl lg:max-w-[600px]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-tight tracking-tight">
              เช็คเบี้ยประกัน <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                ในราคาที่ดีที่สุด
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center md:items-stretch mb-10">
              <button 
                onClick={scrollToWizard} 
                className="neon-border-btn text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
              >
                เช็คเบี้ยเลยตอนนี้
              </button>
            </div>

            {/* Branding & Contact Combined Badge - Responsive */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-white/5 backdrop-blur-md p-4 lg:p-2 lg:pr-8 rounded-3xl lg:rounded-full border border-white/10 w-full lg:w-fit hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4 lg:pl-2">
                <img
                  src="/website-images/fairdee-circle.png"
                  alt="Fairdee Logo"
                  className="h-10 lg:h-12 w-10 lg:w-12 object-contain rounded-full border-2 border-orange-500 drop-shadow-xl"
                />
                <div className="flex flex-col items-start">
                  <p className="text-[14px] lg:text-[16px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 whitespace-nowrap">
                    By พงศกร
                  </p>
                  <div className="h-[2px] w-full bg-gradient-to-r from-orange-500 to-transparent rounded-full mt-0.5"></div>
                </div>
              </div>

              {/* Divider - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block w-[1px] h-8 bg-white/10"></div>
              {/* Horizontal Divider for mobile */}
              <div className="lg:hidden w-full h-[1px] bg-white/10"></div>

              {/* Compact Contact Icons */}
              <div className="flex items-center gap-6 lg:gap-6">
                <a href="tel:0812345678" className="flex items-center gap-2 text-white hover:text-orange-400 transition-all duration-300 group/icon">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/icon:scale-110 transition-transform">
                    <i className="fas fa-phone text-sm"></i>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover/icon:opacity-100 hidden sm:block">โทรเลย</span>
                </a>

                <a href="https://line.me/ti/p/~yourid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#00c300] hover:scale-110 transition-all duration-300 group/icon">
                  <div className="w-10 h-10 rounded-full bg-[#00c300]/10 flex items-center justify-center">
                    <i className="fab fa-line text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover/icon:opacity-100 hidden sm:block">Line ID</span>
                </a>

                <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1877f2] hover:scale-110 transition-all duration-300 group/icon">
                  <div className="w-10 h-10 rounded-full bg-[#1877f2]/10 flex items-center justify-center">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover/icon:opacity-100 hidden sm:block">Facebook</span>
                </a>
              </div>
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
