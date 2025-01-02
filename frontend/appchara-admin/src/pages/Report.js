import { useState } from "react";
import {Tabs, Tab} from 'react-bootstrap'
import SalesReport from "../component/SalesReport";
import StockReport from "../component/StockReport";
import useFetch from "../hooks/useFetch";

const Report = () => {
    const stockGraphData = useFetch('http://127.0.0.1:5000/api/v1/product/stocks')
    const stockDashboardData = useFetch('http://127.0.0.1:5000/api/v1/product/dashboard')
    const sales = useFetch('http://127.0.0.1:5000/api/v1/sale/')
    const salesGraphData = useFetch('http://127.0.0.1:5000/api/v1/sale/2024')
    const salesDashboardData = useFetch('http://127.0.0.1:5000/api/v1/sale/dashboard/2024')
    const [key, setKey] = useState('stock')


    return ( 
        <div className="report">
            <div className="px-5 py-2">
                <Tabs
                        id="report-tab"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        >
                        <Tab eventKey="stock" title="Stock Report">
                            <StockReport
                                chartData={stockGraphData}  
                                stockDashboard={stockDashboardData}
                            />
                        </Tab>
                        <Tab eventKey="sales" title="Sales Report">
                            <SalesReport
                                sales={sales}
                                salesData={salesGraphData}
                                salesDashboard={salesDashboardData}/>
                        </Tab>
                        
                </Tabs>
            </div>
        </div>
     );
}
 
export default Report;