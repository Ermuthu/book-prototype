import PracticeScreen from "./practice/PracticeScreen";
import markup from './_partials/questionsPane.html';

// contentRoot.innerHTML = markup;
var contentRoot = document.getElementById("main-container");
contentRoot.innerHTML = markup;
new PracticeScreen(contentRoot);
