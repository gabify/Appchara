import {Card, Button} from 'react-bootstrap'

const POSProductCard = ({product, addToCart}) => {
    const handleConfirm = () =>{
        addToCart(product)
    }

    return ( 
        <div className="col col-4 mb-3">
            <Card>
                <Card.Body>
                    <div className="">
                        <div className='mb-3'>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Subtitle>Stock: {product.stock}</Card.Subtitle>
                            <span className='mt-2'>{product.price}.00 php</span>
                        </div>
                        <div className="d-grid gap-1">
                            <Button variant='success' onClick={handleConfirm}>Add</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default POSProductCard;