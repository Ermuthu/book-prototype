import radioList from '../../_partials/radioList.html'
import checkboxList from '../../_partials/checkboxList.html'
import matchesList from '../../_partials/matchesList.html'

export default class ChoiceList {
  constructor(isPracticeMode, templateName, choices, keepOrder) {

    var templateEL = document.createElement('template');
    templateEL.innerHTML = radioList;
    templateEL.id = "radioList"
    document.body.appendChild(templateEL);

    var templateCL = document.createElement('template');
    templateCL.innerHTML = checkboxList;
    templateCL.id = "checkboxList"
    document.body.appendChild(templateCL);

    var templateML = document.createElement('template');
    templateML.innerHTML = matchesList;
    templateML.id = "matchesList"
    document.body.appendChild(templateML);


    const template = document.getElementById(templateName);

    this._element = template.content.cloneNode(true).firstChild;
    this._element.container = this;

    let length = 0;



    if (templateName === "matchesList") {
      this.isMatches = true;
      choices.forEach((choice, index) => {
        const liEl = this._element.children[index];
        const labelEl = liEl.querySelector("label");
        labelEl.attributes["data-id"] = choice.id;
        labelEl.textContent = choice.label;

        liEl
          .querySelector("i.bi-arrow-up")
          .addEventListener("click", (event) => {
            const liEl = event.currentTarget.parentElement.parentElement.parentElement;  // current value

            if (liEl.parentElement.firstChild === liEl) {

              liEl.parentNode.appendChild(liEl);
            } else {
              liEl.parentNode.insertBefore(liEl, liEl.previousElementSibling);
            }
          });

        liEl
          .querySelector("i.bi-arrow-down")
          .addEventListener("click", (event) => {
            const liEl = event.currentTarget.closest("li");
            const ulNode = liEl.parentNode;
            if (liEl === ulNode.lastElementChild) {
              ulNode.insertBefore(liEl, ulNode.firstElementChild);
            } else {
              ulNode.insertBefore(liEl.nextElementSibling, liEl);
            }
          });

        length++;
      });
    } else {
      choices.forEach((choice, index) => {
        const liEl = this._element.children[index];
        const input = liEl.querySelector("input");
        input.value = choice.id;
        input.name = `c${choices[0].id}`;
        input.id = choice.id;
        const clabel = liEl.querySelector("label");
        clabel.htmlFor = choice.id;
        clabel.querySelector("span").textContent = choice.label;
        if (isPracticeMode) {
          input.checked = choice.answer;
        }
        length++;
      });
    }

    // Remove Unused Items
    const total = this._element.children.length;
    for (let index = length; index < total; index++) {
      this._element.removeChild(this._element.children[length]);
    }
  }

  get answer() {
    this.reset();

    const answers = [];
    if (this.isMatches) {
      this._element
        .querySelectorAll("label")
        .forEach((element) => answers.push(element.attributes["data-id"]));
    } else {
      const selectedCheckBoxes = this._element.querySelectorAll("input");
      selectedCheckBoxes.forEach((input) => {
        if (input.checked) {
          answers.push(input.value);
        }
      });
    }

    console.log(answers);

    return answers;
  }

  get element() {
    return this._element;
  }

  reset() {
    this._element.querySelectorAll("li").forEach((liEl) => {
      liEl.classList.remove("bg-success");
      liEl.classList.remove("bg-danger");
    });
  }

  verify(success) {
    if (success) {
      if (this.isMatches) {
        this._element.querySelectorAll("li").forEach((liEl) => {
          liEl.classList.add("bg-success");
        });
      } else {
        this._element.querySelectorAll("li").forEach((liEl) => {
          const input = liEl.querySelector("input");
          if (input.checked) {
            liEl.classList.add("bg-success");
          }
        });
      }
    } else {
      if (this.isMatches) {
        this._element.querySelectorAll("li").forEach((liEl) => {
          liEl.classList.add("bg-danger");
        });
      } else {
        this._element.querySelectorAll("li").forEach((liEl) => {
          const input = liEl.querySelector("input");
          if (input.checked) {
            liEl.classList.add("bg-danger");
          }
        });
      }
    }
  }
}
