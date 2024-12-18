import { Link } from "react-router-dom";

const SideNav = () => {

    return ( 
        <div className="sidenav px-4 py-5" style={{height: '100vh'}}>
            <h1 className="fs-4 ms-3 mb-5">Appchara</h1>
            <ul className="nav flex-column">
                <li className="nav-item side-nav-item">
                    <Link to="/" className="text-decoration-none nav-link side-nav-link">
                        <div className="d-flex fs-5 align-items-baseline">
                            <i class="bi bi-house-fill me-2"></i>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                </li>
                <li className="nav-item side-nav-item">
                    <Link to="/product" className="text-decoration-none nav-link side-nav-link">
                        <div className="d-flex fs-5 align-items-baseline">
                            <i class="bi bi-basket-fill me-2"></i>
                            <p>Products</p>
                        </div>
                    </Link>
                </li>
                <li className="nav-item side-nav-item">
                    <Link to="/pos" className="text-decoration-none nav-link side-nav-link">
                        <div className="d-flex fs-5 align-items-baseline">
                            <i class="bi bi-shop-window me-2"></i>
                            <p>Point of Sale</p>
                        </div>
                    </Link>
                </li>
                <li className="nav-item side-nav-item">
                    <Link to="/orders" className="text-decoration-none nav-link side-nav-link">
                        <div className="d-flex fs-5 align-items-baseline">
                            <i class="bi bi-cart-fill me-1"></i>
                            <p>Orders</p>
                        </div>
                    </Link>
                </li>
                <li className="nav-item side-nav-item">
                    <Link to="/report" className="text-decoration-none nav-link side-nav-link">
                        <div className="d-flex fs-5 align-items-baseline">
                            <i class="bi bi-clipboard-data-fill me-1"></i>
                            <p>Reports</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
     );
}
 
export default SideNav;
