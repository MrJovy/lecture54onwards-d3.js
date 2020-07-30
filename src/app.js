import * as d3 from 'd3';
import './style.css';
import './geo_data.json';
import './us.json'; //! need to import the json script

var chart_width = 800;
var chart_height = 600;

//! Projection 
var path = d3.geoPath()
    .projection(d3.geoAlbers());
//!Create SVG
var svg =
    d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height)

console.log("bye");

//! Data
// d3.json('geo_data.json', function (data) {
//     svg.selectAll('path')
//         .data(data)
//         .enter()
//         .append('path')
//         .attr('d', path);
// });

d3.json('/src/us.json').then(function (data) {
    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', 'black');
})