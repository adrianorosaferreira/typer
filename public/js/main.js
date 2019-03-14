let TIMER_TYPING = 3;

let fieldTyping = $('#field-typing-id');


$(() => {
    refreshSentenceSize();
    counterUpdates();
    refreshTimeRemaining();
    validateTyping();
    $("#button-reset").click(restartGame);
    $("#button-reset").attr('disabled', true);
    updateScoreboard();
    $('#user').selectize({
        create: true,
        sortField: 'text'
    });
})

function updateTime(time) {
    TIMER_TYPING = time;
    $('.timer-typing').text(time);
}

function refreshSentenceSize() {
    let paragraph = $('.phrase').text();
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

function validateTyping() {
    fieldTyping.on('input', () => {
        let typed = fieldTyping.val();

        // let comparableContent = $('.phrase').text().substr(0, typed.length);
        // let isMatch = (typed == comparableContent);
        // Isto é equivalente a isso:

        let isMatch = $('.phrase').text().startsWith(typed);
        fieldTyping.toggleClass('different-text', !isMatch);
        fieldTyping.toggleClass('same-text', isMatch);
    })
}

function refreshTimeRemaining() {
    fieldTyping.one('focus', () => {
        let leftTime = TIMER_TYPING;
        let id = setInterval(() => {
            leftTime--;
            $(".timer-typing").text(leftTime);
            $("#button-reset").attr('disabled', true);
            if (leftTime < 1) {
                endGame();
                insertScore();
                clearInterval(id);
            }
        }, 1000);
    });
}

function endGame() {
    fieldTyping.attr("disabled", true);
    fieldTyping.addClass("disabled-field");
    $("#button-reset").attr('disabled', false);
}

function restartGame() {
    $('.counter-words').text("0");
    $('.counter-characters').text("0");
    $(".timer-typing").text(TIMER_TYPING);
    fieldTyping.val("");
    fieldTyping.attr("disabled", false);
    fieldTyping.removeClass("disabled-field");
    fieldTyping.removeClass('same-text');
    fieldTyping.removeClass('different-text');
    fieldTyping.addClass('initial-state');
    refreshTimeRemaining();
}