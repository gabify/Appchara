import { Link } from "react-router-dom";

const SideNavItem = ({linkTo, icon, linkTitle}) => {
    return ( 
        <Link to={linkTo} className="text-decoration-none nav-link side-nav-link">
            <div className="d-flex fs-5 align-items-baseline">
                {icon}
                <p>{linkTitle}</p>
            </div>
        </Link>
     );
}
 
export default SideNavItem;