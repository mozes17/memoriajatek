const symbols = ['🌟', '🍎', '🌼', '🐶', '🚀', '🎈', '🌸', '🍕', '🌞', '🦄', '🌈', '🍭'];
const numPairs = symbols.length;

// Azonos szimbólum használata minden kártyához
const initialCards = [...symbols, ...symbols];
let shuffledSymbols = shuffle(initialCards);
let openedCards = [];
let matchedPairs = 0;

const container = document.getElementById('game-container');

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // Fisher-Yates algoritmus a tömb megkeveréséhez
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;

    card.addEventListener('click', () => {
        if (openedCards.length < 2 && !openedCards.includes(card) && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            openedCards.push(card);

            if (openedCards.length === 2) {
                const [card1, card2] = openedCards;
                if (card1.textContent === card2.textContent) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;

                    if (matchedPairs === numPairs) {
                        setTimeout(() => alert('Gratulálunk, nyertél!'), 500);
                    }
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }, 1000);
                }
                openedCards = [];
            }
        }
    });

    return card;
}

for (const symbol of shuffledSymbols) {
    const card = createCard(symbol);
    container.appendChild(card);
}
