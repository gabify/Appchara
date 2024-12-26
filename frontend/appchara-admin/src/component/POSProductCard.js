import {Card, Col} from 'react-bootstrap'
import productImage from '../images/img-placeholder.jpg'
import { useEffect, useState } from 'react'

const POSProductCard = ({product, addToCart}) => {
    const [stockLevel, setStockLevel] = useState({
        isEnough: true,
        opacity: ''
    })
    
    const handleConfirm = () =>{
        addToCart(product)
    }

    useEffect(() =>{
        setStockLevel(product.stock <= 0 ? {
            isEnough: false,
            opacity: 'opacity-50'
        }: {
            isEnough: true,
            opacity: ''
        })
    }, [product.stock])

    return ( 
        <Col xs={4} className='mb-2'>
            <Card 
                style={{width: '12rem', cursor: stockLevel.isEnough ? 'pointer' : 'default'}} 
                className='text-light'
                onClick={handleConfirm}
            > 
                <Card.Img 
                    src={productImage}
                    className={stockLevel.opacity}
                />
                <Card.ImgOverlay>
                    <div className='mb-3'>
                        <Card.Title className='mb-0'>{product.name}</Card.Title>
                        <small className='fw-semibold mb-2'>{product.stock} left</small>
                        <p className='mt-2 fw-bold text-light'>₱ {product.price}.00</p>
                    </div>
                </Card.ImgOverlay>
            </Card>
        </Col>
     );
}
 
export default POSProductCard;