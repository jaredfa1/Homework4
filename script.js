
//DOMS
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var highscore = document.getElementById('highscore') 
var score = 0
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
//Adding score fuction
/*function addScore() {
  if(button.dataset.correct = answer.correct){
    alert("Correct!"), score++
  }
  else{
    alert("Wrong!")
    timeLeft - 10;
  }
} */


function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
//Answer selection
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Try again?'
    startButton.classList.remove('hide') 
    alert("your score is " +score+ " out of 6")
    
  }
  
  if (correct){
    alert("Correct!")
    score++
  }
  else{
    alert("Wrong!")
    timeLeft -10
  }

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('Correct!')
    
  } else {
    element.classList.add('Wrong')
    
  }
}


//Clear Status and return 
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//Questions for quiz
const questions = [
  {
    question: 'Which of the following cant be done with client-side JavaScript?',
    answers: [
      { text: 'Storing the forms contents to a database file on the server', correct: true },
      { text: 'Validating a form', correct: false },
      { text: 'Sending a forms content by email', correct: false},
      {text: 'None of the above', correct: false}
    ]
    
  },
  
  {
    question: 'Which of the following are capabilities of functions in JavaScript?',
    answers: [
      { text: 'Return a value', correct: false },
      { text: 'Accept parameters and return a value', correct: false},
      { text: 'Accept parameters', correct: true },
      { text: 'All of the above', correct: false }
    ]
  },
  {
    question: 'Which of the following is not a valid JavaScript variable name?',
    answers: [
      { text: '<SCRIPT>', correct: true },
      { text: '<BODY>', correct: false },
      { text: '<HEAD>', correct: false },
      { text: '<TITLE>', correct: false }
    ]
  },
  {
    question: 'Choose the server-side JavaScript object?',
    answers: [
      { text: 'FileUpLoad', correct: false },
      { text: 'Function', correct: false },
      { text: 'File', correct: true },
      { text: 'Date', correct: false }
    ]
  },

  
  {
    question: 'What is the correct JavaScript syntax to write "Hello World"?',
    answers: [
      { text: 'System.out.println("Hello World")', correct: false },
      { text: 'Println ("Hello World")', correct: false },
      { text: 'document.write("Hello World")', correct: true },
      { text: 'response.write("Hello World")', correct: false }
    ]
  },
  {
    question: 'Which of the following attribute can hold the JavaScript version?',
    answers: [
      { text: 'LANGUAGE', correct: true },
      { text: 'SCRIPT', correct: false },
      { text: 'VERSION', correct: false},
      { text: 'None of the above', correct: false}
    ]
  }
]

//Timer
document.addEventListener('DOMContentLoaded', () => {
  var timeLeftDisplay = document.querySelector('#time-left')
  var timeLeft = 60

  function countDown(){
   setInterval(function(){
     if(timeLeft <= 0 ){
       clearInterval(timeLeft = 0);
       alert("out of time!");
     }
     timeLeftDisplay.innerHTML = timeLeft
    timeLeft -=1
   }, 1000) 

  }
     
  startButton.addEventListener('click', countDown) 

})

//Save score in local storage

var highscore = JSON.parse(localStorage.getItem("score")) || [];

