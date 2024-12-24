import { useState, useEffect } from "react";
import {Tabs, Tab} from 'react-bootstrap'
import SalesReport from "../component/SalesReport";
import StockReport from "../component/StockReport";

const Report = () => {
    const [sales, setSales] = useState(null)
    const [error, setError] = useState(null)
    const [totalSales, setTotalSales] = useState(0)
    const [availableStock, setAvailableStock] = useState(0)
    const [stockValue, setStockValue] = useState(0)
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
                setAvailableStock(100)
                setStockValue(100)
            }
        }

        const fetchSalesData = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/sale/2024')
            const result = await response.json()

            if(response.ok){
                setSaleData(result)
            }
        }

        fetchSales()
        fetchStock()
        fetchSalesData()
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
                                availableStock={availableStock}  
                                stockValue={stockValue}
                            />
                        </Tab>
                        <Tab eventKey="sales" title="Sales Report">
                            <SalesReport
                                sales={sales}
                                totalSales={totalSales}
                                salesData={saleData}/>
                        </Tab>
                        
                </Tabs>
            </div>
        </div>
     );
}
 
export default Report;