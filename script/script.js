const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data.data))
}

const loadLevelWord = (id) => {
  const selectLesson = document.getElementById("select-lesson");
  selectLesson.classList.add("hidden");

  const wordContainer = document.getElementById("word-container");
  wordContainer.classList.remove("hidden");

  const url = (`https://openapi.programming-hero.com/api/level/${id}`)
  fetch(url)
  .then(res => res.json())
  .then(data => displayLevelWord(data.data))
}

const displayLevelWord = (levels) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  levels.forEach(level => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="bg-white rounded-sm space-y-3 py-12 px-5 gap-5 shadow-sm text-center h-full ">
      <h2 class="text-2xl font-semibold">${level.word}</h2>
      <p class="text-lg">Meaning / Pronounciation</p>
      <p class="text-2xl font-bold">${level.meaning} / ${level.pronunciation}</p>
      <div class="flex justify-between">
        <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `
    wordContainer.append(cardDiv);
  })
}

const displayLesson = (lessons) => {
  const levelsContainer = document.getElementById("levels-container");
  levelsContainer.innerHTML = " ";

  lessons.forEach(lesson => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary" href=""
        ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
      levelsContainer.append(btnDiv);
    });
}




loadLesson();