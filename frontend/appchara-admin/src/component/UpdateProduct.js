import { useState } from "react";
import {Modal, Button, Form} from 'react-bootstrap'

const UpdateProduct = ({product, showEdit, handleCloseEdit}) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    const [error, setError] = useState(null)
    const id = product._id

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const product = {name, price, stock, description}

        const response = await fetch(`http://127.0.0.1:5000/api/v1/product/${id}`, {
            method: "PATCH",
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(error)
        }else{
            setError(null)
            setName('')
            setPrice('')
            setStock('')
            setDescription('')
            handleCloseEdit()
            console.log("Product Updated")
        }
    }
    
    
    return ( 
        <div className="edit-product">
            <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update product</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="productForm.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productForm.price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" onChange={(e) => setPrice(e.target.value)} value={price}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productForm.stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" onChange={(e) => setStock(e.target.value)} value={stock}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productForm.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)} value={description}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Cancel
                        </Button>

                        <Button type="submit" value="submit" variant="success">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
     );
}
 
export default UpdateProduct;