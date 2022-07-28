const express = require("express");
const req = require("express/lib/request");
const app = express();
const fs = require("fs");
const { PythonShell } = require("python-shell");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//rest API
// const port = 3310;

// app.use(bodyParser.text({ type: "*/*" }));

// app.get("/user", (req, res) => {
//   let user = JSON.parse(req.body);
//   res.send("user info is " + JSON.stringify(user));
// });

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

//server
app.listen(8080, () => {
  console.log("Server running on port 8080.");
});

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

//Link assets.json
const assets = require("./data/assets.json");
//首頁
app.get("/", (req, res) => {
  res.render("index.ejs", { assets });
});

// app.post("/chart", urlencodedParser, (req, res) => {
//   // console.log(req.body);
//   // console.log(req.body.percentage[1]);
//   let data = req.body;
//   let { invest, percentage } = req.body;
//   console.log(data);
//   //總和
//   let sumData = 0;
//   for (let i = 0; i < percentage.length; i++) {
//     sumData += Number(percentage[i]);
//   }

//   console.log("invest:" + invest, "percentage:" + percentage);
//   console.log("總和:" + sumData);

//   res.render("chart.ejs", { invest, percentage, sumData, data });
//   // res.send("成功提交表單");
// });

const start = "2022-06-01";
const end = "2022-06-30";
const portfolios_string = JSON.stringify(require("./data/portfolios.json"));

app.post("/chart", urlencodedParser, pythonProcess);

function pythonProcess(req, res) {
  console.log(req.body);

  res.send("OK");

  // let options = {
  //   args: [start, end, portfolios_string],
  // };

  // PythonShell.run("./backtester.py", options, (err, data) => {
  //   if (err) {
  //     res.send("錯誤");
  //   } else {
  //     const parsedString = JSON.parse(data);
  //     res.send("OK");
  //     console.log(parsedString);
  //   }
  // });
}

app.get("*", function (req, res) {
  res.send("404 Error!!!");
});

//讀取py

//chart.js
// const labels = ["January", "February", "March", "April"];

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(255, 99, 132)",
//       data: [0, 10, 5, 2],
//     },
//   ],
// };

// const config = {
//   type: "line",
//   data: data,
//   options: {},
// };

// const myChart = new Chart(document.getElementById("myChart"), config);

/*     <p>
      January: <%= chartData.Jan%> , February: <%=chartData.Feb%>,
      March:<%=chartData.Mar%>, April:<%=chartData.Apr%>
    </p> */
