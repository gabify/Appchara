import { useState } from "react";
import {Modal, Button, Form, Card} from 'react-bootstrap'
import { useProductContext } from "../hooks/useProductContext";

const ProductForm = () => {
    const {dispatch} = useProductContext()

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null)
    const [show, setShow] =useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const product = {name, price, stock, description}

        const response = await fetch('http://127.0.0.1:5000/api/v1/product/new', {
            method: "POST",
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
            handleClose()
            console.log("New product added")
            dispatch({type: 'CREATE_PRODUCT', payload: result})
        }
    }
    
    
    return ( 
        <div className="add-product">
            
            <Card 
                style={{
                    width: '18rem', 
                    maxHeight: '24rem', 
                    minHeight: '24rem',
                    cursor: 'pointer'
                }} 
                onClick={handleShow}
            >
                <Card.Body 
                    className='m-4' 
                    style={{
                        height: '100%', 
                        borderStyle: 'dashed', 
                        borderColor: '#dfe4ea'
                    }}
                >
                    <div className='position-relative'>
                        <i className="bi bi-plus" style={{fontSize: '12rem', color: '#dfe4ea'}}></i>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
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
                        <Button variant="secondary" onClick={handleClose}>
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
 
export default ProductForm;