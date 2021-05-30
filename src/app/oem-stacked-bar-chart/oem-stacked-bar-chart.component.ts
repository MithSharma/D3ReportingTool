import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data/data.service';
import * as UtilityMethods from "../data/utility";
import { TestDataValue } from "../data/data"
@Component({
  selector: 'app-oem-stacked-bar-chart',
  templateUrl: './oem-stacked-bar-chart.component.html',
  styleUrls: ['./oem-stacked-bar-chart.component.scss']
})
export class OemStackedBarChartComponent implements OnInit {

  constructor(private dataService:DataService) { }
  private svg;
  colors;
  data = UtilityMethods.getStackBarChartData(TestDataValue.System_Test_Result_Q1);
  data_acc_to_types = [
    {"type": "Brake", "Passed": 9,"Failed":13,"Invalid":1,"Overall":23},
    {"type": "Lights Exterior", "Passed": 15,"Failed":3,"Invalid":0,"Overall":18},
    {"type": "Transmission", "Passed": 40,"Failed":5,"Invalid":0,"Overall":55},
    {"type": "ADAS", "Passed": 0,"Failed":0,"Invalid":4,"Overall":4}
  ];
  ngOnInit(): void {
    this.createBarChart();
  }

  private createBarChart(){
    console.log(this.data)
    let width = 450,
    height = 300,
    margin = {top: 20, right: 20, bottom: 70, left: 40},
    colorArray = ["#0000d6","#008b00","#ba00e5","#880061"];
    const svg = d3.select("figure#stackedBar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    const subgroups = Object.keys(this.data[0]).slice(1);
    const groups = this.data.map(d => (d.status));
    const test_item_types = Object.keys(this.data[0]).slice(1)
    let newData = [...this.data]
    let maxValues = newData.map(obj => Object.values(obj))
    .map(ele => ele.filter(child=> !isNaN(+child))).map(ele=>ele.reduce((total, num) => {
      return +total + Math.round(+num);
    }),0) as number[];

    // Add X axis
    const x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding(0.2);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(maxValues)])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal<string>()
      .domain(subgroups)
      .range(colorArray)

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)(this.data as any);

    // Show the bars
    svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill",function(d){return color(d.key)})
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .classed("pointer",true)
      .on("click",(event)=>{
        let selectedTestItem = Object.keys(event.target.__data__["data"])
        [Object.values(event.target.__data__["data"]).indexOf(event.target.__data__[1]-event.target.__data__[0])];
        selectedTestItem = selectedTestItem.split("_").length > 1
        ? selectedTestItem.split("_")[0] +" "+selectedTestItem.split("_")[1]
        :selectedTestItem;
        let searchString:any;
        if(event.target.__data__.data.status === "Total"){
          searchString = {System_Name:selectedTestItem};
        }else{
          searchString = {System_Name:selectedTestItem,Status:event.target.__data__.data.status};
        }
        this.dataService.announceMission(searchString)
      })
      .on("mouseover", function(d,i){
      })
      .on("mouseout",function(){
      })
      .attr("x", d => x(d.data.status.toString()))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width",x.bandwidth());

      this.colors = d3.scaleOrdinal()
      .domain(test_item_types)
      .range(colorArray);

      let legendBase = svg.append('g')
        .attr(
          "transform",
          "translate(" + -30 + "," + (height + 30) + ")"
        )
        .attr('class', 'legend');

        legendBase.selectAll('circle')
        .data(test_item_types)
        .enter().append('circle')
        .attr('cx',(d,i) => { return (width/3.5 * (i))+5 })
        .attr('r',6).attr("fill",(d, i) => (this.colors(i)));

        legendBase.selectAll('text')
        .data(test_item_types)
        .enter().append('text')
        .text((d) => { return d; })
        .style('fill', (d, i) => this.colors(i))
        .attr('x', (d, i) => (width/3.5 * (i))+15 )
        .attr('y', 5)
  }
}
