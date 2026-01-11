
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-thynk-purple transition-colors">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-white border-2 rounded-xl py-3 px-4 outline-none transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-400 focus:border-red-500 bg-red-50' 
              : 'border-gray-100 focus:border-thynk-purple focus:ring-4 focus:ring-purple-50'
            }
          `}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
};

export default Input;
