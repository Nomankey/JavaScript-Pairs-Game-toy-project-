// console.log('Loaded!');   // -> 확인차! 


// 기본 규칙 
// 1. 처음에 카드가 8개가 주어집니다. 즉, 같은 그림을 가진 카드 쌍이 4개가 있다. 
// 2. 카드 중 하나를 아무거나 클릭했을 때, 카드가 시작된다. 
// 3. 카드들의 짝을 맞추시오. 모든 짝이 맞춰줬을 때, 카드게임이 종료됩니다. 단, 게임을 진행하는 동안 타이머가 돌아갑니다. 
// cf. https://codepen.io/JoannaQ/pen/MVGPgP


// DOM 접근 
const $cardDeck = document.querySelector('.card-div');
const $card = document.querySelectorAll('.card');   // NodeList (object) --> length는 8
const $cards = [...$card]; // --> object. 하지만 $card === $cards -> false
const $cardsWrapper = document.querySelector('.card-wrapper');
const $timer = document.querySelector('.timer');
let cardClicked = [];
// $cardClicked배열의 length가 2이상이 되면 안돼고... 만약 두 요소의 Img가 같으면 $cardMatched로 가기...
let cardMatched = [];


// 이벤트 등록 
document.addEventListener('DOMContentLoaded', shuffleCards);

// window.onload = () => { }
// $cards.onclick = () => { }
// $cards.addEventListener('click', cardClicked);





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






// 로직:
// 다시, 정리하자면... 
// 카드를 click하면 2개 이하의 카드가 뒤집혀야한다. 
// 이때 추가할 클래스는 .clicked와 .unclicked 클래스다. 
// 먼저 기본적으로 들어갈 클래스는 .unclicked 클래스이다. -> ok
// 카드들이 생성될 때 이미 .unclicked라는 클래스가 동적으로 추가되어 있을 것이다.  -> ok
// 그리고 해당 카드가 click 되면 ... 카드의 클래스는 .clicked로 바뀔 것이지만 .clicked의 개수가 총 2개를 넘어갈 수는 없다. 

// 카드를 클릭하면 뒤집힘 + .clicked라고 클래스명 동적으로 변경 
// $card.onclick () => {
// 	countClicked();  // 클릭하는 갯수가 동시에 2개 이상일 수 없음. 
// 	cardClicked();       // 클릭하면 카드가 뒤집히는데, 동시에 2개 이상 뒤집힐 수 없고, 만약 두 카드가 match가 안 된다면 다시 flipCardBack... 
// }); 


// document.querySelectorAll('.card').onclick = function(e) {
// 	if (e.target && e.target.classList.contains('unclicked')) {
// 		e.target.toggleClass = 'clicked';
// 	};
// }

// document.addEventListener('click', function(e) {
// 	if (e.target && e.target.classList.contains('unclicked')) {
// 		e.target.toggleClass = 'clicked';
// 	}
// })

// function cardClicked() {
// 	let clickedCount = 0; 

// 	if ($cards.classList.contains('unclicked') && clickedCount < 3) {
// 		clickedCount++;
// 		console.log(clickedCount);  // 확인차! 
// 		$cards.toggleClass = 'clicked';
// 	} 
// }

// function countClicked() {
// 	let clickedCount = 0; 
	
// 	for (let i = 0; $card.length; i++) {
// 		if ($cards[i].classList.contains('unclicked') === true) {
// 			// console.log('true');   // 결과: 8번 true를 출력하는 것을 확인! 
// 			if (clickedCount < 2) {
// 				clickedCount++;
// 				$cards.toggleClass = 'clicked';
// 				console.log(clickedCount);  // 확인차!  -> 1 그리고 2를 출력하고 끝남.
// 			}
// 		}
// 	};
// }


// function addToClikedCard(e) {
// 	if (cardClicked.length < 2) {
// 		cardClicked.push(e.target);
// 	}
// }

// function cardClicked() {
// 	showCard();
// 	addToOpenCards();
// 	startTimer(); 
// }


$cardsWrapper.onclick = e => {
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
}

// setTimeout(resetCardClicked, 1000);






// 카드 두개가 일치하지 않을 때는 다시 원상태로 복귀, 두개가 일치하면 불투명하게 바꾸기  
function matchCards() {
	if (cardClicked[0].style.backgroundImage === cardClicked[1].style.backgroundImage) {
		console.log('아파');
		cardClicked[0].classList.add('matched');
		cardClicked[1].classList.add('matched'); 
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


// // 타이머 카운팅 종료 
// function stopTimer() {
// 	if (timeStatus === false) {
// 		timeStatus = true;
// 	}
// }




// // 게임 시작 함수 
// function startGame() {
// 	countTimer();
// }



// // 게임 종료하는 함수 --> 모달창을 띄우고, 타이머 상의 시간을 프린트하고, 게임오버라고 적혀있게끔 구현!
// function endGame () {
// 	// if  $count === 4 
// 	stopTimer();   // 게임 종료 ---> 어려움! 
// }



// // // 게임 재시작 하는 함수 (필요하다면 restart 버튼 구현할 것!)
// // // 재실행 버튼이 있다면, 버튼 클릭시 -> 함수 restart() 호출...
// function restart() {
// 	window.location.reload(true);

// 	// 다시 빈 배열로 만들기 
// 	$cardClicked = [];
// 	$cardMatched = [];
// }