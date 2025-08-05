import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
  label,
  type = "text",
  className = "",
  id,
  ...props    
}, ref){
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div>
      {label && (
        <label htmlFor={id} className='block mb-2 text-sm font-mediumitalic text-purple-900'>
        {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        className={`border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input;