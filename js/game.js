// 기본 규칙 
// 1. 처음에 카드가 8개가 주어집니다. 즉, 같은 그림을 가진 카드 쌍이 4개가 있다. 
// 2. 카드 중 하나를 아무거나 클릭했을 때, 카드가 시작된다. 
// 3. 카드들의 짝을 맞추시오. 모든 짝이 맞춰줬을 때, 카드게임이 종료됩니다. 단, 게임을 진행하는 동안 타이머가 돌아갑니다. 
// cf. https://codepen.io/JoannaQ/pen/MVGPgP


// DOM 접근 
const $cardDeck = document.querySelector('.card-div');
const $card = document.querySelectorAll('.card');
const $cards = [...$card];
const $cardsWrapper = document.querySelector('.card-wrapper');
const $arrayCards = [];
// const $openedCards = [];
const $timer = document.querySelector('.timer');

// 이벤트 등록 
document.addEventListener('DOMContentLoaded', e => {
	// console.log('Loaded!');
	createCards();
})


// 클릭을 할 때마다, clickCount++; 
// 최초의 클릭이 일어났을 때, 그리고 최초의 클릭만 타이머를 작동시키게끔 정하기  -> 어려움! 
$card.onclick = () => {
	let clickCount = 0; 
	clickCount++;

	if (clickCount === 1) {
		startGame();
		flipCard();
	} else {
		flipCard();
	}

};






// functions

// 돔이 로드됐을 떄 카드를 8개를 생성  + 클래스를 추가 
function createCards() {
	// $cardsWrapper.innerHTML = '<li class="card"></li>'; 
	for (let i = 0; i < 8;i++) {
		$cardsWrapper.appendChild($cardsWrapper.innerHTML = '<li class="card"></li>'); 
	}
	// innerHtml --> 코드 두 줄을 한줄로 만들 수 있음!!! 이거 추천!! (.card를 추가할 것!)
}




// 카드를 랜덤으로 섞는 함수 (국룰 :)! )
function shuffleCards ($cards) {
	for (let i = $cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[$cards[i], $cards[j]] = [$cards[j], $cards[i]];
	}
	return $cards;
}
// cf. https://www.codegrepper.com/code-examples/javascript/javascript+randomly+shuffle+array




// 카드를 클릭하면 뒤집힘 
function flipCard() {
	// 이때, 카드가 2개 이상 뒤집힐 수 없다 ... --> 어려움! 
	// $___.classList.add = 'flip';
	// --> 이거는 SCSS로 클래스 만들어서 JS로 classList.add/remove로 하기! 
}



// 카드 두개가 일치하지 않을 때는 다시 원상태로 복귀, 두개가 일치하면 불투명하게 바꾸기  
function matchCards() {
	if () {
		// 카드 두 개의 클래스가 같을 때, .match 

	// 카드쌍이 맞춰질 때마다 $count++; 할건데, 그 조건은 js 에서 img를 src 주소가 같을때...! 
	// $count = 0; 


	} else {
		// 카드 두 개의 클래스가 동일 하지 않을 때, .reset 
	}
	// --> 이거는 SCSS로 클래스 만들어서 JS로 classList.add/remove로 하기! 
}




// timer 구현 
// 타이머 카운팅 시작 
let hour = 0;
let min = 0;
let sec = 0;
let timeStatus = true; 

function startTimer() {
	if (timeStatus === true) {
		timeStatus = false; 
		timerCycle();
	}
}

// 타이머 돌아가는 싸이클 
function timerCycle() {
	if (timeStatus === false) {
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
		$timer.innerHTML = `${hour} : ${min} : ${sec}`;

		setTimeout("timerCycle()", 1000);
	}
}


// 타이머 카운팅 종료 
function stopTimer() {
	if (timeStatus === false) {
		timeStatus = true;
	}
}




// 게임 시작 함수 
function startGame() {
	countTimer();
}



// 게임 종료하는 함수 --> 모달창을 띄우고, 타이머 상의 시간을 프린트하고, 게임오버라고 적혀있게끔 구현!
function endGame () {
	// if  $count === 4 
	stopTimer();   // 게임 종료 ---> 어려움! 
}











