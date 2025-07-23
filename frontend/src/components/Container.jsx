import React from 'react'
import { Children } from 'react'

function Container({ Children }) {
  return (
    <div className="container mx-auto px-4 py-8">
        {Children}
    </div>
  )
}

export default Container