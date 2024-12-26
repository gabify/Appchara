import {Modal, Button, Table} from 'react-bootstrap'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const OrderDetails = ({order, showDetails, handleCloseDetails, handleComplete, handleCancel, error, setError}) => {
    const currentOrder = order

    return ( 
        <div className='order-details'>
            <Modal show={showDetails} onHide={handleCloseDetails} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-cart-fill"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='fw-bold mb-0'>Order Details</h5>
                    <span className='fw-light text-muted'>What do you want to do with this order?</span>
                    <div className="mb-2 mt-3">
                        <p className='fw-semibold mb-0'>Order number</p>
                        <p className="fw-light">#{order._id}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className='fw-semibold mb-0'>Customer Name </p>
                            <p className="fw-light">{order.user.name}</p>
                        </div>
                        <div className>
                            <p className='fw-semibold mb-0'>Date Ordered </p>
                            <p className="fw-light">
                                {order.createdAt} 
                                <span className='ms-1 fw-bold'>
                                    ({formatDistanceToNow(new Date(order.createdAt), {addSuffix: true})})
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className>
                        <p className='fw-semibold mb-0'>Status</p>
                        <p className="fw-light">{order.status}</p>
                    </div>
                    <hr />
                    <Table borderless hover size='sm' className='px-5'>
                        <thead>
                            <tr className='text-center'>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.orders.map((item) =>(
                                <tr key={item._id} className='text-center'>
                                    <td>{item.product.name}</td>
                                    <td>x{item.quantity}</td>
                                    <td>₱{item.sale_per_item}.00</td>
                                </tr>
                            ))}
                            <tr className='border-top'>
                                <td colSpan={2} className='text-end'>Total:</td>
                                <td className='fw-bold text-center'>₱{order.total}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                {order.status === 'complete' || order.status === 'cancelled' ? (
                    <Modal.Footer>
                        <Button variant="danger" disabled>
                            Cancel
                        </Button>
                        <Button variant="success" disabled>
                            Complete
                        </Button>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleComplete}>
                            Complete
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
     );
}
 
export default OrderDetails;