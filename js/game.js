/* ----------------------------------------------------- */
/* DOM 접근 */ 

const $header = document.querySelector('.header');
const $headerSpan = document.querySelector('.header-span');
const $restartBtn = document.querySelector('.restart-btn');
const $modalWrapper = document.querySelector('.modal-wrapper');
const $timeSpent = document.querySelector('.time-spent');
const $timeRecordSpan = document.querySelector('.time-record-span');
const $cardDeck = document.querySelector('.card-section');
const $cardsWrapper = document.querySelector('.card-wrapper');
const $card = document.querySelectorAll('.card');   // NodeList (object) --> length는 8
const $cards = [...$card]; // --> object. 하지만 $card === $cards -> false
const $timerSection = document.querySelector('.timer-section');
const $timer = document.querySelector('.timer');

let cardClicked = [];
let cardMatched = [];


		
				
/* ----------------------------------------------------- */
/* functions */			

function shuffleCards () {
	for (let i = $cards.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = $cards[i];
		$cards[i] = $cards[j];
		$cards[j] = temp;
	}
	return $cards;
}
shuffleCards();    


// 이미지 배열 ... 
// cards -> background-images 
let $backgroundImg = ["./images/card_img_1.svg", "./images/card_img_1.svg", "./images/card_img_2.svg", "./images/card_img_2.svg", "./images/card_img_3.svg", "./images/card_img_3.svg", "./images/card_img_4.svg", "./images/card_img_4.svg"]; // 2번씩 !! 카드는 총 8개니까! 

function addImgToCards() {
	for (let i = 0; i < $cards.length; i++) {
		$cards[i].style.backgroundImage = `url(${$backgroundImg[i]})`;
	}
}
addImgToCards();  




// 카드 두개가 일치하지 않을 때는 다시 원상태로 복귀, 두개가 일치하면 불투명하게 바꾸기  
function matchCards() {
	if (cardClicked[0].style.backgroundImage === cardClicked[1].style.backgroundImage) {
		cardClicked[0].classList.add('matched');
		cardClicked[0].classList.remove('unmatched');
		cardClicked[1].classList.add('matched');
		cardClicked[1].classList.remove('unmatched');
		cardMatched.push(cardClicked[0]);
		cardMatched.push(cardClicked[1]);
	}
}

function unmatchCards() {
	if (cardClicked[0].style.backgroundImage !== cardClicked[1].style.backgroundImage) {
		cardClicked[0].classList.remove('clicked');
		cardClicked[0].classList.add('unclicked');
		cardClicked[0].classList.add('unmatched');
		cardClicked[1].classList.add('unclicked');
		cardClicked[1].classList.add('unmatched');	
		cardClicked[1].classList.remove('unclicked');	
		cardClicked[1].classList.remove('matched');	
		setTimeout(function () {
			cardClicked[1].classList.remove('clicked');
			cardClicked[1].classList.add('unclicked');
		}, 450)
		cardClicked[1].classList.add('unmatched');	
	}
}

function resetCardClicked () {
	if(cardClicked.length == 2) {  
		cardClicked.length = 0;
		if (![...cardClicked].classList.contains('matched')){
			cardClicked[0].classList.remove('clicked');
			cardClicked[0].classList.add('unclicked');
			cardClicked[1].classList.remove('clicked');
			cardClicked[1].classList.add('unclicked');
		}
	}
}





// timer 구현 
// 타이머 카운팅 시작 
let hour = 0;
let min = 0;
let sec = 0;

// 게임 시작 함수 
// 최초의 클릭시 타이머 시작
function startTimerCycle() {
		sec = parseInt(sec);
		min = parseInt(min);
		hour = parseInt(hour);

		sec += 1;

		if (sec === 60) {
			min += 1;
			sec = 0;
		}
		if (min === 60) {
			hour += 1;
			min = 0;
			sec = 0;
		}


		if (sec < 10) {
			sec = '0' + sec;
		}
		if (min < 10) {
			min = '0' + min;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}

		let timeRecord = `${hour} : ${min} : ${sec}`;
		$timer.textContent = timeRecord;


		if (cardMatched.length >= 8) {
			clearInterval(runner);
			popUpModal(timeRecord);
		}

}


// modal popup
// 게임이 종료되면 body의 배경색이 투명하고 흐릿한 회색이 될 것... 

function popUpModal(timeRecord) {
	$timeRecordSpan.textContent = `${timeRecord}`;
	
	$modalWrapper.classList.remove('displayNone');
	$modalWrapper.classList.add('displayModal');

	$headerSpan.classList.add('colorTransparent');
	$timerSection.classList.add('displayNone');  
	$cardDeck.classList.add('displayNone');

	document.body.style.backgroundColor = 'lightgray';
}





/* ----------------------------------------------------- */
/* 이벤트 등록 */

// load시 실행될 카드 셔플 이벤트 
document.addEventListener('DOMContentLoaded', shuffleCards);


// 클릭 이벤트 
let runner;    // runner 가 전역변수가 될 수 있도록 선언만 global 하게... 
let flipBack;

$cardsWrapper.onclick = e => {
	let $cardClickedEl = e.target;

	clearInterval(runner);
	runner = setInterval(startTimerCycle,1000);
	
	if ($cardClickedEl.classList.contains('unclicked') && cardClicked.length < 2) {   // includes 
		$cardClickedEl.classList.remove('unclicked');
		$cardClickedEl.classList.add('clicked');
		cardClicked.push(e.target);
	}
	matchCards();
	unmatchCards();

	setTimeout(resetCardClicked, 450)
};
		

// 게임 재시작 하는 함수 (필요하다면 restart 버튼 구현할 것!)
// 재실행 버튼이 있다면, 버튼 클릭시 -> 함수 restart() 호출...
$restartBtn.onclick = e => {
	restart();
}

function restart() {
	window.location.reload(true);
}



/* ----------------------------------------------------- */
