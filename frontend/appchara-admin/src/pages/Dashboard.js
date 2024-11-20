import SideNav from "../component/SideNav";

const Dashboard = () => {
    return ( 
        <div className="dashboard">
            <div className="row">
                <div className="cols col-md-4">
                    <SideNav/>
                </div>

                <div className="cols col-md-8">
                    <h1>Content of dashboard</h1>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;