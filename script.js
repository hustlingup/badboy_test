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
        { question: "이 남자가 고백 또는 사귀자는 이야기를", responses: ["먼저했다", "내가(여자가) 먼저 했다", "할 낌새가 안보여 애간장이 탄다", "안했고 앞으로도 안할것이 분명하지만 괜찮다"], image: '../img/qimage03.jpg' },
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
        console.log(`Selected response points: ${responsePoints}`); // Log the selected points
        totalPoints += responsePoints;
        console.log(`Total points so far: ${totalPoints}`); // Log the total points so far
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            $('#question-container').fadeOut(function() {
                showQuestion(currentQuestionIndex);
                $('#question-container').fadeIn();
            });
        } else {
            sessionStorage.setItem('totalPoints', totalPoints);
            window.location.href = 'result.html';
        }
    });
    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        $('#progress-bar').css('width', `${progress}%`).attr('aria-valuenow', progress);
    }

    function showResult() {
        const totalPoints = parseInt(sessionStorage.getItem('totalPoints'), 10);
        
        // Mapping points to percentages
        const percentageMap = {
            0: '0%', 1: '4%', 2: '8%', 3: '13%', 4: '17%', 5: '21%',
            6: '25%', 7: '29%', 8: '33%', 9: '38%', 10: '42%', 11: '46%',
            12: '50%', 13: '54%', 14: '58%', 15: '63%', 16: '67%', 17: '71%',
            18: '75%', 19: '79%!', 20: '83%!', 21: '88%!', 22: '92%!!', 23: '96%!!',
            24: '100%!!!'
        };
        
        const percentage = percentageMap[totalPoints];

        const descriptionMap = {
            0: '<b><h5>이 남자는 순도 100% 착한남자 입니다.</b></h5><br> 항상 당신을 먼저 생각하고, 배려심이 넘쳐요. 나쁜남자와는 거리가 먼 천사 같은 존재입니다. 당신에게 서프라이즈 선물과 달콤한 메시지를 자주 전해줄 거예요.', 
            1: '<b><h5>이 남자는 착한남자에요.</b></h5><br> 항상 따뜻하고 배려심이 많아요. 가끔씩 의견 충돌이 있을 수 있지만, 금방 화해하고 더 깊이 이해하려고 노력합니다. 가벼운 장난 정도는 귀엽게 넘어가 주세요.', 
            2: '<b><h5>이 남자는 가끔 까칠하게 구는 경우가 있습니다.</b></h5><br> 하지만 대부분은 당신을 위해 최선을 다하고 있어요. 그의 작은 이기심이 오히려 관계를 더 흥미롭게 만들기도 합니다.', 
            3: '<b><h5>조금의 나쁜남자 기질이 있어서 가끔 재미있는 장난을 칠 때가 있어요.</b></h5><br> 하지만 대부분 당신의 기분을 먼저 생각하는 착한 사람입니다.', 
            4: '<b><h5>이 남자는 나쁜남자 요소를 살짝 가지고 있지만, 오히려 그게 매력일 수 있어요.</b></h5><br> 가끔은 자신의 필요를 우선시하긴 하지만, 여전히 배려가 넘치고 당신을 위한 시간과 노력을 아끼지 않습니다.', 
            5: '<b><h5>조금 나쁜남자 스럽지만, 이정도는 걱정할 필요 없어요.</b></h5><br> 그가 하는 모든 행동은 사실 당신의 관심을 끌기 위한 것일지도 몰라요.',
            6: '<b><h5>나쁜남자의 매력을 조금씩 뿜어내고 있는 이 남자.</b></h5><br> 때로는 거칠게, 때로는 부드럽게 당신을 대합니다. 이 정도면 적당히 나쁜남자?', 
            7: '<b><h5>이 남자는 나쁜남자의 매력을 조금씩 발휘합니다.</b></h5><br> 때로는 냉정하게 보일 수 있지만, 그만큼 당신에게 더 큰 매력으로 다가오기도 합니다. 조금 더 거친 면모가 그의 매력 포인트죠.', 
            8: '<b><h5>살짝 나쁜남자의 매력을 풍기는 이 남자.</b></h5><br> 때로는 당신의 감정을 무시할 때도 있지만, 여전히 중요한 순간에는 당신을 우선시하려고 노력합니다', 
            9: '<b><h5>이 남자는 꽤 나쁜남자 스럽네요.</b></h5><br> 하지만 그만큼 매력적이기도 해요. 그의 매력에 빠져드는 건 어쩔 수 없는 일이죠.', 
            10: '<b><h5>나쁜남자의 향기가 물씬 나는 이 남자.</b></h5><br> 조금은 냉정하게 보일 때도 있지만, 그게 오히려 당신에게 더 큰 매력으로 다가올지도 몰라요.', 
            11: '<b><h5>꽤나 나쁜남자의 기질을 가진 이 남자.</b></h5><br> 자신의 필요를 위해 당신을 조종하려는 성향이 있고, 감정적으로 냉정합니다. 하지만 그의 매력에 빠져드는 건 어쩔 수 없어요.',
            12: '<b><h5>이 남자는 정확히 절반은 나쁜남자, 절반은 좋은 남자네요.</b></h5><br> 그가 가진 두 가지 매력에 당신은 늘 두근두근할 거예요.그는 자신의 욕구를 우선시하며, 당신의 감정을 무시하는 경우가 많아졌어요. 그러나 여전히 가끔은 다정한 모습을 보여줍니다.', 
            13: '<b><h5>나쁜남자의 매력이 더 많은 이 남자.</b></h5><br> 그는 자신의 필요를 위해 당신을 이용하고, 감정적으로 냉정하게 대합니다. 때로는 그의 냉정함이 오히려 더 큰 매력으로 다가오기도 합니다.', 
            14: '<b><h5>나쁜남자 기질이 다소 강한 이 남자.</b></h5><br>그는 당신을 조종하려는 경향이 있으며, 자신의 이익을 위해서라면 감정적으로 상처를 주기도 합니다.', 
            15: '<b><h5>이 남자는 상당히 나쁜남자네요.</b></h5><br> 그는 자신의 필요와 욕구가 항상 우선이며, 당신의 감정을 무시하는 경향이 매우 강합니다. 그와의 관계는 점점 더 힘들어질 수 있습니다.', 
            16: '<b><h5>나쁜남자의 기질이 꽤나 넘치는 이 남자.</b></h5><br> 그는 당신을 조종하려는 성향이 강하고, 감정적으로 냉정하며 때로는 잔인할 때도 있습니다. 나르시시스틱한 그의 매력은 위험합니다.', 
            17: '<b><h5>이 남자는 상당히 나쁜남자 기질이 많아요.</b></h5><br> 그는 자신의 욕구를 위해 당신을 이용하고, 당신의 감정을 상처 주는 일이 빈번해요. 그의 매력은 거의 위험 수준입니다.',
            18: '<b><h5>나쁜남자의 매력을 한껏 발휘하는 이 남자.</b></h5><br> 그는 자신의 이익만을 생각하며, 당신을 조종하고 감정적으로 학대할 가능성이 큽니다. 그와의 관계는 매우 힘들어질 것입니다.', 
            19: '<b><h5>이 남자는 극도로 나쁜남자입니다.</b></h5><br> 그는 냉정하고, 자기중심적이며, 당신을 조종하려는 경향이 매우 강합니다. 그의 매력은 이제 독이 되어 돌아옵니다.', 
            20: '<b><h5>이 남자는 거의 완벽한 나쁜남자에 가까워지고 있어요.</b></h5><br> 그는 당신의 감정을 우습게 여기고, 교묘하게 당신을 조종하고 상처 줄 가능성이 매우 높습니다. 그와의 관계는 독이 든 성배입니다.', 
            21: '<b><h5>이 남자는 거의 완벽한 나쁜남자.</b></h5><br> 그는 자신의 욕구만을 우선시하며, 당신을 감정적으로 학대해도 된다고 생각합니다. 왜냐하면 그렇게해도 주변에 여자들이 줄을 서서 그를 바라보기 때문이죠.', 
            22: '<b><h5>나쁜남자의 매력을 거의 완벽하게 가진 이 남자.</b></h5><br> 당신은 그의 매력에 완전히 사로잡혀있습니다. 그는 냉정하고, 잔인하며, 당신을 조종하고 학대하는 일이 빈번합니다. 하지만 당신은 이미 눈이 멀었어요.', 
            23: '<b><h5>이 남자는 거의 나쁜남자의 정점에 서 있어요.</b></h5><br> 그는 나르시시스트이며, 마키아벨리즘과 싸이코패스의 특성을 듬뿍 가진, 감정적으로 매우 해로운 사람이지만, 당신 뿐만아니라 많은 여자들이 그에게 안달이 나 있습니다. 이미 말기 중독 상태인 당신에게 무슨말을 해줄수 있을까요...',
            24: '<b><h5>나쁜남자라는 단어는 이 남자를 위해 만들어졌어요.</b></h5><br> 옴므파탈 그 자체 최상위 포식자, 치명적인 그의 매력에 중독된 채 파괴적인 이 관계에서 오히려 만족감을 느끼고있는 것은 당신뿐만이 아닙니다. 당신도 알거에요 이 남자 곁에 여러명의 여자가 있다는 것을... 빨리 도망가라는 말을 더이상 당신에게 의미없는..<br> 잔소리, 오지랖입니다.'
        };
        
        const description = descriptionMap[totalPoints];
        
        const result = {
            title: `<b>이 남자의 나쁜남자 성향</b> ${percentage}`,
            image: `../img/result_${totalPoints}.jpg`,
            description: `${description}`
        };

        const resultHTML = `
            <h3>${result.title}</h3>
            <br>
            <img src="${result.image}" alt="${result.title}" class="img-fluid" id="result-img">
            <p class="mt-3">${result.description}</p>
            
        
        `;
        $('#result-container').html(resultHTML);
    }

    if ($('#question-container').length) {
        showQuestion(currentQuestionIndex);
        updateProgressBar();
    }

    if ($('#result-container').length) {
        showResult();
    }
});
