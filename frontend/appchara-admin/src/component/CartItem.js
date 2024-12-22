import {Card} from 'react-bootstrap'

const CartItem = ({cartItem, deleteItem, addQuantity, reduceQuantity}) => {
    const handleDelete = () =>{
        deleteItem(cartItem.id)
    }

    const handleAddQuantity = () =>{
        addQuantity(cartItem.id)
    }

    const handleReduceQuantity = () =>{
        reduceQuantity(cartItem.id)
    }

    return ( 
        <div className="col col-12 mb-1">
            <Card>
                <Card.Body>
                    <div className='d-flex justify-content-between mb-2'>
                        <span className='fw-bold'>{cartItem.product.name}</span>
                        <span className='fw-bold'>₱ {cartItem.price}.00</span>
                        <div>
                            <i 
                                className="bi bi-x-circle-fill text-secondary" 
                                style={{cursor: "pointer"}}
                                onClick={handleDelete}></i>
                        </div>
                    </div>
                    <div className="d-flex">
                        <i className="bi bi-dash-circle-fill me-2" 
                            style={{cursor: "pointer"}}
                            onClick={handleReduceQuantity}></i>

                        <span className='fw-bold fs-6'>{cartItem.quantity}</span>
                        
                        <i className="bi bi-plus-circle-fill ms-2" 
                            style={{cursor: "pointer"}}
                            onClick={handleAddQuantity}></i>
                    </div>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default CartItem;