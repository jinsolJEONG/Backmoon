import asyncio
import websockets
import cv2
import zlib
import base64
import json
import ssl

async def video_stream():
    cap = cv2.VideoCapture(0)
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)  # SSL/TLS 컨텍스트 생성
    async with websockets.connect('wss://i9c106.p.SSSSS.io:6001', ssl=ssl_context) as websocket:
        print("connected")
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            _, buffer = cv2.imencode('.jpg', frame)
            # compressed_buffer = zlib.compress(buffer.tobytes())

            data = {
                "event": "video",
                "data": base64.b64encode(buffer).decode('utf-8')
            }
            json_str = json.dumps(data)
            
            await websocket.send(json_str)

            #response = await websocket.recv()
            # print(f"Received from server - Type: {type(response)}, Content: {response}")
            #time.sleep(3)

    cap.release()

async def main():
    await video_stream()

if __name__ == "__main__":
    asyncio.run(main())
