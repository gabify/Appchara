const SideNav = () => {
    const link = "http://google.com"

    return ( 
        <div className="sidenav px-4 py-5">
            <h1 className="fs-4 ms-3 mb-5">Appchara</h1>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active text-light fs-5" aria-current="page" href={link}>Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fs-5" href={link}>Product</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fs-5" href={link}>Sales</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fs-5" href={link}>Purchase</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fs-5" href={link}>Reports</a>
                </li>
            </ul>
        </div>
     );
}
 
export default SideNav;
