import {Card, Button, Col} from 'react-bootstrap'
import productImage from '../images/img-placeholder.jpg'

const POSProductCard = ({product, addToCart}) => {
    const handleConfirm = () =>{
        addToCart(product)
    }

    return ( 
        <Col xs={4} className='mb-2'>
            <Card style={{width: '12rem', maxHeight: '17rem', minHeight: '17rem'}}>
                <Card.Img variant='top' src={productImage}/>
                <Card.Body>
                    <div className='mb-3'>
                        <Card.Title className='mb-0'>{product.name}</Card.Title>
                        <small className='text-muted fw-semibold mb-2'>{product.stock} left</small>
                        <p className='mt-2 fw-light'>₱ {product.price}.00</p>
                    </div>
                    <div className="d-grid gap-1">
                        <Button variant='success' onClick={handleConfirm}>Add</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
     );
}
 
export default POSProductCard;