import * as d3 from 'd3';
import './style.css';

// // Data
// var data = [
//     { date: 1988, num: 51 }, { date: 1989, num: 60 },
//     { date: 1990, num: 62 }, { date: 1991, num: -64 },
//     { date: 1992, num: 69 }, { date: 1993, num: 69 },
//     { date: 1994, num: 75 }, { date: 1995, num: 80 },
//     { date: 1996, num: 91 }, { date: 1997, num: 93 },
//     { date: 1998, num: 97 }, { date: 1999, num: 100 },
//     { date: 2000, num: -103 }, { date: 2001, num: 104 },
//     { date: 2002, num: 105 }, { date: 2003, num: 110 },
//     { date: 2004, num: 111 }, { date: 2005, num: 112 },
//     { date: 2006, num: 112 }, { date: 2007, num: 113 },
//     { date: 2008, num: 119 }, { date: 2009, num: 128 },
//     { date: 2010, num: 139 }, { date: 2011, num: -139 },
//     { date: 2012, num: 139 }, { date: 2013, num: 140 },
//     { date: 2014, num: 143 }, { date: 2015, num: 146 },
//     { date: 2016, num: 147 }, { date: 2017, num: 149 }
// ];
// var time_parse = d3.timeParse('%Y');
// var time_format = d3.timeFormat('%Y');
// var chart_width = 1000;
// var chart_height = 800;
// var padding = 50;

// // Format Date
// data.forEach(function (e, i) {
//     data[i].date = time_parse(e.date);
// });

// // Scales
// var x_scale = d3.scaleTime()
//     .domain([
//         d3.min(data, function (d) {
//             return d.date;
//         }),
//         d3.max(data, function (d) {
//             return d.date;
//         })
//     ])
//     .range([padding, chart_width - padding]);
// var y_scale = d3.scaleLinear()
//     .domain([
//         0, d3.max(data, function (d) {
//             return d.num;
//         })
//     ])
//     .range([chart_height - padding, padding]);

// // Create SVG
// var svg = d3.select("#chart")
//     .append("svg")
//     .attr("width", chart_width)
//     .attr("height", chart_height);

// // Create Axes
// var x_axis = d3.axisBottom(x_scale)
//     .ticks(10)
//     .tickFormat(time_format);
// var y_axis = d3.axisLeft(y_scale)
//     .ticks(12);
// svg.append("g")
//     .attr("transform", "translate(0," + (chart_height - padding) + ")")
//     .call(x_axis);
// svg.append("g")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(y_axis);





//create random data
function generateData() {
    var data = [];
    for (let i = 0; i < 10; i++) {
        let value = Math.round(d3.randomUniform(1, 50)())
        data.push(value);

    }

    return data;
}

var barChartData = generateData();
var barChartWidthPx = 800;
var barChartHeightPx = 400;
var barPadding = 5;

//?------------------------------------------------------------------------------------->
//! notice how the chart space is created by attaching an svg to a div 
//! the div is styled within the css script with its width and height fixed
//! the svg has its width and height set to the same values of its parent div
//?------------------------------------------------------------------------------------->

// Create SVG container for graph
var barChartSpace = d3.select('#bar_chart')
    .append('svg')
    .attr('width', barChartWidthPx)
    .attr('height', barChartHeightPx);

// Create scales
//?------------------------------------------------------------------------------------->
//! Follow link for scale explanation - https://observablehq.com/@d3/d3-scalelinear
//?------------------------------------------------------------------------------------->
var xScale = d3.scaleLinear()
    //?------------------------------------------------------------------------------------->
    //!The function passing an item from the data array here is called an accessor function
    //?------------------------------------------------------------------------------------->
    .domain([0, barChartData.length])
    .range([0, barChartWidthPx]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(barChartData, function (d) {
        return d;
    })])
    .range([0, barChartHeightPx]);

//?------------------------------------------------------------------------------------->
//! The height and the y axis seemed to be problematic
//! notice how the y attribute was manipulated to get the bars to be inverted
//! if y was zero, the bar chart would begin at the top of the screen and extend downward
//?------------------------------------------------------------------------------------->
//! URGENT: Observe the selectAll being called below. If the code for binding the data
//! does not include the selectAll BEFORE the data call, then the svg element will be
//! generated outside the div container
//?------------------------------------------------------------------------------------->
//! URGENT: Pay careful attention to the setup for the x and y coordinates of each
//! rectangle in the bar graph
//?------------------------------------------------------------------------------------->

barChartSpace
    .selectAll('rect')
    .data(barChartData)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        // return i * (barChartWidthPx / barChartData.length + 1) + barPadding;
        return xScale(i);
    })
    .attr('y', function (d) {
        return barChartHeightPx - d * 5;
        // return yScale(d);
    })
    .attr('width', barChartWidthPx / (barChartData.length) - barPadding
    )
    .attr('height', function (d) {
        return d * 5;
    })
    .attr('fill', 'red');


// ?---------------------------------------------------------------------------------------------------------->
// !---------------------------------------------------------------------------------------------------------->
// SCATTER PLOT

