var leftDog = 0; // 남은 강아지 수
var leftGameTime = 0; // 남은 시간
var leftGameTimer; // 남은 시간 타이머

var leftShowTime = 10;
var showTimer;

function init() {
    // 이벤트리스너 초기화
    eventInit();

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
}

function gameStart() {
    
    
    // 사용자가 입력한 `남은 시간 수` 저장
    leftGameTime = $("#left-time").val();
    
    if(leftGameTime == " " || isNaN(leftGameTime) || leftGameTime >= 20 || leftGameTime <= 0) {
        alert("게임 시간은 1 ~ 19 까지의 숫자만 입력해주세요.");
        return false;
    }

    $("#left-time-label").val("남은 시간: ");
    
    // 사용자가 입력한 `찾을 강아지 수` 화면에 표시 및 저장
    leftDog = $("#left-dog-select").find("option:selected").val();
    $("#left-dog-count").html('<h4 class = "col-4" id = "left-dog-count">' + leftDog + '</h4>');
    
    // 10초동안 개의 위치 보여주기
    showTime();

    return true;
}

function showTime() {
    alert("개의 위치를 기억하세요!");

    $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');
    
    showTimer = setInterval(function() {
        leftShowTime-=1;
        $("#left-time-count").html('<h4 class = "col-4" id = "left-time-count">' + leftShowTime + '</h4>');
        if(leftShowTime <= 0) {
            clearInterval(showTimer);
            findDog();
        }
    }, 1000);
}

function findDog() {

    alert("찾으세요!");
    
}
