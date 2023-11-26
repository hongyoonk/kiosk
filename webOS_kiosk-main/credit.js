var webSocket = new WebSocket("ws://localhost:9998");
let storage = localStorage;

webSocket.onopen = function(message){
    const point = storage.getItem('totalPrice')
    const realname = storage.getItem("name")
    let userPoint = [realname , point/20]
    console.log("Server Connected");
    webSocket.send(userPoint)
    storage.clear()
    console.log("clear")
};
    // 소켓 접속이 끝나면 호출되는 함수
webSocket.onclose = function(message){
    console.log("Server Disconnected");
};
    // 소켓 통신 중에 에러가 발생되면 호출되는 함수
webSocket.onerror = function(message){
    console.log("Error");
};

function name_space() {
    const priname = document.getElementById("name_space")
    const realname = storage.getItem("name")
    const point = storage.getItem('totalPrice')
    priname.innerText = realname + "님 " + point/20 + " 포인트가 적립되었습니다!"
};

cnt = 5

function page_return() {
    if (cnt == 0) {
        location.href="main.html"
    }else{
        const cntsec = document.getElementById('cntsec')
        cntsec.innerText = cnt + "초 후에 화면이 전환됩니다."
        setTimeout("page_return()", 1000)
        cnt --
    };
};

name_space();
page_return();