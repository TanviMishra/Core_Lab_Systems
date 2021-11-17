//opening the side navigation
function openNav() {
  document.getElementById("sidenav").style.width = "20vw";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

//Pol Party information display
function showDesc(polParty) {
  if (polParty==0){
    var x = document.getElementById("BJP");
  }
  else if (polParty==1){
    var x = document.getElementById("INC");
  }
  else if (polParty==2){
    var x = document.getElementById("CPI-M");
  }
  else if (polParty==3){
    var x = document.getElementById("CPI");
  }
  else if (polParty==4){
    var x = document.getElementById("NCP");
  }
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

let p_f_hand = document.getElementById("p_f_hand");
let p_f_text = document.getElementById("p_f_text");
let p_f_cash = document.getElementById("p_f_cash");

let donations_coin = document.getElementById("donations_coin");
let donations_cash = document.getElementById("donations_cash");
let donations_text = document.getElementById("donations_text");

window.addEventListener('scroll', function(){
  let value = window.scrollY;
  //index.html
  p_f_hand.style.top = value * 0.3 +'px';
  p_f_cash.style.top = value * -0.2 +'px';
  p_f_text.style.top = value * 0.75 +'px';
})
window.addEventListener('scroll', function(){
  let value = window.scrollY;
  //timeline.html
  donations_coin.style.top = value * 1.25 +'px';
  donations_cash.style.top = value * 0.5 +'px';
  donations_text.style.top = value * 0.75 +'px';
})
window.addEventListener('scroll', function(){
  let value = window.scrollY;
})
//D3 Map Funnction: 
//zoom
let zoom = d3.zoom()
	.on('zoom', handleZoom);

function handleZoom(e) {
	d3.select('zoomingElelment')
		.attr('transform', e.transform);
  d3.select('zoomingElelment')
		.attr('transform', e.transform);
}

function initZoom() {
	d3.select('#my_dataviz')
		.call(zoom);
}
// The svg
var svg1 = d3.select("#my_dataviz"),
    width = +svg1.attr("width"),
    height = +svg1.attr("height");

var svg2 = d3.select("#my_dataviz_2"),
    width = +svg2.attr("width"),
    height = +svg2.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([82.8,22.5]) // GPS of location to zoom on
    .scale(1200) // This is like the zoom
    .translate([ width/2, height/2 ])

async function loadData(){
  let json=await d3.json("https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States");
  let csv=await d3.csv("assets/data/Donations_1-3000.csv");
  ready(json,csv);
}
function ready(dataGeo, data) {
  // Create a color scale
  var partyExtra = d3.groups(data, function(d){return(d.Party)})
  var party=partyExtra.map( function(d){return(d[0])})
  var color = d3.scaleOrdinal()
    .domain(party)
    .range(["assets/img/logo_transparent/BJP.png","assets/img/logo_transparent/CPI-M.png","assets/img/logo_transparent/INC.png","assets/img/logo_transparent/BJP.png", "assets/img/logo_transparent/NCP.png"]);

  // Draw the map
  svg1.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#ffeed0")
        .attr("stroke", "#12193a")
        .attr("stroke-width", 0.5)
        .attr("d", d3.geoPath()
            .projection(projection)
        )

  svg1.append("g")
      .selectAll("myCircles")
      .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<500 }))
      .enter()
      .append("image")
      .attr("x", function(d){ return projection([+d.lon, +d.lat])[0] })
      .attr("y", function(d){ return projection([+d.lon, +d.lat])[1] })
      .attr('xlink:href', function(d){ return color(d.Party)})
      .attr('width', 20)
      .attr('height', 20)
      .attr("fill-opacity", .5)

  svg2.append("g")
  .selectAll("path")
  .data(dataGeo.features)
  .enter()
  .append("path")
    .attr("fill", "#ffeed0")
    .attr("stroke", "#12193a")
    .attr("stroke-width", 0.5)
    .attr("d", d3.geoPath()
        .projection(projection)
    )

  svg2.append("g")
      .selectAll("myCircles")
      .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<500 }))
      .enter()
      .append("image")
      .attr("x", function(d){ return projection([+d.lon, +d.lat])[0] })
      .attr("y", function(d){ return projection([+d.lon, +d.lat])[1] })
      .attr('xlink:href', function(d){ return color(d.Party)})
      .attr('width', 20)
      .attr('height', 20)
      .attr("fill-opacity", .5)
}
initZoom()
loadData()