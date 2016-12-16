$(document).ready(function() {
    var totalTime = 10;

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
        this.time = totalTime;


        self.begin = function() {
            console.log("questions: " + self.answered);
            //Get a question
            self.getQuestion();

            //Start the timer but reset when it reaches zero
            self.clockId = setInterval(function() {

                //display formated timer
                if (self.time < 10) {
                    let formatedTime = "0" + self.time;
                    $('#timer').text(formatedTime);
                } else {
                    $('#timer').text(self.time);
                }

                self.time--;

                if (self.time <= 0) {
                    self.timesUp();
                }
            }, 1000);
        };

        self.end = function() {
            if (self.answered >= 10) {
                $("#game").removeClass('show').addClass('hide');
                $(".stat-correct").text(self.correctCount);
                $(".stat-incorrect").text(self.incorrectCount);
                $("#game-stats").addClass('show');
            } else {
                self.begin();
            }
        };

        self.wait = function() {
            self.stopTimer(); //stop timer
            setTimeout(self.reset, 1000 * 3); //wait 5 sec then resume
        };

        self.timesUp = function() {
            self.stopTimer();
            self.incorrectCount++;
            self.answered++;
            $('.timeup').removeClass('hide').addClass('show');
            $('#timer-box').addClass('highlight');
            //flash correct answer, wait 3 seconds
            setTimeout(self.reset, 1000 * 3); //wait 5 sec then resume
            $('#' + self.activeQuestion.correct).effect("highlight", {}, 2500);
        };

        self.stopTimer = function() {
            clearInterval(self.clockId); //stop timer
        };

        self.reset = function() {
            console.log('RESET');
            $('.correct').removeClass('show').addClass('hide');
            $('.incorrect').removeClass('show').addClass('hide');
            $('.timeup').removeClass('show').addClass('hide');
            $('#timer-box').removeClass('highlight');
            self.time = totalTime;
            self.end();
        };

        self.getQuestion = function() {
            var idx = Math.floor(Math.random() * self.questions.length);

            if (self.isDuplicate(idx)) {
                self.getQuestion();
            } else {
                self.activeQuestion = self.questions[idx];
                self.alreadyAsked.push(idx);
                self.displayQuestion();
            }
        };

        self.isDuplicate = function(num) {
            if (self.alreadyAsked.indexOf(num) === -1) {
                return false
            } else {
                return true
            }
        };

        self.displayQuestion = function() {
            $('.question').text(self.activeQuestion.question);
            $('#0.selection').text(self.activeQuestion.answers[0]);
            $('#1.selection').text(self.activeQuestion.answers[1]);
            $('#2.selection').text(self.activeQuestion.answers[2]);
            $('#3.selection').text(self.activeQuestion.answers[3]);
        };


        self.testAnswer = function(ans) {
            if (parseInt(ans) === self.activeQuestion.correct) {
                self.onCorrect();
                console.log("CORRECT")
                self.wait();
            } else {
                self.onIncorrect();
                console.log("INCORRECT")
                self.wait();
            }
        };

        self.onCorrect = function() {
            $('.correct').removeClass('hide').addClass('show');
            self.correctCount++;
            self.answered++;
            //TOOD hide game display Congratulations then resume
        };

        self.onIncorrect = function() {
            $('.incorrect').removeClass('hide').addClass('show');
            self.incorrectCount++;
            self.answered++;
        };

    }; //End quizGame

    var gameObj = new quizGame(data);

    //Set up eventListener for user selection
    $('.selection').on("click", function() {
        console.log(this.id);
        gameObj.testAnswer(this.id);
    });

    //Set up eventListener for Start button press
    $('.btn-start').on('click', function() {
        $('#splash').addClass('hide');
        $(this).attr('class', 'hide'); //hide button
        $('#game').attr('class', 'show'); //show quiz
        gameObj.begin();
    });

});
