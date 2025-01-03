import { useState } from "react";
import {Modal, Button, Form, Card, InputGroup, Spinner, ProgressBar} from 'react-bootstrap'
import { useProductContext } from "../hooks/useProductContext";
import {useSend} from "../hooks/useSend"

const ProductForm = () => {
    const {send, isLoading, error} = useSend()
    const {dispatch} = useProductContext()

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] =useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const product = {name, price, stock, description}

        const result = await send('http://127.0.0.1:5000/api/v1/product/new', product)
   
        if(result){
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
            <Modal 
                show={show} 
                onHide={handleClose} 
                backdrop="static" 
                keyboard={false} 
            >
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-basket-fill"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <h5 className="fw-semibold mb-0">Create New Product</h5>
                    <small className="fw-light text-muted">Enter Product Details</small>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="my-2" controlId="productForm.name">
                            <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Product Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                                placeholder="What is the name of the product?"
                                style={{fontSize: '0.99rem'}}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="productForm.description">
                            <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3} 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description}
                                placeholder="Provide some information about the product..."
                                required
                            />
                        </Form.Group>
                        <div className="mb-2">
                            <p className="mb-1 fw-semibold" style={{fontSize:'0.94rem'}}>
                                Upload Image
                                <small className="fw-light ms-1">(Optional)</small>
                            </p>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <input 
                                        type="file" 
                                        id="imageUpload" 
                                        className="upload" 
                                        accept=".jpg, .jpeg, .png"
                                        hidden
                                    />
                                    <label htmlFor="imageUpload" className="uploadLabel">
                                        <span className="mt-3">
                                            <i 
                                                className="bi bi-cloud-arrow-up-fill text-success"
                                                style={{fontSize: '30px'}}></i>
                                        </span>
                                        <p className="fw-semibold fs-6 text-success">Drag image here or browse</p>
                                    </label>
                                </div>
                                <div className="uploadedImage">
                                    <ProgressBar animated now={45} variant="success"/> {/* not showing, duuno why :( */}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <Form.Group className="me-2" controlId="productForm.price">
                                <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Product Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">₱</InputGroup.Text>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        value={price}
                                        placeholder="Initial product price"
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="productForm.stock">
                                <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Product Stock</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    onChange={(e) => setStock(e.target.value)} 
                                    value={stock}
                                    placeholder="Initial product stock"
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="d-grid gap-2 mx-auto">
                            <Button 
                                type="submit" 
                                value="submit" 
                                variant="success" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : 'Confirm'}
                            </Button>
                            
                            <Button variant="outline-secondary" onClick={handleClose} disabled={isLoading}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                    {error && (
                        <div>{error}</div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
     );
}
 
export default ProductForm;