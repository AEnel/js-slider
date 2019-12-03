var slideItems = document.querySelectorAll('.slide');
var currentSlide = 0;
var slideLength = slideItems.length;
var slideInterval;
var indContainer = document.querySelector('.indicators');
var indItems = document.querySelectorAll('.indicator');


const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';


// document.querySelector('.controls').style.display = 'flex';
// indContainer.style.display = 'flex';

function gotoNSlide(n) {
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
    currentSlide = (slideLength + n) % slideLength;
    slideItems[currentSlide].classList.toggle('active');
    indItems[currentSlide].classList.toggle('active');
}

function gotoNextSlide() {
    gotoNSlide(currentSlide + 1);
}

function gotoPrevSlide() {
    gotoNSlide(currentSlide - 1);

}

var playbackStatus = true;
var pauseBtn = document.querySelector('#pause');
var nextBtn = document.querySelector('#next');
var prevBtn = document.querySelector('#prev');

function pauseSlideShow() {
    if (playbackStatus) {
        clearInterval(slideInterval);
        pauseBtn.innerHTML = '<i class="far fa-play-circle"></i>';
        playbackStatus = !playbackStatus;
    }

}

function playSlideShow() {
    slideInterval = setInterval(gotoNextSlide, 3500);
    pauseBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
    playbackStatus = !playbackStatus;
}

function clickPausePlayBtn() {
    if (playbackStatus) {
        pauseSlideShow();
    } else {
        playSlideShow();
    }

}

function clickNextBtn() {
    pauseSlideShow();
    gotoNextSlide();
}

function clickPrevBtn() {
    pauseSlideShow();
    gotoPrevSlide();
}

pauseBtn.addEventListener('click', clickPausePlayBtn);
nextBtn.addEventListener('click', clickNextBtn);
prevBtn.addEventListener('click', clickPrevBtn);

for (var i = 0; i < slideLength; i++) {
    indItems[1].onclick = function() {
        pauseSlideShow();
        gotoNSlide(+this.getAttribute('data-slide-to'));
    }
}

function clickIndicatorBtn(e) {
    var target = e.target;

    if (target.classList.contains('indicator')) {
        pauseSlideShow();
        gotoNSlide(+target.getAttribute('data-slide-to'));
    }

}



function pressKeyControl(e) {
    if (e.key === LEFT_ARROW) clickPrevBtn();
    if (e.key === RIGHT_ARROW) clickNextBtn();
    if (e.key === SPACE) clickPausePlayBtn();




    // console.log(e.key);
    // // ArrowLeft ArrowRight
}






document.addEventListener('keydown', pressKeyControl);
indContainer.addEventListener('click', clickIndicatorBtn);
slideInterval = setInterval(gotoNextSlide, 3500);