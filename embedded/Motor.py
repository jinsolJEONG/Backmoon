import asyncio
import websockets
import json
from PCA9685 import PCA9685
import time

# 주행 제어 변수
is_driving = asyncio.Event()
is_driving.clear()

# 모터 제어
Dir = [
    'forward',
    'backward',
]
pwm = PCA9685(0x40, debug=False)
pwm.setPWMFreq(1000)

class MotorDriver():
    def __init__(self):
        self.PWMA = 0
        self.AIN1 = 2
        self.AIN2 = 1
        self.PWMB = 5
        self.BIN1 = 4
        self.BIN2 = 3

    def MotorRun(self, motor, index, speed):
        if speed > 100:
            return
        if(motor == 0):
            pwm.setDutycycle(self.PWMA, speed)
            if(index == Dir[0]):
                print ("1")
                pwm.setLevel(self.AIN1, 0)
                pwm.setLevel(self.AIN2, 1)
            else:
                print ("2")
                pwm.setLevel(self.AIN1, 1)
                pwm.setLevel(self.AIN2, 0)
        else:
            pwm.setDutycycle(self.PWMB, speed)
            if(index == Dir[0]):
                print ("3")
                pwm.setLevel(self.BIN1, 0)
                pwm.setLevel(self.BIN2, 1)
            else:
                print ("4")
                pwm.setLevel(self.BIN1, 1)
                pwm.setLevel(self.BIN2, 0)

    def MotorStop(self, motor):
        if (motor == 0):
            pwm.setDutycycle(self.PWMA, 0)
        else:
            pwm.setDutycycle(self.PWMB, 0)

print("this is a motor driver test code")
Motor = MotorDriver()

def go_F(speed):
    Motor.MotorRun(0, 'forward', speed)
    Motor.MotorRun(1, 'forward', speed)

def go_B(speed):
    Motor.MotorRun(0, 'backward', speed)
    Motor.MotorRun(1, 'backward', speed)
def go_L(speed):
    Motor.MotorRun(0, 'backward', speed)
    Motor.MotorRun(1, 'forward', speed)
def go_R(speed):
    Motor.MotorRun(0, 'forward', speed)
    Motor.MotorRun(1, 'backward', speed)


def handle_websocket(response):
    global current_direction
    try:
        try:
            data = json.loads(response)
            updown = data.get('type', [])
            keys = data.get('keys', [])
            print(f"updown: {updown}")
            print(f"arrow: {keys}")
            if updown == "keydown":
                is_driving.set()
                current_direction = keys
            elif updown == "keyup":
                is_driving.clear()
                current_direction = None 
        except json.JSONDecodeError:
            print("Invalid JSON format")
    except websockets.exceptions.ConnectionClosedOK:
        print("WebSocket connection closed")
    
# async def handle_websocket(websocket, path):
#     global current_direction
#     try:
#         async for message in websocket:
#             try:
#                 data = json.loads(message)
#                 updown = data.get('type', [])
#                 keys = data.get('keys', [])
#                 print(f"updown: {updown}")
#                 print(f"arrow: {keys}")
#                 if updown == "keydown":
#                     is_driving.set()
#                     current_direction = keys
#                 elif updown == "keyup":
#                     is_driving.clear()
#                     current_direction = None 
#             except json.JSONDecodeError:
#                 print("Invalid JSON format")
#     except websockets.exceptions.ConnectionClosedOK:
#         print("WebSocket connection closed")

async def drive_loop():
        while True:
            if is_driving.is_set() and current_direction is not None:
                if current_direction == "ArrowUp":
                    go_F(35)
                elif current_direction == "ArrowDown":
                    go_B(35)
                elif current_direction == "ArrowLeft":
                    go_L(35)
                elif current_direction == "ArrowRight":
                    go_R(35)
            else:
                Motor.MotorStop(0)
                Motor.MotorStop(1)
            await asyncio.sleep(0.1)

async def main():
    uri = "ws://192.168.100.48:6001"
    async with websockets.connect(uri) as websocket:
        print('connected')
        drive_task = asyncio.create_task(drive_loop())
        while True:
            response = await websocket.recv()
            handle_websocket(response)
            await asyncio.sleep(0.1)
    # server = await websockets.serve(handle_websocket, "0.0.0.0", 8765)
    print("WebSocket server started")
    
    # 주행 루프 비동기적으로 실행
    # drive_task = asyncio.create_task(drive_loop())
    
    # await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
