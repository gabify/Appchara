import { Row, Col, Card, Spinner } from "react-bootstrap";
import DashboardCard from "./DashboardCard";
import DataViz from "./DataViz";


const StockReport = ({chartData, stockDashboard}) => {
    console.log(stockDashboard.isLoading)
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
            {stockDashboard.isLoading && (
                    <Spinner variant='success' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            {stockDashboard.error && (
                <div className="text-center">
                    {stockDashboard.error}
                </div>
            )}
            {stockDashboard.data && (
                <Row>
                    <DashboardCard 
                        icon={<i className="bi bi-box2 fs-1"></i>}
                        content={stockDashboard.data.currentStock}
                        title={"Current Stock"}
                    />
                    <DashboardCard 
                        icon={<i className="bi bi-cash-coin fs-1"></i>}
                        content={`₱ ${stockDashboard.data.stockValue}`}
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
            )}
            <Row className="mt-3">
                {chartData.isLoading && (
                    <Spinner variant='success' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {chartData.error && (
                    <div className="text-center">
                        {chartData.error}
                    </div>
                )}
                {chartData.data && (
                    <DataViz
                        title={"Currently Available Stocks"}
                        chartData={chartData.data}
                        chartType={"bar"}
                        options={options}
                    />
                )}
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