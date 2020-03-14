const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const del = event.target.parentNode;
  toDoList.removeChild(del);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(del.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerHTML = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  li.append(delBtn);
  li.append(span);
  li.id = newId;
  toDoList.append(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSumit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSumit);
}

init();
