class Quiz {
  constructor() {
    this.audio = null;
    this.QUIZ = [
      {
        image: `quiz-Q1.jpg`,
        question: `You step into a restaurant after enduring a storm. How are you feeling?`,
        answers: {
          HighRisk: `Great! - Revitalised, excited to dig in!`,
          LeastRisk: `A little shaken by the weather - need to take a minute before you order`,
          LowRisk: `I'm okay - just waiting to get a seat`,
          ModerateRisk: `Feeling good - ready to head in and browse the menu`,
        },
      },
      {
        image: `quiz-Q2.jpg`,
        question: `Your reservation has been confirmed, but your table is not ready, and the restaurant looks crowded tonight. What's your reaction?`,
        answers: {
          LeastRisk: `Feel reassured that your spot has been confirmed and wait patiently`,
          LowRisk: `Ask how long the wait will be`,
          HighRisk: `Insist on being moved to an available seat to start dining immediately`,
          ModerateRisk: `Ask if there are any other alternate seats that are available at the moment`,
        },
      },
      {
        image: `quiz-Q3.jpg`,
        question: `The waiter comes over as you take a seat. He asks if you are craving anything and you respond with...`,
        answers: {
          LowRisk: `Give me the crowd's favourite`,
          LeastRisk: `Give me the signature dish`,
          ModerateRisk: `What dish do you recommend?`,
          HighRisk: `Surprise me!`,
        },
      },
      {
        image: `quiz-Q4.jpg`,
        question: `Before leaving, he asks about how you like the pacing of your meals being served, and you answer with...`,
        answers: {
          ModerateRisk: `No preferences`,
          HighRisk: `Pay extra to get onto the next available flight`,
          LeastRisk: `I'll let you know when I am done with each dish`,
          LowRisk: `Serve immediately when ready!`,
        },
      },
      {
        image: `quiz-Q5.jpg`,
        question: `The appetizer has arrived but wait! You notice an unexpected ingredient. What's your reaction?`,
        answers: {
          HighRisk: `Go for it and enjoy the surprise without hesitation`,
          LeastRisk: `Ask if the dish could be served without it`,
          LowRisk: `Ask the waiter about the taste before deciding`,
          ModerateRisk: `Take a sniff and a small bite to test if you like it`,
        },
      },
      {
        image: `quiz-Q6.jpg`,
        question: `You're digging into the main dish but you don't like the taste. What do you do?`,
        answers: {
          HighRisk: `Let the waiter know and give your feedback`,
          LowRisk: `Ask for garnish`,
          LeastRisk: `Stop eating`,
          ModerateRisk: `Request for a different dish`,
        },
      },
      {
        image: `quiz-Q7.jpg`,
        question: `You've just finished your main meal, and your stomach starts to feel full...but you have one more dish to go. What would you do?`,
        answers: {
          HighRisk: `Inform the waiter that you will just pass`,
          LowRisk: `Ask the waiter to delay the meal - I need time to digest`,
          LeastRisk: `Ask for a takeaway container - I can just finish it at home!`,
          ModerateRisk: `Bring forth the dessert! - I can handle it`,
        },
      },
      {
        image: `quiz-Q8.jpg`,
        question: `At the end, the chef asks about how you felt about the overall experience. How would you respond?`,
        answers: {
          LowRisk: `Tell him your favourite part of the experience`,
          ModerateRisk: `Share what you enjoyed along with some suggestions`,
          LeastRisk: `"Everything was good." - You keep things simple and polite`,
          HighRisk: `Give your honest, detailed feedback and suggest improvements`,
        },
      },
      // { //only show when got tie-breaker
      //   image: `quiz-Q9.jpg`,
      //   question: `You are at the end of your trip, what souvenirs do you bring home? `,
      //   answers: {
      //     LeastRisk: `Just the photos/memories`,
      //     HighRisk: `Unique collectibles / local crafts`,
      //     ModerateRisk: `Popular local specialties purchased during the tour`,
      //     LowRisk: `Local snacks for family and friends`,
      //   },
      // },
    ].map((v, i) => ({ ...v, id: i + 1 }));

    //change this to point system
    // this.RESULT = [
    //   {
    //     url: "result-capital-preservation.html",
    //     format: "CAPITAL PRESERVATION",
    //   },
    //   {
    //     url: "result-wealth-accumulation.html",
    //     format: "WEALTH ACCUMULATION",
    //   },
    //   {
    //     url: "result-income-generation.html",
    //     format: "INCOME GENERATION",
    //   },
    //   {
    //     url: "result-legacy-planning.html",
    //     format: "LEGACY PLANNING",
    //   },
    // ].map((v, i) => ({
    //   ...v,
    //   id: i + 1,
    //   formatCheck: v.format,
    // }));

    this.RESULT = [
      { min: 8,  max: 11, url: "result-picky-eater.html" }, // MMF | SDBF
      { min: 12, max: 13, url: "result-menu-planner1.html" }, // SDBF | MMF
      { min: 14, max: 15, url: "result-menu-planner2.html" }, // SDBF | Gold
      { min: 16, max: 17, url: "result-classic-lover.html" }, // Gold | SDBF
      { min: 18, max: 19, url: "result-restaurant-critic.html" }, // Gold | DivEQ
      { min: 20, max: 21, url: "result-adventurous-foodie1.html" }, // DivEQ | Gold
      { min: 22, max: 23, url: "result-adventurous-foodie2.html" }, // DivEQ | SLC
      { min: 24, max: 25, url: "result-SLC-DivEQ.html" }, // SLC | DivEQ
      { min: 26, max: 27, url: "result-SLC-Trust.html" }, // SLC | Trust
      { min: 28, max: 32, url: "result-Trust-SLC.html" } // Trust | SLC
    ]

    this.currentQuizID = 1;
    this.userAnswers = new Array();
  }

