#include "main.h"

void Handler(int signo)
{
    // System Exit
    printf("\r\nHandler: Motor Stop\r\n");
    Motor_Stop(MOTORA);
    Motor_Stop(MOTORB);
    DEV_ModuleExit();

    exit(0);
}

int main(void)
{
    // 1. System Initialization
    if (DEV_ModuleInit())
        exit(0);

    // 2. Motor Initialization
    Motor_Init();

    printf("Motor_Run\r\n");

    // Movement 1: Forward
    printf("Moving forward...\r\n");
    Motor_Run(MOTORA, FORWARD, 100);
    Motor_Run(MOTORB, FORWARD, 100);
    sleep(2); // Adjust the time for the desired movement duration

    // Movement 2: Backward
    printf("Moving backward...\r\n");
    Motor_Run(MOTORA, BACKWARD, 100);
    Motor_Run(MOTORB, BACKWARD, 100);
    sleep(2); // Adjust the time for the desired movement duration

    // Movement 3: Turn Left (rotate in place)
    printf("Turning left...\r\n");
    Motor_Run(MOTORA, FORWARD, 100);
    Motor_Run(MOTORB, BACKWARD, 100);
    sleep(2); // Adjust the time for the desired movement duration

    // Movement 4: Turn Right (rotate in place)
    printf("Turning right...\r\n");
    Motor_Run(MOTORA, BACKWARD, 100);
    Motor_Run(MOTORB, FORWARD, 100);
    sleep(2); // Adjust the time for the desired movement duration

    // Stop the motors
    printf("Stopping motors...\r\n");
    Motor_Stop(MOTORA);
    Motor_Stop(MOTORB);

    // Exception handling: ctrl + c
    signal(SIGINT, Handler);
    while (1)
    {
    }

    // 3. System Exit
    DEV_ModuleExit();
    return 0;
}
