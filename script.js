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
        const responsePointsMap = question.responses.map((response, i) => ({
            response,
            points: points[i]
        }));
        const shuffledResponsePointsMap = shuffle(responsePointsMap);

        const questionHTML = `
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
            <div text-center mt-6">
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
            <button class="btn btn-primary mt-3 btn-block response-btn" onclick="window.location.href='index.html'">다시하기</button>
        
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
