import { useState } from 'react'
import {Card, Col, Stack, Button} from 'react-bootstrap'

import UpdateProduct from '../component/UpdateProduct'
import DeleteProduct from './DeleteProduct'

import productLogo from '../images/img-placeholder.jpg'

const ProductCard = ({product}) => {
    const [showEdit, setShowEdit] =useState(false)
    const [showDelete, setShowDelete] =useState(false)

    const handleShowEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    
    const handleShowDelete = () => setShowDelete(true)
    const handleCloseDelte = () => setShowDelete(false)

    return ( 
        <Col className='mb-3' xs={4}>
            <Card style={{width: '18rem', maxHeight: '24rem', minHeight: '24rem'}}>
                <Card.Img variant='top' src={productLogo}/>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>{product.stock} left</Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Stack direction='horizontal' gap={2}>
                        <Button variant='warning' onClick={handleShowEdit}>Edit</Button>
                        <Button variant='danger' onClick={handleShowDelete}>Delete</Button>
                    </Stack>
                </Card.Body>
            </Card>

            <UpdateProduct product={product} showEdit={showEdit} handleCloseEdit={handleCloseEdit}/>
            <DeleteProduct productId={product._id} showDelete={showDelete} handleCloseDelete={handleCloseDelte} />
        </Col>
     );
}
 
export default ProductCard;