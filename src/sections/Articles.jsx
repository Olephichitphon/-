import React from 'react';

const articles = [
  {
    id: 1,
    title: "5 วิธีเลือกประกันรถยนต์ให้คุ้มค่าที่สุดในปี 2024",
    excerpt: "รวมเทคนิคการเลือกแผนประกันที่ช่วยให้คุณประหยัดเงินในกระเป๋า แต่ยังคงได้รับการคุ้มครองที่ครอบคลุม...",
    date: "12 May 2024",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "ประกันชั้น 1 กับ 2+ ต่างกันอย่างไร? เลือกแบบไหนดี",
    excerpt: "ไขข้อข้องใจความแตกต่างระหว่างประกันแต่ละประเภท เพื่อให้คุณตัดสินใจเลือกสิ่งที่เหมาะกับรถคุณมากที่สุด...",
    date: "10 May 2024",
    category: "Knowledge",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "ขั้นตอนการเคลมประกันเมื่อเกิดอุบัติเหตุ ต้องทำอย่างไรบ้าง",
    excerpt: "คู่มือฉบับย่อสำหรับการเตรียมตัวเมื่อเกิดเหตุไม่คาดฝัน ช่วยให้การเคลมของคุณราบรื่นและรวดเร็วขึ้น...",
    date: "08 May 2024",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const Articles = () => {
  return (
    <section id="articles" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h4 className="text-emerald-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Latest Insights</h4>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-0">
              บทความและ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">สาระน่ารู้</span>
            </h2>
          </div>
          <button className="px-8 py-3 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3">
            ดูบทความทั้งหมด <i className="fas fa-arrow-right text-xs"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl shadow-slate-100">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">
                  <i className="far fa-calendar"></i>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span>Read Full Article</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
