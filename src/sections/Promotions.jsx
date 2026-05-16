import React from 'react';

const promotions = [
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
  return (
    <section id="promotions" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -ml-48 -mb-48 opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Special Offers</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            โปรโมชั่นพิเศษ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">สำหรับคุณ</span>
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Promo Gradient Top Bar */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${promo.color}`}></div>

              {/* Badge */}
              <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${promo.color} text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg ${promo.shadow}`}>
                {promo.badge}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <i className={`fas ${promo.icon} text-2xl text-slate-700`}></i>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                {promo.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed mb-8">
                {promo.description}
              </p>

              <button className="flex items-center gap-2 text-slate-900 font-bold group/btn">
                <span>รายละเอียดเพิ่มเติม</span>
                <i className="fas fa-arrow-right text-xs transform group-hover/btn:translate-x-2 transition-transform"></i>
              </button>

              {/* Decorative Circle Background */}
              <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${promo.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 px-8 py-4 bg-slate-50 rounded-3xl border border-slate-100">
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
    </section>
  );
};

export default Promotions;
