import { useState } from 'react'
import {Card} from 'react-bootstrap'

import UpdateProduct from '../component/UpdateProduct'
import DeleteProduct from './DeleteProduct'

const ProductCard = ({product}) => {
    const [showEdit, setShowEdit] =useState(false)
    const [showDelete, setShowDelete] =useState(false)

    const handleShowEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelte = () => setShowDelete(false)

    return ( 
        <div className="col col-12 mb-3">
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Subtitle>Stock: {product.stock}</Card.Subtitle>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <span className='me-2' style={{cursor: 'pointer'}} onClick={handleShowEdit}>EDIT</span>
                            <span className='text-danger' style={{cursor: 'pointer'}} onClick={handleShowDelete}>DELETE</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <UpdateProduct product={product} showEdit={showEdit} handleCloseEdit={handleCloseEdit}/>
            <DeleteProduct productId={product._id} showDelete={showDelete} handleCloseDelete={handleCloseDelte} />
        </div>
     );
}
 
export default ProductCard;