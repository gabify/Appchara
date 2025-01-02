import { Table, Row, Spinner } from "react-bootstrap";
import DashboardCard from './DashboardCard'
import DataViz from "./DataViz";
import { useEffect, useState } from "react";

const SalesReport = ({sales, salesData, salesDashboard}) => {
    const [totalSales, setTotalSales] = useState(0)
    
    useEffect(() =>{
        if(sales.data){
            const total = sales.data.reduce((sum, sale) => sum + sale.total_sale, 0);
            setTotalSales(total)
        }
    }, [sales])

    const options = {
        plugins: {
            title: {
                display: true,
            },
            legend: {
                display: true
            }
        }
      }

    return ( 
        <div className="sales-report">
            {salesDashboard.isLoading && (
                    <Spinner variant='success' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {salesDashboard.error && (
                <div className="text-center">
                    {salesDashboard.error}
                </div>
            )}
            {salesDashboard.data && (
                <Row className="mb-3">
                    <DashboardCard 
                        icon={<i className="bi bi-cash fs-1"></i>}
                        content={salesDashboard.data.totalSale}
                        title={"Total Sales"}
                    />
                    <DashboardCard 
                        icon={<i className="bi bi-cash-coin fs-1"></i>}
                        content={`₱ ${salesDashboard.data.totalRevenue}`}
                        title={"Total Revenue"}
                    />
                    <DashboardCard 
                        icon={<i className="bi bi-cash-coin fs-1"></i>}
                        content={"₱ 1,000.00"}
                        title={"Total Expenses"}
                    />
                    <DashboardCard 
                        icon={<i className="bi bi-cash-stack fs-1"></i>}
                        content={"₱ 1,000.00"}
                        title={"Net Revenue"}
                    />
                </Row>
            )}
            
            <p className="h5 mb-0">How is our Atchara's sales performance?</p>
            <p className="fw-light mb-1">Sales projection from January to December</p>
            <Row className="mb-2">
                {salesData.isLoading && (
                    <Spinner variant='success' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {salesData.error && (
                    <div className="text-center">
                        {salesData.error}
                    </div>
                )}

                {salesData.data && (
                    <DataViz 
                        chartData={salesData.data}
                        title={"Monthly Sales Report"}
                        chartType={"line"}
                        options={options}
                    />
                )}
            </Row>
            <Table bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.isLoading && (
                        <Spinner variant='success' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    {sales.error && (
                        <div className="text-center">
                            {sales.error}
                        </div>
                    )}

                    {sales.data && sales.data.map((sale) =>{
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
     );
}
 
export default SalesReport;