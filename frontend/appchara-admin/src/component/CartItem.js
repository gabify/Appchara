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
                    <div className='d-flex justify-content-between'>
                        <div>
                            <div className="mb-2">
                                <Card.Title>{cartItem.product.name}</Card.Title>
                                <span>{cartItem.price}.00 php</span>
                            </div>
                            <div className="d-flex justif-content-evenly">
                                <i className="bi bi-dash-circle-fill me-2" 
                                    style={{cursor: "pointer"}}
                                    onClick={handleReduceQuantity}></i>
                                <span>{cartItem.quantity}</span>
                                <i className="bi bi-plus-circle-fill ms-2" 
                                    style={{cursor: "pointer"}}
                                    onClick={handleAddQuantity}></i>
                            </div>
                        </div>
                        <div>
                            <i 
                                className="bi bi-trash3-fill text-danger" 
                                style={{cursor: "pointer"}}
                                onClick={handleDelete}></i>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default CartItem;