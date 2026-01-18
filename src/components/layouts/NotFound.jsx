import React from 'react'

const NotFound = (params) => {
  return (
    <div style={{fontWeight:"40px",color:"red",textAlign:"center",marginTop:"100px"}}>the product with name ''{params.keyword}'' not found</div>
  )
}

export default NotFound;