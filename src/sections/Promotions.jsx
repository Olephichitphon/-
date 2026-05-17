import React, { useState, useEffect } from 'react';
import { getPromotions } from '../lib/sanity';

// ข้อมูลโปรโมชั่นสำรอง (Fallback) หากยังไม่ได้เพิ่มรูปภาพใน Sanity CMS
const staticPromotions = [
  {
    id: 1,
    title: "ผ่อน 0% นาน 10 เดือน",
    description: "ประกันรถยนต์ชั้น 1 เริ่มต้นเพียง 9xx บาท/เดือน แบ่งจ่ายสบาย ไม่ต้องใช้เงินก้อน",
    badge: "Hot Deal",
    icon: "fa-credit-card",
    color: "from-orange-400 to-orange-600",
    shadow: "shadow-orange-200"
  },
  {
    id: 2,
    title: "รับบัตรน้ำมัน 500.-",
    description: "รับทันทีบัตรเติมน้ำมัน PTT Station เมื่อสมัครประกันภัยชั้น 1 แผนที่ร่วมรายการ",
    badge: "Special Gift",
    icon: "fa-gas-pump",
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-200"
  },
  {
    id: 3,
    title: "ส่วนลดลูกค้าใหม่ 15%",
    description: "พิเศษสำหรับลูกค้าที่เช็คเบี้ยครั้งแรก รับส่วนลดทันทีจากราคาปกติ คุ้มที่สุดในตอนนี้",
    badge: "New Member",
    icon: "fa-tags",
    color: "from-emerald-400 to-teal-600",
    shadow: "shadow-emerald-200"
  }
];

