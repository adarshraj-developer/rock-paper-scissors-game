 let score = JSON.parse(localStorage.getItem('score')) ||{
        wins: 0,
        losses: 0,
        ties: 0
      }; 


     updateScoreElement();
 let isAutoPlaying = false;
 let intervalId;
 function autoPlay() {
 if(!isAutoPlaying){intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playergame(playerMove);
  }, 100);
  isAutoPlaying = true;
}else{
  clearInterval(intervalId);
  isAutoPlaying = false;
}
 }

 document.querySelector('.js-rock-button').addEventListener('click', () => {playergame('rock');});
  document.querySelector('.js-paper-button').addEventListener('click', () => {playergame('paper');});
    document.querySelector('.js-scissors-button').addEventListener('click', () => {playergame('scissors');});

  document.body.addEventListener('keydown', (event) => {
     if (event.key === 'r') {
       playergame('rock');
     } else if (event.key === 'p') {
       playergame('paper');
     } else if (event.key === 's') {
       playergame('scissors');
     }
  });

     function playergame(playerMove) {
      const computerMove = pickComputerMove();
      let result = '';

      if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You lose!';
        } else if (computerMove === 'paper') {
          result = 'You win!';
        } else {
          result = "It's a tie!";
        }
      } 
      else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You win!';
        } else if (computerMove === 'paper') {
          result = "It's a tie!";
        } else {
          result = 'You lose!';
        }
      } 
      else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = "It's a tie!";
        } else if (computerMove === 'paper') {
          result = 'You lose!';
        } else {
          result = 'You win!';
        }

      }

      if(result === 'You win!' ){
        document.querySelector('.js-result').innerHTML = 'You win!';
        score.wins += 1;
      }else if(result === 'You lose!'){
        document.querySelector('.js-result').innerHTML = 'You lose!';
        score.losses += 1;
      }else if(result === "It's a tie!"){
        document.querySelector('.js-result').innerHTML = "It's a tie!";
        score.ties += 1;
      }

      


      if (playerMove === 'reset score') {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
          updateScoreElement();

        return;
      }
      document.querySelector('.js-moves').innerHTML = `You
      <img src="${playerMove}-emoji.png" class="move-icon">
      <img src="${computerMove}-emoji.png" class="move-icon">
      Computer`;


      localStorage.setItem('score', JSON.stringify(score)); 

     updateScoreElement();

     
    }
    function updateScoreElement(){
      
      document.querySelector('.js-score').innerHTML = `wins=${score.wins}   losses=${score.losses}   ties=${score.ties}`;

    }

    function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = '';

      if (randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
      } else {
        computerMove = 'scissors';
      }
      

      return computerMove;
    }