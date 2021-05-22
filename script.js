function rpsGame(yourChoice){
    console.log(yourChoice.id);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice,botChoice); // [0,1] human lost | bot won
    message = finalMessage(results); // {'message':'You Won', 'color':'green'}

    rpsFrontEnd(humanChoice,botChoice,message);
    console.log(results);
    console.log(humanChoice,botChoice);
    console.log(message);
}   

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,botChoice){
    var rpsDatabase = {
        'rock' : {'scissors': 1, 'rock': 0.5, 'paper':0},
        'paper' : {'scissors': 0, 'rock':1, 'paper':0.5},
        'scissors' : {'scissors':0.5, 'rock': 0, 'paper':1} 
    }

    var yourScore = rpsDatabase[yourChoice][botChoice];
    var computerScore = rpsDatabase[botChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if(yourScore === 0){
        return {'message':'You Lost', 'color':'Red'};
    }

    else if(yourScore === 0.5){
        return {'message':'It is a tie','color':'yellow'};
    }

    else{
        return {'message':'You Won!','color':'green'};
    }
}

function rpsFrontEnd(yourChoice,botChoice,finalMessage){
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
     
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[yourChoice] + "' style='box-shadow: 0px 10px 50px blue; padding: 30px;'>";
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding: 30px;' >" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botChoice] + "' style='box-shadow: 0px 10px 50px red; padding: 30px;'>";    
    document.getElementById('game').appendChild(humanDiv);
    document.getElementById('game').appendChild(messageDiv)
    document.getElementById('game').appendChild(botDiv);

}