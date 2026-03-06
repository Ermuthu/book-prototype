import PracticeScreen from "./practice/PracticeScreen";
import markup from './_partials/questionsPane.html';

// contentRoot.innerHTML = markup;
document.getElementById("main-container").innerHTML = markup;
new PracticeScreen();
