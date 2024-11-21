import {useEffect, useState} from 'react'

const Product = () => {
    const [products, setProduct] = useState(null)

    useEffect(() =>{
        const fetchProduct = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/all')
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
                <h1 className="mb-4">Products</h1>
                <div className="row">
                    {products && products.map((product) =>(
                        <div className="col col-12" key={product._id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title">{product.name}</h5>
                                            <h6 className="card-subtitle text-secondary">Stock: 100</h6>
                                        </div>
                                        <i className="bi bi-three-dots-vertical fs-5"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Product;