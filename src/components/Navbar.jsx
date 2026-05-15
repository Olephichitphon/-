import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'หน้าหลัก', href: '#' },
    { title: 'เช็คเบี้ย', href: '#check-premium' },
    { title: 'โปรโมชั่น', href: '#promotions' },
    { title: 'รีวิว', href: '#reviews' },
    { title: 'บทความ', href: '#articles' },
    { title: 'ติดต่อ', href: '#contact' },
  ];

  return (
    <>
      <style>{`
        @keyframes neon-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .neon-border-btn {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .neon-border-btn::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: conic-gradient(
            transparent, 
            #fb923c, 
            #f97316, 
            #fb923c,
            transparent,
            transparent
          );
          animation: neon-rotate 2s linear infinite;
          z-index: -2;
        }
        .neon-border-btn::after {
          content: '';
          position: absolute;
          inset: 4px;
          background: #f97316;
          border-radius: 9999px;
          z-index: -1;
        }
      `}</style>
      <nav className={`fixed w-full z-50 bg-white shadow-lg transition-all duration-300 h-16 md:h-24 flex items-center`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full">
          {/* Left: Logos Grouped (Desktop) */}
          <div className="flex-shrink-0 flex items-center gap-4 h-full">
            <a href="#" className="flex items-center h-full">
              <img
                src="/website-images/logo.png"
                alt="Main Logo"
                className="h-10 md:h-16 w-auto object-contain"
              />
            </a>
            {/* Fairdee Logo - Desktop Only */}
            <a href="#" className="hidden lg:flex items-center h-full">
              <img
                src="/website-images/fairdee-logo.png"
                alt="Fairdee Logo"
                className="h-10 md:h-20 w-auto object-contain"
              />
            </a>
          </div>

          {/* Center: Fairdee Logo - Mobile Only */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex lg:hidden items-center h-full pointer-events-none md:pointer-events-auto">
            <a href="#" className="flex items-center h-full">
              <img
                src="/website-images/fairdee-logo.png"
                alt="Fairdee Logo"
                className="h-14 md:h-24 w-auto object-contain"
              />
            </a>
          </div>

          {/* Right: Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className={`font-bold transition-all duration-300 text-sm xl:text-base flex items-center justify-center ${link.title === 'เช็คเบี้ย'
                    ? 'neon-border-btn text-white px-8 py-3 rounded-full shadow-2xl shadow-orange-500/60 hover:scale-110 active:scale-95'
                    : 'text-gray-700 hover:text-orange-500'
                    }`}
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[60] bg-white transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
        <div className="flex flex-col h-full relative">
          {/* Top Logo Container - Perfectly Framed Face */}
          <div className="relative overflow-hidden h-60 flex flex-col items-center justify-end border-b border-gray-100 pb-6 px-6 bg-white">
            <div className="absolute inset-0 z-0">
              <img
                src="/website-images/hero-bg.webp"
                alt="Header Background"
                className="w-full h-full object-cover object-[right_30%] -scale-x-100"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2 bg-black/20 hover:bg-black/40 rounded-2xl z-20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
 
            {/* Even Larger & Darker Gradient Text - Positioned at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5 w-max">
              <img
                src="/website-images/fairdee-circle.png"
                alt="Fairdee Logo"
                className="h-16 w-16 object-contain rounded-full border-2 border-[#f58220] drop-shadow-lg"
              />

              <p className="text-[24px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#002266] to-[#0044cc] drop-shadow-sm">
                By พงศกร
              </p>
            </div>


          </div>

          <div className="flex flex-col items-center gap-2 py-2 px-6 overflow-y-auto">
            {navLinks.map((link, idx) => {
              if (link.title === 'ติดต่อ') {
                return (
                  <div key={link.title} className="flex items-center justify-center gap-10 w-full mt-4 pb-2">
                    <a href="tel:0812345678" className="text-3xl text-gray-800 hover:text-orange-500 transition-colors">
                      <i className="fas fa-phone"></i>
                    </a>
                    <a href="https://line.me/ti/p/~yourid" target="_blank" rel="noopener noreferrer" className="text-4xl text-[#00c300] hover:scale-110 transition-transform">
                      <i className="fab fa-line"></i>
                    </a>
                    <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#1877f2] hover:scale-110 transition-transform">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                );
              }
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className={`flex items-center justify-center transition-all duration-300 w-full hover:scale-110 active:scale-95 ${link.title === 'เช็คเบี้ย'
                    ? 'neon-border-btn text-white px-10 py-3 rounded-2xl shadow-2xl shadow-orange-500/50 my-1 w-fit text-xl font-black'
                    : 'text-xl font-black text-gray-800 hover:text-orange-500 w-full text-center py-2'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              );
            })}
          </div>

          <div className="mt-auto text-center py-4 px-6">
            <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">Fairdee Insurance By พงศกร</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
