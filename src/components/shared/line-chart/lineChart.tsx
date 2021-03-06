import { Line } from 'react-chartjs-2'
import { ChartModel } from '../../../models/chartModel';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import './lineChart.scss';
const LineChart = (props: ChartModel) => {
    const [chartData, setChartData] = useState<any>();
    const option: any = {
        maintainAspectRatio: false,
    }
    useEffect(() => {
        Chart.register(CategoryScale, LinearScale, LineElement, PointElement);
        const data = {
            labels: props.dimension,
            datasets: [{
                label: props.dimension,
                data: props.measure,
                borderColor: '#5dacaf',
                pointBackgroundColor: '#FFFFFF',
            }]
        };
        setChartData(data);
    }, [props.dimension, props.measure])
    return (
        <div className='line-chart'>
            {chartData &&
                <Line data={chartData} options={option}></Line>
            }
        </div >
    );
}
export default LineChart;