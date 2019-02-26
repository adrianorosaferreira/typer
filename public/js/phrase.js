$('#button-phrase').click(randomPhrase);

function randomPhrase() {
    $.get('http://localhost:3000/frases', changePhrase);
}

function changePhrase(data) {
    const position = Math.floor(Math.random() * data.length);
    $('.phrase').text(data[position].texto);
    updateTime(data[position].tempo);
    refreshSentenceSize();
}