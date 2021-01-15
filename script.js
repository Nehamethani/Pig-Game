'use strict';

//Selecting elements
const score0El =document.querySelector('#score--0');
const score1El =document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const buttonNew =document.querySelector('.btn--new');
const buttonRoll =document.querySelector('.btn--roll');
const buttonHold =document.querySelector('.btn--hold');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//const resetGame = document.querySelector('.btn--new');
let scores,activePlayer,playing,currentScore;

const init = function(){
   scores=[0,0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;
  
  currentEl0.textContent=0;
  currentEl1.textContent=0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//assigning the scores zero....

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//Rolling dice functioanlity
buttonRoll.addEventListener('click',function(){
    //1.Genearting a random dice roll
    if(playing){
   const dice = Math.trunc(Math.random()*6)+1;
   console.log(dice);
    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    //3.check for rolled 1:if  switch player...
    if(dice !== 1)
    {
      currentScore += dice; 
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      //currentEl0.textContent = currentScore; 
    }
    else
    {
      //SWITCH TO NEXT PLAYER............
     switchPlayer();
    }
  }

});

buttonHold.addEventListener('click',function(){
  //1.Add current score to active players score
  if(playing){
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent= scores[activePlayer];
  //2.Check if player is >=100
  if(scores[activePlayer] >= 20)
  {
    playing = false;
    diceEl.classList.add('hidden');
    document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
    document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  }
  else{
   switchPlayer();
  }
}
});

buttonNew.addEventListener('click' , init);

