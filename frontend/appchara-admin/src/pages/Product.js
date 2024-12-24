import {useEffect} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import {useProductContext} from '../hooks/useProductContext'

import ProductForm from '../component/ProductForm'
import ProductCard from '../component/ProductCard'


const Product = () => {
    const {products, dispatch} = useProductContext()

    useEffect(() =>{
        const fetchProduct = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/')
            const result = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PRODUCTS', payload: result})
            }
        }

        fetchProduct()
    }, [dispatch])


    return ( 
        <div className="product my-4">
            <div className="px-5 py-2">
                <Container fluid>
                <Row>
                    <Col xs={4}>
                        <ProductForm/>
                    </Col>
                    {products && products.map((product) =>(
                        <ProductCard product={product} key={product._id}/>
                    ))}
                </Row>
                </Container>
            </div>
        </div>
     );
}
 
export default Product;