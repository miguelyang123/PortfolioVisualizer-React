const express = require('express')
const app = express()
let { PythonShell } = require('python-shell')
const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

const start = '2022-06-01';
const end = '2022-06-30';
const portfolios_string = JSON.stringify(require('./data/portfolios.json'));

app.get('/call/python', pythonProcess)

function pythonProcess(req, res) {
  let options = {
    args:
      [
        start,
        end,
        portfolios_string,
      ]
  }

  PythonShell.run('./backtester.py', options, (err, data) => {
    if (err) res.send(err)
    const parsedString = JSON.parse(data)
    res.json(parsedString)
  })

}