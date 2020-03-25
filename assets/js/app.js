/**
 * XXC = CLUBS (TREBOLES)
 * XXH = HEARTS (CORAZONES)
 * XXD = DIAMONDS (DIAMANTES)
 * XXS = SPADES (ESPADAS)
 */

let deck = [];
const types = ['C', 'D', 'H', 'S']; //tipos de cartas
const figures = ['A','J','Q','K']; //figuras existentes
const createDeck = () => { //se crea una baraja

    for (let i = 2; i <= 10; i++) //creamos las cartas numericas
        for(let type of types)
            deck.push(`${i}${type}`);
        
    for(let type of types) //creamos las figuras
        for(let figure of figures)
            deck.push(`${figure}${type}`)
        
    deck = _.shuffle(deck); //revolvemos deck
    return deck; //regresamos deck
};
const requestCard = ()=>{

}
createDeck();