//HTML Elements
var listing = document.getElementById('listing-group');
var questions = document.getElementById('question');
var timer = document.getElementById('time');
var endResults = document.getElementById('final');
var timeNotation = document.getElementById('time-note');
var startGame = document.getElementById('startBtn');
var imgEl = document.createElement('img');

//Counters
var index = 0;
var right = 0;
var wrong = 0;
var unAnswered = 0;

//Current & Comparison  
var currQuestion;
var opt;
var answer;
var selected;

//Timer
var countDown = 10;
var countD;
timer.innerHTML = countDown;

//Functions
function startMe() {

    startGame.remove() //Gets Rid of new game btn after first game play
    getQuestion()
    timerMe()
}


function timerMe() {

    timeNotation.style.visibility = 'visible';
    countD = setInterval(function () {

        countDown--
        if (countDown === 0) { //If out of Time, then below Displays
            unAnswered++
            clearInterval(countD)
            listing.innerHTML = '';
            questions.innerHTML = 'OUT OF TIME! ANSWER: ' + answer;
            imgEl.setAttribute("src", "assets/images/timeout.webp")
            listing.append(imgEl);

            setTimeout(function () {
                resetMe()
            }, 4000);
        }
        timer.innerHTML = countDown;

    }, 1000);
}

function getQuestion() {

    var questions = [
        { q: 'Which fictional city is the home to Batman?', o: ['San Francisco', 'Oakland', 'L.A.', 'Gotham'], a: 'Gotham' },
        { q: 'In which sport would you perform the Fosbury Flop?', o: ['Pole Vault', 'Hammer Throw', 'High Jump', 'Baseball'], a: 'High Jump' },
        { q: 'Spinach is high in which mineral?', o: ['Iron', 'Aluminium', 'Uranium', 'Zinc'], a: 'Iron' },
        { q: 'What is a Geiger Counter used to detect?', o: ['Messy Rooms', 'Radiation', 'Gasoline', 'Carbon Monoxide'], a: 'Radiation' },
        { q: 'Who directed the movie Jaws?', o: ['Brian Griffin', 'Martin Scorsese', 'Steven Spielberg', 'Wes Anderson'], a: 'Steven Spielberg' },
        { q: 'Which part of the body would a chiropodist treat?', o: ['Feet', 'Back', 'Elbows', 'Left Pinky'], a: 'Feet' },
    ]

    currQuestion = questions[index].q;
    opt = questions[index].o;
    answer = questions[index].a;

    renderMe(currQuestion, opt);
}


function renderMe(curQ, optArr) {

    questions.innerHTML = curQ;

    for (var i = 0; i < optArr.length; i++) {
        console.log(optArr[i])

        var newEl = document.createElement('li');
        newEl.classList.add("list-group-item");
        newEl.setAttribute("onclick", "compareMe(event)");
        newEl.innerHTML = optArr[i];
        listing.append(newEl);
    }
}

function compareMe(event) {

    selected = event.target.innerHTML;

    if (selected === answer) {
        clearInterval(countD)

        right++
        listing.innerHTML = '';
        questions.innerHTML = 'CORRECT!!';
        imgEl.setAttribute("src", "assets/images/correct.webp")
        listing.append(imgEl);

        setTimeout(function () {
            resetMe()
        }, 4000);
    } else {
        console.log('WRONG!')
        clearInterval(countD)

        wrong++
        questions.innerHTML = 'WRONG! CORRECT ANSWER: ' + answer;
        listing.innerHTML = '';
        imgEl.setAttribute("src", "assets/images/wrong.webp")
        listing.append(imgEl);

        setTimeout(function () {
            resetMe()
        }, 4000);
    }
}

//Resets after each Question
function resetMe() {
    if (index >= 5) {
        countDown = 10;
        listing.innerHTML = '';
        questions.innerHTML = 'Final Results';
        var restartButton = document.createElement('button');
        restartButton.setAttribute("onclick", "restartMe()");
        restartButton.setAttribute("class", "btn");
        restartButton.setAttribute("class", "btn-primary");
        restartButton.setAttribute("id", "restartBtn");
        restartButton.innerHTML = 'Start Over?';
        listing.innerHTML = `
        <h4>Correct Answers: ${right}</h4>
        <h4>Incorrect Answers: ${wrong}</h4>
        <h4>Unanswered: ${unAnswered}</h4>
        `
        listing.append(restartButton);
    } else {
        listing.innerHTML = ' ';
        questions.innerHTML = ' ';
        countDown = 10;
        timer.innerHTML = countDown;

        index++

        getQuestion()
        timerMe()
    }

}

//Restarts the entire Game after first round
function restartMe() {

    questions.innerHTML = ' ';
    listing.innerHTML = ' ';
    right = 0;
    wrong = 0;
    unAnswered = 0;
    countDown = 10;
    timer.innerHTML = countDown;
    index = 0;

    getQuestion()
    timerMe()
}