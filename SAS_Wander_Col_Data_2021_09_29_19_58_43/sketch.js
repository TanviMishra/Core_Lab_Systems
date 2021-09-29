// Perlin Noise:https://editor.p5js.org/codingtrain/sketches/XH2DtikuI

let contours=[];
let target=[];
let targetTemp=[];
let lat=[];
let long=[];
let i;
let totalNum = 12;
let data;
let obj,activity;
let latLong=[[12.9,13],[77.5,77.9]]
let count=0;
function preload(){
  data = loadJSON("data.json");
}
function setup() {
  createCanvas(600,300);
  //background("#d7ebbc");
  background(0);
  for(obj in data.timelineObjects){
      for(activity in data.timelineObjects[obj].placeVisit){
        latTemp=data.timelineObjects[obj].placeVisit[activity].latitudeE7;
        longTemp=data.timelineObjects[obj].placeVisit[activity].longitudeE7;
        
        lat.push(map(latTemp/10000000,latLong[0][0],latLong[0][1],0,width));
        long.push(map(longTemp/10000000,latLong[1][0],latLong[1][1],0,height));            
    }
  }

  for(i=0;i<lat.length;i++){
      targetTemp[i] = createVector(lat[i],long[i]);
      if(targetTemp[i].x!=0){
        contours[count] = new Vehicle(random(0), random(height));
        target[count] = createVector(lat[i],long[i]);
        count++;
    }
  }
}

function draw() {
  
  for(i=0; i< contours.length; i++){
    contours[i].wander();
    contours[i].update();
    contours[i].show();
    contours[i].edges();
    
    let steering = contours[i].arrive(target[i]);
    contours[i].applyForce(steering);
  }
}

