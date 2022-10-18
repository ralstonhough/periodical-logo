// let cnv;
let score;
let ratio;
let FALogo = document.getElementById("FALogo");

let faRSS = `https://www.foreignaffairs.com/rss.xml`;

fetch(faRSS)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        let faText = "";
        let titles = data.querySelectorAll("title");
        let descriptions = data.querySelectorAll("description");
        for (let i = 1; i < 11; i++) {
            let desText = descriptions[i].innerHTML;
            let titText = titles[i].innerHTML
            console.log(desText);
            console.log(titText);
            faText += desText;
            faText += titText;
        };
        let options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b156c9de98msh2063c059199c53ep1b56a0jsnace2ff8f093f',
                'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
            }
        };
        
        fetch(`https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=${faText}`, options)
            .catch(err => console.error(err))
            .then(response => response.json())
            .then(response => {
                let score = response.score;
                let ratio = response.ratio;
                let scoreScaler = map(score, 1, -1, .025, .22);
                console.log(scoreScaler);
                console.log(response);
                console.log(`Score: ${score}`);
                console.log(`Ratio: ${ratio}`);
                FALogo.style.transform = `translate(-50%,0) scale(.025,${scoreScaler})`;
            });
    });

// function preload() {
//     title = loadImage("FAlogo.png");
// };

// function setup() {
//     cnv = createCanvas(700,1000);
//     centerCanvas();
//     setGradient(color(255), color(0));
// };

// function draw() {
//     setGradient(color(255), color(0));
//     imageMode(CENTER);
//     scale(.05);
//     translate(width*9,height*9);
//     image(title, width/2, -7000);
// };

// function centerCanvas() {
//     cnv.position((windowWidth - width) / 2, 0);
// };

// function windowResized() {
//     centerCanvas();
// };

// function setGradient(c1, c2) {
//     // noprotect
//     noFill();
//     for (var y = 0; y < height; y++) {
//       var inter = map(y, 0, height, 0, 2);
//       var c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(0, y, width, y);
//     }
//   };
//gradient code taken from REAS on p5 website

// let sentiment = document.getElementById("sentiment");
// let doomsDay = document.getElementById("doomsDay");
// let background = document.getElementById("background");
// let title = document.getElementById("title");

// let sentimentScaler = map(sentiment.value,1,1000,1,8);
// title.style.transform = `translate(-50%, 0%) scale(1,${sentimentScaler})`;

// let doomScaler = map(doomsDay.value,1,100,100,1);
// title.style.color = `hsl(0, 0%, ${doomScaler}%)`;

// sentiment.oninput = function() {
//   let sentimentScaler = map(sentiment.value,1,1000,1,8);
//   title.style.transform = `translate(-50%, 0%) scale(1,${sentimentScaler})`;
// };

// doomsDay.oninput = function() {
//   let doomScaler = map(doomsDay.value,1,100,100,1);
//   title.style.color = `hsl(0, 0%, ${doomScaler}%)`;
// };


// No Touch
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}