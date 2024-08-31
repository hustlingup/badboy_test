$(document).ready(function() {
    // Start button click event
    $('#start-btn').click(function() {
        window.location.href = 'quiz.html';
    });

    // Advance test button click event
    $('#advanced-btn').click(function() {
        window.location.href = 'advanced_version/index.html';
    });

   // Questions data
   const questions = [
    { question: "이 남자의 외모는?", responses: ["보통이다", "가끔 잘생겼다는 이야기를 듣는다", "훈남이다", "너무 잘생겨서 불안하다"], image: '../img/qimage01.jpg' },
    { question: "이 남자에게 무엇인가 해달라고 하면?", responses: ["무리한 부탁도 들어준다", "일부 들어준다", "이런 저런 이유로 안 된다고 하면서 빼려고 한다", "내가(여자가) 뭐라도 더 해주고싶다"], image: '../img/qimage02.jpg' },
    { question: "이 남자가 고백 또는 사귀자는 이야기를", responses: ["남자가 먼저했다", "내가(여자가) 먼저 했다", "할 낌새가 안보여 애간장이 탄다", "안했고 앞으로도 안할것이 분명하지만 괜찮다"], image: '../img/qimage03.jpg' },
    { question: "이 남자의 스킨쉽의 정도는?", responses: ["여자를 지켜주려 한다", "일반적이다", "서투르지만 많다", "아주 많고 능숙하다"], image: '../img/qimage04.jpg' },
    { question: "이 남자가 헤어짐에 대해 어떻게 생각하는가?", responses: ["헤어지지 않으려 집착한다", "잘 모르겠다", "헤어지자고 한적이 있다", "미련이 없다/없어보인다"], image: '../img/qimage05.jpg' },
    { question: "이 남자 주변에", responses: ["여자가 없고 일편단심이다", "여사친이 한두명 있다", "여사친이 많다", "모든 여자를 완전 거부하지도, 엄청잘해주지도 않는다"], image: '../img/qimage06.jpg' },
    { question: "이 남자의 감정은", responses: ["드러나거나 공유된다", "숨기지만 알 수 있다", "잘 알다가도 모르겠다", "도저히 알수가 없다"], image: '../img/qimage07.jpg' },
    { question: "이 남자가 무엇인가 결정할 때 내(여자의) 의사를", responses: ["항상 묻고 결정한다", "가끔 묻고 결정한다", "묻긴 하지만 자기 멋대로 한다", "묻지 않고 멋대로 행동해 좀 챙겨주고싶다."], image: '../img/qimage08.jpg' }
];

    // Points for each response
    const points = [0, 1, 2, 3];

    let currentQuestionIndex = 0;
    let totalPoints = 0;

     // Shuffle array function
     function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showQuestion(index) {
        const question = questions[index];
        const responsePointsMap = question.responses.map((response, i) => ({
            response,
            points: points[i]
        }));
        const shuffledResponsePointsMap = shuffle(responsePointsMap);

        const questionHTML = `
            <img src="${question.image}" alt="Question Image" class="img-fluid">
            <h4>${question.question}</h4>
            <br>
            <div class="d-grid gap-2 col-12 col-md-8 mx-auto">
                ${shuffledResponsePointsMap.map((item) => `
                    <button class="btn btn-outline-secondary mt-2 btn-block response-btn" data-points="${item.points}">${item.response}</button>
                `).join('')}
            </div>
        `;
        $('#question-container').html(questionHTML);
        updateProgressBar(); // Ensure progress bar is updated when a new question is shown
    }

    $(document).on('click', '.response-btn', function() {
        const responsePoints = $(this).data('points');
        totalPoints += responsePoints;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            $('#question-container').fadeOut(function() {
                showQuestion(currentQuestionIndex);
                $('#question-container').fadeIn();
            });
        } else {
            // Instead of setting the sessionStorage and redirecting to result.html,
            // we will directly redirect to the respective result page.
            window.location.href = `result_${totalPoints}.html`;
        }
    });

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        $('#progress-bar').css('width', `${progress}%`).attr('aria-valuenow', progress);
    }

    if ($('#question-container').length) {
        showQuestion(currentQuestionIndex);
        updateProgressBar();
    }
});
