/*
 * Create a list that holds all of your cards
 */
//variable declarations
const singleCardArray = ["diamond", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "cube", "bolt"];
let cardArray= [];
const deck = document.querySelector(".deck"); //ehhez adom az event listenert
const cards = deck.getElementsByClassName("card");
let openArray = [];
let moveCounter = 0;
let countTilWin = 0;
const lightBox = document.querySelector('.lightBox');
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");
let text = "";
let numberOfMoves;
let numberOfStars = 3;
let second = 0;
let minute = 0;
const timer = document.querySelector('.timer');
let interval;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//function to show the symbol on the card
function showSymbol(event){
    event.target.className = "card open show viewed";
}

//function to add card to the open array and check if they open cards are the sam
function addCardToOpenArray(event){
    openArray.push(event.target.querySelector('i').className);
    if (openArray.length == 2){ 
        if(openArray[1] === openArray[0]){
            deck.style.pointerEvents = "none";
            event.target.className = "card open show match";
            deck.querySelector(".viewed").className = "card open show match";
            countTilWin++;
            setTimeout(function() {
                if(countTilWin === 8 ){
                    clearInterval(interval);
                    displayWinningMessage();
                    document.querySelector(".lightBox").style.display = "block";
                }}, 500);
            setTimeout(function(){
                deck.style.pointerEvents = "auto";
            }, 1600);
        }else{
            deck.style.pointerEvents = "none";
            setTimeout(function(){
                event.target.className ="card unmatch";
                deck.querySelector(".viewed").className = "card unmatch";
            }, 800);
            setTimeout(function(){
                event.target.className ="card";
                deck.querySelector(".unmatch").className = "card";
                deck.style.pointerEvents = "auto";
            }, 1600);
        }
        openArray = [];
    }
}

//function for the move counter and to change the number of stars
function incrementMoveCounter(){
    moveCounter++;
    numberOfMoves = moveCounter/2;
    document.getElementsByClassName("moves")[0].innerHTML = " " + numberOfMoves.toFixed(0) + " moves";
    if (moveCounter === 30){
        stars.removeChild(document.querySelector("li"));
        numberOfStars = 2;
    }else if (moveCounter === 50){
        stars.removeChild(document.querySelector("li"));
        numberOfStars = 1;
    }else if (moveCounter === 70){
        stars.removeChild(document.querySelector("li"));
        numberOfStars = 0;
    }
    if (moveCounter === 1){
        startTimer();
    }
}

//to fill in the content of the lightbox, that is shown when the player turned all the cards
function displayWinningMessage(){
    for(let i = 0; i < numberOfStars; i++){
        text += '<li><i class="fa fa-star"></i></li>';
    }
    document.getElementsByClassName("moves")[1].innerHTML = " " + numberOfMoves.toFixed(0) + " moves ";
    document.getElementsByClassName("numberOfStars")[0].innerHTML = text;
    if(minute === 0){
        document.getElementsByClassName("timerToMessage")[0].innerHTML = " " + second + "sec";
        }else{
            document.getElementsByClassName("timerToMessage")[0].innerHTML = " " + minute + " min " + second + "sec";
        }
    }

function startTimer(){
    interval = setInterval(function(){
        if(minute > 0){
            timer.innerHTML = minute + " min " + second + "sec";
        }else{
            timer.innerHTML = second + "sec";        
        }
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//create an array with the duplicate of the cards in singleCardArray
for (var i = 0; i < singleCardArray.length; i++) {
    cardArray.push(singleCardArray[i]);
    cardArray.push(singleCardArray[i]);
}

//shuffle cards
shuffle(cardArray);

//loop through the cardArray and create HTML
const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>
for (let i = 0; i < 16; i++) {
    const newListElement = document.createElement("li");
    newListElement.setAttribute("id", i);
    newListElement.className = "card";
    const newIcon = document.createElement("i");
    newIcon.className = "fa fa-" + cardArray[i];
    newListElement.appendChild(newIcon);
    fragment.appendChild(newListElement);
}

//add each card's HTML to the page
deck.appendChild(fragment); // reflow and repaint here -- once!

//EventListener for the deck, if it is clicked
//this way I don't have to add EventListener to all of the cards, only one to the deck
deck.addEventListener('click', function(event){
    if ( event.target.nodeName === "LI" && openArray.length <= 1){
        showSymbol(event);
        addCardToOpenArray(event);
        incrementMoveCounter();
    }
});

//EventListener to make the lightbox disappear to a click
lightBox.addEventListener('click',function(evt){
    lightBox.style.display = "none";
});

 
//EventListener to make the lightbox disappear to the ESC button press
document.addEventListener('keydown', function(e){
    if (e.which == 27) {
        lightBox.style.display = "none";
    }
});

//EventListener for the restart button
restart.addEventListener('click', function(e){
    window.location.reload();
});




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
