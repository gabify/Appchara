import {useEffect, useState} from 'react'

import ProductForm from '../component/ProductForm'
import ProductCard from '../component/ProductCard'


const Product = () => {
    const [products, setProduct] = useState(null)

    useEffect(() =>{
        const fetchProduct = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/')
            const result = await response.json()

            if(response.ok){
                setProduct(result)
            }
        }

        fetchProduct()
    }, [])


    return ( 
        <div className="product">
            <div className="px-5 py-2">
                <ProductForm/>
                <div className="row">
                    {products && products.map((product) =>(
                        <ProductCard product={product} key={product._id}/>
                    ))}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Product;