
	var startScreen;
	var gameHTML;
	var counter = 15;
	var questionArray = ["This entrepreneur purchased Pixar in 1986 from Lucasfilms", "What was the first feature-length computer-animated film?", "What was the first computer animated short produced by Pixar?"];
	var answerArray = [["Bill Gates","Michael Bloomberg","Steve Jobs","Donald Trump"], ["The Avengers", "Jurassic Park", "The Incredibles", "Toy Story"], ["Toy Story","Up","Pirates of Silicon Valley","The Adventures of André & Wally B"]];
	var correctAnswers = ["Steve Jobs", "Toy Story", "The Adventures of André & Wally B"];
	var imageArray = ["<img class=winnerImg src='img/SteveJobs.jpg'>", "<img class=winnerImg src='img/ToyStory.jpg'>", "<img class=winnerImg src='img/AndreWally.jpg'>"];
	var questionCounter = 0;
	var selecterAnswer;
	var myClock;
	var totalWins = 0;
	var totalLosses = 0;
	
	$(document).ready(function() {
	// start screen
	
	function startScreen() {
		startScreen = "<p><a class='startButton' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	startScreen();
	
	
	$("body").on("click", ".startButton", function(event){
		event.preventDefault();
		generateHTML();
	
		timerObject();
	
	});
	
	$("body").on("click", ".answerButton", function(event){
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]){
			clearInterval(myClock);
			generateWin();
		}else{
			clearInterval(myClock);
			generateLoss();
		}
	});
	
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	});
	
	});
	
	function timeOut() {
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 1000);
	}
	
	function generateWin() {
		totalWins++;
		gameHTML = "<p class='timer'>Time Remaining: <span class='myTimer'>" + counter + "</span></p>" + "<p>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 1000);
	}
	
	function generateLoss() {
		totalLosses++;
		gameHTML = "<p class='timer'>Time Remaining: <span class='myTimer'>" + counter + "</span></p>" + "<p>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 1000);
	}
	
	function generateHTML() {
		gameHTML = "<p class='timer'>Time Remaining: <span class='myTimer'>15</span></p><p>" + questionArray[questionCounter] + "</p><p class='answerButton'>" + answerArray[questionCounter][0] + "</p><p class='answerButton'> "+answerArray[questionCounter][1]+"</p><p class='answerButton'>" + answerArray[questionCounter][2] + "</p><p class='answerButton'>" + answerArray[questionCounter][3] + "</p>";
		$(".mainArea").html(gameHTML);
	}
	
	function wait() {
		if(questionCounter < 2){
		questionCounter++;
		generateHTML();
		counter = 15;
		timerObject();
		}else{
			resultScreen();
		}
	}
	
	function timerObject() {
		myClock = setInterval(fifteenSeconds, 1500);
		function fifteenSeconds() {
			if(counter === 0){
				clearInterval(myClock);
				timeOut();
			}
			if(counter > 0){
				counter--;
			}
			$(".myTimer").html(counter);
		}
	}
	
	function resultScreen() {
		gameHTML = "<p> Score: </p>" + "<p>Correct Answers: " + totalWins + "</p>" + "<p>Wrong Answers: " + totalLosses + "</p>" + "<p><a class='resetButton' href='#' role='button'>Reset</a></p>";
		$(".mainArea").html(gameHTML);
	}
	
	function resetGame() {
		questionCounter = 0;
		totalWins = 0;
		totalLosses = 0;
		counter = 15;
		generateHTML();
		timerObject();
	}