import React from 'react';
import Button from '../components/Button';

const Hero = () => {
  const scrollToWizard = () => {
    document.getElementById('check-premium')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[100%] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[80%] rounded-full bg-blue-50/30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          เช็คเบี้ยประกันรถยนต์ <br />
          <span className="text-blue-600">รับใบเสนอราคาใน 1 นาที</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          เปรียบเทียบแผนประกันภัยชั้นนำที่คัดมาเพื่อคุณโดยเฉพาะ 
          กรอกข้อมูลง่ายๆ แล้วรอรับข้อเสนอที่ดีที่สุดได้เลย
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button onClick={scrollToWizard} variant="accent" className="text-lg px-10 py-4">
            เช็คเบี้ยเลยตอนนี้
          </Button>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            เชื่อถือได้ โดยผู้เชี่ยวชาญ
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
