import React from 'react';
import Button from '../Button';

const PlanSelectionStep = ({ loading, availablePlans, onSelectPlan, onPrev, nextStep }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">เลือกแผนประกันที่น่าสนใจ</h2>
        <p className="text-slate-500">เราคัดสรรแผนที่คุ้มค่าที่สุดมาให้คุณเลือกเบื้องต้น</p>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500">กำลังค้นหาแผนประกันที่ดีที่สุด...</p>
        </div>
      ) : availablePlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePlans.map((plan) => (
            <div key={plan._id} className="bg-white border-2 border-slate-50 rounded-3xl p-8 hover:border-blue-500 transition-all duration-500 group shadow-sm hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                {plan.logo ? (
                  <img src={plan.logo} alt={plan.companyName} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">{plan.companyName[0]}</div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900">{plan.companyName}</h3>
                  <span className="text-[10px] bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-bold uppercase">ชั้น {plan.planType === '1' ? '1' : plan.planType.replace('plus', '+')}</span>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-bold">เบี้ยประกันเริ่มต้น</p>
                <p className="text-3xl font-bold text-blue-600">{plan.premium?.toLocaleString() || '-'} <span className="text-sm font-normal text-slate-400">บาท/ปี</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.slice(0, 3).map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                    <span className="text-green-500 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span> 
                    {f}
                  </li>
                ))}
              </ul>
              <Button onClick={() => onSelectPlan(plan)} className="w-full py-4 rounded-2xl shadow-lg shadow-blue-50">สนใจแผนนี้</Button>
            </div>
          ))}
          
          {/* Request Agent Card */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-blue-300 transition-all duration-300 group">
            <div className="w-16 h-16 bg-white text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-all duration-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 mb-3 text-lg">ยังไม่มีที่ถูกใจ?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">ให้ผู้เชี่ยวชาญของเราช่วยคัดสรรแผนที่คุ้มค่าที่สุดให้คุณโดยเฉพาะ</p>
            <Button 
              onClick={() => onSelectPlan({ _id: 'custom_request', companyName: 'ขอให้เจ้าหน้าที่แนะนำแผนเพิ่มเติม' })} 
              variant="secondary" 
              className="w-full py-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl"
            >
              ให้เจ้าหน้าที่ติดต่อกลับ
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 mb-6 font-medium">ขออภัย ไม่พบแผนตัวอย่างที่ตรงกับข้อมูลของคุณในขณะนี้</p>
          <Button onClick={nextStep} variant="primary" className="py-4 px-8 rounded-2xl shadow-xl shadow-blue-100">ข้ามไปปรึกษาเจ้าหน้าที่โดยตรง</Button>
        </div>
      )}
      
      <div className="flex justify-center pt-8 border-t border-slate-50">
        <button onClick={onPrev} className="text-slate-400 font-bold hover:text-blue-600 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปแก้ไขข้อมูลรถ
        </button>
      </div>
    </div>
  );
};

export default PlanSelectionStep;
