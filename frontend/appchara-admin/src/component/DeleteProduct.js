import { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useProductContext } from '../hooks/useProductContext'
import { useAuthContext } from '../hooks/useAuthContext'

const DeleteProduct = ({productId, showDelete, handleCloseDelete}) => {
    const id = productId
    const {dispatch} = useProductContext()
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    const handleDelete = async() =>{
        const response = await fetch(`http://127.0.0.1:5000/api/v1/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization" : `Bearer ${user.token}`
            },
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            console.log(error)
        }else{
            console.log("Product deleted")
            handleCloseDelete()
            dispatch({type: 'DELETE_PRODUCT', payload: result})
        }
    }
    
    return ( 
        <div className="delete-product">
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-warning'>
                        Warning 
                        <i className="bi bi-exclamation-triangle-fill ms-2"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='my-3'>
                    <div className="text-center">
                        <h5 className='fw-bold'>Are you sure you want to delete this product?</h5>
                        <small className="fw-light">Deleting this product cannot be undone</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancel
                        </Button>

                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default DeleteProduct;