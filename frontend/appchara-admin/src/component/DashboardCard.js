import { Col, Card } from "react-bootstrap";

const DashboardCard = ({icon, content, title, hasFooter, footerLink}) => {
    return ( 
        <Col>
            <Card>
                <Card.Body className="py-4">
                    <div className="d-flex align-items-middle">
                        {icon}
                        <div className="ms-3">
                            <h1 className="fw-bold fs-5 mb-0 mt-2">{content}</h1>
                            <small className="fw-light">{title}</small>
                        </div>
                    </div>
                </Card.Body>
                {hasFooter && (
                    <Card.Footer>
                        <small>More Info</small>
                    </Card.Footer>
                )}
            </Card>
        </Col>
     );
}
 
export default DashboardCard;