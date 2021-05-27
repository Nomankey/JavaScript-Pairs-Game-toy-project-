// console.log('Loaded!');   // -> 확인차! 


// 기본 규칙 
// 1. 처음에 카드가 8개가 주어집니다. 즉, 같은 그림을 가진 카드 쌍이 4개가 있다. 
// 2. 카드 중 하나를 아무거나 클릭했을 때, 카드가 시작된다. 
// 3. 카드들의 짝을 맞추시오. 모든 짝이 맞춰줬을 때, 카드게임이 종료됩니다. 단, 게임을 진행하는 동안 타이머가 돌아갑니다. 
// cf. https://codepen.io/JoannaQ/pen/MVGPgP


// DOM 접근 
const $header = document.querySelector('.header');
const $headerSpan = document.querySelector('.header-span');
const $timerSection = document.querySelector('.timer-section');

const $cardDeck = document.querySelector('.card-section');
const $card = document.querySelectorAll('.card');   // NodeList (object) --> length는 8
const $cards = [...$card]; // --> object. 하지만 $card === $cards -> false
const $cardsWrapper = document.querySelector('.card-wrapper');
const $timer = document.querySelector('.timer');
let cardClicked = [];
let cardMatched = [];

// let matchedCards = []; 


// 이벤트 등록 
document.addEventListener('DOMContentLoaded', shuffleCards);

// window.onload = () => { }
// $cards.onclick = () => { }
// $cards.addEventListener('click', cardClicked);



$cardsWrapper.onclick = e => {
	let startTimer = setInterval(startTimerCycle, 1000);
	
	let $cardClickedEl = e.target;
	
	console.log(cardClicked);
	
	if ($cardClickedEl.classList.contains('unclicked') && cardClicked.length < 2) {   // includes 
		$cardClickedEl.classList.remove('unclicked');
		$cardClickedEl.classList.add('clicked');
		cardClicked.push(e.target);
	}
	matchCards();
	unmatchCards();
	resetCardClicked();
	console.log($cardClickedEl);

	
	// if (matchedCards.length === 8) {
	// 		// 이 함수 실행될 때, 모달창 뜨게... 
	// 		clearInterval(startTimer);             
	// 		alert('모달창: 게임이 종료되었습니다!');
	// 		matchedCards.length = 0; 
	// 	}
	
	}
	// clearInterval(startTimer);
	
// $cardDeck.onclick = e => {
// 	let startTimer = setInterval(startTimerCycle, 1000);
// 	// star
// }
	
	
	// 타이머 카운팅 종료 함수
	function stopTimerCycle() {
		if (matchedCards.length === 8) {
			// 이 함수 실행될 때, 모달창 뜨게...
			clearInterval(startTimer);             
			alert('모달창: 게임이 종료되었습니다!');
			matchedCards.length = 0; 
		}
	}
	// stopTimerCycle();   
	
	
stopTimerCycle();








// functions

// 카드를 랜덤으로 섞는 함수 ( -> 국룰 !!)
// Cards are to be shuffled on load or restart
function shuffleCards () {
	for (let i = $cards.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		// [cardLength[i], cardLength[j]] = [cardLength[j], cardLength[i]]; // -> 아래 세 줄의 코드와 동일! 
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
addImgToCards();  //-> .clicked로 toggle 할 때 실행할 것! 





// 카드 두개가 일치하지 않을 때는 다시 원상태로 복귀, 두개가 일치하면 불투명하게 바꾸기  
function matchCards() {
	if (cardClicked[0].style.backgroundImage === cardClicked[1].style.backgroundImage) {
		console.log('아파');
		cardClicked[0].classList.add('matched');
		cardClicked[1].classList.add('matched'); 
		matchedCards.push(cardClicked[0]);
		matchedCards.push(cardClicked[1]);
	}
}

function unmatchCards() {
	if (cardClicked[0].style.backgroundImage !== cardClicked[1].style.backgroundImage) {
		cardClicked[0].classList.remove('clicked');
		cardClicked[0].classList.add('unclicked');
		cardClicked[0].classList.add('unmatched');
		cardClicked[1].classList.remove('clicked');
		cardClicked[1].classList.add('unclicked');
		cardClicked[1].classList.add('unmatched');
		
	}
}

function resetCardClicked () {
	if(cardClicked.length == 2) {  // animatiom -> setTimeout
		cardClicked.length = 0;
		if (!cardClicked.classList.contains('matched')){
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
// 최초의 클릭시 타이머 시작. 
function startTimerCycle() {
		// console.log('머다예');
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
		// $timer.textContent = `${hour} : ${min} : ${sec}`;
		$timer.textContent = timeRecord;
		console.log(timeRecord);

		
		// stopTimerCycle();
}












// // // 게임 재시작 하는 함수 (필요하다면 restart 버튼 구현할 것!)
// // // 재실행 버튼이 있다면, 버튼 클릭시 -> 함수 restart() 호출...
// function restart() {
// 	window.location.reload(true);




// HW: 
// 타이머가 멈추고 && 게임이 종료되는 함수가 호출 될 때, --> function popUpModal() {}
// 모달창 css 만들고... 
// sass 로 바꾸는 거는 금요일 ...




// 오늘:
// 타이머 시작과 종료 기능 구현

// 목요일: 
// 타이머 마무리 + 모달창 준비 

// 토요일: 
// sass 문법으로 css 파일 바꾸기 
// readme.md 작성 + gif 도 첨부 






// modal popup
// 게임이 종료되면 (stopTimerCycle();)... body의 배경색이 투명하고 흐릿한 회색이 될 것... 
document.body.style.backgroundColor = 'lightgray';


$headerSpan.style.color = 'transparent';
$timerSection.style.display= 'none';  
$cardDeck.style.display = 'none';

// $headerSpan.classList.add = 'colorTransparent';
// $timerSection.classList.add= 'displayNone';  
// $cardDeck.classList.add = 'displayNone';


const $modalWrapper = document.querySelector('.modal-wrapper');
const $timeSpent = document.querySelector('.time-spent');
const $timeRecord = document.querySelector('.time-record');

$modalWrapper.classList.add('displayModal');
// $timeSpent.appendChild.textContent = timeRecord;   // 확인 필요! 
$timeRecord.innerText = '00:10:03';   // 확인 필요! 
$timeRecord.textContent = '00:10:03';   // 확인 필요! 
