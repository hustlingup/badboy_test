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
                    <div>
                        <h5><b>나르시시스트의 특징</b></h5>
                        <h6>(거창하고 과대해진 이미지의 자아)</h6>
                        <img src="../advanced_version/img/narcissistic.png" alt="Result Image" class="img-fluid mt-1">
                        <p>
                            나르시시스트 성향을 가진 남자는 권리의식과 강한 지배력을 지니고 있으며, 자기애적 성격으로 스스로에 대한 큰 자부심을 가지고 있습니다. 이러한 특성은 모든 문화권에서 남성의 나르시시즘으로 나타나며, 특히 그의 단기적인 연애 전략에서 두드러집니다. 그는 자신의 성과를 높이려는 강한 의지와 능력을 가지고 있어, 이를 통해 경쟁에서 우위를 점하려 합니다.
                            성관계 후에는 종종 배우자와의 관계를 단절하려는 경향이 있지만, 그의 매력은 여전히 강렬합니다. 그는 자신의 매력을 어필하는 데 능숙하며, 신체적으로나 패션적으로 매우 매력적인 경우가 많습니다. 또한, 그는 자신의 부와 자원을 제공하는 데 있어 굉장히 매력적인 방법으로 홍보하는 능력이 뛰어납니다.
                            그의 이러한 특성들 덕분에 그는 많은 여성들에게 매력적으로 보일 수 있으며, 이러한 관계에서 태어난 아이들도 많습니다. 그의 독특한 성격과 매력은 당신에게도 깊은 인상을 남겼을 것입니다.
                        </p>
                        <h4><b>마키아벨리안 특징</b></h4>
                        <h5>(타인을 이용하고 조작)</h5>
                        <img src="../advanced_version/img/machiavellian.png" alt="Result Image" class="img-fluid mt-1">
                        <p>
                            마키아벨리적 성향을 가진 남자는 대인관계에서 다채로운 성격을 지니고 있어, 그의 신비로움과 매력이 사람들을 사로잡습니다. 외향적인 성격 덕분에 그는 사교성이 뛰어나고, 사람들과의 상호작용을 즐기며 활발하게 활동합니다. 그는 이른 시기에 성적 경험을 시작했으며, 성적 관계에서 자신감 넘치는 모습을 보여줍니다.
                            연애 관계에서 그는 강한 매력으로 상대방을 사로잡고, 깊은 인상을 남깁니다. 진정한 애정과 열정을 가지고 다가가며, 때로는 자신만의 독특한 방식으로 사랑을 표현합니다. 그의 이러한 특성들은 그를 특별하고 다면적인 인물로 만들어, 주변 사람들에게 끊임없이 흥미와 매력을 불러일으킵니다. 이 모든 점들이 당신이 그를 사랑하게 만드는 이유입니다.
                        </p>
                        <h4><b>싸이코패스</b></h4>
                        <h5>(충동적, 남을 기만, 감정없음)</h5>
                        <img src="../advanced_version/img/psychopathic.png" alt="Result Image" class="img-fluid mt-1">
                        <p>
                            싸이코패스 성향을 가진 남자는 때때로 냉담하고 공감이 부족하며, 변덕스러운 행동을 보이기도 합니다. 그의 성적 패턴은 매우 자유롭고 무제한적입니다. 그는 피상적인 것에 더 끌리는 경향이 있어, 깊은 감정적 대화를 나누는 데 어려움을 겪기도 합니다.
                            그럼에도 불구하고, 그는 매력적이고 사람을 끌어당기는 힘이 있으며, 이러한 매력을 바탕으로 대인관계를 이어갑니다. 때로는 기만적이고 성적으로 착취적인 모습도 보일 수 있지만, 그의 매력은 쉽게 사라지지 않습니다. 당신은 이러한 그의 복잡한 성격에도 불구하고, 여전히 그의 매력에 빠져들어 사랑하게 되었을 것입니다.
                        </p>
                    </div>

                </div>
            `;
        }
    }
});
