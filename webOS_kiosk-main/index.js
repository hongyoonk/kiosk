    // 웹 서버를 접속한다.
var webSocket = new WebSocket("ws://localhost:9998");
let storage = localStorage;
    // 웹 서버와의 통신을 주고 받은 결과를 출력할 오브젝트를 가져옵니다.
    // 소켓 접속이 되면 호출되는 함수
webSocket.onopen = function(message){
    console.log("Server Connected");
};
    // 소켓 접속이 끝나면 호출되는 함수
webSocket.onclose = function(message){
    console.log("Server Disconnected");
};
    // 소켓 통신 중에 에러가 발생되면 호출되는 함수
webSocket.onerror = function(message){
    console.log("Error");
};
    // 소켓 서버로 부터 메시지가 오면 호출되는 함수.
webSocket.onmessage = function(message){
      // 출력 area에 메시지를 표시한다.
    storage.setItem('name', message.data)
   /*  webSocket.close() */
    location.href="kiosk.html"
};
    // 서버로 메시지를 전송하는 함수
function sendMessage(){
    var message = document.getElementById("textMessage");
      //웹소켓으로 textMessage객체의 값을 보낸다.
    webSocket.send(message.value);
      //textMessage객체의 값 초기화
    message.value = "";
};
function disconnect(){
    webSocket.close();
};