import React from 'react';

const Hero = () => {
  const scrollToWizard = () => {
    document.getElementById('check-premium')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'บริษัทประกันชั้นนำ',
      subtitle: 'กว่า 20 แห่ง',
      icon: (
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="url(#og-grad-1)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="og-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      title: 'ผ่อน 0%',
      subtitle: 'นานสูงสุด 10 เดือน',
      icon: (
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="url(#og-grad-2)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="og-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <line x1="19" y1="5" x2="5" y2="19"></line>
          <circle cx="6.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      title: 'ผู้เชี่ยวชาญดูแล',
      subtitle: 'ตลอดการทำประกัน',
      icon: (
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="url(#og-grad-3)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="og-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    },
    {
      title: 'มั่นใจ ปลอดภัย',
      subtitle: 'ข้อมูลไม่รั่วไหล',
      icon: (
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="url(#og-grad-4)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="og-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <polyline points="9 15 11 17 15 13"></polyline>
        </svg>
      )
    },
    {
      title: 'บริการรวดเร็ว',
      subtitle: 'ภายใน 1 นาที',
      icon: (
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="url(#og-grad-5)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="og-grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
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

      {/* Hero Content Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 z-10 text-center md:text-left pt-36 pb-20 relative flex-grow flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          {/* Left Content */}
          <div className="max-w-4xl md:max-w-2xl lg:max-w-[750px] flex flex-col items-center md:items-start w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight animate-fade-in-right">
              เช็คเบี้ยประกันรถ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                ฟรีใน 1 นาที
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-[600px] mx-auto md:mx-0 animate-fade-in-right" style={{ animationDelay: '0.2s', opacity: 0 }}>
              เปรียบเทียบราคาจากบริษัทประกันชั้นนำกว่า 20 แห่ง พร้อมผ่อน 0% และมีผู้เชี่ยวชาญช่วยดูแล
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start items-center mb-10 animate-fade-in-right" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <button 
                onClick={scrollToWizard} 
                className="neon-border-btn text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center"
              >
                เช็คเบี้ยฟรีทันที
              </button>

              <a 
                href="https://line.me/ti/p/~yourid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-[#06C755] text-[#06C755] hover:text-white hover:bg-[#06C755] hover:shadow-[#06C755]/30 shadow-lg px-12 py-5 rounded-full text-xl font-black bg-transparent hover:scale-110 active:scale-95 transition-all duration-300 w-full sm:w-auto text-center"
              >
                <i className="fab fa-line text-2xl mr-1"></i>
                แอด LINE เพื่อรับราคา
              </a>
            </div>

            {/* Bullet points from user screenshot */}
            <div className="flex flex-col items-center md:items-start gap-4 mb-12 animate-fade-in-right" style={{ animationDelay: '0.6s', opacity: 0 }}>
              {[
                'ไม่มีค่าใช้จ่าย',
                'ตอบไวผ่าน LINE',
                'ดูแลหลังการขายจริง'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white text-lg font-bold">
                  <span className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center flex-shrink-0 bg-orange-500/10">
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Branding & Contact Combined Badge - Responsive */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-white/5 backdrop-blur-md p-4 lg:p-2 lg:pr-8 rounded-3xl lg:rounded-full border border-white/10 w-full lg:w-fit hover:bg-white/10 transition-all duration-300 group animate-fade-in-right" style={{ animationDelay: '0.8s', opacity: 0 }}>
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

      {/* SVG Wave Divider & Feature Grid Section */}
      <div className="w-full relative z-10 mt-auto">
        {/* SVG Top Wave Divider */}
        <div className="w-full overflow-visible leading-none translate-y-[2px]">
          <svg className="relative block w-full h-[40px] md:h-[60px] overflow-visible" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Layer 1: Main Deep Royal Blue Wave */}
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,57.05,12,88.43,18.39,168.06,34.52,250.27,46.74,321.39,56.44Z" 
              fill="#113583"
            ></path>
            {/* Layer 2: Perfectly Uniform Orange Stroke Line with doubled thickness (16px) */}
            <path
              d="M0,0C26.9,4.75,57.05,12,88.43,18.39,168.06,34.52,250.27,46.74,321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3"
              fill="none"
              stroke="#ff8a00"
              strokeWidth="16"
            ></path>
          </svg>
        </div>

        {/* Feature Grid Container - Royal Blue Theme */}
        <div className="bg-[#113583] pt-10 pb-16 relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {features.map((item, index) => (
                <div 
                  key={index} 
                  className="group relative transform bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-orange-500/40 rounded-3xl p-6 flex flex-col items-center text-center shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 cursor-pointer"
                >
                  {/* Glowing Radial Light Behind Icon */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0 pointer-events-none"></div>

                  {/* Glowing SVG Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300 z-10">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-2 tracking-wide z-10 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-gray-300 group-hover:text-gray-100 transition-colors z-10">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SVG Bottom Wave Divider to transition into white marquee */}
        {/* Added bg-[#113583] to fully cover transparent region above the white wave with royal blue color */}
        <div className="w-full overflow-visible leading-none -translate-y-[1px] bg-[#113583]">
          <svg className="relative block w-full h-[40px] md:h-[60px] overflow-visible" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Layer 1: Main White Wave */}
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              className="fill-white"
            ></path>
            {/* Layer 2: Perfectly Uniform Orange Stroke Line with doubled thickness (16px) */}
            <path
              d="M1200,95.8C1132.19,118.92,1055.71,111.31,985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35"
              fill="none"
              stroke="#ff8a00"
              strokeWidth="16"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
