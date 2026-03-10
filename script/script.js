const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data.data))
}

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach(bt => bt.classList.remove("active"));
}

const loadLevelWord = (id) => {

  const selectLesson = document.getElementById("select-lesson");
  selectLesson.classList.add("hidden");

  const wordContainer = document.getElementById("word-container");
  wordContainer.classList.remove("hidden");

  const url = (`https://openapi.programming-hero.com/api/level/${id}`)
  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayLevelWord(data.data);
    removeActive();
    const active = document.getElementById(`active-${id}`);
    active.classList.add("active");
  })
}


const displayModalContainer = (id) => {

  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(details => {
      showModal(details.data)
      }
    )


}


const showModal = (info) => {
  const modalContainer = document.getElementById("modal-info");

  modalContainer.innerHTML = `

    <h2 class="text-2xl font-bold">${info.word} (<i class="fa-solid fa-microphone-lines"></i> :<span>${info.pronunciation}</span>)</h2>

    <div class="space-y-1">
      <h4 class="text-md font-semibold">Meaning</h4>

      <h4 class="font-bangla text-lg">${info.meaning ? info.meaning : "অর্থ পাওয়া যায়নি"}</h4>
    </div>

    <div class="space-y-1">
      <h3 class=" text-md font-semibold">PartsOfSpeech</h3>

      <p class="text-lg">${info.partsOfSpeech ? info.partsOfSpeech : "parts Of Speech not found"}</p>
    </div>

    <div class="space-y-1">
      <h3 class="text-mf font-semibold">Example</h3>

      <p class="text-md text-gray-500">${info.sentence}</p>
    </div>

    <div class="space-y-2">
      <p class="text-md font-medium font-bangla ">সমার্থক শব্দ গুলো</p>

      <div class="flex items-center gap-4">
        <button class="btn ">${info.synonyms[0]}</button>
        <button class="btn">${info.synonyms[1]}</button>
        <button class="btn">${info.synonyms[2]}</button>
      </div>
    </div>

    <button class="btn btn-primary">Complete Learning</button>
  `;

  document.getElementById("modal_container").showModal();
}



const displayLevelWord = (levels) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  const blankLesson = document.getElementById("blank-lesson");
  const selectLesson = document.getElementById("select-lesson");

  if(levels.length == 0) {
    blankLesson.classList.remove("hidden");
    wordContainer.classList.add("hidden");
    selectLesson.classList.add("hidden");
  } else {
    blankLesson.classList.add("hidden");
  }

  levels.forEach(level => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `

    <div class="bg-white rounded-sm space-y-3 py-12 px-5 gap-5 shadow-sm text-center h-full ">

      <h2 class="text-2xl font-semibold">${level.word ? level.word : "শব্দ  পাওয়া যায়নি"}</h2>

      <p class="text-lg">Meaning / Pronounciation</p>

      <p class="text-2xl font-bold">${level.meaning  ? level.meaning : "অর্থ পাওয়া যায়নি"} / ${level.pronunciation ? level.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</p>

      <div class="flex justify-between">

        <button onclick="displayModalContainer(${level.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>

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
      <button id="active-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class=" btn btn-outline btn-primary lesson-btn" href=""
        ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
      levelsContainer.append(btnDiv);
    });
}




loadLesson();