import { Table } from "react-bootstrap";

const SalesReport = ({sales, totalSales}) => {
    return ( 
        <div className="sales-report">
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