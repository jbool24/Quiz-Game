$(document).ready(function() {
    console.log("READY!");
    var data = {
        "questions": [{
            "question": "What is Neo's real name?",
            "answers": [
                "John P. Black",
                "Timothy J. Washington",
                "James L. Burns",
                "Thomas A. Anderson"
            ],
            "correct": 3
        }, {
            "question": "What is the name of Morpheus's ship?",
            "answers": [
                "Voyager",
                "Hammer",
                "Nebuchadnezzar",
                "Misanthrope"
            ],
            "correct": 2
        }, {
            "question": "By what name are the sentinels more commonly referred to?",
            "answers": [
                "Bogeys",
                "Squiddies",
                "Reapers",
                "Sweepers"
            ],
            "correct": 1
        }, {
            "question": "The predominant wardrobe color in the Matrix is black. Which character defies this trend?",
            "answers": [
                "Trinity",
                "Mouse",
                "Apoc",
                "Switch"
            ],
            "correct": 3
        }, {
            "question": "What is the phrase written above the door in the Oracle's kitchen?",
            "answers": [
                "Caveat Emptor",
                "Temet Nosce",
                "Veni Vidi Vici",
                "Mihi Mater Piscis Est"
            ],
            "correct": 1
        }, {
            "question": "What is Cypher's real last name?",
            "answers": [
                "Reagan",
                "Johnson",
                "Nixon",
                "Ford"
            ],
            "correct": 0
        }, {
            "question": "What is the first martial art form Neo 'learns'?",
            "answers": [
                "Karate",
                "Tae Kwon Do",
                "Kung Fu",
                "Ju Juitsu / Ju - Jitsu"
            ],
            "correct": 3
        }, {
            "question": "Three agents are featured in the first Matrix movie. We know Agent Smith. What are the names of the other two?",
            "answers": [
                "Johnson and Jackson",
                "Brown and Jones",
                "Black and Davis",
                "Thompson and Davidson"
            ],
            "correct": 3
        }, {
            "question": "Neo surprises Cypher while he's 'monitoring the Matrix'. What is he supposedly watching/looking at?",
            "answers": [
                "Baseball",
                "Girls",
                "Agents",
                "Police Activity"
            ],
            "correct": 1
        }, {
            "question": "From what telephone number does Trinity contact Cypher during the opening credits?",
            "answers": [
                "555 - 1234",
                "555 - 0001",
                "555 - 0690",
                "555 - 5309"
            ],
            "correct": 2
        }]
    };

    var quizGame = function(data) {
        var self = this; //Capture 'this' reference

        this.questions = data.questions;
        this.activeQuestion = {};
        this.answered = 0;
        this.alreadyAsked = [];
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.clockId;
        this.time = 30;


        self.onStart = function() {
            self.getQuestion();
            //Start timer and reset at zero
            self.clockId = setInterval(function() {
                //display timer
                $('#timer').text(self.time);

                self.time--;
                if (self.time <= 0) {
                    self.timeout();
                }
            }, 1000);
        };

        self.getQuestion = function() {
            self.activeQuestion = self.questions[Math.floor(Math.random() * self.questions.length)];
            console.log(self.activeQuestion.question, self.activeQuestion.correct)

        };

        self.isDuplicate = function(num){
          if (self.answered.indexof(num) === -1){
            self.displayQuestion();
          } else {
            self.getQuestion();
          }
        };

        self.displayQuestion = function() {
            $('.question').text(self.activeQuestion.question);
            $('#0.selection').text(self.activeQuestion.answers[0]);
            $('#1.selection').text(self.activeQuestion.answers[1]);
            $('#2.selection').text(self.activeQuestion.answers[2]);
            $('#3.selection').text(self.activeQuestion.answers[3]);
        };

        self.timeout = function() {
            setTimeout(self.resetTimer, 1000 * 5);
            //highlight correct, wait 3 seconds
            $('#'+ self.activeQuestion.correct).effect("highlight", {}, 3000);
        };


        self.resetTimer = function() {
            console.log('RESET');
            clearInterval(self.clockId);
            self.time = 30;
            self.onStart();
        };

        self.testAnswer = function(ans) {
            if (parseInt(ans) === self.activeQuestion.correct) {
                self.onCorrect();
                console.log("CORRECT")
                self.wait()
            } else {
                self.onIncorrect();
                console.log("INCORRECT")
                self.wait();
            }
        };

        self.onCorrect = function() {
            self.correctCount++;
            //hide game display Congratulations then resume
        };

        self.onIncorrect = function() {
            self.incorrectCount++;
        };

    }; //End quizGame

    var gameObj = new quizGame(data);
    console.log(gameObj);

    $('.selection').on("click", function() {
        console.log(this.id);
        gameObj.testAnswer(this.id);
    });

    $('.btn-start').on('click', function() {
        $(this).attr('class', 'hide');
        $('#game').attr('class', 'show');
        gameObj.onStart();
    });

});
