import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-800 pb-8 mb-8">
          <div className="text-2xl font-bold text-white">
            Insurance<span className="text-blue-500">Check</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition">หน้าแรก</a>
            <a href="#check-premium" className="hover:text-white transition">เช็คเบี้ย</a>
            <a href="#plans" className="hover:text-white transition">แผนประกัน</a>
            <a href="#" className="hover:text-white transition">เกี่ยวกับเรา</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 InsuranceCheck. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">นโยบายความเป็นส่วนตัว</a>
            <a href="#">ข้อตกลงการใช้งาน</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
