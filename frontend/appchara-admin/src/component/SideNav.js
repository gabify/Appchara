import { Link } from "react-router-dom";

const SideNav = () => {

    return ( 
        <div className="sidenav px-4 py-5">
            <h1 className="fs-4 ms-3 mb-5">Appchara</h1>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/">
                        <p className="nav-link active text-light fs-5" aria-current="page">Dashboard</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/product">
                        <p className="nav-link text-dark fs-5">Product</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/pos">
                        <p className="nav-link text-dark fs-5">Point of Sale</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders">
                        <p className="nav-link text-dark fs-5">Orders</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/report">
                        <p className="nav-link text-dark fs-5">Reports</p>
                    </Link>
                </li>
            </ul>
        </div>
     );
}
 
export default SideNav;
