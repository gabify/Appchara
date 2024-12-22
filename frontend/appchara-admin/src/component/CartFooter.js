import { Button, Form } from "react-bootstrap";

const CartFooter = ({handleCheckOut, handleClear, discount, setDiscount, duePayment, setDuePayment}) => {
    const handleDiscount = (e) =>{
        const selectedDiscount = parseFloat(e.target.value)
        const newDiscountedPrice = duePayment.subtotal * (selectedDiscount)
        const newTotalPrice = duePayment.subtotal - newDiscountedPrice 
        setDiscount(selectedDiscount)
        setDuePayment({
            subtotal: duePayment.subtotal,
            discountedPrice: newDiscountedPrice,
            total: newTotalPrice
        })
    }
    
    return ( 
        <div className="mt-4">
            <hr />
            <Form.Select 
                aria-label="Vouchers" 
                size="sm" 
                className="mb-3"
                
                onChange={handleDiscount}>
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
                <Button variant="success" className="mb-2" onClick={handleCheckOut}>Checkout</Button>
                <Button variant="danger" onClick={handleClear}>Clear</Button>
            </div>
        </div>
     );
}
 
export default CartFooter;