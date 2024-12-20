import { useState, useEffect } from "react";
import {Tabs, Tab} from 'react-bootstrap'
import SalesReport from "../component/SalesReport";
import StockReport from "../component/StockReport";

const Report = () => {
    const [sales, setSales] = useState(null)
    const [error, setError] = useState(null)
    const [totalSales, setTotalSales] = useState(0)
    const [key, setKey] = useState('stock')

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

        fetchSales()
    }, [error])

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
                            <StockReport/>
                        </Tab>
                        <Tab eventKey="sales" title="Sales Report">
                            <SalesReport
                                sales={sales}
                                totalSales={totalSales}/>
                        </Tab>
                        
                </Tabs>
            </div>
        </div>
     );
}
 
export default Report;