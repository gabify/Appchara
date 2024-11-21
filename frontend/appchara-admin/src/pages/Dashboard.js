import SideNav from "../component/SideNav";

const Dashboard = () => {
    return ( 
        <div className="row g-0">
            <div className="col col-md-3 vh-100">
                <SideNav/>
            </div>
            <div className="col col-md-9">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Dashboard</span>
                    </div>
                </nav>
                <div className="p-5">
                    <div className="row">
                        <div className="col col-md-4">
                            <div className="card">
                                <div className="card-body my-3">
                                    <div className="d-flex align-items-middle">
                                        <i className="bi bi-cash-stack fs-2"></i>
                                        <div className="ms-3">
                                            <h1 className="fw-bold fs-4 mb-0 mt-2">200,000.00</h1>
                                            <small className="fw-light">Total Gross Income</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small>More Info</small>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-4">
                            <div className="card">
                            <div className="card-body my-3">
                                    <div className="d-flex align-items-middle">
                                        <i className="bi bi-coin fs-2"></i>
                                        <div className="ms-3">
                                            <h1 className="fw-bold fs-4 mb-0 mt-2">200,000.00</h1>
                                            <small className="fw-light">Total Expenses</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small>More Info</small>
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-4">
                            <div className="card">
                            <div className="card-body my-3">
                                    <div className="d-flex align-items-middle">
                                        <i className="bi bi-cash-coin fs-2"></i>
                                        <div className="ms-3">
                                            <h1 className="fw-bold fs-4 mb-0 mt-2">200,000.00</h1>
                                            <small className="fw-light">Total Net Income</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small>More Info</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    Stock Information
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    Low Stock Alert
                                </div>
                            </div>
                        </div>
                        <div className="col col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    SAnalytics
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;