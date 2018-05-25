/*
 * Create a list that holds all of your cards
 */
/*const singleCardArray = ['<li class="card"> <i class="fa fa-diamond"></i></li>', '<li class="card"> <i class="fa fa-paper-plane-o"></i></li>', 
'<li class="card"> <i class="fa fa-anchor"></i></li>', '<li class="card"> <i class="fa fa-leaf"></i></li>', '<li class="card"> <i class="fa fa-bicycle"></i></li>"',
'<li class="card"> <i class="fa fa-bomb"></i></li>', '<li class="card"> <i class="fa fa-cube"></i></li>', '<li class="card"> <i class="fa fa-bolt"></i></li>'];*/
const singleCardArray = ["diamond", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "cube", "bolt"];
let cardArray= [];


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    //in the while cycle the random selected card and the currentIndexed card are switched 16 times 
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//create an array with the duplicate of the cards in singleCardArray
for (var i = 0; i < singleCardArray.length; i++) {
    cardArray.push(singleCardArray[i]);
    cardArray.push(singleCardArray[i]);
}
console.log(cardArray);

//shuffle cards

shuffle(cardArray);


//loop through and create HTML

const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>

for (let i = 0; i < 16; i++) {
    const newListElement = document.createElement("li");
    newListElement.className = "card open show";
    const newIcon = document.createElement("i");
    newIcon.className = "fa fa-" + cardArray[i];
    newListElement.appendChild(newIcon);

    fragment.appendChild(newListElement);
}

const deck = document.querySelector(".deck");


//add each card's HTML to the page
deck.appendChild(fragment); // reflow and repaint here -- once!

// Shuffle function from http://stackoverflow.com/a/2450976



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
