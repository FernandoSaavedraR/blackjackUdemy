/**
 * XXC = CLUBS (TREBOLES)
 * XXH = HEARTS (CORAZONES)
 * XXD = DIAMONDS (DIAMANTES)
 * XXS = SPADES (ESPADAS)
 */

let deck = [];
const types = ['C', 'D', 'H', 'S']; //tipos de cartas
const figures = ['A', 'J', 'Q', 'K']; //figuras existentes
const createDeck = () => { //se crea una baraja

    for (let i = 2; i <= 10; i++) //creamos las cartas numericas
        for (let type of types)
            deck.push(`${i}${type}`);

    for (let type of types) //creamos las figuras
        for (let figure of figures)
            deck.push(`${figure}${type}`)

    deck = _.shuffle(deck); //revolvemos deck
    console.log(JSON.stringify(deck));
    return deck; //regresamos deck
};

const requestCard = () => { //pedir una carta 
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    console.log(JSON.stringify(deck));
    console.log(carta);
    return carta;
}

const cardValue = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    console.log({ carta, valor });
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) 
    :(parseInt(valor));


}
createDeck();


console.log(cardValue(requestCard()));