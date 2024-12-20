import { Row, Col, Card } from "react-bootstrap";

const StockReport = () => {
    return ( 
        <div className="stock-report">
            <Row>
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div className="d-flex align-items-middle">
                                <i className="bi bi-box2 fs-1"></i>
                                <div className="ms-3">
                                    <h1 className="fw-bold fs-5 mb-0 mt-2">200</h1>
                                    <small className="fw-light">Available Stock Now</small>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div className="d-flex align-items-middle">
                                <i className="bi bi-cash-coin fs-1"></i>
                                <div className="ms-3">
                                    <h1 className="fw-bold fs-5 mb-0 mt-2">200,000.00</h1>
                                    <small className="fw-light">Available Stock value</small>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div className="d-flex align-items-middle">
                                <i className="bi bi-box-arrow-in-right fs-1"></i>
                                <div className="ms-3">
                                    <h1 className="fw-bold fs-5 mb-0 mt-2">200</h1>
                                    <small className="fw-light">Current Stock In</small>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div className="d-flex align-items-middle">
                                <i className="bi bi-box-arrow-left fs-1"></i>
                                <div className="ms-3">
                                    <h1 className="fw-bold fs-5 mb-0 mt-2">156</h1>
                                    <small className="fw-light">Current Stock Out</small>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div>Bar graph of stock</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div>Low Stock alert</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default StockReport;