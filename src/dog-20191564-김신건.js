var leftDog = 0; // 남은 강아지 수
var leftGameTime = 0; // 남은 게임 시간
var gameTimer; // 게임 시간 타이머
var leftShowTime = 10; // 남은 보여주기 시간
var showTimer; // 보여주기 시간 타이머
var dogNumberList; // 개가 있는 달걀 번호 배열 
var isStarted = false; // 게임이 시작되었는지를 boolean으로 저장하는 변수
var isEnded = false; // 게임이 끝났는지를 boolean으로 저장하는 변수
var isfound = false; // 모든 개를 찾았는지를 boolean으로 저장하는 변수
var failCount = 0; // 사용자가 잘못된 달걀을 건드린 횟수를 저장하는 변수

// var backGroundMusic;
var clockSound; // 똑딱 sound
var successSound; // 모든 개를 찾았을 때의 함성 소리
var tadaSound;  // 모든 개르 찾았을 때의 타다~ 소리
var gameStartSound; // 게임이 시작할 때 들리는 소리

// document가 로드되면 init() 함수 불러옴.
$(document).ready(function () {
    init();
});

function init() {
    // html 코드 중 반복되거나, js 코드로 대체할 수 있는 경우 js 코드로 html 초기화
    htmlJsInit();
    // 전역변수 초기화
    varInit();
    // 이벤트리스너 초기화
    eventInit();
    // audio 객체 초기화
    mediaInit();
}

// html 코드 상으로 반복이 필요하거나, 길어지는 코드들을 js 코드로 대체하는 함수
function htmlJsInit() {
    // 달걀 24개를 배치하는 코드 
    boardHtml = "";
    for(var i = 0; i <3; i++) {
        boardHtml += '<div class="row justify-content-md-center rounded bg-transparent">';
        for(var j = 0; j <8; j++) {
            boardHtml +='<div class="col-1">';
            boardHtml +='<img class = "egg" src="../media/img3.gif" alt="이미지 없음" id = "egg-'+(i*8+j)+'">';
            boardHtml +='</div>';
        }
        boardHtml +='</div>';
    }

    // html 대입
    $("#board").html(boardHtml);

    // select 태그안에 option 태그 내용들을 js로 작성한 코드
    optionHtml = "";
    for(var i = 1; i < 8; i++) {
        optionHtml+="<option value='" + i + "'>" + i +"</option>";
    }

    // html 대입
    $("#left-dog-select").html(optionHtml);
}

// 전역 변수 초기화 함수
function varInit() {
    leftDog = 0; // 남은 강아지 수
    leftGameTime = 0; // 남은 게임 시간
    leftShowTime = 10; // 남은 보여주기 시간
    dogNumberList = []; // 개가 있는 달걀 번호 배열 
    isStarted = false; // 게임이 시작되었는지를 boolean으로 저장하는 변수
    isEnded = false; // 게임이 끝났는지를 boolean으로 저장하는 변수
    isfound = false; // 모든 개를 찾았는지를 boolean으로 저장하는 변수
    failCount = 0; // 사용자가 잘못된 달걀을 건드린 횟수를 저장하는 변수
}

// DOM 객체마다 필요한 이벤트 리스너 등록하는 함수
function eventInit() {

    // 게임 시작 버튼을 누르는 이벤트
    $("#game-start").click(function () {
        if(gameStart()) {
            $(this).hide();
        }
    });

    // 달걀 위에 마우스가 올라온 경우, 그림자 css를 추가한다.
    $(".egg").mouseenter(function () { 
        $(this).addClass('shadow-lg');
    });

    // 달걀 위에서 마우스가 사라진 경우, 그림자 css를 제거한다.
    $(".egg").mouseleave(function () { 
        $(this).removeClass('shadow-lg');
    });

    // 메뉴바 아이템에 마우스가 올라온 경우, 그림자 css를 추가한다.
    $(".nav-item").mouseenter(function () { 
        $(this).addClass('shadow-lg');
    });

    // 메뉴바 아이템위에서 마우스가 사라진 경우, 그림자 css를 제거한다.
    $(".nav-item").mouseleave(function () { 
        $(this).removeClass('shadow-lg');
    });

    //달걀을 클릭했을 떄, eggClicked 함수를 호출한다.
    $(".egg").click(function() {
        eggClicked(this);
    });

    // 배경음악 구현 사항 변경으로 관련 내용 주석 처리
    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    // 크롬의 autoplay 정책 변경으로 크롬에서는 사용자에게 클릭 등의 이벤트가 일어나야 노래가 재생되게 바뀌었음.
    // 이에 따라 추가한 이벤트                
    // $("#music-button").click(function (e) { 
    //     backGroundMusic.play();
    //     $(this).hide();
    // });
}


// audio 객체 초기화
function mediaInit() {

    // 배경 음악 구현 사항 변경으로 관련 내용 주석 처리
    // backGroundMusic = new Audio();
    // backGroundMusic.src = "../media/background.mp3";
    // backGroundMusic.loop = true;
    // backGroundMusic.volume = 0.5;
    // backGroundMusic.play();
    
    clockSound = new Audio("../media/clock.mp3");
    successSound = new Audio("../media/ending.mp3");
    tadaSound = new Audio("../media/tada.mp3");
    gameStartSound = new Audio("../media/gamestart.mp3");
}

