//select elements
let countspan = document.querySelector(".count span");
let bulletspan = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsArea = document.querySelector(".results");
let countdownDiv = document.querySelector(".countdown");
let reloadbutton = document.querySelector(".reload");
//set options
let currentIndex = 0;
let rightAnswers = 0;
let countdouninterval = 0;

function getquestion() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let QuestionsObject = JSON.parse(this.responseText);
            let = Questionscount = QuestionsObject.length;

            //create bullets + set question count 
            craeteBullets(Questionscount);
            //Add data
            addData(QuestionsObject[currentIndex], Questionscount);

            //counter
            countdoun(200, Questionscount);

            //click on submit 
            submitButton.onclick = () => {
                //get right answer
                let rightAnswer = QuestionsObject[currentIndex].right_answer;

                currentIndex++;

                //check answer
                checkAnswer(rightAnswer, Questionscount);


                //Remove old questcion
                quizArea.innerHTML = "";
                answerArea.innerHTML = "";
                addData(QuestionsObject[currentIndex], Questionscount);

                //spans bullets
                nextquiz();
                clearInterval(countdouninterval);
                countdoun(100, Questionscount);

                //show result
                showResult(Questionscount);

            }
        }
    };
    myRequest.open("GET", "Question.json", true);
    myRequest.send();
}

getquestion();

function craeteBullets(num) {
    countspan.innerHTML = num;
    //craete span
    for (let i = 0; i < num; i++) {
        let theBullet = document.createElement("span");
        if (i === 0) {
            theBullet.className = "on"
        }
        bulletspan.appendChild(theBullet);
    }
}

function addData(obj, count) {
    if (currentIndex < count) {
        //creata h2
        let questionTitle = document.createElement("h2");
        let QuestionText = document.createTextNode(obj.title);
        questionTitle.appendChild(QuestionText);
        quizArea.appendChild(questionTitle);

        // create the answers
        for (let i = 1; i < 5; i++) {
            let mindiv = document.createElement("div");
            mindiv.className = 'answer';
            //craete radio input
            let radioInput = document.createElement("input");
            //add type + name +id + data Attribute
            radioInput.name = 'questoin';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
            //make first option selected
            if (i === 1) {
                radioInput.checked = true
            }

            //craete label
            let thelabel = document.createElement("label");
            thelabel.htmlFor = `answer_${i}`;
            let labelText = document.createTextNode(obj[`answer_${i}`]);
            thelabel.appendChild(labelText);
            mindiv.appendChild(radioInput);
            mindiv.appendChild(thelabel);
            answerArea.appendChild(mindiv);
        }
    }
}

function checkAnswer(right, count) {
    let answers = document.getElementsByName("questoin");
    let chosenAnswer;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            chosenAnswer = answers[i].dataset.answer;
        }

    }
    if (right === chosenAnswer) {
        rightAnswers++;
    }

}
function nextquiz() {
    let bullspan = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bullspan);

    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResult(count) {
    let resultOF;
    if (currentIndex === count) {
        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bullets.remove();

        if (rightAnswers > (count / 2) && rightAnswers < count) {
            resultOF = `<span class="good">good </span>${rightAnswers} from ${count}  `;
        }
        else if
            (rightAnswers === count) {
            resultOF = `<span class="perfect">perfect </span> All Answers Are perfect`;
        }
        else {
            resultOF = `<span class="bad">bad </span>${rightAnswers} from ${count}  `;
        }
        resultsArea.innerHTML = resultOF;

    }

}

function countdoun(dura, count) {
    if (currentIndex < count) {
        let minutes, seconde;
        countdouninterval = setInterval(function () {
            minutes = parseInt(dura / 60);
            seconde = parseInt(dura % 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconde = seconde < 10 ? `0${seconde}` : seconde;
            countdownDiv.innerHTML = `${minutes}:${seconde}`;



            if (--dura < 0) {
                clearInterval(countdouninterval);
                submitButton.click();
            }
        }, 1000);
    }
};

reloadbutton.onclick = function () {
    location.reload();
}


