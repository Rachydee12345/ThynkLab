
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  fullWidth = true,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 overflow-hidden";
  
  const variants = {
    primary: "bg-thynk-gradient text-white shadow-xl shadow-purple-200 hover:shadow-purple-300 hover:brightness-110",
    secondary: "bg-thynk-black text-white hover:bg-gray-800",
    outline: "bg-transparent border-2 border-gray-100 text-gray-700 hover:border-thynk-purple hover:text-thynk-purple",
    social: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
