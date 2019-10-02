/* Following are questions set as array objects. Using javascript, questions will be
populated on the webpage one by one when ever user clicks next after answering a question */
let currentQuestion = 0;
let currentScore = 0;



var questions = [{
    Question: '1. Usain Bolt is ______?',
    answers: ['an artis', 'cyclist', 'diver','sprinter'],
    correctAnswer: 'sprinter'
},
{
   Question: '2. Who won 2014 Boston Marathon race?',
   answers: ['Meb Kiflezghi', 'Bolt', 'Kenenisa', 'Geoferry'],
   correctAnswer: 'Meb Kiflezghi'
},
{
    Question: '3. Athlet Tirunesh Dibaba is from a country called___?',
    answers: ['Kenya','USA', 'Japan', 'Ethiopia'],
    correctAnswer: 'Ethiopia'
 },
 {
   Question: '4. Who is the fastest world record holder in marathon race?' ,
   answers: ['Meb Kiflezghi(USA)', 'Zersenay Tadese(Eritrea)', 'Patrick Makau (Kenya)', 'Kenenisa Bekele(Ethiopia)'],
   correctAnswer: 'Patrick Makau (Kenya)'
 },
 { 
     Question: '5. Who from the list is not American\'s top women running athlets ?',
     answers: ['Desiree Linden', 'Jordan Hasay', 'Shalane Flanagan', 'Rebecca Adlington'],
    correctAnswer: 'Rebecca Adlington'
 },
 {
     Question: '6. How many miles in Marathon race?',
     answers: [20, '13.3', '26.6', 52 ],
     correctAnswer: '26.6'
 },
{
    Question: '7. which African country has the greatest distance runners? ',
    answers: ['Brazil', 'Botswana', 'Egypt', 'Kenya'],
    correctAnswer: 'Kenya'
},
{
    Question: '8. The most successful track athlete in modern Olympic Mo Farah represents which country?',
    answers: ['USA', 'Kenya','Great Britain', 'Ehiopia' ],
    correctAnswer: 'Great Britain'
},
{
    Question: '9. What is the fastest time recorded to finish marathon race?',
    answers:  ['2:21:39', '2:11:39','2:01:39','2:15:39'],
    correctAnswer: '2:01:39'
},
{
    Question: '10. One of the following is kown for running long distance races',
    answers: ['Paula Radcliffe', 'Allyson Felix','Serena Williams','Amanda Beard'],
    correctAnswer: 'Paula Radcliffe'
},
];


/* When the Start button is clicked, it takes user to the question page where questions are displayed with altertive choices */ 

function clickStart() {
  $('.quizApp').on('click', 'button', function(event) {
    event.preventDefault();
    $('.quizApp').html(renderQuestion);
    
  })
};

function renderQuestion(){
  return `<fieldset>
            
              <legend class="name">${questions[currentQuestion].Question}</legend>
              <label for="one">
              <input type="radio" name="option" id="one" value="${questions[currentQuestion].answers[0]}">
              ${questions[currentQuestion].answers[0]}</label><br>

              <label for="two">
              <input type="radio" name="option" id="two" value="${questions[currentQuestion].answers[1]}">
              ${questions[currentQuestion].answers[1]}</label><br>

              <label for="three">
              <input type="radio" name="option" id="three" value="${questions[currentQuestion].answers[2]}">
              ${questions[currentQuestion].answers[2]}</label><br>

              <label for="four">
              <input type="radio" name="option" id="four" value="${questions[currentQuestion].answers[3]}">
              ${questions[currentQuestion].answers[3]}</label><br>
              <input type="button" value="Submit" class="submit-button showBlock">
              <div id='responseCorrect' class='hidden'>
                <h3>Correct!</h3><br>
              </div>
              <div class"final"> 
              <h3 id="finalResult" class="finalResult hidden"><br></h3>
              </div>
              <div id='responseIncorrect' class='hidden'>
                  <h3>Sorry; the answer is incorrect.</h3><br>  
              </div>
              <div id='noResponse' class='hidden'>
                  <h3>Please make a choice</h3><br>  
              </div>
              <div id='responseCounter'>
              <span id='correctScore'>Correct: ${userScore.correct} | </span> <span id='incorrectScore'> Incorrect: ${userScore.incorrect}</span>
              </div><br>  
              <button class="next-button hidden">Next</button>
              <div class"final"> 
              <h3 id="finalResult" class="finalResult hidden"><br></h3>
              </div>
              <div class"trying"> 
              <button class="retry hidden" id="again">Restart Quiz?</button> 
              </div>
              </div>
          </fieldset>
        `;
}

function submitAnswer() {

  /* user submit answer, disable radio button to evaluate the choices using the function 'checkAnswers()' */

  $('.quizApp').on('click', '.submit-button', function(event) {
    event.preventDefault();
    checkAnswers();
  });
}
let userScore = {
  correct: 0,
  incorrect: 0, 
};


function checkAnswers() {
 
  /*Check response and show result on screen. User gets a response accourding to the choice made to the question. if no action is taken and user clicks 'next', the app will ask user to make a choice */
 
  let radioValue = $('input[name=option]:checked').val();
 if ($('input[name=option]:checked').length === 0) {
      $('#noResponse').removeClass('hidden');
      $('.next-button').addClass('hidden').removeClass('showBlock'); 
  }
   else{ 
      $('#noResponse').removeClass('hidden');
      $('.submit-button').addClass('hidden').removeClass('showBlock');
      $('.next-button').removeClass('hidden').addClass('showBlock');
      $('input[type=radio]').attr('disabled', true);
      $('#noResponse').addClass('hidden');
      if (radioValue === questions[currentQuestion].correctAnswer) {
        userScore.correct++;
        $('#correctScore').html(`Correct: ${userScore.correct}`);
        $('#responseCorrect').removeClass('hidden');
    } else {
      userScore.incorrect++;
      $('#incorrectScore').html(`Incorrect: ${userScore.incorrect}`);
      $('#responseIncorrect').removeClass('hidden');
    } 
   }
   
}

function nextQuestion() {
  
  /*  User will move to the next question or show final score depending on current question */

  $('.quizApp').on('click', '.next-button', function(event) {
    event.preventDefault();
      console.log(currentQuestion, questions.length)
    if (currentQuestion < questions.length -1) {
       currentQuestion++;
       //move to the next question
      $('.quizApp').html(renderQuestion);    
    } 
     else {   
      showFinalScore();  
    $('#finalResult').removeClass('hidden');
    $('.submit-button').addClass('hidden').removeClass('showBlock');
    $('.next-button').addClass('hidden').removeClass('showBlock');
    $('input[type=radio]').attr('disabled', true);
    $('#responseCounter').addClass('hidden');
    $('label').addClass('hidden');
    $('.name').addClass('hidden');
    }
  }); 
 }
function showFinalScore() {
  let finalScoreText = `<h3 id="finalScore">Your final score is ${userScore.correct} out of 10 questions!</h3>`;
       $('#finalResult').append(finalScoreText);
       $('.retry').addClass('showBlock').removeClass('.hidden');
       $('.next-button').removeClass('showBlock').addClass('hidden');
  }

function restartQuiz() {
$('.quizApp').on('click', '.retry', function(event) { 
   event.preventDefault(); 
   currentQuestion = 0;
   currentScore = 0;
   $('.quizApp').html(renderQuestion);
  });
} 
  
$(clickStart);
$(submitAnswer);
$(renderQuestion);
$(nextQuestion);
$(showFinalScore);
$(restartQuiz);