  run() {
    if (this.QUIZ && this.QUIZ.length && this.RESULT && this.RESULT.length) {
      this.playMusic();
      this.renderQuiz(this.currentQuizID);
    }
  }

  renderQuiz(quizID) {

    console.log(quizID + ", " + this.currentQuizID)
    if (quizID && !isNaN(quizID)) {
      const quizData = this.QUIZ.find((v) => v.id === quizID);
      const isLastQuiz = quizID >= this.QUIZ.length;

      if (quizData) {
        document.title = `LionGlobal Signature Singapore Suite Quiz | Lion Global Investors`;

        const quizRender = document.getElementById("quiz-render");

        if (quizRender) {
          quizRender.innerHTML = `
                    <div class="uk-card quiz-card" data-id="${quizData.id}">
                        <div class="ans-banner-container">
                            <img class="quiz-cover-image" src="pic/${quizData.image}" alt="Quiz Cover Image">
                        </div>
                        <div class="quiz-info">
                            
                            <div class="quiz-options">
                                ${Object.entries(quizData.answers).map(([key, value]) => `
                                <div class="quiz-option">
                                    <input id="quiz-${quizData.id}-${key}" type="radio" name="quiz-${quizData.id}" value="${key}">
                                    <label for="quiz-${quizData.id}-${key}">
                                        ${value}
                                    </label>
                                </div>`).join("")}
                            </div>
                        </div>
                    </div>`;

          const quizOptions = document.querySelectorAll(".quiz-option input");

          if (quizOptions.length > 0) {
            quizOptions.forEach((option) => {
              option.addEventListener("change", () => {
                quizOptions.forEach((el) => el.setAttribute("disabled", true));

                const selectedInput = document.querySelector(".quiz-option input:checked");

                if (selectedInput) {
                  const answer = selectedInput.value;
                  this.userAnswers.push({ quizID, answer });
                  console.log("renderQuiz => userAnswers -", this.userAnswers);

                  setTimeout(() => {
                    if (isLastQuiz) {
                      this.showResult();
                    } else {
                      this.renderQuiz(quizID + 1);
                      this.currentQuizID = quizID + 1;
                    }
                  }, 500);
                }
              });
            });
          }
        }
      }
    }
  }

