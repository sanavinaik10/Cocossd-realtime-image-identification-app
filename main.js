status = "";
objects = [];
function preload(){
}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: In Detection Mode";
}
function modelLoaded(){
    console.log("Model is loaded!!");
    status = true;
}
function draw(){
    image(video, 0, 0,300,300);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("noOfObjects").innerHTML = "Number Of Objects detected:" + objects.length; 
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r,g,b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}