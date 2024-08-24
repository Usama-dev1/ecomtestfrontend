import React from 'react'
import { useParams } from 'react-router-dom'
import { dummyProducts } from '../products/products'
import Singlecard from './Singlecard'
const Singleproduct = () => {
const {id}=useParams()
const product = dummyProducts.filter((p) => p.id === parseInt(id));
console.log(product)
    return (
      <>
        {product.map((p) => (
          <div key={p.id}>
            <Singlecard product={p}/>
          </div>
        ))}
      </>
    );
}

export default Singleproduct