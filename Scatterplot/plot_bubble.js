//Create Data or load it in
//var data=[[1,2],[2,4],[3,1],[4,10]];

var data=[{x:1,y:2},{x:2,y:4},{x:3,y:1},{x:4,y:10}]



//Identify the div you want the plot to appear on
var id='#Plot';

//Create the margin areas
var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;

//Create x and y scales
var xScale = d3.scale.linear()
              .domain([0, d3.max(data, function(d) { return d.x; })])
              .range([ 0, width ]);
    
var yScale = d3.scale.linear()
		  .domain([0, d3.max(data, function(d) { return d.y; })])
		  .range([ height, 0 ]);
		 
var chart = d3.select(id)
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom');

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return xScale(d.x); } )
          .attr("cy", function (d) { return yScale(d.y); } )
          .attr("r", 8)
		  .on("mouseover",handleMouseOver)
		  .on("mouseout",handleMouseOut)
	

// Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "orange",
              r: 5 * 2
            });

            // Specify where to put label of text
            svg.append("text").attr({
               id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return xScale(d.x) - 50; },
                y: function() { return yScale(d.y) - 50; }
            })
            .text(d.x);
          }

      function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "black",
              r: 8
            });

            // Select text by id and then remove
            d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
          }
		  
		  
		  
