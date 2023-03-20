const btn = document.querySelector(".btn");
const taskList = document.querySelector(".task-list");
const itemInput = document.getElementById("item-input");
const show = document.querySelector(".hidden");
const submitItemBtn = document.getElementById("submit-item-btn");
const boxs = document.querySelectorAll(".box");
const addItemForm = document.getElementById("add-item-form");

// edit input
const editItemForm = document.getElementById("edit-form");
let editItemInput = document.getElementById("item-input-edit");
const submitEditBtn = document.getElementById("submit-item-btn-eidt");
const showEdit = document.querySelector(".hidden-edit");

//

let drag = null;

taskList.innerHTML = "";

if (localStorage.getItem("taskList")) {
  taskList.innerHTML = localStorage.getItem("taskList");
}

// Add event listener to the Submit button
submitItemBtn.addEventListener("click", function () {
  const itemValue = itemInput.value.trim();
  if (itemValue) {
    const li = document.createElement("li");
    li.classList.add("task", "drag-task");
    li.draggable = true;

    const inputSpan = document.createElement("span");
    inputSpan.classList.add("input");
    inputSpan.textContent = itemValue;
    li.appendChild(inputSpan);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "D";
    actionsDiv.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "E";
    actionsDiv.appendChild(editButton);

    li.appendChild(actionsDiv);

    taskList.appendChild(li);

    itemInput.value = ""; // Clear the input field
    show.classList.remove("show");

    const deleteBtns = document.querySelectorAll(".delete");
    const editBtns = document.querySelectorAll(".edit");

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const task = btn.closest(".task");
        task.remove();
        saveTaskList();
      });
    });

    editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const task = btn.closest(".task");
        let span = task.querySelector("span");
        showEdit.classList.toggle("edit-input");
        // editItemInput.value = span.textContent.trim();
        const prom = prompt("enter task");
        span.textContent = prom;

        // submitEditBtn.addEventListener("click", function () {
        //   let newTaskValue = editItemInput.value.trim();

        //   if (newTaskValue) {
        //     span.textContent = newTaskValue;
        //     editItemInput.value = "";
        //     editItemForm.classList.remove("edit-input");
        //   }

        //   saveTaskList();
        // });

        editItemInput.addEventListener("keydown", function (event) {
          if (event.keyCode === 13) {
            submitEditBtn.click();
            event.preventDefault();
          }
        });
      });
    });
    saveTaskList();
  }
});

itemInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    submitItemBtn.click();
    event.preventDefault();
  }
  dragItem();
});

function dragItem() {
  let items = document.querySelectorAll(".drag-task");
  items.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
    });
    item.addEventListener("dragend", function () {
      drag = null;
      saveTaskList();
    });

    boxs.forEach((box) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
        saveTaskList();
      });

      box.addEventListener("dragleave", function () {});

      box.addEventListener("drop", function () {
        box.appendChild(drag);
        saveTaskList();
      });
    });
  });
}
taskList.addEventListener("dragend", function () {
  saveTaskList();
});

btn.addEventListener("click", () => {
  show.classList.toggle("show");
});

function saveTaskList() {
  localStorage.setItem("taskList", taskList.innerHTML);
}
