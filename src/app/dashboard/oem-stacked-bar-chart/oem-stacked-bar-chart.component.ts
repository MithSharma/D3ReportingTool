import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { TestData } from 'src/app/data/data-type';
import { DataService } from '../../data/data.service';
import * as UtilityMethods from "../../data/utility";
@Component({
  selector: 'app-oem-stacked-bar-chart',
  templateUrl: './oem-stacked-bar-chart.component.html',
  styleUrls: ['./oem-stacked-bar-chart.component.scss']
})
export class OemStackedBarChartComponent implements OnInit , OnChanges{

  constructor(private dataService:DataService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.svg){
      this.inputData = changes.inputData.currentValue;
      this.svg.remove();
      this.getSelectedQuater();
    }
  }
  private svg;
  private margin = {top: 20, right: 20, bottom: 80, left: 40};
  private width = 450;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private colorArray = ["#0000d6","#008b00","#ba00e5","#880061","#b03060"];
  private colorsScale:any;
  private data_converted:any;
  private data:any[];
  private subgroups;
  private groups;
  private maxValues:number[];
  @Input() inputData:TestData[];
  ngOnInit(): void {
    this.getSelectedQuater();
  }
  getSelectedQuater(){
    let str = "Status";
    let temp_data_keys;
    // choose legends value
        this.data_converted = this.inputData.reduce((acc, value) => {
          // Group initialization
          if (!acc[value[str]]) {
            acc[value[str]] = [];
          }
          // Grouping
          acc[value[str]].push(value);
          return acc;
        }, {});
        this.data_converted["Total"] = this.inputData;
        this.data = Object.keys(this.data_converted).map((ele,index,array)=>{
            let obj:any={};
            obj[str] = ele;
            let temp_data = this.data_converted[ele].reduce((acc, value) => {
              // Group initialization
              if (!acc[value["System_Name"]]) {
                acc[value["System_Name"]] = [];
              }
              // Grouping
              acc[value["System_Name"]].push(value);
              return acc;
            }, {});
            if(!temp_data_keys){
              temp_data_keys = Object.keys(temp_data);
            }
            temp_data_keys.map(ele=>{
              obj[ele] = temp_data[ele]? temp_data[ele].length :0
            })
            return obj;
        })
    this.createSvg();
    this.createGraphVariables()
    this.createXScale();
    this.createYscale();
    this.createBarChart();
    this.createLegend();
  }
  private createSvg(): void {
    this.svg = d3.select("figure#stackedBar")
    .append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom);

  }
  private createGraphVariables(){
    this.subgroups = Object.keys(this.data[0]).slice(1);
    this.groups = this.data.map(d => (d.Status));
    let newData = [...this.data];
    this.maxValues = newData.map(obj => Object.values(obj))
    .map(ele => ele.filter(child=> !isNaN(+child))).map(ele=>ele.reduce((total, num) => {
      return +total + Math.round(+num);
    }),0) as number[];
  }
  private xScale;
  private yScale;
  private createXScale(){
    this.xScale = d3.scaleBand()
    .domain(this.groups)
    .range([0, this.width])
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", `translate(${this.margin.left},${this.margin.top})`)
    .append("g")
    .attr("transform", `translate(0, ${this.height})`)
    .call(d3.axisBottom(this.xScale).tickSizeOuter(0));

  }
  private createYscale(){
    this.yScale = d3.scaleLinear()
    .domain([0, d3.max(this.maxValues)])
    .range([ this.height, 0 ]);

    this.svg.append("g")
    .attr("transform", `translate(${this.margin.left},${this.margin.top})`)
    .append("g").call(d3.axisLeft(this.yScale));
  }

  private createBarChart(){
    // color palette = one color per subgroup
    const color = d3.scaleOrdinal<string>()
      .domain(this.subgroups)
      .range(this.colorArray)

    //stack the data? --> stack per subgroup
    debugger
    const stackedData = d3.stack()
      .keys(this.subgroups)(this.data as any);

    // Show the bars
    this.svg.append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`).append("g")
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
        if(event.target.__data__.data.Status === "Total"){
          searchString = {System_Name:selectedTestItem};
        }else{
          searchString = {System_Name:selectedTestItem,Status:event.target.__data__.data.Status};
        }
        this.dataService.announceMission(searchString)
      })
      .on("mouseover", function(d,i){
      })
      .on("mouseout",function(){
      })
      .attr("x", d => this.xScale(d.data.Status.toString()))
      .attr("y", d => this.yScale(d[1]))
      .attr("height", d => (this.yScale(d[0]) - this.yScale(d[1])))
      .attr("width",this.xScale.bandwidth());

      this.colorsScale = d3.scaleOrdinal()
      .domain(this.subgroups)
      .range(this.colorArray);
  }
  private createLegend(){
    let legendBase = this.svg.append('g')
    .attr(
      "transform",
      "translate(" + 20 + "," +
      (this.height + Math.round((this.margin.bottom + this.margin.top)/2)) + ")"
    )
    .attr('class', 'legend');

    legendBase.selectAll('circle')
    .data(this.subgroups)
    .enter().append('circle')
    .attr('cx',(d,i) => { return (Math.round(this.width/this.subgroups.length) * (i))+5 })
    .attr('r',6).attr("fill",(d, i) => (this.colorsScale(i)));

    legendBase.selectAll('text')
    .data(this.subgroups)
    .enter().append('text')
    .text((d) => { return d; })
    .style('fill', (d, i) => this.colorsScale(i))
    .attr('x', (d, i) => (Math.round(this.width/this.subgroups.length) * (i))+15 )
    .attr('y', 5)
  }
}
