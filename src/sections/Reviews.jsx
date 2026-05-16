import React from 'react';

const reviews = [
  {
    id: 1,
    name: "คุณธนพล ศิริโชค",
    car: "Honda Civic FE",
    comment: "เช็คเบี้ยง่ายมากครับ แป๊บเดียวเจ้าหน้าที่ติดต่อกลับมาให้คำแนะนำดีมาก ราคาถูกกว่าที่อื่นที่เคยเช็คมาเลย ประทับใจครับ",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    name: "คุณวิไลวรรณ มีสุข",
    car: "Toyota Fortuner",
    comment: "ประทับใจความรวดเร็วค่ะ ทำเรื่องผ่านออนไลน์สะดวกมาก ไม่ต้องเสียเวลาเดินทางไปออฟฟิศเลย แนะนำเพื่อนมาใช้หลายคนแล้วค่ะ",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=2"
  },
  {
    id: 3,
    name: "คุณรัฐภูมิ ใจดี",
    car: "Mazda 2",
    comment: "เบี้ยประกันคุ้มค่าจริงๆ ครับ มีให้เลือกหลายบริษัทเปรียบเทียบกันได้ชัดเจน ขั้นตอนการจ่ายเงินก็ง่ายและปลอดภัยครับ",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=3"
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Customer Voice</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            เสียงตอบรับจาก <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ลูกค้าของเรา</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl transition-all duration-500 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-slate-100 text-6xl group-hover:text-blue-50 transition-colors duration-500">
                <i className="fas fa-quote-right"></i>
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-6 text-orange-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-sm"></i>
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed italic mb-8 text-lg">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-100 p-0.5">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black tracking-tight">{review.name}</h4>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">{review.car}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Rating Summary */}
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
    </section>
  );
};

export default Reviews;
