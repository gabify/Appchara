import { Table, Row } from "react-bootstrap";
import DashboardCard from './DashboardCard'
import DataViz from "./DataViz";

const SalesReport = ({sales, totalSales, salesData}) => {
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
            <Row className="mb-3">
                <DashboardCard 
                    icon={<i className="bi bi-cash fs-1"></i>}
                    content={"1,000"}
                    title={"Total Sales"}
                />
                <DashboardCard 
                    icon={<i className="bi bi-cash-coin fs-1"></i>}
                    content={"₱ 1,000.00"}
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
            <p className="h5 mb-0">How is our Atchara's sales performance?</p>
            <p className="fw-light mb-1">Sales projection from January to December</p>
            <Row>
                <DataViz 
                    chartData={salesData}
                    title={"Monthly Sales Report"}
                    chartType={"line"}
                    options={options}
                />

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
     );
}
 
export default SalesReport;