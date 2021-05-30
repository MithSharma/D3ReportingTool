import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-oem-pie-chart',
  templateUrl: './oem-pie-chart.component.html',
  styleUrls: ['./oem-pie-chart.component.scss']
})
export class OemPieChartComponent implements OnInit {

  constructor() { }
  private data = [
    {"status": "Passed", "number_of_test_cases": "64"},
    {"status": "Failed", "number_of_test_cases": "31"},
    {"status": "Invalid", "number_of_test_cases": "5"},
  ];
  private svg;
  private margin = 20;
  private width = 250;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)

  }
  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.number_of_test_cases.toString()))
    .range(["#4876ff", "#ffb42e", "#daa520"]);
  }
  private createLegends():void {
    let legendBase = this.svg.append('g')
        .attr(
          "transform",
          "translate(" + 0 + "," + (this.height - 30) + ")"
        )
        .attr('class', 'legend');

        legendBase.selectAll('circle')
        .data(this.data)
        .enter().append('circle')
        .attr('cx',(d,i) => { return (this.width/3 * (i))+10 })
        .attr('r',6).attr("fill",(d, i) => (this.colors(i)));

        legendBase.selectAll('text')
        .data(this.data)
        .enter().append('text')
        .text((d) => { return d.status; })
        .style('fill', (d, i) => this.colors(i))
        .attr('x', (d, i) => (this.width/3 * (i))+20 )
        .attr('y', 5)
  }
  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.number_of_test_cases));
    this.svg.append("g")
    .attr(
      "transform",
      "translate(" + (this.width/2 - 35) + "," + (this.height/10) + ")"
    ).append('text').text("Overall").style("font-size", "25px").style("font-weight", "bold");
    // Build the pie chart
    let p =this.svg.append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    ).selectAll('pieces')
    .data(pie(this.data))
    .enter()

    p.append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);


    p.append('text')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .text(d => d.data.status)
    .attr("transform", (d) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);

}
  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.createLegends();
  }

}
