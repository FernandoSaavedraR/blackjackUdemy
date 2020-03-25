/**
 * XXC = CLUBS (TREBOLES)
 * XXH = HEARTS (CORAZONES)
 * XXD = DIAMONDS (DIAMANTES)
 * XXS = SPADES (ESPADAS)
 */
const NEWGAME = document.querySelector('#newGame');
const REQUESTC = document.querySelector('#requestC');
const STOP = document.querySelector('#stop');
const PLAYERSMALL = document.querySelectorAll('small')[0];
const PCSMALL = document.querySelectorAll('small')[1];
const PLAYERCARDS = document.querySelector('#player-cards');
const PCCARDS = document.querySelector('#computer-cards');
let deck = [];
const types = ['C', 'D', 'H', 'S']; //tipos de cartas
const figures = ['A', 'J', 'Q', 'K']; //figuras existentes
let playerPoints = 0;
let pcPoints = 0;
const createDeck = () => { //se crea una baraja

    for (let i = 2; i <= 10; i++) //creamos las cartas numericas
        for (let type of types)
            deck.push(`${i}${type}`);

    for (let type of types) //creamos las figuras
        for (let figure of figures)
            deck.push(`${figure}${type}`)

    deck = _.shuffle(deck); //revolvemos deck

    return deck; //regresamos deck
};

const requestCard = () => { //pedir una carta 
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();

    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? ((value === 'A') ? 11 : 10)
        : (parseInt(value));


}
const createCardIMG = (card)=> {
    const cardImg = document.createElement('img');
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.classList.add('cards');
    return cardImg
}
const reset = ()=>{
    playerPoints = 0;
    pcPoints = 0;
    PLAYERSMALL.innerHTML = playerPoints;
    PCSMALL.innerHTML = pcPoints;
    PCCARDS.innerHTML="";
    PLAYERCARDS.innerHTML="";
    deck = [];
    createDeck();
    REQUESTC.disabled = false;
    STOP.disabled = false;
    NEWGAME.disabled = false;false
}

const endGame = (points)=>{
    if(playerPoints ===21){
        console.warn('ganaste!');
        REQUESTC.disabled = true;
        STOP.disabled = true;
    }
    if (playerPoints > 21){
        console.warn('Lo siento, perdiste');
        REQUESTC.disabled = true;
        STOP.disabled = true;
    }
}
REQUESTC.addEventListener('click', () => {
    const card = requestCard();
    playerPoints += cardValue(card);
    PLAYERCARDS.append(createCardIMG(card));
    PLAYERSMALL.innerHTML = playerPoints;
    endGame(playerPoints);

});
NEWGAME.addEventListener('click',reset);


createDeck();