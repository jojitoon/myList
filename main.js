function addTodo() {
  const input = document.getElementById("input");
  const lists = document.getElementById("list");
  const value = input.value.trim();
  if (value === "") {
    return alert("type something");
  }

  let todos = localStorage.getItem("@todos");

  if (!todos) {
    todos = [];
  } else {
    todos = JSON.parse(todos);
  }
  todos.push({
    value: value,
    completed: false,
  });
  localStorage.setItem("@todos", JSON.stringify(todos));
  renderTodos();
  input.value = "";
}

function renderTodos() {
  let todos = localStorage.getItem("@todos");
  const lists = document.getElementById("list");
  lists.innerHTML = "";
  if (todos) {
    todos = JSON.parse(todos);
  } else {
    return;
  }

  todos.forEach((todo, i) => {
    const newItem = document.createElement("li");
    newItem.innerText = todo.value;
    if (todo.completed) {
      newItem.classList.add("finish");
    }
    newItem.onclick = function () {
      newItem.classList.toggle("finish");
      finishTodo(i);
    };

    newItem.ondblclick = function () {
      newItem.remove();
      removeTodo(i);
    };
    lists.prepend(newItem);
  });
}

function finishTodo(index) {
  let todos = localStorage.getItem("@todos");
  if (todos) {
    todos = JSON.parse(todos);
  }
  const todo = todos[index];
  todo.completed = !todo.completed;
  localStorage.setItem("@todos", JSON.stringify(todos));
}

function removeTodo(index) {
  let todos = localStorage.getItem("@todos");
  if (todos) {
    todos = JSON.parse(todos);
  }
  todos.splice(index, 1);
  localStorage.setItem("@todos", JSON.stringify(todos));
}

function clearAll() {
  const clear = confirm("do you really want to clear ?");
  if (clear) {
    localStorage.clear("@todos");
    renderTodos();
  }
}
// function addTodo2() {
//   const input = document.getElementById("input");
//   const lists = document.getElementById("list");
//   const value = input.value.trim();
//   if (value === "") {
//     return alert("type something");
//   }

//   const newItem = document.createElement("li");
//   newItem.innerText = value;

//   newItem.onclick = function () {
//     newItem.classList.toggle("finish");
//     console.log(value);
//   };
//   lists.prepend(newItem);
//   input.value = "";
// }
// second version
// function addTodo1() {
//   const input = document.getElementById("input");
//   const lists = document.getElementById("list");
//   if (input.value.trim() === "") {
//     return alert("type something");
//   }
//   const newItem = `<li>${input.value.trim()}</li>`;
//   lists.innerHTML = newItem + lists.innerHTML;
//   input.value = "";
// }
