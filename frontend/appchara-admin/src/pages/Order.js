import { useState, useEffect } from 'react'
import { Tab, Card, Nav } from 'react-bootstrap'
import TabOrders from '../component/TabOrders'
import OrderBadge from '../component/OrderBadge'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [key, setKey] = useState('all')

    useEffect(() =>{
        const fetchOrder = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/order/')
            const result = await response.json()

            if(response.ok){
                setOrders(result)
            }
        }

        fetchOrder()
    }, [])

    return ( 
        <div className="orders">
            <div className="px-5 pt-4 pb-2">
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
            </div>
        </div>
     );
}
 
export default Order;