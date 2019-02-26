$('#button-assignment').click(toggleScoreboard);

function insertScore() {
    let tableBody = $('.scoreboard').find('tbody');
    let numberWords = $('.counter-words').text();

    let line = createLine(user, numberWords);
    line.find('.remove-button').click(removeLine);

    tableBody.prepend(line);
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
    $(this).parent().parent().remove();
}

function toggleScoreboard() {
    $('.scoreboard').fadeToggle(600);

}