const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music");

let musicIndex = 2;

// window.addEventListener("load", ()=>{
//     loadMusic(musicIndex);
// });

// function loadMusic(indexNumb){
//     musicName.innerText = allMusic[indexNumb - 1].name;
//     musicArtist.innerText = allMusic[indexNumb - 1].artist;
//     musicImg.src = allMusic[indexNumb - 1].img;
//     mainAudio.src = allMusic[indexNumb - 1].src;
// }

//play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
});


// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", ()=>{
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10){ //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });

    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});


//next music button event
// const nextBtn = wrapper.querySelector("#skip-next");
// nextBtn.addEventListener("click", () => {
//     nextMusic();
// });
//
// //next music function
// function nextMusic() {
//     musicIndex++; //increment of musicIndex by 1
//     console.log(musicIndex);
//     //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
//     musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
//     loadMusic(musicIndex);
//     playMusic();
// }

//prev music button event
// const prevBtn = wrapper.querySelector("#prev");
// prevBtn.addEventListener("click", ()=>{
//     prevMusic();
// });

//prev music function
// function prevMusic(){
//     musicIndex--; //decrement of musicIndex by 1
//     //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
//     musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
//     loadMusic(musicIndex);
//     playMusic();
// }

// Get a reference to the volume slider input element
const volumeSlider = document.getElementById("volumeSlider");
// Get a reference to the volume icon
const volume = document.getElementById("volume");

// Добавляем обработчик события "input" к элементу #volumeSlider
volumeSlider.addEventListener('input', function() {
    // Set the audio volume to the value of the slider (between 0 and 1)
    mainAudio.volume = parseFloat(this.value);
    // Проверяем значение #volumeSlider
    if (this.value === 0) {
        // Если значение равно 0, меняем текст #volume
        volume.innerText = 'volume_off';
    } else if (this.value < 0.5){
        // Если значение меньше 50%, меняем текст #volume
        volume.innerText = 'volume_down';
    } else {
        // В противном случае, возвращаем исходный текст
        volume.innerText = 'volume_up'
    }
});

//  // Add an event listener to the volume slider to update the audio volume
// volumeSlider.addEventListener("input", function() {

// });

//code for what to do after song ended
// mainAudio.addEventListener("ended", ()=>{
//     // we'll do according to the icon means if user has set icon to
//     // loop song then we'll repeat the current song and will do accordingly
//     let getText = repeatBtn.innerText; //getting this tag innerText
//     switch(getText){
//         case "repeat":
//             nextMusic(); //calling nextMusic function
//             break;
//         case "repeat_one":
//             mainAudio.currentTime = 0; //setting audio current time to 0
//             loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
//             playMusic(); //calling playMusic function
//             break;
//         case "shuffle":
//             let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
//             do{
//                 randIndex = Math.floor((Math.random() * allMusic.length) + 1);
//             }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
//             musicIndex = randIndex; //passing randomIndex to musicIndex
//             loadMusic(musicIndex);
//             playMusic();
//             break;
//     }
// });

//show music list onclick of music icon


function updateGridColumns() {
    const container = document.querySelector('.item-cards');
    const itemWidth = 200; // Ширина одного элемента
    const containerWidth = container.clientWidth; // Ширина контейнера

    // Рассчитываем количество столбцов так, чтобы было не менее 4 элементов
    const minColumns = Math.min(Math.floor(containerWidth / itemWidth), 9);
    container.style.gridTemplateColumns = `repeat(${minColumns}, ${itemWidth}px)`;

    // Определяем количество элементов, которые не поместились в контейнере
    const totalItems = document.querySelectorAll('.mix-item-card').length;
    const visibleItems = Math.min(totalItems, minColumns);

    // Скрываем элементы, начиная с (visibleItems + 1)
    for (let i = visibleItems + 1; i <= totalItems; i++) {
        const item = document.querySelector(`.mix-item-card:nth-child(${i})`);
        item.style.display = 'none';
    }

    // Показываем все элементы, которые умещаются
    for (let i = 1; i <= visibleItems; i++) {
        const item = document.querySelector(`.mix-item-card:nth-child(${i})`);
        item.style.display = 'block';
    }

    // Показываем кнопку "Показать все", если есть скрытые элементы
    const showAllButton = document.getElementById('showAllButton');
    if (totalItems > visibleItems) {
        showAllButton.style.display = 'block';
    } else {
        showAllButton.style.display = 'none';
    }
}

// Обновляем количество столбцов при загрузке страницы и изменении размера окна
window.addEventListener('resize', updateGridColumns);
window.addEventListener('load', updateGridColumns);
