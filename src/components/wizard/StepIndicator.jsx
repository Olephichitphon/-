import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div className="flex items-center justify-between mb-12 relative px-4 max-w-md mx-auto">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
        <div 
          key={num}
          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-sm
            ${currentStep >= num 
              ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
              : 'bg-white text-slate-300 border border-slate-100'}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
