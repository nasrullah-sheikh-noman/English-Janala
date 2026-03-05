const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data.data))
}

const displayLesson = (lessons) => {
  const levelsContainer = document.getElementById("levels-container");
  console.log(levelsContainer);
  levelsContainer.innerHTML = " ";

  lessons.forEach(lesson => {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button class="btn btn-outline btn-primary" href=""
        ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
      levelsContainer.append(btnDiv);
    });
}

loadLesson();