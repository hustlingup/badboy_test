$(document).ready(function() {
    // Start button click event
    $('#start-btn').click(function() {
        window.location.href = 'quiz.html';
    });
    // Normal test button click event
    $('#normal-btn').click(function() {
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
            questionDiv.className = 'card';
            questionDiv.innerHTML = `<p>${q.question}</p>`;

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
        $('#submit-btn').click(function() {
            if (validateResponses()) {
                calculateResults();
                window.location.href = 'result.html';
            }
        });
    }

    // Validate responses
    function validateResponses() {
        for (let index = 0; index < questions.length; index++) {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (!selectedOption) {
                // Scroll to the first unanswered question
                const questionElement = document.querySelector(`input[name="question${index}"]`).closest('.card');
                questionElement.scrollIntoView({ behavior: 'smooth' });
                return false;
            }
        }
        return true;
    }

    // Calculate results
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
    }

    // Display results on result.html
    if (window.location.pathname.includes('result.html')) {
        const results = JSON.parse(localStorage.getItem('testResults'));
        if (results) {
            const totalPercentage = results.narcissism + results.machiavellian + results.psychopathy;

            let imageUrl, description;
            if (totalPercentage === 0) {
                imageUrl = '../advanced_version/img/result0.png';
                description = '<h4><b>나쁜남자 성향이 단 1%도 없는 착한남자</b></h4><p>좀 더 숫컷의 냄새가 나도록 내 옆에 두고두고 키워볼까요?</p>';
            } else if (totalPercentage > 0 && totalPercentage <= 75) {
                imageUrl = '../advanced_version/img/result1.png';
                description = '<h4><b>아주 약간 나쁜남자 끼가있는 이 남자</b></h4><p>당신의 인생 파트너로 영구귀속 시키세요.<br>단기적으로나 장기적으로나 이런 남자와 같이하는 인생은 따분하지도 고통받지도 않을 가능성이 높아요.</p>';
            } else if (totalPercentage > 75 && totalPercentage <= 150) {
                imageUrl = '../advanced_version/img/result2.png';
                description = '<h4><b>적당히 나쁜남자인 이 남자</b></h4><p>당신의 감정은 편할 날이 없겠군요.<br>본질적인 가치를 놓고 신중하게 판단하세요.</p>';
            } else if (totalPercentage > 150 && totalPercentage <= 225) {
                imageUrl = '../advanced_version/img/result3.png';
                description = '<h4><b>상당히 나쁜남자에요.</b></h4><p>마음 고생 꽤나 하고계시군요.<br>아래 내용을 자세히 읽고 현명한 판단을 내리세요.</p>';
            } else if (totalPercentage > 225 && totalPercentage <= 300) {
                imageUrl = '../advanced_version/img/result4.png';
                description = '<h4><b>윽!!! 역한 냄새가 나요.</b></h4><p>설마 진짜로 이런 사람과 관계를 가지고있는건 아니죠?<br>맞다면 당장 도망치세요. 빨리요!!!</p>';
            } else {
                // Handle any unexpected value (though should not happen with defined ranges)
                imageUrl = '../advanced_version/img/result1.png'; // Default to result1.png
                description = '뭔가 잘못됬어요 테스트를 다시 시도하세요';
            }

            document.getElementById('resultContainer').innerHTML = `
                <div>
                    <h2 class="mt-4">테스트 결과</h2>
                    <img src="${imageUrl}" alt="Result Image" class="img-fluid mt-4">
                    
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
                    </div><br>
                    <div>${description}</div>
                    

                </div>
            `;
        }
    }
});
