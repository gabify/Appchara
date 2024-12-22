import { Col, Card } from "react-bootstrap";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

const DataViz = ({title, chartData, chartType, options}) => {
    function Chart({chartType, chartData, options}){
        let graph;
        switch(chartType){
            case 'bar':
                graph = <Bar 
                            data={chartData}
                            options={options}
                        />
                break
            case 'line':
                graph = <Line 
                            data={chartData}
                            options={options}
                        />
                break
            default:
                graph = <p>Unable to generate a graph</p>
        }

        return graph
    }

    return ( 
        <Col>
            <Card>
                <Card.Body className="p-5">
                    <p className="text-center fw-bold h5">{title}</p>
                    {chartData.labels.length > 0 ? <Chart 
                          chartData={chartData}
                          chartType={chartType}
                          options={options}
                    />: (<p>Loading...</p>)
                    }
                </Card.Body>
            </Card>
        </Col>
     );
}
 
export default DataViz;