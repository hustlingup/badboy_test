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

    $('#result-container').append(`
        <div id="psyc" class="psyc-element">
            <img class="img-fluid mt-5" src="../img/psychology.jpg"> 
                <h3><b>연애와 매력의 심리학</b></h3>
            
                <h5><b>여성들이 끌리는 나쁜남자</b></h5>
                <p>여성들은 단기적인 관계에서 나쁜남자에게 매력을 느낄 수 있습니다. 
                나쁜남자의 자신감, 완고함, 그리고 강한 의지가 여성들에게 매력적으로 다가올 수 있습니다. 
                인생 경험이 쌓이면서 사람들은 사업, 직장생활, 대인관계, 공부 등에서 통찰력을 얻고 내면의 기준을 세우게 되어 외부의 영향을 덜 받게 됩니다. 
                이러한 모습은 피상적으로 보았을 때 나쁜남자와 비슷할 수 있습니다. 
                수많은 연애 강의들이 내적 기준이 있는 척, 자신감 있는 척, 의지가 있는 척 행동하라고 가르치는 이유도 여기 있습니다.</p>
                
                <h5><b>위험 감수와 매력</b></h5>
                <p>나쁜남자는 위험을 감수하려는 성향이 있으며, 이는 여성들에게 매력적으로 다가옵니다. 
                먹이나 지위를 획득하기 위해 위험을 감수하는 것은 알파메일의 자질로 여겨집니다. 
                영화나 드라마의 주인공들은 항상 안주하지 않고 위험을 감수하는 모습을 보여줍니다.</p>
                
                <h5><b>도덕과 사회 통념</b></h5>
                <p>나쁜남자는 도덕과 사회 통념에 얽매이지 않으며, 다른 사람의 감정을 잘 공감하지 못해 다른 사람의 기분을 신경 쓰지 않습니다. 
                이는 사회적 위험을 잘 감수할 수 있게 하고, 거침없고 경쟁적인 모습을 보이게 하여 매력적으로 보일 수 있습니다.</p>
                
                <h5><b>소심한 남자와 인기</b></h5>
                <p>소심하고 자신감이 없는 남자는 인기가 없으며, 드라마와 영화에서 전형적으로 인기 없는 남자로 묘사됩니다. 
                이런 남자는 다른 사람의 눈치를 보고 경험과 통찰이 부족해 세상과 대인관계에서 주관이 세워지지 않아 이리저리 휘둘리고, 경쟁 상황에서 도망가게 됩니다.</p>
                
                <h5><b>지위와 공감 능력</b></h5>
                <p>사람의 지위가 올라갈수록 공감 능력이 떨어지고 사이코패스화된다는 연구 결과가 있습니다. 
                심리학자들은 회사의 지위에 따라 공감 능력을 테스트해보았으며, 지위가 높을수록 공감 능력이 떨어진다는 결과를 얻었습니다. 
                미국 연구에서는 농부들이 수확 시기에 공감 능력이 떨어진다는 결과도 있습니다. 또한, 고급차일수록 교통법규를 지키지 않는 경우가 많았습니다.</p>
                
                <h5><b>사회적 상처와 눈치</b></h5>
                <p>사람들이 사회적으로 외면 받게 되면 다른 사람의 눈치를 더 많이 보게 되며, 타인의 감정과 목소리 톤에 대해 민감하게 반응하게 됩니다. 
                이는 드라마나 영화에서 소심한 인물들이 묘사되는 방식입니다.</p>
                    
                <h5><b>여성에게 주는 교훈</b></h5>
                <p>나쁜남자의 3가지 특징인 나르시시즘, 마키아벨리즘, 반사회성(싸이코패스 성향)은 단기적 잠자리 상대를 찾기 위한 일부 최상위 포식자 남성들의 전략입니다. 
                YouTube 채널 스튜디오 잼박스 용진건강원 EP. 27에서 이용진님의 극단적인 나쁜남자 연기에도 가비님와 예나님이 이상하게 끌린다고 표현한 것을 보면 
                첫만남부터 중독적인 매력에 빠져 행복할 수 있지만, 장기적인 관계에는 악영향을 미칠 수 있습니다. 
                나쁜남자의 특성을 잘 알고 미리 피할 수 있지만, 겪어보지 않으면 미련이 남을 수도 있습니다. 
                삶에서는 때로는 불리할 걸 알면서도 경험해봐야 하는 것들이 있습니다.
                나쁜남자의 성향이 너무 강한 남자도 문제지만, 아예 없는 남자도 매력을 찾기에 힘들 수 있습니다만,
                장기적으로 가정에 헌신적인 남자는 이러한 특징이 적고, 소위 말하는 알파메일 같은 남자는 아닙니다. 
                나쁜남자 테스트 심화버전을 통해 당신의 썸남 or 남자친구가 얼마만큼의 나쁜남자의 매력을 가지고 있는지 확인해보세요.
                </p>
                
                <h5><b>남성에게 주는 교훈</b></h5>
                <p>20대 초반부터 많은 사회 관계와 이성 경험을 쌓는 것이 유리합니다. 
                여러 사건과 사람을 겪어야 사건에 덜 휘둘리는 심리적 안정성, 주관, 삶의 목표, 고집이 생깁니다. 
                자신이 타겟으로 하는 여성보다 인생과 연애 경험이 많아야 연애가 수월해집니다. 
                20대 초반 남성들은 20대 초반 여성보다 연애 경험이 많기 어려우므로, 다른 대인관계에서 많은 경험을 쌓기 위해 다양한 대외활동이 필요합니다.</p>
                
                <h5><b>소심한 사람들에게 주는 교훈</b></h5>
                <p>상대의 눈치를 보는 것이 상대를 배려하는 것이라며, 자신을 좋은 사람, 착한 사람, 배려 있는 사람이라고 기만하지 말아야 합니다. 
                눈치를 보는 사람에서 벗어나려면 더욱 더 눈치를 잘 보고 자신이 눈치를 본다는 것을 모르게 해야 합니다. 
                아예 눈치를 보지 않으면 꼴불견이 되기 쉽습니다. 
                외모, 패션, 능력, 리더십, 기여도, 유머, 그룹 대화법 등으로 사회적 지위를 올리는 방법들을 활용할 수 있습니다.</p>
        </div>
        
    `);
});
