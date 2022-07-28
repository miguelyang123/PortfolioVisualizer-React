import React from "react";
import { useForm } from "react-hook-form";
import assetsData from "../data/assets.json";

function Myform() {
  const { register, handleSubmit } = useForm();
  // FormData to JSON format
  function formToJson(data) {
    let jsonData = [
      {
        name: "Portfolio #1",
        assets: [],
      },
      {
        name: "Portfolio #2",
        assets: [],
      },
      {
        name: "Portfolio #3",
        assets: [],
      },
    ];
    let objData = Object.keys(data);
    //Portfolio #"p"
    objData.forEach((e) => {
      let p = 1;
      if (e.includes("ticker")) {
        let assets = {
          ticker: data[e],
        };
        jsonData[p - 1].assets.push(assets);
      }
      if (e.includes("allocation" + p)) {
        // allocation"p"-"a"
        let a = Number(e[12]) - 1;
        jsonData[p - 1].assets[a].allocation = Number(
          (data[e] * 0.01).toFixed(2)
        );
      }
    });
    objData.forEach((e) => {
      let p = 2;
      if (e.includes("ticker")) {
        let assets = {
          ticker: data[e],
        };
        jsonData[p - 1].assets.push(assets);
      }
      if (e.includes("allocation" + p)) {
        let a = Number(e[12]) - 1;
        jsonData[p - 1].assets[a].allocation = Number(
          (data[e] * 0.01).toFixed(2)
        );
      }
    });
    objData.forEach((e) => {
      let p = 3;
      if (e.includes("ticker")) {
        let assets = {
          ticker: data[e],
        };
        jsonData[p - 1].assets.push(assets);
      }
      if (e.includes("allocation" + p)) {
        let a = Number(e[12]) - 1;
        jsonData[p - 1].assets[a].allocation = Number(
          (data[e] * 0.01).toFixed(2)
        );
      }
    });
    return jsonData;
  }
  // handleSubmit
  const onSubmit = (data) => {
    let jsonData = formToJson(data);
    console.log(jsonData);
  };
  const onError = (errors) => console.log("填寫表單錯誤!");

  // Form POST

  // assets.json導入option選項
  let option = assetsData.map((a, k) => {
    return (
      <option key={k} value={a.ticker}>
        {a.nameCn}
      </option>
    );
  });
  // 表格class值
  let grid = {
    0: "col-md-1",
    1: "col-md",
    2: "col-md-2",
    3: "col-md-2",
    4: "col-md-2",
    div: "row",
  };
  //是否需要輸入數值 required=required
  let required = "";

  //Form
  function form(num) {
    return (
      <div className={grid.div}>
        <div className={grid[0]}>
          <p style={{ whiteSpace: "nowrap" }}>資產{num}</p>
        </div>
        <div className={grid[1]}>
          <select
            {...register("ticker" + num)}
            name={"ticker" + num}
            className="form-select myselect"
            aria-label="Default select"
          >
            <option id="option" value="Not selected">
              未選擇
            </option>
            {option}
          </select>
        </div>
        <div className={grid[2]}>
          <div className="input-group">
            <input
              {...register("allocation1-" + num)}
              name={"allocation1-" + num}
              type="number"
              min="1"
              max="100"
              className="form-control"
              id="autoSizingInputGroup"
              placeholder="0~100"
              required={required}
            />
            <div className="input-group-text">%</div>
          </div>
        </div>
        <div className={grid[3]}>
          <div className="input-group">
            <input
              {...register("allocation2-" + num)}
              name={"allocation2-" + num}
              type="number"
              min="1"
              max="100"
              className="form-control"
              id="autoSizingInputGroup"
              placeholder="0~100"
              required={required}
            />
            <div className="input-group-text">%</div>
          </div>
        </div>
        <div className={grid[4]}>
          <div className="input-group">
            <input
              {...register("allocation3-" + num)}
              name={"allocation3-" + num}
              type="number"
              min="1"
              max="100"
              className="form-control"
              id="autoSizingInputGroup"
              placeholder="0~100"
              required={required}
            />
            <div className="input-group-text">%</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="col g-3"
      method="POST"
      action="/chart"
      id="allocation"
      onSubmit={(e) =>
        handleSubmit(
          onSubmit,
          onError
        )(e).catch((e) => {
          console.log("POST Error!", e);
        })
      }
    >
      <div className="container">
        {/*  head  */}
        <div className={grid.div}>
          <div className={grid[0]}>
            <p style={{ whiteSpace: "nowrap" }}>分配</p>
          </div>
          <div className={grid[1]}>
            <p>投資項目</p>
          </div>
          <div className={grid[2]}>
            <p>Portfolio #1</p>
          </div>
          <div className={grid[3]}>
            <p>Portfolio #2</p>
          </div>
          <div className={grid[4]}>
            <p>Portfolio #3</p>
          </div>
        </div>
        {form(1)}
        {form(2)}
        {form(3)}
        {form(4)}
        <br />
        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success" type="submit" id="send">
              送出
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Myform;
