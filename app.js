
let scores, roundScore, activePlayer, gamePlaying;

//calls function to initialize the game
window.addEventListener('load', init);

// event to roll the dice when a player clicks on the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    
        //creates random number
        let dice1 = Math.floor(Math.random() * 6 ) + 1;
        let dice2 = Math.floor(Math.random() * 6 ) + 1;
        
        
            if (dice1 === 6 && dice2 === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }else {
                //display the result
                let diceDOM1 = document.querySelector('#dice-1');
                let diceDOM2 = document.querySelector('#dice-2');
                diceDOM1.style.display = 'block';
                diceDOM1.src = 'Images/dice-' + dice1 + '.png';
                diceDOM2.style.display = 'block';
                diceDOM2.src = 'Images/dice-' + dice2 + '.png';
                //adds current score if none of the dices are 1, - change turn and reset current score if one of the dices are 1
                if(dice1 !== 1 && dice2 !== 1){
                    roundScore += dice1 + dice2;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } else {
                    //next Player
                    nextPlayer();
                }
            }   
    }
});

// adds an event to the HOLD button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //the player is able to choose the final score
        let scoreInput;
        let winnerScore;
        scoreInput = document.querySelector('.scoreInput').value;
        
        if(scoreInput){
            winnerScore = scoreInput;
        } else{
            winnerScore = 100;
        }
        
        //check if player won the game
        if (scores[activePlayer] >= winnerScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            //next player
            nextPlayer();
        }
    }
})

// function to change player turns
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'

        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')

        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';

}

// adds event listener to New game button, and initialize new game
document.querySelector('.btn-new').addEventListener('click', init);

//function to initialize the game
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}