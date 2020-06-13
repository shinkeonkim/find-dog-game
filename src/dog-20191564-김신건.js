var leftDog = 0; // 남은 강아지 수
var leftGameTime = 0; // 남은 시간
var gameTimer; // 남은 시간 타이머
var leftShowTime = 10;
var showTimer;
var dogNumberList;
var isStarted = false;
var isfound = false;
var failCount = 0;

function init() {
    // 전역변수 초기화
    varInit();
    // 이벤트리스너 초기화
    eventInit();

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
}


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

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



function gameStart() {
    
    // 사용자가 입력한 `남은 시간 수` 저장
    leftGameTime = $("#left-time").val();
    
    // 사용자가 입력한 게임 시간이 올바르지 않다면, 게임을 시작하지 않는다.
    if(leftGameTime == " " || isNaN(leftGameTime) || leftGameTime >= 20 || leftGameTime <= 0) {
        alert("게임 시간은 1 ~ 19 까지의 숫자만 입력해주세요.");
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

    return true;
}

// 개를 보여주는 이미지로 변경
function showDog() {
    for(var i = 0; i < leftDog; i++) {
        $("#egg-" + dogNumberList[i]).attr("src", "../media/img2.gif");
    }
}

function showCertainDog(num) {
    $("#egg-" + num).attr("src", "../media/img2.gif");
}

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
    
    isStarted = true;
    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
    
    gameTimer = setInterval(function() {
        leftGameTime-=1;
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftGameTime + '</h4>');
        if(leftGameTime <= 0 && !isfound) {
            clearInterval(gameTimer);
            setGameMsg("실패");
            showFailDog();
            $("#fail-msg").css("visibility", "visible");
            init();  
            setTimeout(regame, 1500);
        }
    }, 1000);
}

function dogClicked(obj) {
    if(isStarted) {
        var clickedDogNumber = $(obj).attr("id").substr(4,$(obj).attr("id").length - 4);
        var ret = dogNumberList.indexOf(1*clickedDogNumber);
        if(ret < 0) {
            failCount++;
            $("#fail-count").text(failCount);
        }
        else {
            leftDog--;
            $("#left-dog-count").html('<h4 class = "col-4" id = "left-dog-count">' + leftDog + '</h4>');
            dogNumberList.splice(ret,1);
            showCertainDog(clickedDogNumber);
        }
    }
    else {
        alert("게임 시작 후, 개를 찾아주세요!");
    }

    if(leftDog <=0) {
        setGameMsg("성공하셨습니다!");
        clearInterval(gameTimer);
        iffound = true;
        init();
        setTimeout(regame, 1500);
    }
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