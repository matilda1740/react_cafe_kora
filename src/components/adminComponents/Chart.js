import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';

export default function Chart() {
    let chartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                    }
                ]
            }
    // PRODUCTS OPTIONS - TRY PIECHART

    let productData = {
        labels: ["Breads", "Pastries"],
        datasets: [{
            label: "Projected Product Sales in 2021" ,
            data: [8, 2],
            backgroundColor: ["#7A4100","#7A0076"],
            borderColor: 'none',
            value: [8, 2],
            height: "450px",
            width: "500px",

        }],
    }
    return (
        <section className="chart_section">
            {/* <Bar data={chartData} height={"400px"} width={"500px"} options={{ maintainAspectRatio: false }}
            /> */}
            <Pie
                data={productData}
                height={"450px"} width={"500px"}
                options={{
                    responsive: true,
                }}                
            />
        </section>
    )
}
