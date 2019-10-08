var triviaQuestions = [{
	question:  "Which name is not from Cletus and Brandine 44 children?",
	answerList: ["Crystal Meth", "Incest", "Normal-Head", "Kang Kodos"],
	answer: 3
},{
	question: "What´s  Moe’s Tavern phone number?",
	answerList: ['764-82387', '764-84377', 'SMITHERS', '784-85377'],
    answer: 1, 
    
},{
	question: "How old is Ned Flanders?",
	answerList: ["20", "60", "50", "75"],
	answer: 1
},{
	question: "What´s Bart Simpson´s fake drivers license ID?",
	answerList: ["B47U98RE233", "BA7U89RE242", "BA7U89RE2T3", "B47U89RE243"],
	answer: 3
},{
	question: "Who comopose the show´s theme tune?",
	answerList: ["Danny Elfman","Robert Terwilliger","Randy Newman","Paul McCartney"],
	answer: 0
},{
	question: 'Who "depply hurt" Marge Simpson in 1990?',
	answerList: ["Josh Weinstein","Hari Kondabolu","Barbara Bush","Hilary Clinton"],
	answer: 2
},{
    question: "Which character was originally supposed to be black?",
    answerList: ["Carl", "Smithers", "Milhouse", "Hank Scorpio"],
	answer: 1
},{
	question: "What´s Santa´s Little Helper´s racing number?",
	answerList: ["No.8", "No.13", "No.24","No.2"],
	answer: 0
}];

 var currentQuestion;
 var correctAnswer; 
 var incorrectAnswer; 
 var unanswered; 
 var seconds; 
 var time; 
 var answered; 
 var userSelect;

var messages = {
	correct: "Yaaas, that's right!",
	incorrect: "WRONG",
	endTime: "Oops, run out of time!",
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
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html();
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
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
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}