// 사용자가 빠르게 누르면, 하나의 객체로 정의되었을 경우에는 사운드가 들리지 않을 수 있음.
// 따라서, badSound와 goodSound는 그때마다 새로운 객체로 선언하여 play해야함.
function badSoundPlay() {
    var badSound = new Audio("../media/bad.mp3");
    badSound.play();
}

function goodSoundPlay() {
    var goodSound = new Audio("../media/chimes.mp3");
    goodSound.play();
}

// min ~ max-1 범위의 난수를 하나 생성한다.
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// leftDog 개수만큼의 중복되지 않는 난수 목록을 생성한다.
// 재귀함수 방식으로 작동한다.
function getRandomNumbers(arr) {
    if (!arr) {
        arr = [];
    }
    var n = getRandomNumber(0,24);

    if (arr.length < leftDog) {
        if(arr.indexOf(n) < 0){
            arr.push(n);
        }
        return getRandomNumbers(arr);
    } 
    else {
        return arr;
    }
}

// 게임 시작 버튼이 눌렀을 때 실행되는 함수
function gameStart() {
    
    // 사용자가 입력한 `남은 시간 수` 저장
    if($("#left-time").val()!= undefined) {
        leftGameTime = $("#left-time").val();
    }
    else {
        return false;
    }
    
    // 사용자가 입력한 게임 시간이 올바르지 않다면, 게임을 시작하지 않는다.
    if(leftGameTime == "" || leftGameTime == null || isNaN(leftGameTime) || leftGameTime >= 30 || leftGameTime <= 0) {
        alert("게임 시간은 1 ~ 29 까지의 숫자만 입력해주세요.");
        return false;
    }

    // 게임 시간: -> 남은 시간: 으로 텍스트 변경    
    $("#left-time-label").text("남은 시간: ");
    
    // 사용자가 입력한 `찾을 강아지 수` 화면에 표시 및 저장
    leftDog = $("#left-dog-select").find("option:selected").val();
    $("#left-dog-count").html('<h4 class = "col-4" id = "left-dog-count">' + leftDog + '</h4>');
    
    // dogNumberList에 개의 랜덤 위치를 저장한다.
    dogNumberList = getRandomNumbers(dogNumberList);
 
    // 10초동안 개의 위치 보여주기
    showTime();

    //게임이 정상적으로 실행되었으므로, true를 return한다.
    return true;
}

// 개를 보여주는 이미지로 변경
function showDog() {
    for(var i = 0; i < leftDog; i++) {
        $("#egg-" + dogNumberList[i]).attr("src", "../media/img2.gif");
    }
}

// 특정 id의  개 이미지를 보여준다.
function showCertainDog(num) {
    $("#egg-" + num).attr("src", "../media/img2.gif");
}

// 실패 시에, 찾지 못하고 남아있는 강아지만, 빨간색 테두리와 함께 보여준다.
function showFailDog() {
    for(var i = 0; i < leftDog; i++) {
        $("#egg-" + dogNumberList[i]).attr("src", "../media/img2.gif");
        $("#egg-" + dogNumberList[i]).css("border", "1px solid red");
    }
}

// 개를 안보여주는 이미지로 변경
function hideDog() {
    for(var i = 0; i < leftDog; i++) {
        $("#egg-" + dogNumberList[i]).attr("src", "../media/img3.gif");
        $("#egg-" + dogNumberList[i]).css("");
    }
}

// 개를 보여주는 시간동안 일어나야 하는 내용들
function showTime() {

    // 개가 있는 위치를 보여준다.
    showDog();

    // 게임 메세지 변경
    setGameMsg("개의 위치를 기억하세요.");
    // 남은 시간을 10으로 보여준다.
    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');

    // 1초마다 타이머를 타이머를 작동시킨다.
    showTimer = setInterval(function() {
        leftShowTime-=1;
        // 만약 5초 이하만큼 시간이 남는다면, 똑딱 똑딱 소리가 나게 한다.
        if(leftShowTime<=5) {
            clockSound.play();
        }
        // 보여주는 남은 시간을 변경한다.
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');

        // 만약 남은 시간이 0 이하라면(보여주는 시간이 끝났다면), 타이머를 종료하고, 개를 숨긴뒤, 찾는 시간으로 바꾼다.
        if(leftShowTime <= 0) {
            clearInterval(showTimer);    
            hideDog();
            findDog();
        }
    }, 1000);
}

// 개를 찾는 시간동안 일어나야 하는 내용들.
function findDog() {
    // 게임 메세지 변경
    setGameMsg("정답을 찾으세요.");
    // 게임 시작시 구분할 수 있는 소리 재생
    gameStartSound.play();
    // 게임이 시작된 상태임을 저장
    isStarted = true;
    // 남은 게임 시간을 화면에 반영
    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
    
    // 1초마다 게임 시간 타이머를 작동한다.
    gameTimer = setInterval(function() {
        leftGameTime-=1;
        // 남은 게임 시간을 화면에 반영
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
        // 만약 남은 게임 시간이 없고 다 찾지 못한 경우, 실패로 처리한다.
        if(leftGameTime <= 0 && !isfound) {
            failGame();
        }
    }, 1000);
}

