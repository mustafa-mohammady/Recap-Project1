const answerButton = document.querySelectorAll(".show-answer");
const answer = document.querySelector(".answer");

const toggleAnswer = (label, p) => {
  const data_con = label.getAttribute("data-condition");
  if (data_con == "hide") {
    p.removeAttribute("hidden");
    label.textContent = "Hide Answer";
    label.setAttribute("data-condition", "show");
  } else {
    p.setAttribute("hidden", "hidden");
    label.setAttribute("data-condition", "hide");
    label.textContent = "Show Answer";
  }
};

// Show answer
if (answerButton)
  answerButton.forEach((button) => {
    const current_answer = button.parentElement.querySelector(".answer");

    button.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach((an) => {
        if (an !== current_answer) {
          const label = an.parentElement.querySelector(".show-answer");
          label.textContent = "Show Answer";
          an.setAttribute("hidden", "hidden");
        }
      });

      toggleAnswer(button, current_answer);
    });
  });

// Bookmark toggle
document.querySelectorAll(".q_bookmark_icon").forEach((an) => {
  an.addEventListener("click", () => {
    an.classList.toggle("fas");
    an.classList.toggle("fa-regular");
  });
});
