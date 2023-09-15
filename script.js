const container = document.querySelector(".container");
var inputValue = document.querySelector(".input");
const add = document.querySelector(".add");
const cut = document.querySelector(".cut");

if (window.localStorage.getItem("todos") == undefined) {
  var todos = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);

class item {
  constructor(name) {
    this.createItem(name);
  }
  createItem(name) {
    var itemBox = document.createElement("div");
    itemBox.classList.add("item");

    var input = document.createElement("input");
    input.type = "text";
    input.value = name;

    input.classList.add("item_input");
    var edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "EDIT";

    edit.addEventListener("click", myeditButton);
    function myeditButton() {
      if (edit.innerHTML === "EDIT") {
        edit.innerHTML = "SAVE";
        input.disabled == true;
      } else {
        if (input.value.trim() === "") {
          alert("Please enter a valid to-do item");
        } else {
          edit.innerHTML = "EDIT";
          input.value = input.value.trim();
          input.disabled = false;
        }
      }
    }
    var remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = "REMOVE";
    remove.addEventListener("click", () => this.remove(itemBox, name));

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
  }

  remove(itemBox, name) {
    itemBox.parentNode.removeChild(itemBox);
    let index = todos.indexOf(name);
    todos.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    if (todos.length === 0) {
      removeAll.style.display = "none";
      cut.style.display = "block";
    }
  }
}

add.addEventListener("click", check);
window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    check();
  }
});
function check() {
  const inputValue = document.querySelector(".input").value.trim();
  if (inputValue === "") {
    alert("Please enter some value");
  } else if (inputValue != "") {
    new item(inputValue);
    todos.push(inputValue);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }

  document.querySelector(".input").value = "";

  if (todos.length > 0) {
    removeAll.style.display = "block";
    cut.style.display = "none";
  } else {
    removeAll.style.display = "none";
    cut.style.display = "block";
  }
}

const removeAll = document.querySelector(".remove-all");
removeAll.addEventListener("click", removeAllTodos);

function removeAllTodos() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  todos = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
  if (todos.length === 0) {
    removeAll.style.display = "none";
    cut.style.display = "block";
  }

  hideRemoveAllButton();
}
function hideRemoveAllButton() {
  if (todos.length === 0) {
    removeAll.style.display = "none";
  } else {
    removeAll.style.display = "block";
  }
}

window.onload = function () {
  hideRemoveAllButton();
};

for (var v = 0; v < todos.length; v++) {
  new item(todos[v]);
}