// 달걀이 클릭되었을 경우 실행되는 함수
function eggClicked(obj) {
    // 만약, 게임이 시작되었고, 끝나지 않은경우 (게임이 진행되고 있는 경우)
    if(isStarted && !isEnded) {
        // 클릭된 달걀 id에서 숫자만 추출
        var clickedEggNumber = $(obj).attr("id").substr(4,$(obj).attr("id").length - 4);
        // 클릭된 달걀 id number를 dogNumberList에서 탐색함.
        var ret = dogNumberList.indexOf(1*clickedEggNumber);

        // 클릭된 달걀에 개가 없는 경우
        if(ret < 0) {
            // 실패수 증가
            failCount++;
            // 실패 사운드 재생
            badSoundPlay();
            // 실패수를 화면에 반영
            $("#fail-count").text(failCount);
        }
        else { // 클릭된 달걀에 개가 있는 경우
            // 남은 강아지 수 감소
            leftDog--;
            // 성공 사운드 재생
            goodSoundPlay();
            // 남은 강아지 수 화면에 반영
            $("#left-dog-count").html('<h4 class = "col-4" id = "left-dog-count">' + leftDog + '</h4>');
            // dogNumberList에서 찾은 강아지 제거
            dogNumberList.splice(ret,1);
            // 찾은 강아지는 화면에 표시
            showCertainDog(clickedEggNumber);
        }
    }
    else { // 게임이 진행되지 않고 있는 경우
        // 아무것도 실행하지 않고 종료한다.
        return;
    }

    if(leftDog <=0) { // 만약 남은 강아지가 없는 경우, 게임을 성공한 경우이다.
        successGame();
        return;
    }

    if(failCount >5) { // 만약 실패수가 5를 초과한 경우, 게임을 실패한 경우이다.
        failGame();
        return;
    }

}

// 게임을 성공한 경우
function successGame() {
    // 만약 끝난 판정이 아직 되지 않았다면, 아래 내용 실행
    // isEnded로 판정하지 않는다면, 사용자가 게임을 여러번 클리어했다는 이벤트가 발생할 수 있음.
    if(!isEnded) {
        // 성공 메세지를 화면에 반영
        setGameMsg("성공하셨습니다!");
        // 성공했을 때, 함성소리, 타다 소리 재생
        successSound.play();
        tadaSound.play();
        // 게임 타이머 clear
        clearInterval(gameTimer);
        // 모든 것을 찾았음을 저장
        isfound = true;
        // regame를 위한 함수를 2초이후에 실행
        setTimeout(regame, 2000);
        // 게임을 끝났음을 저장
        isEnded = true;
    }
}

// 게임을 실패한 경우
function failGame() {
    // 만약 끝난 판정이 아직 되지 않았다면, 아래 내용 실행
    // isEnded로 판정하지 않는다면, 사용자가 게임을 여러번 클리어했다는 이벤트가 발생할 수 있음.
    if(!isEnded) {
        // 게임 타이머 종료
        clearInterval(gameTimer);
        // 실패 메세지를 화면에 반영
        setGameMsg("실패");
        // 실패한 경우에는, 아직 찾지 못한 강아지가 있으므로, 못찾은 강아지를 보여주는 함수 실행
        showFailDog();
        // GAME OVER 메세지 화면에 반영
        $("#fail-msg").css("visibility", "visible");
        // regame을 위한 함수를 2초이후에 실행
        setTimeout(regame, 2000);
        //게임이 끝났음을 저장
        isEnded = true;
    }
}


function regame() {
    // 게임을 다시 시작할지를 묻는 confirm 창을 띄움.
    if(confirm("게임을 다시 시작하시겠습니까?")) { // 게임을 다시 시작할시 필요한 초기화 과정을 다시 겪음.
        // 게임 시간: -> 남은 시간: 으로 텍스트 변경     
        $("#left-time-label").text("게임 시간: ");
        // 실패수 0으로 설정
        $("#fail-count").text(0);
        // 모든 개를 숨기는 이미지로 변경
        hideDog();
        // 변수 초기화
        varInit();
        // html 초기화
        $("#left-time-count").html('<input type="text" id="left-time" style="width: 100%;">');
        $("#left-dog-count").html('<select class="col-12 left-dog-select" id="left-dog-select"></select>');    
        $("#fail-msg").css("visibility", "hidden");
        // 게임 메세지 변경
        setGameMsg("게임이 진행될 예정입니다.");
        // html 대체 코드 실행
        htmlJsInit();
        // 이벤트 초기화
        eventInit();
        // 게임 시작버튼 화면에 보이도록 설정
        $("#game-start").show();
    }
}

// 게임 메세지 설정 함수
function setGameMsg(str) {
    $("#game-msg").text(str);
}