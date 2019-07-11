const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Player {
  constructor(card) {
    this.hand = [];
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cards = [];
  }

  createDeck() {
    this.suits.forEach(suit => {
      this.values.forEach(value => {
        this.cards.push(new Card(suit, value));
      });
    });
    this.shuffle();
  }

  shuffle() {
    for (let i = 0; i < 10000; i++) {
      const randomIndex= Math.floor(Math.random() * 52);
      const randomCard = this.cards.splice(randomIndex, 1)[0];
      this.cards.push(randomCard);
    }
  }

  // 52 cards
  // 4 suits
  // 13 values
  // shuffle function
}

class Game {
  constructor() {
    this.deck = '';
    this.player = new Player();
    this.dealer = new Player();
  }

  getFreshDeck() {
    const deck = new Deck();
    deck.createDeck();
    deck.shuffle();
    this.deck = deck;
  }

  start() {
    console.log('\n=========================================');
    console.log(' WELCOME TO BLACKJACK');
    console.log('========================================= \n \n');

    this.getFreshDeck();

    // Deal to players
    this.dealCard(this.player);
    this.dealCard(this.dealer);
    this.dealCard(this.player);
    this.dealCard(this.dealer);
    
    this.printHands();

    this.runTurn();
  }

  async runTurn() {
    this.askToHit().then(res => {
      if (res) {
        this.dealCard(this.player);
        this.printHands();
      }
    })
  }

  askToHit(player, dealer) {
    return new Promise(function(resolve, reject) {
      rl.question('Hit or stay? press h / s ', (answer) => {
        if (answer === 'h') {
          resolve(true);
        } else {
          reject(false);
        }    
        rl.close();
      });
    });



    console.log('hit it!');
  }

  dealCard(dealTo) {
    dealTo.hand.push(this.deck.cards.pop());
  }

  printHands() {
    console.log(`Player's hand:`);
    console.log(this.player.hand.forEach(card => card.value));
    console.log(`Dealer's hand: ${this.dealer.hand[0].value} - ${this.dealer.hand[1].value} \n \n`);
  }

  // printHands() {
  //   console.log(`Player's hand: ${player.hand[0].value} - ${player.hand[1].value} \n`);
  //   console.log(`Dealer's hand: ${dealer.hand[0].value} - ${dealer.hand[1].value} \n \n`);
  // }

  checkWinner(playerHand, dealerHand) {
    const lookup = {
      A: 11,
      K: 10,
      Q: 10,
      J: 10,
      '10': 10,
      '9': 9,
      '8': 8,
      '7': 7,
      '6': 6,
      '5': 5,
      '4': 4,
      '3': 3,
      '2': 2,
    };

    let playerSum = 0;
    let dealerSum = 0;

    // check if player hand is greater than or equal to dealer hand
    playerHand.forEach(card => {
      playerSum += lookup[card.value];
    });

    dealerHand.forEach(card => {
      dealerSum += lookup[card.value];
    });

    if (playerSum > dealerSum && playerSum <= 21) {
      console.log('Player Wins! \n \n');
    } else if (dealerSum > playerSum && dealerSum <= 21) {
      console.log('Dealer Wins! \n \n');
    } else if (playerSum === dealerSum) {
      console.log("It's a draw! \n \n");
    }
  }
}

const game = new Game();
game.start();
