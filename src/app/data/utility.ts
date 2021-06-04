import {TestData} from "./data-type";

export interface StackedBarGraphJSONData {
  status?: string;
  Brake?: number;
  Lights_Exterior?: number;
  Transmission?:number;
  ADAS?:number;
}

export const getStackBarChartData =
function (data:TestData[],filter:string){



}

function compareSystemName(a, b) {
  var nameA = a.System_Name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.System_Name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}
function compareStatus(a, b) {
  var nameA = a.Status.toUpperCase(); // ignore upper and lowercase
  var nameB = b.Status.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}


// statusArray.map((statusVal)=>{
    //   let obj:StackedBarGraphJSONData = {
    //     status : statusVal,
    //     Brake : data.filter((ele)=> (ele.System_Name === "Brake" &&
    //     (statusVal === "Total"? true :ele.Status === statusVal))).length,
    //     Lights_Exterior : data.filter(ele=> (ele.System_Name === "Lights Exterior" &&
    //     (statusVal === "Total"? true :ele.Status === statusVal))).length,
    //     Transmission : data.filter(ele=> (ele.System_Name === "Transmission" &&
    //     (statusVal === "Total"? true :ele.Status === statusVal))).length,
    //     ADAS : data.filter(ele=>(ele.System_Name === "ADAS" &&
    //     (statusVal === "Total"? true :ele.Status === statusVal))).length,
    //   }
    //   output.push(obj)
    // })
