const TIMER_TYPING = 5;

let fieldTyping = $('#field-typing-id');

$(() => {
    refreshSentenceSize();
    counterUpdates();
    refreshTimeRemaining();
    $("#button-reset").click(restartGame);
});

function refreshSentenceSize() {
    let paragraph = $('p').text();
    let numberWords = paragraph.split(' ').length;
    $('.number-words').text(numberWords);
}

function counterUpdates() {
    fieldTyping.on('input', () => {
        let content = fieldTyping.val();

        $('.counter-words').text(content.split(/\S+/).length - 1);
        $('.counter-characters').text(content.replace(/\s+/g, '').length);
    });
}

function refreshTimeRemaining() {
    let leftTime = TIMER_TYPING;
    fieldTyping.one('focus', () => {
        let id = setInterval(() => {
            leftTime--;
            $(".timer-typing").text(leftTime);
            if (leftTime < 1) {
                fieldTyping.attr("disabled", true);
                clearInterval(id);
            }
        }, 1000);
    });
}

function restartGame() {
    $('.counter-words').text("0");
    $('.counter-characters').text("0");
    $(".timer-typing").text(TIMER_TYPING);
    fieldTyping.val("");
    fieldTyping.attr("disabled", false);
    refreshTimeRemaining();
}