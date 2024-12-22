import { Row } from "react-bootstrap";
import DashboardCard from "../component/DashboardCard";

const Dashboard = () => {
    return ( 
        <div className="dashboard">
            <div className="p-5">
                <Row>
                    <DashboardCard
                        icon={<i className="bi bi-cash-stack fs-2"></i>}
                        content={"200,000.00"}
                        title={"Total Gross Income"}
                        hasFooter={true}
                    />
                    <DashboardCard
                        icon={<i className="bi bi-coin fs-2"></i>}
                        content={"200,000.00"}
                        title={"Total Expenses"}
                        hasFooter={true}
                    />
                    <DashboardCard
                        icon={<i className="bi bi-cash-coin fs-2"></i>}
                        content={"200,000.00"}
                        title={"Total Net Income"}
                        hasFooter={true}
                    />
                </Row>
                <Row>
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
                </Row>    
            </div>
        </div>
     );
}
 
export default Dashboard;