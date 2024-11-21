import SideNav from "../component/SideNav";

const Dashboard = () => {
    return ( 
        <div className="row g-0">
            <div className="col col-md-3 vh-100">
                <SideNav/>
            </div>
            <div className="col col-md-auto">
                <h1>Content of dashboard</h1>
            </div>
        </div>
     );
}
 
export default Dashboard;