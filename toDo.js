let toDoList = [];
let finishedToDo = 0;

let resultContainer = document.querySelector(".result-container");

// Load from localStorage if exists
if (localStorage.getItem("JSON-toDoList")) {
	toDoList = JSON.parse(localStorage.getItem("JSON-toDoList"));
}

// Show the data on page load
display();

// Event listeners
document.querySelector(".toDo").addEventListener("keydown", eventHandler);
document.querySelector(".date").addEventListener("keydown", eventHandler);
document.querySelector(".addBtn").onclick = add;
document.querySelector(".clearBtn").onclick = clear;

function eventHandler(event) {
	if (event.key === "Enter") {
		add();
	}
}

function add() {
	let input = document.querySelector(".toDo");
	let filledToDo = input.value.trim();

	let date = document.querySelector(".date");
	let selectedDate = date.value;

	if (filledToDo === "") {
		alert("Please enter a task!");
		return;
	}

	const toDo = {
		info: filledToDo,
		date: selectedDate,
		isFinished: false,
	};

	toDoList.push(toDo);
	updateLocalStorage();
	display();
	showEmptyTask();

	input.value = "";
}

function display() {
	resultContainer.innerHTML = "";
	finishedToDo = 0;

	toDoList.forEach((task, index) => {
		if (task.isFinished) {
			finishedToDo++;
		}

		resultContainer.innerHTML += `
			<li  class="task d-flex flex-row justify-content-between mb-3 flex-wrap" >
    <div class="d-flex flex-row align-items-center justify-content-center ">
        <p class="mx-3    mb-0 me-3 toDoResult   ${
					task.isFinished ? "finishedTask" : ""
				}"  data-index='${index}'>${task.info}</p>
        <span class="badge time ">${task.date}</span>
    </div>
    <button class="btn deleteBtn ms-auto" onclick="remove(${index})">Delete</button>
</li>

			
		`;
	});

	tickedToDoList();
	calculateProgressBar();
}

function tickedToDoList() {
	let tasks = document.querySelectorAll(".toDoResult");

	tasks.forEach((taskElement) => {
		taskElement.addEventListener("click", () => {
			const index = parseInt(taskElement.dataset.index);

			if (toDoList[index].isFinished) return;

			toDoList[index].isFinished = true; // Update the object
			updateLocalStorage(); // Save to localStorage
			display(); // Re-render everything
		});
	});
}

function calculateProgressBar() {
	const progressBar = document.querySelector(".progress-bar");

	if (toDoList.length === 0) {
		progressBar.style.width = "0%";
	} else {
		let progressPercent = (finishedToDo / toDoList.length) * 100;
		progressBar.style.width = progressPercent + "%";
	}
}

function remove(index) {
	toDoList.splice(index, 1);
	updateLocalStorage();
	display();
	showEmptyTask();
}

function clear() {
	if (toDoList.length === 0) {
		alert("Nothing to clear!");
		return;
	}
	toDoList = [];
	showEmptyTask();
	updateLocalStorage();
	display();
	calculateProgressBar();
}

function updateLocalStorage() {
	localStorage.setItem("JSON-toDoList", JSON.stringify(toDoList));
}

function showEmptyTask() {
	let taskState = document.querySelector(".task-state");
	if (toDoList.length > 0) {
		taskState.classList.add("invisible");
	} else {
		taskState.classList.remove("invisible");
	}
}

showEmptyTask();
