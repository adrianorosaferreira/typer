$('#button-phrase').click(randomPhrase);
$('#button-phrase-id').click(choosePhrase);

function randomPhrase() {
    $('#spinner').toggle();
    $('.phrase').toggle();
    $.get('http://localhost:3000/frases', changePhrase)
        .fail(() => {
            $('#error').toggle();
            setTimeout(() => {
                $('#error').toggle();
            }, 2000);
        }).always(() => {
            $('#spinner').toggle();
            $('.phrase').toggle();
        });
}

function choosePhrase() {
    $('#spinner').toggle();
    $('.phrase').toggle();
    const idPhrase = $('#phrase-id').val();
    const data = { id: idPhrase };
    $.get('http://localhost:3000/frases', data, showPhrase)
        .fail(() => {
            $('#error').toggle();
            setTimeout(() => {
                $('#error').toggle();
            }, 2000);
        }).always(() => {
            $('#spinner').toggle();
            $('.phrase').toggle();
        });
}

function changePhrase(data) {
    const position = Math.floor(Math.random() * data.length);
    $('.phrase').text(data[position].texto);
    updateTime(data[position].tempo);
    refreshSentenceSize();
}

function showPhrase(data) {
    $('.phrase').text(data.texto);
    updateTime(data.tempo);
    refreshSentenceSize();
}