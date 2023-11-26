import asyncio
# 웹 소켓 모듈을 선언한다.
import websockets
import random
 
# 클라이언트 접속이 되면 호출된다.
async def accept(websocket, path):
  a = 0
  data_list = ['unknown', 'jung', 'chea']
  while a == 0:
    data = data_list[random.randrange(0,3)]
    print(data)
    await websocket.send(data)
    a += 1
 
# 웹 소켓 서버 생성.호스트는 localhost에 port는 9998로 생성한다. 
start_server = websockets.serve(accept, "localhost", 3000)
# 비동기로 서버를 대기한다.
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()