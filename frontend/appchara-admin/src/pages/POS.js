import { useEffect, useState } from 'react'
import {Row, Toast, ToastContainer, Spinner} from 'react-bootstrap'
import {useProductContext} from '../hooks/useProductContext'
import POSProductCard from '../component/POSProductCard'
import CartItem from '../component/CartItem'
import CartFooter from '../component/CartFooter'
import useFetch from '../hooks/useFetch'

const POS = () => {
    const {data, isLoading, error: productError} = useFetch('http://127.0.0.1:5000/api/v1/product/')
    const {products, dispatch} = useProductContext()
    const [cart, setCart] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const [productId, setProductId] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [duePayment, setDuePayment] = useState({
        subtotal: 0,
        total: 0,
        discountedPrice: 0
    })

    useEffect(() =>{
        if(data){
            dispatch({type: 'SET_PRODUCTS', payload: data})
        }
    }, [data, dispatch])

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
            setIsEmpty(false)

            product.stock -= 1
            dispatch({type: 'UPDATE_PRODUCT', payload: product})

            const newTotal = newCart.reduce((sum, item) => sum + item.price, 0);
            const newDiscountedPrice = newTotal * discount
            const newTotalPrice = newTotal - newDiscountedPrice 
            setDuePayment({
                subtotal: newTotal,
                discountedPrice: newDiscountedPrice,
                total: newTotalPrice
            })
        }
    }

    const removeToCart = (id) =>{
        const newCart = cart.filter((cartItem) => cartItem.id !== id)
        setCart(newCart)
        let total = duePayment.subtotal
        cart.map(cartItem =>{
            if(cartItem.id === id){
                total -= cartItem.price

                cartItem.product.stock += cartItem.quantity
                dispatch({type: 'UPDATE_PRODUCT', payload: cartItem.product})
            }

            return cartItem
        })
        if(cart.length === 0){
            setIsEmpty(true)
        }

        const newDiscountedPrice = total * discount
        const newTotalPrice = total - newDiscountedPrice
        setDuePayment({
            subtotal: total,
            discountedPrice: newDiscountedPrice,
            total: newTotalPrice <= 0 ? 0: newTotalPrice
        })
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
        const newTotalPrice = newTotal - newDiscountedPrice
        setDuePayment({
            subtotal: newTotal,
            discountedPrice: newDiscountedPrice,
            total: newTotalPrice
        }) 
        
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
        const newTotalPrice = newTotal - newDiscountedPrice 
        setDuePayment({
            subtotal: newTotal,
            discountedPrice: newDiscountedPrice,
            total: newTotalPrice
        })
    }

    const handleCheckOut = async() =>{
        const sales = cart.map(({id, product, price, ...rest}) => ({
            product:product._id,
            sale_per_item: price,
            ...rest
        }))
        const sale = {sales, total_sale: duePayment.total}
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
            setDiscount(0)
            setDuePayment({
                subtotal: 0,
                discountedPrice: 0,
                total: 0
            })
            handleShow()
            setIsEmpty(true)
            //Add alert that the transaction is complete
        }
    }

    const handleClear = () =>{ 
        cart.map(cartItem =>{
            cartItem.product.stock += cartItem.quantity
            dispatch({type: 'UPDATE_PRODUCT', payload: cartItem.product})

            return cartItem
        })
        setCart([])
        setDuePayment({
            subtotal: 0,
            discountedPrice: 0,
            total: 0
        })
        setDiscount(0)
        setIsEmpty(true)
    }
    return ( 
        <div className="sale">
            <div className="px-3">
                <div className="row">
                    <div className="col col-8 ps-5 pt-2">
                        {isLoading && (
                            <Spinner variant='success' animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}

                        {productError && (
                            <div className="text-center">
                                {error}
                            </div>
                        )}
                        {products && (
                            <Row className='mt-3'>
                                {products && products.map((product) =>(
                                    <POSProductCard 
                                        product={product} 
                                        key={product._id} 
                                        addToCart={addToCart}/>
                                ))}
                                
                            </Row>
                        )}
                    </div>
                    <div className="col col-4 py-2 px-3" style={{backgroundColor: '#dcdde1'}}>
                        <div style={{overflowY: "auto", height: "306px"}}>
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
                            discount={discount}
                            setDiscount={setDiscount}
                            duePayment={duePayment}
                            setDuePayment={setDuePayment}
                            isEmpty={isEmpty}
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