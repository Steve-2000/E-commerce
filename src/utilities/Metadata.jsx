import React from 'react'
import { Helmet } from 'react-helmet-async'

const Metadata = ({title}) => {
  return (
    <Helmet><title>{`${title} - JVLcart`}</title></Helmet>
  )
}

export default Metadata