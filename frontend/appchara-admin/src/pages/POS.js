import {useEffect, useState} from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
import {useProductContext} from '../hooks/useProductContext'
import POSProductCard from '../component/POSProductCard'
import CartItem from '../component/CartItem'
import CartFooter from '../component/CartFooter'

const POS = () => {
    const {products, dispatch} = useProductContext()
    const [cart, setCart] = useState([])
    const [productId, setProductId] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountedPrice, setDiscountedPrice] = useState(0)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)

    const handleShow = () =>{
        setShow(true)
    }

    const handleClose = () =>{
        setShow(false)
    }

    const addToCart = (product) =>{
        if(product.stock <= 0){
            console.log('Not enough stock')
            //Add error message
        }else{
            let id = productId
            const cartItem = {id, product, quantity:1, price: product.price}
            setProductId(id + 1)

            const newCart = [...cart, cartItem]
            setCart(newCart)

            product.stock -= 1
            dispatch({type: 'UPDATE_PRODUCT', payload: product})

            const newTotal = newCart.reduce((sum, item) => sum + item.price, 0);
            const newDiscountedPrice = newTotal * discount
            const newTotalPrice = newTotal - discountedPrice 
            setSubtotal(newTotal)
            setDiscountedPrice(newDiscountedPrice)
            setTotalPrice(newTotalPrice);
        }
    }

    const removeToCart = (id) =>{
        const newCart = cart.filter((cartItem) => cartItem.id !== id)
        setCart(newCart)
        let total = subtotal
        cart.map(cartItem =>{
            if(cartItem.id === id){
                total -= cartItem.price

                cartItem.product.stock += cartItem.quantity
                dispatch({type: 'UPDATE_PRODUCT', payload: cartItem.product})
            }

            return cartItem
        })
        const newDiscountedPrice = total * discount
        const newTotalPrice = total - discountedPrice 
        setSubtotal(total)
        setDiscountedPrice(newDiscountedPrice)
        if(newTotalPrice <= 0){
            setTotalPrice(0)
        }else{
            setTotalPrice(newTotalPrice);
        }
    }

    const addQuantity = (id) =>{
        const newCart = cart.map(cartItem =>{
            if(cartItem.id === id){
                if(cartItem.product.stock <= 0){
                    console.log('Not enough stocks')
                    //add error message
                }else{
                    cartItem.quantity += 1
                    cartItem.price = cartItem.product.price * cartItem.quantity
                    
                    cartItem.product.stock -= 1
                    dispatch({type: 'UPDATE_PRODUCT', payload: cartItem.product})
                }
            }

            return cartItem
        })

        setCart(newCart)

        const newTotal = newCart.reduce((sum, item) => sum + item.price, 0);
        const newDiscountedPrice = newTotal * discount
        const newTotalPrice = newTotal - discountedPrice 
        setSubtotal(newTotal)
        setDiscountedPrice(newDiscountedPrice)
        setTotalPrice(newTotalPrice);
        
    }

    const reduceQuantity = (id) =>{
        const newCart = cart.map(cartItem =>{
            if(cartItem.id === id && cartItem.quantity > 1){
                cartItem.quantity -= 1
                cartItem.price = cartItem.product.price * cartItem.quantity
                cartItem.product.stock += 1
                dispatch({type: 'UPDATE_PRODUCT', payload: cartItem.product})
            }

            return cartItem
        })

        setCart(newCart)

        const newTotal = newCart.reduce((sum, item) => sum + item.price, 0);
        const newDiscountedPrice = newTotal * discount
        const newTotalPrice = newTotal - discountedPrice 
        setSubtotal(newTotal)
        setDiscountedPrice(newDiscountedPrice)
        setTotalPrice(newTotalPrice);
    }

    const handleCheckOut = async() =>{
        const sales = cart.map(({id, product, price, ...rest}) => ({
            product_id:product._id,
            sale_per_item: price,
            ...rest
        }))
        const sale = {sales, total_sale: totalPrice}
        console.log(sale)
        const response = await fetch('http://127.0.0.1:5000/api/v1/sale/new', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sale)
        })
        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(error)
        }else{
            setCart([])
            setTotalPrice(0)
            handleShow()
            //Add alert that the transaction is complete
        }
    }

    const handleClear = () =>{
        setCart([])
        setSubtotal(0)
        setTotalPrice(0)
        setDiscountedPrice(0)
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
            <div className="px-3">
                <div className="row">
                    <div className="col col-8 ps-5 pt-2">
                        <div className="row mt-3">
                            {products && products.map((product) =>(
                                <POSProductCard 
                                    product={product} 
                                    key={product._id} 
                                    addToCart={addToCart}/>
                            ))}
                            
                        </div>
                    </div>
                    <div className="col col-4 py-2 px-3" style={{backgroundColor: '#dcdde1'}}>
                        <div style={{overflowY: "auto", height: "300px"}}>
                            {cart.map((cartItem) =>(
                                <CartItem 
                                    key={cartItem.id} 
                                    cartItem={cartItem} 
                                    deleteItem={removeToCart}
                                    addQuantity = {addQuantity}
                                    reduceQuantity={reduceQuantity} />
                            ))}
                        </div>
                        <CartFooter 
                            handleCheckOut={handleCheckOut} 
                            handleClear={handleClear} 
                            subtotal={subtotal}
                            setTotalPrice={setTotalPrice}
                            totalPrice={totalPrice}
                            discount={discount}
                            discountedPrice={discountedPrice}
                            setDiscount={setDiscount}
                            setDiscountedPrice={setDiscountedPrice}
                        />
                    </div>
                </div>

                <ToastContainer className='p-3' position='bottom-end' style={{zIndex: 1}}>
                    <Toast show={show} onClose={handleClose} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Success</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body>Transaction complete!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </div>
     );
}
 
export default POS;