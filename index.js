let inputName = document.querySelector(".name-js");
let btn = document.querySelector(".enterBtn");

let toDoSection = document.querySelector("#toDo-section");

inputName.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		greeting();
		inputName.value = ``;
		scrolling(toDoSection);
	}
});

btn.onclick = () => {
	greeting();
	inputName.value = ``;
	scrolling(toDoSection);
};

function greeting() {
	const userName = inputName.value.trim();
	const description = document.querySelector(".description-js");
	description.innerHTML = userName
		? `Hello ${capitalize(
				userName
		  )}! Welcome to Green Productivity! Let's get your day started.`
		: `Please enter your name.`;
}

function capitalize(name) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}

function scrolling(elem) {
	setTimeout(() => {
		elem.classList.remove("invisible");
		elem.scrollIntoView({
			behavior: "smooth",
		});
	}, 1500);
}