const Promotions = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ดึงข้อมูลโปรโมชั่นจาก Sanity CMS
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const data = await getPromotions();
        // กรองเฉพาะที่มี imageUrl
        const validData = (data || []).filter(item => item.imageUrl);
        setPromos(validData);
      } catch (error) {
        console.error('Error fetching promotions from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, []);

  // ระบบสไลด์ภาพอัตโนมัติ (Autoplay) 5 วินาที
  useEffect(() => {
    if (promos.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [promos, currentIndex, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
  };

  // แอนิเมชันตอนเลื่อนสไลด์ด้วยปุ่มกลมด้านล่าง (Indicators)
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // การเลื่อนแบบกวาดนิ้วบนมือถือ (Touch support)
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      handleNext(); // Swipe Left -> Go Next
    } else if (touchEndX - touchStartX > 50) {
      handlePrev(); // Swipe Right -> Go Prev
    }
  };

  return (
    <section id="promotions" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl -mr-48 -mt-48 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl -ml-48 -mb-48 opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* หัวข้อ Section */}
        <div className="text-center mb-16">
          <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Special Offers</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            โปรโมชั่นพิเศษ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">สำหรับคุณ</span>
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* 1. แสดงโครงสร้างสเกเลตันระหว่างรอข้อมูล (Loading State) */}
        {loading ? (
          <div className="max-w-5xl mx-auto w-full h-[320px] sm:h-[420px] md:h-[520px] bg-slate-200 rounded-[2.5rem] animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <i className="fas fa-spinner fa-spin text-3xl text-slate-400"></i>
              <p className="text-slate-500 font-bold">กำลังดาวน์โหลดโปรโมชั่นล่าสุด...</p>
            </div>
          </div>
        ) : promos.length > 0 ? (
          /* 2. แสดงสไลเดอร์แบบอัปโหลดภาพผ่าน Sanity (เมื่อมีข้อมูลรูปภาพ) */
          <div className="max-w-5xl mx-auto">
            <div 
              className="group relative w-full h-[320px] sm:h-[420px] md:h-[520px] bg-slate-950 rounded-[2.5rem] shadow-2xl shadow-slate-300 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* สไลเดอร์แทร็คหลัก (Slide Track Container) */}
              <div 
                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {promos.map((promo) => (
                  <a 
                    key={promo._id}
                    href="#contact"
                    className="w-full h-full flex-shrink-0 cursor-pointer block focus:outline-none"
                  >
                    <div className="relative w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {/* เลเยอร์ที่ 1: ภาพพื้นหลังเบลอ (Blurred Backdrop) ช่วยปิดขอบว่างของรูปขนาดต่างกัน */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                        style={{ backgroundImage: `url(${promo.imageUrl})` }}
                      ></div>
                      
                      {/* เลเยอร์ที่ 2: กรอบไล่โทนสีมืดเพื่อสร้างมิติความลึก (Ambient Dark Overlay) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none"></div>

                      {/* เลเยอร์ที่ 3: ภาพคมชัดตรงกลางรักษาสัดส่วนเดิม (Object Contain) */}
                      <img 
                        src={promo.imageUrl} 
                        alt={promo.title || 'โปรโมชั่น'} 
                        className="w-full h-full object-contain relative z-10 select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.01]" 
                      />

                      {/* เลเยอร์ที่ 4: ชื่อหัวข้อโปรโมชั่น (แบบซ่อนเก็บไว้ใน alt/title เพื่อประโยชน์ด้าน SEO) */}
                      <span className="sr-only">{promo.title}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* ปุ่มลูกศรซ้าย-ขวาแบบกระจกใสพรีเมียม (Glassmorphic Navigation Arrows) */}
              {promos.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/15 hover:bg-black/30 border border-white/10 backdrop-blur-md text-white md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                  >
                    <i className="fas fa-chevron-left text-sm"></i>
                  </button>
                  <button 
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/15 hover:bg-black/30 border border-white/10 backdrop-blur-md text-white md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 z-20"
                  >
                    <i className="fas fa-chevron-right text-sm"></i>
                  </button>
                </>
              )}

              {/* จุดบอกตำแหน่งสไลด์พรีเมียม (Premium Navigation Dots Indicator) */}
              {promos.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
                  {promos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
                        currentIndex === index 
                          ? 'w-7 bg-orange-500 shadow-md shadow-orange-500/50' 
                          : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                    ></button>
                  ))}
                </div>
              )}
            </div>

            {/* แถบบาร์คำแนะนำเล็ก ๆ ด้านล่างสไลด์รูป */}
            <div className="text-center mt-6">
              <p className="text-xs text-slate-400 font-medium">
                <i className="fas fa-info-circle mr-1.5"></i>
                ปัดสไลด์บนจอมือถือ หรือคลิกที่ภาพเพื่อไปยังรายละเอียดโปรโมชั่นนั้น ๆ
              </p>
            </div>
          </div>
        ) : (
          /* 3. แสดงการ์ดข้อมูลแบบเดิม (Fallback Layout) ในกรณีที่ระบบหลังบ้านยังไม่มีการอัพรูปโปรโมชั่น */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {staticPromotions.map((promo) => (
                <div 
                  key={promo.id} 
                  className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${promo.color}`}></div>

                  <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${promo.color} text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg ${promo.shadow}`}>
                    {promo.badge}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <i className={`fas ${promo.icon} text-2xl text-slate-700`}></i>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    {promo.title}
                  </h3>
                  
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {promo.description}
                  </p>

                  <a href="#contact" className="inline-flex items-center gap-2 text-slate-900 font-bold group/btn">
                    <span>รายละเอียดเพิ่มเติม</span>
                    <i className="fas fa-arrow-right text-xs transform group-hover/btn:translate-x-2 transition-transform"></i>
                  </a>

                  <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${promo.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                </div>
              ))}
            </div>

            {/* Bottom Trust Note */}
            <div className="mt-20 text-center">
              <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 font-medium">
                  มีลูกค้ากว่า <span className="text-orange-600 font-black">5,000+ ท่าน</span> เลือกใช้โปรโมชั่นนี้ในเดือนที่ผ่านมา
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Promotions;
