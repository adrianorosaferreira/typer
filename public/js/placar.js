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