$(document).ready(function () {
    // Start button click event
    $('#start-btn').click(function () {
        window.location.href = 'quiz.html';
    });

    // Normal test button click event
    $('#normal-btn').click(function () {
        window.location.href = '../index.html';
    });

    const questions = [
        { question: "1. 그는 다른 사람들이 자신을 존경해 주기를 바라는 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "2. 그는 사람들이 자신에게 관심을 가져주기를 바라는 경향이 있다", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "3. 그는 다른 사람에게서 특별한 호의를 기대하는 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "4. 그는 명성이나 지위를 추구하는 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "5. 그는 자신의 뜻대로 하기 위해 속임수를 쓰거나 거짓말을 한다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "6. 그는 자신의 뜻대로 되도록 다른 사람을 조종하는 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "7. 그는 자신의 뜻대로 하기 위해 아첨을 한다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "8. 그는 자신의 목적을 위해 다른 사람을 착취하는 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "9. 그는 냉담하거나 무감각한 경향이 있다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "10. 그는 냉소적인 편이며, 쌀쌀한 태도로 사람을 업신여기고 비웃곤 한다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "11. 그는 잘못한 일에 대해 죄책감이 부족한 편이다.", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] },
        { question: "12. 그는 자신의 행동의 도덕성에 대해 별로 신경 쓰지 않는 편이다", responses: ["전혀 아니다", "조금 그렇다", "보통이다", "대체로 그렇다", "매우 그렇다"] }
    ];

    // Render questions on quiz.html
    if (window.location.pathname.includes('quiz.html')) {
        const questionsContainer = document.getElementById('questionsContainer');
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-card'; // Changed from card to question-card
            questionDiv.innerHTML = `<p class="question-text">${q.question}</p>`;

            const responsesList = document.createElement('ul');
            responsesList.className = 'responses';

            q.responses.forEach((response, i) => {
                const responseItem = document.createElement('li');
                const responseLabel = document.createElement('label');
                responseLabel.innerHTML = `<input type="radio" name="question${index}" value="${i}"> <span class="hidden-text">${response}</span>`;
                responseItem.appendChild(responseLabel);
                responsesList.appendChild(responseItem);
            });

            questionDiv.appendChild(responsesList);
            questionsContainer.appendChild(questionDiv);
        });

        // Submit button click event
        $('#submit-btn').click(function () {
            if (validateResponses()) {
                calculateResults();
            }
        });
    }

    // Validate responses
    function validateResponses() {
        for (let index = 0; index < questions.length; index++) {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (!selectedOption) {
                // Scroll to the first unanswered question
                const questionElement = document.querySelector(`input[name="question${index}"]`).closest('.question-card');
                questionElement.scrollIntoView({ behavior: 'smooth' });
                return false;
            }
        }
        return true;
    }

    // Calculate results and redirect to the appropriate result page
    function calculateResults() {
        const results = {
            narcissism: 0,
            machiavellian: 0,
            psychopathy: 0
        };
        const totalQuestions = questions.length;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                const score = parseInt(selectedOption.value);
                if (index < 4) results.narcissism += score;
                else if (index < 8) results.machiavellian += score;
                else results.psychopathy += score;
            }
        });

        // Convert scores to percentages
        const maxScore = 4 * (totalQuestions / 3); // 4 is the max score per question and totalQuestions/3 is number of questions per trait
        results.narcissism = (results.narcissism / maxScore) * 100;
        results.machiavellian = (results.machiavellian / maxScore) * 100;
        results.psychopathy = (results.psychopathy / maxScore) * 100;

        // Save results to local storage
        localStorage.setItem('testResults', JSON.stringify(results));

        // Calculate total percentage
        const totalPercentage = results.narcissism + results.machiavellian + results.psychopathy;

        // Redirect to the appropriate result page based on the totalPercentage
        if (totalPercentage === 0) {
            window.location.href = 'result_0.html';
        } else if (totalPercentage > 0 && totalPercentage <= 42.86) {
            window.location.href = 'result_1.html';
        } else if (totalPercentage > 42.86 && totalPercentage <= 85.71) {
            window.location.href = 'result_2.html';
        } else if (totalPercentage > 85.71 && totalPercentage <= 128.57) {
            window.location.href = 'result_3.html';
        } else if (totalPercentage > 128.57 && totalPercentage <= 171.43) {
            window.location.href = 'result_4.html';
        } else if (totalPercentage > 171.43 && totalPercentage <= 214.29) {
            window.location.href = 'result_5.html';
        } else if (totalPercentage > 214.29 && totalPercentage <= 257.14) {
            window.location.href = 'result_6.html';
        } else if (totalPercentage > 257.14 && totalPercentage <= 300) {
            window.location.href = 'result_7.html';
        }
    }

    // Display results on all result pages (result_0.html to result_7.html)
    if (window.location.pathname.match(/result_[0-7]\.html$/)) {
        const results = JSON.parse(localStorage.getItem('testResults'));
        if (results) {
            document.getElementById('resultContainer').innerHTML = `
                <div>
                    <div class="result-row mt-3">
                        <div class="text-area">나르시시스트:</div>
                        <div class="percentage-area">${results.narcissism.toFixed(2)}%</div>
                        <div class="gauge-container">
                            <div class="gauge">
                                <div class="fill narcissism" style="width: ${results.narcissism}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="result-row">
                        <div class="text-area">마키아벨리안:</div>
                        <div class="percentage-area">${results.machiavellian.toFixed(2)}%</div>
                        <div class="gauge-container">
                            <div class="gauge">
                                <div class="fill machiavellian" style="width: ${results.machiavellian}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="result-row">
                        <div class="text-area">싸이코패스:</div>
                        <div class="percentage-area">${results.psychopathy.toFixed(2)}%</div>
                        <div class="gauge-container">
                            <div class="gauge">
                                <div class="fill psychopathy" style="width: ${results.psychopathy}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Append Psychology section
        $('.result-card').first().after(`
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
    }
});
