import SideNavItem from "./SideNavItem";

const SideNav = () => {

    const handleClick = (e) =>{
        const navLinks = document.querySelectorAll('.side-nav-item')
        navLinks.forEach(link => link.classList.remove('side-nav-active'))

        e.currentTarget.classList.add('side-nav-active')
    }

    return ( 
        <div className="sidenav px-4 py-5" style={{height: '100vh', overflow:"hidden"}}>
            <h1 className="fs-4 ms-3 mb-5">Appchara</h1>
            <ul className="nav flex-column">
                <li className="nav-item side-nav-item"
                    onClick={handleClick}>
                    <SideNavItem 
                        linkTo={"/"}
                        linkTitle={"Dashboard"}
                        icon={<i className="bi bi-house-fill me-2"></i>}
                    />
                </li>
                <li className="nav-item side-nav-item"
                    onClick={handleClick}>
                    <SideNavItem 
                        linkTo={"/product"}
                        linkTitle={"Product Inventory"}
                        icon={<i className="bi bi-basket-fill me-2"></i>}
                    />
                </li>
                <li className="nav-item side-nav-item"
                    onClick={handleClick}>
                    <SideNavItem 
                        linkTo={"/pos"}
                        linkTitle={"Point of Sale"}
                        icon={<i className="bi bi-shop-window me-2"></i>}
                    />
                </li>
                <li className="nav-item side-nav-item"
                    onClick={handleClick}>
                    <SideNavItem 
                        linkTo={"/orders"}
                        linkTitle={"Orders"}
                        icon={<i className="bi bi-cart-fill me-1"></i>}
                    />
                </li>
                <li className="nav-item side-nav-item"
                    onClick={handleClick}>
                    <SideNavItem 
                        linkTo={"/report"}
                        linkTitle={"Reports"}
                        icon={<i className="bi bi-clipboard-data-fill me-1"></i>}
                    />
                </li>
            </ul>
        </div>
     );
}
 
export default SideNav;
