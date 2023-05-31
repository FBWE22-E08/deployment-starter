import React, { useEffect, useState } from 'react'
import axios from '../../util/axiosInstance';
import { Product } from '../../components/Product/Product';

export const ProductView = () => {

  const [listProducts, setListProducts] = useState([]);  

  const getProducts = async() => {
    try {
        const res = await axios.get('/api/products/list');
        setListProducts(res.data); 
    } catch (error) {
        console.error("there was an error", error)
    }
  }

  useEffect(() => {
    console.log("loading data");
    getProducts();
  },[])

  return (
    <div className='container'>
        <div className='row'>
            {listProducts.map((product) => (
                  <div className='col-6' key={product._id}>
                    <Product product={product} />
                  </div>
            ))}
        </div>
    </div>
  )
}
