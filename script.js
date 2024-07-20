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
        { question: "이 남자의 외모는?", responses: ["보통이다", "가끔 잘생겼다는 이야기를 듣는다", "훈남이다", "너무 잘생겨서 불안하다"] },
        { question: "이 남자에게 무엇인가 해달라고 하면?", responses: ["무리한 부탁도 들어준다", "일부 들어준다", "이런 저런 이유로 안 된다고 하면서 빼려고 한다", "내가(여자가) 뭐라도 더 해주고싶다"] },
        { question: "이 남자가 고백 또는 사귀자는 이야기를", responses: ["먼저했다", "내가(여자가) 먼저 했다", "할 낌새가 안보여 애간장이 탄다", "안했고 앞으로도 안할것이 분명하지만 괜찮다"] },
        { question: "이 남자의 스킨쉽의 정도는?", responses: ["여자를 지켜주려 한다", "일반적이다", "서투르지만 많다", "아주 많고 능숙하다"] },
        { question: "이 남자가 헤어짐에 대해 어떻게 생각하는가?", responses: ["헤어지지 않으려 집착한다", "잘 모르겠다", "헤어지자고 한적이 있다", "미련이 없다/없어보인다"] },
        { question: "이 남자 주변에", responses: ["여자가 없고 일편단심이다", "여사친이 한두명 있다", "여사친이 많다", "모든 여자를 완전 거부하지도, 엄청잘해주지도 않는다"] },
        { question: "이 남자의 감정은", responses: ["드러나거나 공유된다", "숨기지만 알 수 있다", "잘 알다가도 모르겠다", "도저히 알수가 없다"] },
        { question: "이 남자가 무엇인가 결정할 때 내(여자의) 의사를", responses: ["항상 묻고 결정한다", "가끔 묻고 결정한다", "묻긴 하지만 자기 멋대로 한다", "묻지 않고 멋대로 행동해 좀 챙겨주고싶다."] }
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
        const shuffledResponses = shuffle([...question.responses]); // Shuffle responses

        const questionHTML = `
            <h4>${question.question}</h4>
            <br>
            <div class="d-grid gap-2 col-12 col-md-8 mx-auto">
                ${shuffledResponses.map((response, i) => `
                    <button class="btn btn-outline-secondary mt-2 btn-block response-btn" data-points="${points[question.responses.indexOf(response)]}">${response}</button>
                `).join('')}
            </div>
        `;
        $('#question-container').html(questionHTML);
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
            sessionStorage.setItem('totalPoints', totalPoints);
            window.location.href = 'result.html';
        }
    });

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
            12: '<b><h5>이 남자는 정확히 절반은 나쁜남자, 절반은 착한남자 입니다.</b></h5><br> 상황에 따라 다르게 행동하며, 이중적인 매력을 발산합니다. 당신은 그의 두 얼굴 모두에 빠질지도 몰라요.', 
            13: '<b><h5>살짝 더 나쁜남자 쪽으로 기우는 이 남자.</b></h5><br> 그의 냉정한 태도에 상처받을 때도 있지만, 그만큼 강한 매력에 끌리기도 합니다.', 
            14: '<b><h5>이 남자는 나쁜남자의 기질을 다분히 가지고 있습니다.</b></h5><br> 자신의 필요를 우선시하며, 당신의 감정을 배려하지 않을 때도 있어요. 하지만 그의 매력에 빠져드는 건 어쩔 수 없어요.', 
            15: '<b><h5>나쁜남자 스러운 면이 많은 이 남자.</b></h5><br> 자신이 원하는 것을 얻기 위해 당신을 조종하려는 성향이 있으며, 감정적으로 냉정합니다.', 
            16: '<b><h5>이 남자는 거의 나쁜남자 입니다.</b></h5><br> 자신의 필요를 위해 당신을 이용하려는 경향이 강하며, 감정적으로도 냉정합니다. 그의 매력에 빠져드는 건 어쩔 수 없지만, 상처받을 각오는 해야겠어요.', 
            17: '<b><h5>이 남자는 나쁜남자의 끝판왕!</b></h5><br> 그의 모든 행동이 당신을 괴롭히는 것 같지만, 그만큼 강한 매력에 빠져드는 것도 사실입니다. 하지만 그의 냉정한 태도에 상처받지 않도록 주의하세요.', 
            18: '<b><h5>나쁜남자 기질이 상당한 이 남자.</b></h5><br> 당신의 감정을 배려하지 않으며, 자신의 필요를 위해 행동합니다. 그의 매력에 빠져드는 건 어쩔 수 없지만, 상처받지 않도록 조심하세요.', 
            19: '<b><h5>이 남자는 거의 나쁜남자 끝판왕!</b></h5><br> 그의 모든 행동이 당신을 괴롭히는 것 같지만, 그만큼 강한 매력에 빠져드는 것도 사실입니다. 그의 냉정한 태도에 상처받지 않도록 주의하세요.', 
            20: '<b><h5>이 남자는 나쁜남자의 끝판왕입니다.</b></h5><br> 그의 모든 행동이 당신을 괴롭히는 것 같지만, 그만큼 강한 매력에 빠져드는 것도 사실입니다. 상처받지 않도록 조심하세요.', 
            21: '<b><h5>이 남자는 나쁜남자 기질이 강합니다.</b></h5><br> 당신의 감정을 배려하지 않으며, 자신의 필요를 위해 행동합니다. 그의 매력에 빠져드는 건 어쩔 수 없지만, 상처받지 않도록 조심하세요.', 
            22: '<b><h5>이 남자는 매우 나쁜남자 입니다.</b></h5><br> 당신을 배려하지 않고, 자신의 필요를 우선시합니다. 그의 매력에 빠져드는 건 어쩔 수 없지만, 상처받지 않도록 조심하세요.', 
            23: '<b><h5>이 남자는 나쁜남자 기질이 아주 강합니다.</b></h5><br> 자신의 필요를 위해 당신을 조종하려는 성향이 강하며, 감정적으로도 냉정합니다.', 
            24: '<b><h5>이 남자는 순도 100% 나쁜남자 입니다.</b></h5><br> 그의 모든 행동이 당신을 괴롭히는 것 같지만, 그만큼 강한 매력에 빠져드는 것도 사실입니다. 상처받지 않도록 조심하세요.'
        };

        const resultHTML = `
            <h3>나쁜 남자 테스트 결과</h3>
            <p>나쁜남자 지수: ${percentage}</p>
            <p>${descriptionMap[totalPoints]}</p>
        `;

        $('#result-container').html(resultHTML);
    }

    if (window.location.pathname.endsWith('quiz.html')) {
        showQuestion(currentQuestionIndex);
    } else if (window.location.pathname.endsWith('result.html')) {
        showResult();
    }
});
