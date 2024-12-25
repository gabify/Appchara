import { useState, useEffect } from "react";
import {Tabs, Tab} from 'react-bootstrap'
import SalesReport from "../component/SalesReport";
import StockReport from "../component/StockReport";

const Report = () => {
    const [sales, setSales] = useState(null)
    const [error, setError] = useState(null)
    const [salesDashboard, setSalesDashboard] = useState({})
    const [stockDashboard, setStockDashboard] = useState({})
    const [totalSales, setTotalSales] = useState(0)
    const [key, setKey] = useState('stock')
    const [stockData, setStockData] = useState({
        labels: [],
        datasets: []    
    });
    const [saleData, setSaleData] = useState({
        labels: [],
        datasets: []    
    });

    useEffect(() =>{
        const fetchSales = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/sale/')
            const result = await response.json()

            if(response.ok){
                setSales(result)
                const total = result.reduce((sum, sale) => sum + sale.total_sale, 0);
                setTotalSales(total)

            }else{
                setError(result.error)
                console.log(error)
            }
        }

        const fetchStock = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/stocks')
            const result = await response.json()

            if(response.ok){
                setStockData(result)
            }
        }

        const fetchStockDasboardData = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/dashboard')
            const result = await response.json()

            if(response.ok){
                setStockDashboard(result)
            }
        }

        const fetchSalesData = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/sale/2024')
            const result = await response.json()

            if(response.ok){
                setSaleData(result)
            }
        }

        const fetchSaleDashboardData = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/sale/dashboard/2024')
            const result = await response.json()

            if(response.ok){
                setSalesDashboard(result)
            }
        }

        fetchSales()
        fetchStock()
        fetchSalesData()
        fetchSaleDashboardData()
        fetchStockDasboardData()
    }, [error])

    console.log(sales)

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
                                chartData={stockData}  
                                stockDashboard={stockDashboard}
                            />
                        </Tab>
                        <Tab eventKey="sales" title="Sales Report">
                            <SalesReport
                                sales={sales}
                                totalSales={totalSales}
                                salesData={saleData}
                                salesDashboard={salesDashboard}/>
                        </Tab>
                        
                </Tabs>
            </div>
        </div>
     );
}
 
export default Report;