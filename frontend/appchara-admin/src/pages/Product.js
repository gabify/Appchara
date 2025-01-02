import { Row, Col, Container, Spinner } from 'react-bootstrap'
import {useProductContext} from '../hooks/useProductContext'

import ProductForm from '../component/ProductForm'
import ProductCard from '../component/ProductCard'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'


const Product = () => {
    const {products, dispatch} = useProductContext()
    const {data, isLoading, error} = useFetch('http://127.0.0.1:5000/api/v1/product/')

    useEffect(() =>{
        if(data){
            dispatch({type: 'SET_PRODUCTS', payload: data})
        }
    }, [data, dispatch])

    return ( 
        <div className="product my-4">
            <div className="px-5 py-2">
                {isLoading && (
                     <Spinner variant='success' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}

                {error && (
                    <div className="text-center">
                        {error}
                    </div>
                )}

                {products && (
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
                )}
            </div>
        </div>
     );
}
 
export default Product;