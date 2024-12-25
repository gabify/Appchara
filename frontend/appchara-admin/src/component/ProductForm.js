import { useState } from "react";
import {Modal, Button, Form, Card, InputGroup, Spinner} from 'react-bootstrap'
import { useProductContext } from "../hooks/useProductContext";

const ProductForm = () => {
    const {dispatch} = useProductContext()

    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null)
    const [show, setShow] =useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)

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
            setIsLoading(false)
            console.log(error)
        }else{
            setError(null)
            setIsLoading(false)
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
                    <Modal.Title><i className="bi bi-basket-fill"></i></Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="px-4">
                        <h5 className="fw-semibold mb-0">Create New Product</h5>
                        <small className="fw-light text-muted">Enter Product Details</small>
                        <Form.Group className="mb-2 mt-3" controlId="productForm.name">
                            <Form.Label className="fw-semibold" style={{fontSize:'0.94rem'}}>Product Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                                placeholder="What is the name of the product?"
                                style={{fontSize: '0.99rem'}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="productForm.description">
                            <Form.Label className="fw-semibold" style={{fontSize:'0.94rem'}}>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description}
                                placeholder="Provide some information about the product..."
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className="fw-semibold" style={{fontSize:'0.94rem'}}>Product Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Form.Group className="me-2" controlId="productForm.price">
                                <Form.Label className="fw-semibold" style={{fontSize:'0.94rem'}}>Product Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">₱</InputGroup.Text>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        value={price}
                                        placeholder="Initial product price"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="productForm.stock">
                                <Form.Label className="fw-semibold" style={{fontSize:'0.94rem'}}>Product Stock</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    onChange={(e) => setStock(e.target.value)} 
                                    value={stock}
                                    placeholder="Initial product stock"
                                />
                            </Form.Group>
                        </div>

                        <div className="d-grid gap-2 mx-auto">
                            <Button type="submit" value="submit" variant="success">
                                {isLoading ? (<Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />) : 'Confirm'}
                            </Button>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
     );
}
 
export default ProductForm;