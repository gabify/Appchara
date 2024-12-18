import { useState, useEffect } from "react";
import {Table} from 'react-bootstrap'

const Report = () => {
    const [sales, setSales] = useState(null)
    const [error, setError] = useState(null)
    const [totalSales, setTotalSales] = useState(0)

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
                <Table bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales.map((sale) =>{
                            const formatedDate = new Date (sale.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: "numeric"
                            })
                            return (
                                <tr key={sale._id}>
                                    <td>{sale._id}</td>
                                    <td>{formatedDate}</td>
                                    <td>₱ {sale.total_sale}.00</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={2} className="fw-bold text-end">Total Sales:</td>
                            <td className="fw-bold">₱ {totalSales}.00</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
     );
}
 
export default Report;