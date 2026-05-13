import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, error, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 border rounded-xl outline-none transition-all focus:ring-2 
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'}`}
      />
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
