import { useState } from 'react'
import { Tab, Card, Nav, Spinner} from 'react-bootstrap'
import TabOrders from '../component/TabOrders'
import OrderBadge from '../component/OrderBadge'
import useFetch from '../hooks/useFetch'

const Order = () => {
    const [key, setKey] = useState('all')
    const {data:orders, isLoading, error} = useFetch('http://127.0.0.1:5000/api/v1/order/')

    return ( 
        <div className="orders">
            <div className="px-5 pt-4 pb-2">
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

                {orders && (
                    <Tab.Container
                    activeKey={key} 
                    onSelect={(k) => setKey(k)}
                    >
                        <Card>
                            <Card.Header>
                                <Nav variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all">
                                            <span className='fw-semibold text-dark'>
                                                All Orders 
                                                <OrderBadge orders={orders}/>
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="pending">
                                            <span className='fw-semibold text-dark'>
                                                Pending Orders 
                                                <OrderBadge orders={orders} status={"pending"}/>
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="complete">
                                            <span className='fw-semibold text-dark'>
                                                Completed Orders 
                                                <OrderBadge orders={orders} status={"complete"}/>
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="cancelled">
                                            <span className='fw-semibold text-dark'>
                                                Cancelled Orders 
                                                <OrderBadge orders={orders} status={"cancelled"}/>
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey='all'>
                                        <TabOrders orders={orders}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='pending'>
                                        <TabOrders orders={orders} status={'pending'}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='complete'>
                                        <TabOrders orders={orders} status={'complete'}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='cancelled'>
                                        <TabOrders orders={orders} status={'cancelled'}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                )}
            </div>
        </div>
     );
}
 
export default Order;