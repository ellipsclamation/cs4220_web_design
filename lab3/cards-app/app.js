const
    cards = require('deckofcards'),
    inquirer = require('inquirer')

const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            console.log('-- CARDS --')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })

            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
}

// HINT for #3 in Lab
const discardPrompt = (result) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select cards to throw away',
        name: 'cards',
        choices: 
            result.cards.map(card => choice = {name: `${card.value} of ${card.suit}`, value: card.code})
        ,
        validate: (answer) => {
            if (answer.length > 4) {
                return 'You can only throw away up to 4 cards.'
            }
            return true
        }
    }])
    .then(answers => {
        let hand = findAndRemove(result, answers)
        cards.draw(result.deck_id, answers.cards.length)
            .then(result => {
                result.cards = result.cards.concat(hand.cards)
                print(result)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {
    throwaway.cards.forEach(answer => {
        current.cards = current.cards.filter(card => card.code != answer)
    })
    
    return current
}

// HINT for #6 in Lab
const print = cards => {
    console.log('-- CARDS --')
    cards.cards.forEach(card => {
        console.log(`${card.value} of ${card.suit}`)
    })

    console.log('-- REMAING CARDS --')
    console.log(cards.remaining)
}

const play = () => {
    cards.deck(true)
        .then(deck => cards.draw(deck.deck_id, 5))
        .then(result => {
            discardPrompt(result)
        })
        .catch(err => console.log(err))
}

module.exports = {
    draw,
    play
}
