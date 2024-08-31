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
});