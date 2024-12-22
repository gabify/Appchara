import { useState, useEffect } from "react";
import {Tabs, Tab} from 'react-bootstrap'
import SalesReport from "../component/SalesReport";
import StockReport from "../component/StockReport";

const Report = () => {
    const [sales, setSales] = useState(null)
    const [error, setError] = useState(null)
    const [totalSales, setTotalSales] = useState(0)
    const [availableStock, setAvailableStock] = useState(0)
    const [key, setKey] = useState('stock')
    const [data, setData] = useState({
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

        const fetchProduct = async() =>{
            const response = await fetch('http://127.0.0.1:5000/api/v1/product/')
            const result = await response.json()

            if(response.ok){
                setData({
                    labels: result.map((product) => product.name),
                    datasets: [
                        {
                            label: 'Current Product Stock',
                            data: result.map(product => product.stock),
                            backgroundColor: [
                                'rgba(75,192,192,0.4)',
                                'rgba(75,192,192,0.4)',
                                'rgba(75,192,192,0.4)',
                                'rgba(75,192,192,0.4)'
                            ],
                            borderWidth: 1,
                        }
                    ]
                })
                
                let stocks = 0
                result.map((product) =>(
                    stocks += product.stock
                ))
                setAvailableStock(stocks)
            }
        }

        fetchSales()
        fetchProduct()
    }, [error])

    console.log(data)

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
                                chartData={data}  
                                availableStock={availableStock}  
                            />
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