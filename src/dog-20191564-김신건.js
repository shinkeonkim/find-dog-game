var leftDog = 0; // 남은 강아지 수
var leftGameTime = 0; // 남은 시간
var gameTimer; // 남은 시간 타이머
var leftShowTime = 10;
var showTimer;
var dogNumberList;
var isStarted = false;
var isfound = false;
var failCount = 0;

var backGroundMusic;
var clockSound;
var successSound;
var tadaSound;
var gameStartSound;

function init() {

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

    $("#board").html(boardHtml);

    
    optionHtml = "";
    for(var i = 1; i < 8; i++) {
        optionHtml+="<option value='" + i + "'>" + i +"</option>";
    }

    $("#left-dog-select").html(optionHtml);

    // 전역변수 초기화
    varInit();
    // 이벤트리스너 초기화
    eventInit();

    mediaInit();
}

function varInit() {
    leftDog = 0; // 남은 강아지 수
    leftGameTime = 0; // 남은 시간
    leftShowTime = 10;
    dogNumberList = [];
    isStarted = false;
    isfound = false;
    failCount = 0;
}

function eventInit() {
    $("#game-start").click(function (e) {
        if(gameStart()) {
            $(this).hide();
        }
    });

    $(".egg").mouseenter(function () { 
        $(this).addClass('shadow-lg');
    });

    $(".egg").mouseleave(function () { 
        $(this).removeClass('shadow-lg');
    });

    $(".nav-item").mouseenter(function () { 
        $(this).addClass('shadow-lg');
    });

    $(".nav-item").mouseleave(function () { 
        $(this).removeClass('shadow-lg');
    });

    $(".egg").click(function() {
        dogClicked(this);
    });

    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    // 크롬의 autoplay 정책 변경으로 크롬에서는 사용자에게 클릭 등의 이벤트가 일어나야 노래가 재생되게 바뀌었음.
    // 이에 따라 추가한 이벤트                
    $("#music-button").click(function (e) { 
        backGroundMusic.play();
        $(this).hide();
    });
}


function mediaInit() {

    backGroundMusic = new Audio();
    backGroundMusic.src = "../media/background.mp3";
    backGroundMusic.loop = true;
    backGroundMusic.volume = 0.5;
    backGroundMusic.play();

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
    leftGameTime = $("#left-time").val();
    
    // 사용자가 입력한 게임 시간이 올바르지 않다면, 게임을 시작하지 않는다.
    if(leftGameTime == " " || isNaN(leftGameTime) || leftGameTime >= 30 || leftGameTime <= 0) {
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
    }
}

function showTime() {

    showDog();

    setGameMsg("개의 위치를 기억하세요.");
    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');
    
    showTimer = setInterval(function() {
        leftShowTime-=1;
        if(leftShowTime<=5) {
            clockSound.play();
        }
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');
        if(leftShowTime <= 0) {
            clearInterval(showTimer);    
            hideDog();
            findDog();
        }
    }, 1000);
}

function findDog() {

    setGameMsg("정답을 찾으세요.");
    gameStartSound.play();
    isStarted = true;
    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
    
    gameTimer = setInterval(function() {
        clockSound.play();
        leftGameTime-=1;
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
        if(leftGameTime <= 0 && !isfound) {
            failGame();
        }
    }, 1000);
}

function dogClicked(obj) {
    if(isStarted) {
        var clickedDogNumber = $(obj).attr("id").substr(4,$(obj).attr("id").length - 4);
        var ret = dogNumberList.indexOf(1*clickedDogNumber);
        if(ret < 0) {
            failCount++;
            badSoundPlay();
            $("#fail-count").text(failCount);
        }
        else {
            leftDog--;
            goodSoundPlay();
            $("#left-dog-count").html('<h4 class = "col-4" id = "left-dog-count">' + leftDog + '</h4>');
            dogNumberList.splice(ret,1);
            showCertainDog(clickedDogNumber);
        }
    }
    else {
        alert("게임 시작 후, 개를 찾아주세요!");
        return;
    }

    if(leftDog <=0) {
        successGame();
    }

    if(failCount >5) {
        failGame();
    }

}

function successGame() {
    setGameMsg("성공하셨습니다!");
    successSound.play();
    tadaSound.play();
    clearInterval(gameTimer);
    iffound = true;
    setTimeout(regame, 1500);
}

function failGame() {
    clearInterval(gameTimer);
    setGameMsg("실패");
    showFailDog();
    $("#fail-msg").css("visibility", "visible");
    setTimeout(regame, 1500);
}


function regame() {
    clearTimeout(regame);
    if(confirm("다시 시작하시겠습니까?")) {
        location.reload();
    }
}

function setGameMsg(str) {
    $("#game-msg").text(str);
}