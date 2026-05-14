import React from 'react';
import Button from '../Button';

const SuccessStep = () => {
  return (
    <div className="py-12 animate-fade-in text-center">
      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-xl mx-auto border border-green-100 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-xl shadow-green-100 animate-bounce-subtle">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">ส่งข้อมูลสำเร็จ!</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            เจ้าหน้าที่ได้รับข้อมูลของคุณแล้ว และจะรีบดำเนินการตรวจสอบเพื่อนำเสนอ 
            <span className="text-blue-600 font-bold"> "เบี้ยประกันที่คุ้มค่าที่สุด" </span> 
            ให้คุณทางโทรศัพท์โดยเร็วที่สุดครับ
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="primary" 
            className="w-full py-5 text-xl font-bold rounded-2xl shadow-2xl shadow-blue-200"
          >
            กลับสู่หน้าแรก
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
