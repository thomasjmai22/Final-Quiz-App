const STORE = {
  questions: [
    {
      title: "What planet did Luke grow up on?",
      answers: ["Alderaan", "Hoth", "Tatooine", "Earth"],
      correct: 2,
    },
    {
      title: "What is the weapon of choice for Jedi's?",
      answers: ["Lightsaber", "Axe", "Plasma Rifle", "Sword"],
      correct: 0,
    },
    {
      title: "Who is Darth Vader's son?",
      answers: ["Yoda", "Luke", "Han Solo", "R2D2"],
      correct: 1,
    },
    {
      title: "What is the name of Han Solo's ship?",
      answers: ["X-wing", "Star Cruiser", "Death Star", "Millenium Falcon"],
      correct: 3,
    },
    {
      title: "How old was Yoda when he died?",
      answers: [2000, 500, 900, 1000],
      correct: 2,
    },
    {
      title: "Who killed Han Solo?",
      answers: ["Boba Fett", "Darth Maul", "Kylo Ren", "Anakin Skywalker"],
      correct: 2,
    },
    {
      title: "Who killed Jabba the Hutt?",
      answers: ["Princess Leia", "Yoda", "Storm Troopers", "The Sith"],
      correct: 0,
    },
    {
      title: "What did the Emperor claim that was Luke's biggest weakness?",
      answers: [
        "The Force within him",
        "Faith in his friends",
        "Lightsaber skills",
        "His father",
      ],
      correct: 1,
    },
    {
      title: "What is the name of the jester for Jabba the Hutt?",
      answers: ["Rex", "Warf", "Jar-Jar", "Salacious Crumb"],
      correct: 3,
    },
    {
      title: "What species is Chewbacca?",
      answers: ["Ewok", "Jawas", "Wookie", "Rodian"],
      correct: 2,
    },
  ],
  score: 0,
  currentQuestion: 0,
  guess: 0,
  started: false,
  hasFeedback: false,
};

/*RENDERING HTML*/
function render() {
  $("#start").hide();
  $("#quiz").hide();
  $("#feedback").hide();
  $("#summary").hide();
  $("header").hide();

  if (!STORE.started) {
    $("#start").show();
  } else if (STORE.hasFeedback) {
    renderHeader();
    renderFeedback();
  } else if (STORE.currentQuestion < STORE.questions.length) {
    renderHeader();
    renderQuestion();
  } else {
    renderSummary();
  }
}

function renderHeader() {
  $("header").show();
  $("header .score").text(`Score: ${STORE.score}`);
  $("header .progress").text(
    `Question ${STORE.currentQuestion + 1}/${STORE.questions.length}`
  );
}

function renderQuestion() {
  $("#quiz").show();
  const question = STORE.questions[STORE.currentQuestion];
  $("#quiz h2").text(question.title);
  $("#choices").html("");
  question.answers.forEach((answer, i) => {
    $("#choices").append(`
            <p><input type="radio" name="choice" value="${i}" id="${i}"/>
            <label for="${i}">${answer}</label></p>
        `);
  });
}

function renderFeedback() {
  $("#feedback").show();
  $("#feedback h2").text(STORE.hasFeedback);
  $(".user-answer").text("");
  const question = STORE.questions[STORE.currentQuestion];
  if (STORE.hasFeedback === "Incorrect") {
    $(".user-answer").text(`You answered ${STORE.guess}.`);
  }
  $(".correct-answer").text(
    `The correct answer was ${question.answers[question.correct]}.`
  );
}

function renderSummary() {
  $("#summary").show();
  $("#summary p").text(
    `You scored ${STORE.score} out of ${STORE.questions.length}`
  );
  if (STORE.score > 5) {
    $("#summary .force").text(`CONGRATS! THE FORCE IS STRONG WITH YOU!`);
  } else if (STORE.score === 0) {
    $("#summary .force").text(`THE FORCE IS NOT WITH YOU!`);
  } else {
    $("#summary .force").text(`THE FORCE IS WEAK WITH YOU!`);
  }
}

/* LISTENING FOR EVENTS*/
function startQuiz() {
  $("#start-quiz").click((e) => {
    STORE.started = true;
    render();
  });
}

function submitChoice() {
  $("#quiz form").submit((e) => {
    e.preventDefault();
    const answer = $('input[type="radio"]:checked').val();
    const question = STORE.questions[STORE.currentQuestion];
    if (!$('input[type="radio"]:checked').length) {
      return alert("Please select an answer");
    }
    if (Number(answer) === question.correct) {
      STORE.score++;
      STORE.hasFeedback = "Correct! The Force is strong with you!";
    } else {
      STORE.guess = STORE.questions[STORE.currentQuestion].answers[answer];
      STORE.hasFeedback = "Incorrect! The Force is weak with this one!";
    }
    render();
  });
}

function nextQuestion() {
  $("#next").click((e) => {
    STORE.hasFeedback = false;
    STORE.currentQuestion = STORE.currentQuestion + 1;
    render();
  });
}

function restartQuiz() {
  $("#restart").click((e) => {
    STORE.started = false;
    STORE.score = 0;
    STORE.currentQuestion = 0;
    render();
  });
}

/* CALLING ALL FUNCTIONS*/
function main() {
  startQuiz();
  submitChoice();
  nextQuestion();
  restartQuiz();
  render();
}

$(main);
