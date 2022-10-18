let FALogo = document.getElementById("FALogo");

let doomsDayMinutes = 1.66;
let doomsDayScaler = map(doomsDayMinutes, 17, 0, 100, 0);

FALogo.style.webkitMaskImage = `linear-gradient(0deg, transparent 0%, rgba(0,0,0,1) ${doomsDayScaler}%)`;

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
//Thanks to Chris Coyier for how to parse RSS to string
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