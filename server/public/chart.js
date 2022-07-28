const ctx = "myChart";

let mylabels = invest.split(",");
let myData = percentage.split(",");

const data = {
  labels: mylabels,

  datasets: [
    {
      label: "My First Dataset",
      data: myData,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
      ],
      hoverOffset: 4,
    },
  ],
};
const myChart = new Chart(ctx, {
  type: "pie",
  data: data,
});

// const ctx = "myChart";

// let myData = ["10", "20"];
// let mylabels = "123";
// const myChart = new Chart(ctx, {
//   type: "pie",
//   data: {
//     labels: ["January", "February", "March", "April"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: myData,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Chart.js Pie Chart",
//       },
//     },
//   },
// });
