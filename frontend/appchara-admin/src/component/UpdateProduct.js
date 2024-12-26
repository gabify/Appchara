import { useState } from "react";
import {Modal, Button, Form, Spinner, InputGroup, ProgressBar} from 'react-bootstrap'
import {useProductContext} from '../hooks/useProductContext'

const UpdateProduct = ({product, showEdit, handleCloseEdit}) => {
    const {dispatch} = useProductContext()
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(product.description);
    const [error, setError] = useState(null)
    const id = product._id

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)

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
            setIsLoading(false)
            setError(result.error)
            console.log(error)
        }else{
            setIsLoading(false)
            setError(null)
            handleCloseEdit()
            console.log("Product Updated")
            dispatch({type: 'UPDATE_PRODUCT', payload: result})
        }
    }
    
    
    return ( 
        <div className="edit-product">
            <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-basket-fill"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <h5 className="fw-semibold mb-0">Update the details of <span className="text-success">{product.name}</span></h5>
                    <small className="fw-light text-muted">Enter new product details</small>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="my-2" controlId="productForm.name">
                        <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Product Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                                style={{fontSize: '0.99rem'}}
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="productForm.description">
                            <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Product Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3} 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description}
                                style={{fontSize: '0.99rem'}}
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
                                <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Current Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">₱</InputGroup.Text>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        value={price}
                                        style={{fontSize: '0.99rem'}}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="productForm.stock">
                                <Form.Label className="fw-semibold mb-0" style={{fontSize:'0.94rem'}}>Current Stock</Form.Label>                             
                                <Form.Control 
                                    type="number" 
                                    onChange={(e) => setStock(e.target.value)} 
                                    value={stock}
                                    style={{fontSize: '0.99rem'}}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="d-grid gap-2 mx-auto">
                            {isLoading ? (
                                <Button type="submit" value="submit" variant="success" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                </Button>) :(
                                <Button type="submit" value="submit" variant="success">
                                    Confirm
                                </Button>
                            )}
                            <Button variant="outline-secondary" onClick={handleCloseEdit}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
     );
}
 
export default UpdateProduct;