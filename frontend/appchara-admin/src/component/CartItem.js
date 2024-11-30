import {Card} from 'react-bootstrap'

const CartItem = ({cartItem}) => {
    return ( 
        <div className="col col-12 mb-1">
            <Card>
                <Card.Body>
                    <div>
                        <div className='mb-3'>
                            <Card.Title>{cartItem.product.name}</Card.Title>
                            <span className='mt-2'>{cartItem.product.price}.00 php</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default CartItem;