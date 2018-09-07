//Create Data or load it in
//var data=[[1,2],[2,4],[3,1],[4,10]];

var data=[{x:1,y:2,country:'USA',code:'001'},{x:2,y:4,country:'RUS',code:'001'},{x:3,y:1,country:'USA',code:'1003'},{x:4,y:10,country:'TUR',code:'1003'}]



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
	
	
	var cValue = function(d) { return d.country;},
    color = d3.scale.category10();
	
	var code = function(d){return d.code};

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
		  .style("fill", function(d){return color(cValue(d))})
		  .on("mouseover", function(d){return tooltip.style("visibility", "visible").text("Code: "+d.code)})
		  .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	      .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
		  ;
		  
	var legend = chart.selectAll(".legend")
      .data(color.domain())
	.enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(2," + i * 14 + ")"; });

	legend.append("rect")
      .attr("x", width)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color);

	legend.append("text")
      .attr("x", width + 16)
      .attr("y", 6)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });	  
	  
	var tooltip = d3.select("body")
	.append("div")
	.style("position", "fixed")
	.style("z-index", "10")
	.style("visibility", "hidden");
	
      
  
		  
