/**
 * XXC = CLUBS (TREBOLES)
 * XXH = HEARTS (CORAZONES)
 * XXD = DIAMONDS (DIAMANTES)
 * XXS = SPADES (ESPADAS)
 */

//patron modulo
/**
 * nos otorga una capa extra de seguridad ya nuestras variables
 * solo existen en el scope del modulo, por lo que no pueden ser
 * accedidas directamente del navegador
 * */
const ModuleBlackjack = (() => { //funcion anonima autoinvocada
    'use strict' //modo estricto

    //declaracion de componentes
    const NEWGAME = document.querySelector('#newGame'),
        REQUESTC = document.querySelector('#requestC'),
        STOP = document.querySelector('#stop'),
        PLAYERSSMALL = document.querySelectorAll('small'),
        PLAYERCARDS = document.querySelector('#player-cards'),
        PCCARDS = document.querySelector('#computer-cards');

    //declaracion de cartas
    const types = ['C', 'D', 'H', 'S'], //tipos de cartas
        figures = ['A', 'J', 'Q', 'K']; //figuras existentes


    //declaracion de variables
    let deck = [],
        playersPoints = [];//ultimo valor es la computadora

    //declaracion de funciones

    const begin = (numPlayers = 2) => {
        deck = createDeck();
        playersPoints=[];
        for (let i = 0; i < numPlayers; i++){
            playersPoints.push(0);
            PLAYERSSMALL[i].innerHTML =playersPoints[i];
        }
        PCCARDS.innerHTML = "";
        PLAYERCARDS.innerHTML = "";
        REQUESTC.disabled = false;
        STOP.disabled = false;
        NEWGAME.disabled = false;
    }
    const createDeck = () => { //se crea una baraja
        deck = [];
        for (let i = 2; i <= 10; i++) //creamos las cartas numericas
            for (let type of types)
                deck.push(`${i}${type}`);

        for (let type of types) //creamos las figuras
            for (let figure of figures)
                deck.push(`${figure}${type}`)
        return _.shuffle(deck);//regresamos deck revuelto
    };

    const requestCard = () => { //pedir una carta 
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const cardValue = (card) => {
        console.log(card)
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? ((value === 'A') ? 11 : 10)
            : (parseInt(value));
    }

    const createCardIMG = (card) => {
        const cardImg = document.createElement('img');
        cardImg.src = `assets/cards/${card}.png`;
        cardImg.classList.add('cards');
        return cardImg;
    }
    const endGame = () => {
        REQUESTC.disabled = true;
        STOP.disabled = true;
        if (playersPoints[0] === playersPoints[playersPoints.length-1]) {
            console.warn('Empate!!!');
        } else if (playersPoints[0] > 21) {
            console.warn('perdiste!!!');
        } else if (playersPoints[playersPoints.length-1] > 21) {
            console.warn('Ganaste!!');
        } else if (playersPoints[playersPoints.length-1] > playersPoints[0]) {
            console.warn('perdiste!!!');
        }

    }
    //Turn: 0 primer jugador turn: n computadora
    const getPoints = (turn, card) => {
        playersPoints[turn] += cardValue(card);
        console.log(playersPoints[turn]);
        return  playersPoints[turn];
    }
    const computerTurn = (minimalPoints) => {
        do {
            const card = requestCard();
            getPoints(playersPoints.length - 1,card);
            PCCARDS.append(createCardIMG(card));
            PLAYERSSMALL[PLAYERSSMALL.length-1].innerHTML = playersPoints[playersPoints.length-1];
            if (minimalPoints > 21) {
                break;
            }
        } while ((playersPoints[playersPoints.length-1] <= minimalPoints) && (playersPoints[playersPoints.length-1] <= 21));
        endGame();

    }
    REQUESTC.addEventListener('click', () => {
        const card = requestCard();
        console.log(card);
        const playerPoints = getPoints(0, card);
        PLAYERCARDS.append(createCardIMG(card));
        PLAYERSSMALL[0].innerHTML = parseInt(playersPoints);
        if (playerPoints > 21) {
            computerTurn();
        }

    });
    NEWGAME.addEventListener('click', ()=>{
        begin();
    });

    STOP.addEventListener('click', () => {
        computerTurn(playersPoints[0]);

    })
    return {
        newGame: begin,
    };

})();

