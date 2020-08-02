import * as d3 from 'd3';
import './style.css';
import './geo_data.json';
import './us.json'; //! need to import the json script

var chart_width = 800;
var chart_height = 600;

//!Create SVG
var svg =
    d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

//! Data
d3.json('/src/us.json').then(function (data) {
    //! Projection 
    var projection = d3.geoAlbersUsa()
        .scale(1)
        .fitSize([chart_width, chart_height], data);

    var path = d3.geoPath()
        .projection(projection);


    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', 'black');
})