  playMusic() {
    if (!this.audio) {
      this.audio = new Audio('audio/bgm.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.1;
      this.audio.play().catch(err => {
        console.warn("Autoplay blocked, waiting for user interaction.");
          const playOnUserInteraction = () => {
          this.audio.play().catch(err => console.error("Audio play still blocked:", err));
          document.removeEventListener("click", playOnUserInteraction);
        };
  
        document.addEventListener("click", playOnUserInteraction);
      });
    }
  }

  showResult() {
    console.log("showResult => userAnswers -", this.userAnswers);

    const scoreMap = {
      LeastRisk: 1,
      LowRisk: 2,
      ModerateRisk: 3,
      HighRisk: 4
    };

    // calculate total score
    const totalScore = this.userAnswers.reduce((sum, item) => {
      return sum + scoreMap[item.answer];
    }, 0);

    console.log("Total Score:", totalScore);

    // find matching result range
    const result = this.RESULT.find(r =>
      totalScore >= r.min && totalScore <= r.max
    );

    if (result) {
      console.log("Redirecting to:", result.url);
      location.href = result.url;
    } else {
      console.error("No matching result found for score:", totalScore);
    }
    
  }


  // showResult() {
  //   console.log("showResult => userAnswers -", this.userAnswers);
  
  //   if (this.userAnswers && this.userAnswers.length) {
  //     const counts = this.userAnswers.reduce((acc, { answer }) => {
  //       acc[answer] = (acc[answer] || 0) + 1;
  //       return acc;
  //     }, {});
  
  //     const maxCount = Math.max(...Object.values(counts));
  //     const dominantCategories = Object.keys(counts).filter(
  //       (key) => counts[key] === maxCount
  //     );
  
  //     console.log("Dominant Categories:", dominantCategories);
  
      // let dominantCategory;
  
      // if (dominantCategories.length > 1) {
      //   console.log("Tie detected, initiating tiebreaker...");
  
      //   const quizRender = document.getElementById("quiz-render");
  
      //   if (quizRender) {
      //     const tiebreakerQuiz = this.QUIZ.find(
      //       (quiz) =>
      //         quiz.question ===
      //         "You are at the end of your trip, what souvenirs do you bring home? "
      //     );
  
      //     if (tiebreakerQuiz) {
      //       const filteredAnswers = Object.fromEntries(
      //         Object.entries(tiebreakerQuiz.answers).filter(([key]) =>
      //           dominantCategories.includes(key)
      //         )
      //       );
      //       quizRender.innerHTML = `
      //         <div class="uk-card quiz-card">
      //         <div class="ans-banner-container">
      //           <img class="quiz-cover-image" src="pic/${tiebreakerQuiz.image}" alt="Tiebreaker Question">
      //         </div>
      //         <div class="quiz-info">
      //           <p class="quiz-desc">
                
      //           </p>
      //           <div class="quiz-options">
      //             ${Object.entries(filteredAnswers)
      //               .map(
      //                 ([key, value]) => `
      //                   <div class="quiz-option">
      //                     <input id="tiebreaker-${key}" type="radio" name="tiebreaker" value="${key}">
      //                     <label for="tiebreaker-${key}">
      //                       ${value}
      //                     </label>
      //                   </div>`
      //               )
      //               .join("")}
      //           </div>
      //         </div>
      //       </div>`;
      //       const tiebreakerOptions = document.querySelectorAll(".quiz-option input");
  
      //       if (tiebreakerOptions.length > 0) {
      //         tiebreakerOptions.forEach((option) => {
      //           option.addEventListener("change", () => {
      //             tiebreakerOptions.forEach((el) => el.setAttribute("disabled", true));
  
      //             const selectedInput = document.querySelector(".quiz-option input:checked");
  
      //             if (selectedInput) {
      //               dominantCategory = selectedInput.value;
      //               console.log("Tiebreaker Winner:", dominantCategory);
  
      //               this.processResult(dominantCategory);
      //             }
      //           });
      //         });
      //       }
      //     } else {
      //       console.error("Tiebreaker question not found in QUIZ data.");
      //     }
      //   }
      // } else {
      //   dominantCategory = dominantCategories[0];
      //   console.log("Dominant Category:", dominantCategory);
  
      //   const resultData = this.RESULT.find(
      //     (r) => r.format.toLowerCase().includes(dominantCategory.toLowerCase())
      //   );
  
      //   console.log("Result Data:", resultData);
  
      //   if (resultData) {
      //     location.href = resultData.url;
      //   } else {
      //     console.error("No matching result found.");
      //   }
      // }
  //   }
  // }  
  
  // processResult(dominantCategory) {
  //   if (!dominantCategory) {
  //     console.error("No dominant category provided to processResult.");
  //     return;
  //   }

  //   const resultData = this.RESULT.find(
  //     (r) => r.format.toLowerCase().includes(dominantCategory.toLowerCase())
  //   );

  //   if (resultData) {
  //     console.log("Processing Result:", resultData);
  //     location.href = resultData.url;
  //   } else {
  //     console.error("No matching result found for the category:", dominantCategory);
  //   }
  // }

}

function prefetchImages(folderPath, fileNames) {
  const baseURL = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');

  fileNames.forEach(fileName => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `${baseURL}${folderPath}${fileName}`;
      document.head.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const imageFiles = [
    // "answers.png",
    // "boarding_pass.png",

  ];
  prefetchImages('/pic/', imageFiles);
  const quiz = new Quiz();
  quiz.run();
});