$('#button-assignment').click(toggleScoreboard);
$('#button-sync').click(syncScoreboard);

function insertScore() {
    let tableBody = $('.scoreboard').find('tbody');
    let numberWords = $('.counter-words').text();
    let user = $('#user').val();

    let row = createRow(user, numberWords);
    row.find('.remove-button').click(removeRow);

    tableBody.prepend(row);
    $('.scoreboard').slideDown(600);
    scrollScoreboard();
}

function syncScoreboard() {
    let scoreboard = [];
    let scores = $('tbody>tr');
    scores.each(function() {
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

function createRow(user, numberWords) {
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

function removeRow(e) {
    e.preventDefault();
    let row = $(this).parent().parent();
    row.fadeOut(1000);
    setTimeout(() => row.remove(), 1000);
}

function toggleScoreboard() {
    $('.scoreboard').stop().slideToggle(600);

}

function updateScoreboard() {
    $.get('http://localhost:3000/placar', function(data) {
        $(data).each(function() {
            let row = createRow(this.usuario, this.pontos);
            row.find('.remove-button').click(removeRow);
            $('tbody').append(row);
        });
    });
}