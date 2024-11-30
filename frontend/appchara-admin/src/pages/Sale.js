import {useEffect, useState} from 'react'
import {useProductContext} from '../hooks/useProductContext'
import POSProductCard from '../component/POSProductCard'
import CartItem from '../component/CartItem'

const Sale = () => {
    const {products, dispatch} = useProductContext()
    const [cart, setCart] = useState([])
    const [productId, setProductId] = useState(0)

    const addToCart = (product) =>{
        let id = productId
        setCart([...cart, {id: id++, product, quantity:0}])
        setProductId(id)
    }

    useEffect(() =>{
        const fetchProduct = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/')
            const result = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PRODUCTS', payload: result})
            }
        }

        fetchProduct()
    }, [dispatch])


    return ( 
        <div className="sale">
            <div className="px-5 py-2">
                <div className="row">
                    <div className="col col-8">
                        <h1 className="h4 mb-3">Select Product</h1>
                        <div className="row">
                            {products && products.map((product) =>(
                                <POSProductCard 
                                    product={product} 
                                    key={product._id} 
                                    addToCart={addToCart}/>
                            ))}
                            
                        </div>
                    </div>
                    <div className="col col-4" style={{overflowY: "auto", maxHeight: "500px"}}>
                        {cart.map((cartItem) =>(
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Sale;