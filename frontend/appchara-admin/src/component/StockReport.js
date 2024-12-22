import { Row, Col, Card } from "react-bootstrap";
import DashboardCard from "./DashboardCard";
import DataViz from "./DataViz";


const StockReport = ({chartData, availableStock, stockValue}) => {
    const options = {
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            }
        }
      }

    return ( 
        <div className="stock-report">
            <Row>
                <DashboardCard 
                    icon={<i className="bi bi-box2 fs-1"></i>}
                    content={availableStock}
                    title={"Available Stock Now"}
                />
                <DashboardCard 
                    icon={<i className="bi bi-cash-coin fs-1"></i>}
                    content={`₱ ${stockValue.toFixed(2).toLocaleString('en-US')}`}
                    title={"Stock Value"}
                />
                <DashboardCard 
                    icon={<i className="bi bi-box-arrow-in-right fs-1"></i>}
                    content={"200"}
                    title={"Current Stock In"}
                />
                <DashboardCard 
                    icon={<i className="bi bi-box-arrow-left fs-1"></i>}
                    content={"156"}
                    title={"Current Stock Out"}
                />
            </Row>
            <Row className="mt-3">
                <DataViz
                    title={"Currently Available Stocks"}
                    chartData={chartData}
                    chartType={"bar"}
                    options={options}
                />
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card className="py-3">
                        <Card.Body>
                            <div>Low Stock alert</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default StockReport;