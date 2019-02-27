$('#button-assignment').click(toggleScoreboard);
$('#button-sync').click(syncScoreboard);

function insertScore() {
    let tableBody = $('.scoreboard').find('tbody');
    let numberWords = $('.counter-words').text();

    let line = createLine(user, numberWords);
    line.find('.remove-button').click(removeLine);

    tableBody.prepend(line);
    $('.scoreboard').slideDown(600);
    scrollScoreboard();
}

function syncScoreboard() {
    let scoreboard = [];
    let scores = $('tbody>tr');
    scores.each(function() {
        console.log('aqui');
        const user = $(this).find('td:nth-child(1)').text();
        const words = $(this).find('td:nth-child(2)').text();

        const score = {
            usuario: user,
            pontos: words
        }
        scoreboard.push(score);
    });

    const data = { placar: scoreboard };
    $.post("http://localhost:3000/placar", data, () => {
        console.log("Scoreboard successfully synced.");
    });
}

function scrollScoreboard() {
    const posicaoPlacar = $('.scoreboard').offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function createLine(user, numberWords) {
    let tr = $('<tr>');
    let tdUser = $('<td>').text(user);
    let tdWords = $('<td>').text(numberWords);
    let tdRemove = $('<td>');
    let link = $('<a>').addClass('remove-button').attr('href', '#');
    let icon = $('<i>').addClass('small').addClass('material-icons').text('delete');

    tdRemove.append(link.append(icon));

    tr.append(tdUser);
    tr.append(tdWords);
    tr.append(tdRemove);

    return tr;
}

function removeLine(e) {
    e.preventDefault();
    let line = $(this).parent().parent();
    line.fadeOut(1000);
    setTimeout(() => line.remove(), 1000);
}

function toggleScoreboard() {
    $('.scoreboard').stop().slideToggle(600);

}