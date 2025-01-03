import { Button, Form, Spinner } from "react-bootstrap";

const CartFooter = ({handleCheckOut, handleClear, discount, setDiscount, duePayment, setDuePayment, isEmpty, isLoading}) => {

    return ( 
        <div className="mt-4">
            <hr />
            <Form.Select 
                aria-label="Vouchers" 
                size="sm" 
                className="mb-3"
                
                onChange={(e) => setDiscount(parseFloat(e.target.value))}>
                <option value="0">Select Voucher</option>
                <option value=".1">First time buyer discount</option>
                <option value=".3">Suki discount</option>
                <option value=".2">Friends and family discount</option>
            </Form.Select>
            <div className="d-flex justify-content-between">
                <small>Subtotal:</small>
                <small className="fw-bold">₱ {duePayment.subtotal.toFixed(2)}</small>
            </div>
            <div className="d-flex justify-content-between">
                <small>Discount ({discount * 100}%):</small>
                <small className="">- {duePayment.discountedPrice.toFixed(2)} </small>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <small>Total:</small>
                <small className="fw-bold fs-6">₱ {duePayment.total.toFixed(2)}</small>
            </div>
            <div className="d-grid">
                <Button 
                    variant="success" 
                    className="mb-2" 
                    disabled={isEmpty || isLoading}
                    onClick={handleCheckOut}
                >
                    {isLoading ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : 'Checkout'}
                </Button>
                <Button 
                    variant="danger"
                    disabled={isEmpty || isLoading}
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </div>
        </div>
     );
}
 
export default CartFooter;