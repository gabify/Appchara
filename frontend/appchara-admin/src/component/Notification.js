import React from 'react';
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';

const customToggle = React.forwardRef(({children, onClick}, ref) =>(
    <span
        style={{cursor: 'pointer'}}
        onClick={e => onClick(e)}
    >
        {children}
    </span>
))


const Notification = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    return ( 
        <Navbar style={{backgroundColor: '#dfe4ea'}} sticky="top">
            <Container>
                <Navbar.Brand>Conching's Atchara Admin Platform</Navbar.Brand>
                <div className="d-flex justify-content-end fs-5">
                    <i className="bi bi-bell me-3"></i>
                    <Dropdown>
                        <Dropdown.Toggle as={customToggle}>
                            <span>
                                <i className="bi bi-person-circle me-1"></i>
                                {user.name}
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item 
                                onClick={logout}
                            >
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
     );
}
 
export default Notification;