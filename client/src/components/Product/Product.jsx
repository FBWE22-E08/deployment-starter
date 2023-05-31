import React from 'react'

export const Product = ({product}) => {
  return (
    <>
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{product.productName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">price:{product.price}</h6>
    <p className="card-text">{product.productDescription}</p>
  </div>
</div>
    </>
  )
}
