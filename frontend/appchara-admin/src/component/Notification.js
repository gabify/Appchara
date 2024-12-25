import { Container, Navbar } from "react-bootstrap";

const Notification = () => {
    return ( 
        <Navbar style={{backgroundColor: '#dfe4ea'}} sticky="top">
            <Container>
                <Navbar.Brand>Conching's Atchara Admin Platform</Navbar.Brand>
                <div className="d-flex justify-content-end fs-5">
                    <i className="bi bi-bell me-3"></i>
                    <span><i className="bi bi-person-circle"></i> Admin</span>
                </div>
            </Container>
        </Navbar>
     );
}
 
export default Notification;