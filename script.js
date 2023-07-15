console.log("Welcome to spotify");

//Initilaize the variables
let songIndex = 0;
let audioElement = new Audio('dandelions.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Dandelions", filePath:"dandelions.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.EKN0bgYtSgxbYSK-vX1bIQHaHa&pid=Api&P=0&h=180"},
    {songName: "Kaise Hua", filePath:"kaisehua.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.hgbPpHoZ7A8xAqwp3Pa9VgHaHa&pid=Api&P=0&h=180"},
    {songName: "Dandelions", filePath:"dandelions.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.EKN0bgYtSgxbYSK-vX1bIQHaHa&pid=Api&P=0&h=180"},
    {songName: "Kaise Hua", filePath:"kaisehua.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.hgbPpHoZ7A8xAqwp3Pa9VgHaHa&pid=Api&P=0&h=180"},
    {songName: "Dandelions", filePath:"dandelions.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.EKN0bgYtSgxbYSK-vX1bIQHaHa&pid=Api&P=0&h=180"},
    {songName: "Kaise Hua", filePath:"kaisehua.mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.hgbPpHoZ7A8xAqwp3Pa9VgHaHa&pid=Api&P=0&h=180"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused||audioElement.currentTime<=0){
       audioElement.play();
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');
       gif.style.opacity=1;
       let element = document.getElementById(songIndex+1);
       element.classList.add('fa-circle-pause');
       element.classList.remove('fa-circle-play');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        let element = document.getElementById(songIndex+1);
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    }
})
//Listem to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = (audioElement.currentTime/audioElement.duration)*100;
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if (e.target.classList.contains('played')){
            audioElement.pause();
            e.target.classList.remove('played');
            e.target.classList.add('paused');
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            return;
        }
        if (e.target.classList.contains('paused')){
            audioElement.play();
            e.target.classList.remove('paused');
            e.target.classList.add('played');
            e.target.classList.add('fa-circle-pause');
            e.target.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            return;
        }
        makeAllPlays();
        songIndex = e.target.id-1;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        e.target.classList.add('played');
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        gif.style.opacity=1;
        currentTime=0;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('played');
        element.classList.remove('paused');
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    currentTime=0;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    e = document.getElementById(songIndex+1);
    e.classList.remove('fa-circle-play');
    e.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 5;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    currentTime=0;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    e = document.getElementById(songIndex+1);
    e.classList.remove('fa-circle-play');
    e.classList.add('fa-circle-pause');
})

