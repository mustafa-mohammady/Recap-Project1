const form = document.querySelector("[data-js='question_form']");
const question_input = document.querySelector("[data-js='question_data']");
const answer_input = document.querySelector("[data-js='answer_data']");
const tag_input = document.querySelector("[data-js='tag_data']");
const mainContainer = document.querySelector("[data-js='main_container']");
const submit_button = document.querySelector(".btn_submit");

if (form) {
  const q_maxLength = question_input && question_input.maxLength;
  const an_maxLength = answer_input && answer_input.maxLength;
  const tag_maxLength = tag_input && tag_input.maxLength;

  const question_character_left = form
    ? form.querySelector("[data-js='question_character_left']")
    : 0;
  const answer_character_left = form
    ? form.querySelector("[data-js='answer_character_left']")
    : 0;

  const setCharacterLimit = () => {
    question_character_left.textContent = q_maxLength + " characters left";
    answer_character_left.textContent = an_maxLength + " characters left";
  };

  setCharacterLimit();

  // -------------------------------------------------------------------------
  const handleInput = (inputName, inputCharacterTag) => {
    inputName.addEventListener("input", (e) => {
      const text_length = e.target.value.length;
      const maxLength = e.target.maxLength;
      inputCharacterTag.textContent =
        Number(maxLength) - Number(text_length) + " characters left";
    });
  };
  // calling function
  handleInput(question_input, question_character_left);
  handleInput(answer_input, answer_character_left);

  // remove Container function
  const removeContainer = (e) => {
    if (confirm("Are you sure you want to delete this question?")) {
      e.target.closest("section").remove();
      document
        .querySelector(".toast_message")
        .classList.toggle("show_toast_message");
    }
  };

  const formValidation = () => {
    const qValue = form.elements.question.value.trim().length;
    const aValue = form.elements.answer.value.trim().length;
    const tValue = form.elements.tag.value.trim().length;

    question_input.classList.toggle("success", qValue > 0);
    question_input.classList.toggle("error", qValue <= 0);

    answer_input.classList.toggle("success", aValue > 0);
    answer_input.classList.toggle("error", aValue <= 0);

    tag_input.classList.toggle("success", tValue > 0);
    tag_input.classList.toggle("error", tValue <= 0);

    if (qValue > 0 && aValue > 0 && tValue > 0) {
      return true;
    }
    return false;
  };

  submit_button.addEventListener("click", formValidation);
  question_input.addEventListener("input", formValidation);
  answer_input.addEventListener("input", formValidation);
  tag_input.addEventListener("input", formValidation);

  // submiting of form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!formValidation()) return;
    //   taking form elements data
    const question_value = e.target.elements.question.value;
    const answer_value = e.target.elements.answer.value;
    const tag_value = e.target.elements.tag.value;

    // Creating New Element
    const section = document.createElement("section");
    section.classList.add("card");
    const i = document.createElement("i");
    i.classList.add("fas", "fa-trash", "delete_question_icon");
    i.setAttribute("data-js", "remove_icon");

    const h3 = document.createElement("h3");
    h3.classList.add("q_title");
    const p = document.createElement("p");
    p.classList.add("answer");
    const label = document.createElement("label");
    label.classList.add("show-answer");

    const ul = document.createElement("ul");
    ul.classList.add("categories");

    mainContainer.append(section);
    section.append(i);

    h3.textContent = question_value;
    section.append(h3);

    p.textContent = "Answer: " + answer_value;
    p.setAttribute("hidden", "hidden");
    section.append(p);

    section.append(label);
    label.textContent = "Show Answer";
    label.setAttribute("data-condition", "hide");

    section.append(ul);
    const tags = tag_value.split(",");

    tags.forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value.trim();
      ul.append(li);
    });

    //   calling remove container function
    i.addEventListener("click", removeContainer);
    label.addEventListener("click", () => toggleAnswer(label, p));

    //   reset form
    form.reset();
    question_input.classList.remove("success");
    answer_input.classList.remove("success");
    tag_input.classList.remove("success");
    document
      .querySelector(".toast_message")
      .classList.remove("show_toast_message");

    setCharacterLimit();
    question_input.focus();
  });
}
const themeToggle = document.querySelector("[data-js='themeToggle']");
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.querySelector("body").classList.toggle("darkTheme");
  });
}
