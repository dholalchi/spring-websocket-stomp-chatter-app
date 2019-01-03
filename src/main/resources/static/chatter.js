var client = null;
var justSentMessage = null;

function connect() {
    var ws = new SockJS('/websocket-endpoint');
    client = window.Stomp.over(ws);
    client.connect({}, function (response) {
        setStatus(true);
        console.log('Websocket connection ON: ' + response);
        client.subscribe('/topic/AB', function (response) {
            displayMessage(JSON.parse(response.body).sentMessage);
        });
    });
}

function disconnect() {
    if (client != null) {
        client.disconnect();
    }
    setStatus(false);
    console.log('Websocket connection OFF');
}

function setStatus(status) {
    $("#online").prop("disabled", status);
    $("#offline").prop("disabled", !status);
    $("#send").prop("disabled", !status);
    if (status === true) {
        $("#message").html("");
    }
}

function displayMessage(message) {
    if (message === justSentMessage) {
        $("#message").append("<tr><td style='float: right; color: blue; font-size: medium'>" + message + "</td>></tr>>");
    } else {
        $("#message").append("<tr><td style='float: left; color: red; font-size: large'>" + message + "</td>></tr>>");
    }
}

function sendMessage() {
    if ($("#sendMessage").val()) {
        justSentMessage = $("#sendMessage").val();
        client.send('/chatter/msg', {}, JSON.stringify({'sentMessage': justSentMessage}));
    }
}

$(function () {

    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $("#online").click(function () {
        connect();
    });
    $("#offline").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendMessage();
    });

});