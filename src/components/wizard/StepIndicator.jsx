import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { num: 1, title: 'ยี่ห้อรถ' },
    { num: 2, title: 'ข้อมูลรถ' },
    { num: 3, title: 'ข้อมูลติดต่อ' }
  ];

  // Calculate progress width - starts at 10% even at step 1 for visibility
  const progressWidth = Math.max(10, ((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="max-w-2xl mx-auto mb-20 px-4">
      {/* Top Completion Bar */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full mb-10 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
          <span className="text-[10px] font-bold text-blue-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Step Connection Line Background */}
        <div className="absolute top-5 left-0 w-full h-[3px] bg-slate-200/50 rounded-full z-0"></div>
        
        {/* Active Step Connection Line */}
        <div 
          className="absolute top-5 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400 z-0 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progressWidth}%` }}
        ></div>

        {steps.map((step) => {
          const isActive = currentStep >= step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center">
              {/* Circle Wrapper for scale effect */}
              <div className={`transition-all duration-500 ${isCurrent ? 'scale-110' : 'scale-100'}`}>
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 shadow-xl
                    ${isActive 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                    }
                  `}
                >
                  {isActive && currentStep > step.num ? (
                    <i className="fas fa-check text-lg"></i>
                  ) : (
                    <span className="text-lg">{step.num}</span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-14 whitespace-nowrap text-center">
                <span className={`text-[13px] font-black uppercase tracking-wide transition-all duration-500
                  ${isActive ? 'text-blue-700' : 'text-slate-400'}
                `}>
                  {step.title}
                </span>
                {isCurrent && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1 animate-ping"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
