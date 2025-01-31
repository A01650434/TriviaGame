var triviaQuestions = [{
	question:  "Which name is not from Cletus and Brandine 44 children?",
    optionsArr: ["Crystal Meth", "Incest", "Normal-Head", "Kang Kodos"],
	answer: 3
},{
	question: "What´s  Moe’s Tavern phone number?",
	optionsArr: ['764-82387', '764-84377', 'SMITHERS', '784-85377'],
    answer: 1, 
    
},{
	question: "How old is Ned Flanders?",
	optionsArr: ["20", "60", "50", "75"],
	answer: 1
},{
	question: "What´s Bart Simpson´s fake drivers license ID?",
	optionsArr: ["B47U98RE233", "BA7U89RE242", "BA7U89RE2T3", "B47U89RE243"],
	answer: 3
},{
	question: "Who comopose the show´s theme tune?",
	optionsArr: ["Danny Elfman","Robert Terwilliger","Randy Newman","Paul McCartney"],
	answer: 0
},{
	question: 'Who "depply hurt" Marge Simpson in 1990?',
	optionsArr: ["Josh Weinstein","Hari Kondabolu","Barbara Bush","Hilary Clinton"],
	answer: 2
},{
    question: "Which character was originally supposed to be black?",
    optionsArr: ["Carl", "Smithers", "Milhouse", "Hank Scorpio"],
	answer: 1
},{
	question: "What´s Santa´s Little Helper´s racing number?",
	optionsArr: ["No.8", "No.13", "No.24","No.2"],
	answer: 0
}];

 var unanswered;
 var currentQuestion;
 var correctAns; 
 var incorrectAns; 
 var uChoice; 
 var sec; 
 var time; 
 var answered; 
 

var alerts = {
	correct: "Yaaas, that's right!",
	incorrect: "WRONG",
	outTime: "Oops, run out of time!",
	finished: "Your results:"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#resultBan').empty();
	$('#correctAnss').empty();
	$('#incorrectAnss').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAns = 0;
	incorrectAns = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
    
    //set  the question
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].optionsArr[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.optionsArr').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		uChoice = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	sec = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + sec + '</h3>');
	answered = true;
	//timer
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	sec--;
	$('#timeLeft').html('<h3>Time Remaining: ' + sec + '</h3>');
	if(sec < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].optionsArr[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
	//check
	if((uChoice == rightAnswerIndex) && (answered == true)){
		correctAns++;
		$('#message').html(alerts.correct);
	} else if((uChoice != rightAnswerIndex) && (answered == true)){
		incorrectAns++;
		$('#message').html(alerts.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(alerts.outTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#resultBan').html(alerts.finished);
	$('#correctAnss').html("Correct Answers: " + correctAns);
	$('#incorrectAnss').html("Incorrect Answers: " + incorrectAns);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}