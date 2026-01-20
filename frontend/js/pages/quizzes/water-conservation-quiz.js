const questions=[
    {
        question: "What is the most effective way to reduce water usage at home?",
        options:[
            "Leave the tap running",
            "Turn off tap",
            "Use more water",
            "Wash hands again"
        ],
        correct:1
    },
    {
        question: "When is the best time to water plants?",
        options: [
        "Afternoon",
        "Midnight",
        "Early morning",
        "Anytime"
        ],
        correct: 2
    },
    {
        question: "Which uses less water?",
        options: [
        "Running hose",
        "Bucket of water",
        "Daily car wash",
        "Overflow tank"
        ],
        correct: 1
    },
    {
        question: "Why should we save water?",
        options: [
        "Water is unlimited",
        "Water is expensive only",
        "Fresh water is limited",
        "It looks good"
        ],
        correct: 2
    }
];

let currentIdx=0;
let score=0;
const questionEl=document.getElementById("question");
const optionsButtons=document.querySelectorAll(".option-btn");
const feedbackEl=document.getElementById("feedback");
const scoreEl=document.getElementById("score");
const nextBtn=document.getElementById("nextBtn");
const startBtn=document.getElementById("startQuizBtn");
const readyScreen=document.getElementById("readyScreen");
const quizScreen=document.getElementById("quizScreen");


function loadQuestion(){
    feedbackEl.textContent="";
    nextBtn.disabled=true;

    const currentQuestion=questions[currentIdx];
    questionEl.textContent=currentQuestion.question

    optionsButtons.forEach((button,idx)=>{
        button.textContent=currentQuestion.options[idx];
        button.disabled=false;
        button.style.backgroundColor="#e8f5e9";
    });
}
optionsButtons.forEach((btn,idx)=>{
    btn.addEventListener("click",()=>{
        const correctIdx=questions[currentIdx].correct;
        optionsButtons.forEach(b => b.disabled = true);
        if (idx === correctIdx) {
            score++;
            btn.style.background = "#a5d6a7";
            feedbackEl.textContent = "✅ Correct!";
            feedbackEl.style.color = "green";
        } else {
            btn.style.background = "#ef9a9a";
            feedbackEl.textContent = "❌ Not quite right";
            feedbackEl.style.color = "red";
        }
        scoreEl.textContent=score;
        nextBtn.disabled=false;

    })

});
nextBtn.addEventListener("click",()=>{
        currentIdx++;
        if (currentIdx<questions.length){
            loadQuestion();
        }
        else{
            questionEl.textContent="🎉 Quiz Completed!";
            document.querySelector(".options").style.display="none";
            nextBtn.style.display="none";
            feedbackEl.textContent=`Final score ${score}/${questions.length}`;
            feedbackEl.style.color="#2e7d32";
        }
    })

    startBtn.addEventListener("click",()=>{
        readyScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden"); 
        loadQuestion();
    })