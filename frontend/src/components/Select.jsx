import React,{forwardRef, useId} from 'react'


function Select({
  label,
  options,
  className,
  ...props
}, ref) {
  const id = useId()
  return (
    <div>
      {label && <label htmlFor={id} 
      className='block mb-2 text-sm font-medium text-purple-200'>{label}</label>}

      <select className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
      id={id}
      {...props}
      ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(Select)