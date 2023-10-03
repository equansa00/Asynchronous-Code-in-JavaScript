const cardsContainer = document.getElementById("cardsContainer");

const displayCardImage = (imageUrl) => {
  const cardImg = document.createElement("img");
  cardImg.src = imageUrl;
  cardImg.alt = "Card Image";
  cardImg.style.width = "100px"; // You can adjust the size as needed
  cardsContainer.appendChild(cardImg);
};

// Single card from a newly shuffled deck
const singleCard = () => {
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => response.json())
    .then(data => {
      console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
      displayCardImage(data.cards[0].image);  // Display the card image
    })
    .catch(error => {
      console.error("Error fetching the card:", error);
    });
};

// Two cards from the same deck
const twoCardsFromDeck = () => {
  let deckId;

  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => response.json())
    .then(data => {
      console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
      displayCardImage(data.cards[0].image);  // Display the card image
      deckId = data.deck_id;
      return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    })
    .then(response => response.json())
    .then(data => {
      console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
      displayCardImage(data.cards[0].image);  // Display the card image
    })
    .catch(error => {
      console.error("Error fetching the two cards:", error);
    });
};

