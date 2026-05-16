import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side: Contact Info */}
          <div>
            <h4 className="text-blue-400 font-black uppercase tracking-[0.3em] text-sm mb-6">Get in Touch</h4>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              ปรึกษาเรื่อง <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ประกันภัยฟรี</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-12 max-w-md">
              เรามีทีมผู้เชี่ยวชาญพร้อมให้คำแนะนำคุณในทุกขั้นตอน เพื่อให้คุณได้รับความคุ้มครองที่ดีที่สุด
            </p>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                  <i className="fas fa-phone-alt text-2xl group-hover:scale-110 transition-transform"></i>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">สายด่วน 24 ชม.</p>
                  <p className="text-2xl font-black tracking-tight">02-123-4567</p>
                </div>
              </div>

              {/* Line */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00B900] transition-colors duration-500">
                  <i className="fab fa-line text-3xl group-hover:scale-110 transition-transform"></i>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">LINE Official</p>
                  <p className="text-2xl font-black tracking-tight">@fairdee_pongsakorn</p>
                </div>
              </div>

              {/* Email/Location */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500">
                  <i className="fas fa-envelope text-2xl group-hover:scale-110 transition-transform"></i>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">อีเมลติดต่อ</p>
                  <p className="text-2xl font-black tracking-tight">info@fairdee.com</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-6">
              <div className="h-px w-12 bg-white/20"></div>
              <div className="flex gap-6">
                <i className="fab fa-facebook-f text-xl text-white/40 hover:text-blue-500 cursor-pointer transition-colors"></i>
                <i className="fab fa-instagram text-xl text-white/40 hover:text-pink-500 cursor-pointer transition-colors"></i>
                <i className="fab fa-youtube text-xl text-white/40 hover:text-red-500 cursor-pointer transition-colors"></i>
              </div>
            </div>
          </div>

          {/* Right Side: Map/Visual Card */}
          <div className="relative h-full flex items-center">
            <div className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[3rem] p-1 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden">
               <div className="bg-slate-800 rounded-[2.8rem] overflow-hidden aspect-square md:aspect-auto md:h-[600px] relative">
                  {/* Map Placeholder or Visual Representation */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                  
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                      <h5 className="text-xl font-bold mb-2">สำนักงานใหญ่ FairDee</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        123 อาคารสาทรทาวเวอร์ ชั้น 15 ถนนสาทรใต้ <br />
                        แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120
                      </p>
                      <button className="mt-6 text-blue-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        Open in Google Maps <i className="fas fa-external-link-alt"></i>
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
