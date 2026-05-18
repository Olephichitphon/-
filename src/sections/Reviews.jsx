import React, { useState, useEffect } from 'react';
import { getCustomerReviews } from '../lib/sanity';

// Mockup สลิปพรีเมี่ยมสำหรับระบบสำรอง (Fallback) หากยังไม่มีการอัพโหลดสลิปใน Sanity
const defaultReviews = [
  {
    id: 1,
    date: "18 พ.ค. 2569",
    comment: "เช็คเบี้ยประกันรถ Honda Civic FE เรียบร้อยครับ ราคาดีมาก ถูกกว่าที่อื่นเยอะเลย โอนเงินปุ๊บ ได้รับใบเสร็จและแอดมินออกความคุ้มครองชั่วคราวให้ทันที รวดเร็วทันใจ ปลอดภัย 100% ครับ แนะนำเลยครับ!",
    slipUrls: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    date: "17 พ.ค. 2569",
    comment: "ประทับใจแอดมินมากค่ะ คอยให้คำแนะนำเปรียบเทียบเบี้ยของบริษัทต่างๆ อย่างจริงใจ โอนเงินเบี้ยประกันปีนี้ง่าย สะดวก ปลอดภัย ไม่ต้องกังวลเรื่องเอกสารเลยค่ะ",
    slipUrls: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    date: "15 พ.ค. 2569",
    comment: "โอนเบี้ยเรียบร้อย ได้ใบเสร็จรับเงินทันทีผ่านไลน์ มั่นใจได้จริงว่าโอนเงินตรงเข้าบริษัท รวดเร็วและมีความเป็นมืออาชีพมากค่ะ สบายใจหายห่วง",
    slipUrls: [
      "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=500&auto=format&fit=crop&q=80"
    ]
  }
];

const Reviews = () => {
  const [dbReviews, setDbReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlip, setActiveSlip] = useState(null); // สำหรับ Lightbox ดูรูปสลิปขยายใหญ่

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getCustomerReviews();
        if (data && data.length > 0) {
          setDbReviews(data);
        }
      } catch (err) {
        console.error('Failed to fetch reviews from Sanity:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const activeReviews = dbReviews.length > 0 ? dbReviews : defaultReviews;

  return (
    <section id="reviews" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Transfer Proof & Customer Voice</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            เสียงตอบรับและ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">หลักฐานการโอนจริง</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg mb-8">
            การันตีความโปร่งใส มั่นใจ และปลอดภัย ด้วยการทำธุรกรรมจริงและข้อความตอบรับจริงจากผู้ใช้บริการทุกวัน
          </p>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {activeReviews.map((review) => (
            <div 
              key={review._id || review.id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group relative"
            >
              <div>
                {/* 1. วันที่ & แสตมป์สลิปผ่านการตรวจสอบ */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                    <i className="far fa-calendar-alt text-blue-500"></i>
                    <span>วันที่โอน: {review.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-3 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <i className="fas fa-check-circle text-xs"></i>
                    <span>สลิปได้รับตรวจสอบแล้ว</span>
                  </div>
                </div>

                {/* 2. ข้อความรีวิว */}
                <p className="text-slate-600 leading-relaxed italic mb-8 text-base font-medium pl-4 border-l-2 border-blue-500/30">
                  "{review.comment}"
                </p>
              </div>

              {/* 3. หลักฐานการโอนเงิน (สลิป 1-2 รูป) */}
              {review.slipUrls && review.slipUrls.length > 0 && (
                <div className="mt-auto pt-4 border-t border-dashed border-slate-100">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <i className="fas fa-receipt text-slate-400"></i>
                    <span>หลักฐานการโอน ({review.slipUrls.length} รูป)</span>
                  </div>
                  <div className={`grid gap-4 ${review.slipUrls.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {review.slipUrls.map((url, slipIdx) => (
                      <div 
                        key={slipIdx}
                        onClick={() => setActiveSlip(url)}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer group/slip bg-slate-50"
                      >
                        <img 
                          src={url} 
                          alt={`Slip proof ${slipIdx + 1}`} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover/slip:scale-105" 
                        />
                        {/* Hover Overlay Zoom Effect */}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/slip:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white gap-2 backdrop-blur-[1px]">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                            <i className="fas fa-search-plus text-sm"></i>
                          </div>
                          <span className="text-[10px] font-bold tracking-widest">คลิกเพื่อขยาย</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Summary Statistics */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-white py-10 px-12 rounded-[3rem] shadow-2xl shadow-blue-100/20 border border-slate-50">
          <div className="text-center">
            <div className="text-4xl font-black text-slate-900 mb-1">4.9/5</div>
            <div className="text-orange-400 text-sm mb-2">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Average Rating</div>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          <div className="text-center">
            <div className="text-4xl font-black text-slate-900 mb-1">98%</div>
            <div className="text-blue-600 text-sm mb-2 font-bold italic">Satisfaction</div>
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Client Happiness</div>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          <div className="text-center">
            <div className="text-4xl font-black text-slate-900 mb-1">10k+</div>
            <div className="text-indigo-600 text-sm mb-2 font-bold italic">Active Users</div>
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Trusting Our System</div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal สำหรับขยายรูปสลิปโอนเงิน */}
      {activeSlip && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setActiveSlip(null)}
        >
          <div className="absolute top-6 right-6 text-white text-3xl cursor-pointer hover:text-slate-300 transition-colors duration-300">
            <i className="fas fa-times"></i>
          </div>
          <div 
            className="relative max-w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeSlip} 
              alt="Full size slip proof" 
              className="max-w-[380px] w-full h-auto object-contain border-4 border-white rounded-3xl bg-white shadow-xl" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
