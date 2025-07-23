import React from 'react'

function Button({
  children,
  className= "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-2 py-1 bg-indigo-900 text-white rounded hover:bg-purple-900 transition shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button