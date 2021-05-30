import {TestData} from "./data-type";

export interface StackedBarGraphJSONData {
  status?: string;
  Brake?: number;
  Lights_Exterior?: number;
  Transmission?:number;
  ADAS?:number;
}

export const getStackBarChartData = function (data:TestData[]):StackedBarGraphJSONData[]{
    let output = [];
    let statusArray = data.map(ele => ele.Status).filter((ele,index,array) => array.indexOf(ele) === index);
    statusArray.push("Total")
    statusArray.map((statusVal)=>{
      let obj:StackedBarGraphJSONData = {
        status : statusVal,
        Brake : data.filter((ele)=> (ele.System_Name === "Brake" &&  (statusVal === "Total"? true :ele.Status === statusVal))).length,
        Lights_Exterior : data.filter(ele=> (ele.System_Name === "Lights_Exterior" &&  (statusVal === "Total"? true :ele.Status === statusVal))).length,
        Transmission : data.filter(ele=> (ele.System_Name === "Transmission" &&  (statusVal === "Total"? true :ele.Status === statusVal))).length,
        ADAS : data.filter(ele=>(ele.System_Name === "ADAS" &&  (statusVal === "Total"? true :ele.Status === statusVal))).length,
      }
      output.push(obj)
    })
  return output;
}
