const quizData = [
    {
      question: '2022 оны хөлбөмбөгийн дэлхийн аваргад ямар улс түрүүлсэн бэ?',
      options: ['Аргентин', 'Пранц', 'Бразил', 'Герман'],
      answer: 'Аргентин',
    },
    {
      question: 'Mэсси нийт хэдэн баллон дор авж байсан бэ?',
      options: ['5', '8', '4', '9'],
      answer: '8',
    },
    {
      question: 'Роналду аваргуудын лигт ннийт хэдэн гоол оруулсан бэ?',
      options: ['178', '226', '140', '300'],
      answer: '140',
    },
    {
      question: 'Ливэрпүүл клуб  хамгийн сүүлд хэдэн онд  аваргуудын лигт түрүүлсэн бэ?',
      options: ['2019', '2022', '2018', '2016'],
      answer: '2019',
    },
    {
      question: 'Роналдугийн эхнэрийг хэн гэдэг вэ?',
      options: [
        'Бадамаа',
        'Миа Халифа',
        'Жеоржина Родригес',
        'Ирина Шей',
      ],
      answer: 'Жеоржина Родригес',
    },
    {
      question: 'Арсеналын 22/23 улирлын шилдэг мэргэн бууч?',
      options: ['Мартин одегаард', 'Габриел жесүс', 'Букайо сака', 'Габриел мартинелли'],
      answer: 'Габриел мартинелли',
    },
    {
      question: '2021 оны аваргуудын лигийн финалд орсон цор ганц гоолын эзэн хэн бэ?',
      options: [
        'Оливье Жирү',
        'Кая Хавьертс',
        'Агүэро',
        'Хааланд',
      ],
      answer: 'Кая Хавьертс',
    },
    {
      question: 'Английн лигээс  хэдэн тоглогч Баллон дор  авч байсан бэ?',
      options: ['7', '3', '5', '6'],
      answer: '6',
    },
    {
      question: 'Английн премьер  лигийн хамгийн хурдан хэт-рикийг хэн хийсэн бэ?',
      options: [
        'Садио мане',
        'Луим Суарез',
        'Роналду',
        'Агүэро',
      ],
    
        answer: 'Садио мане',
    },
    {
      question: 'Бразилийн шигээ багийнхаа төлөө хамгийн олон гоол оруулсан тоглогч хэн бэ?',
      options: ['Пэлэ', 'Роналдиньо', 'Роналду', 'Неймар'],
      answer: 'Неймар',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();