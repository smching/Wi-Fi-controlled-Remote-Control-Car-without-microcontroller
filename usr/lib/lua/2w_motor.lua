#!/usr/bin/lua

require "gpio" 	--GPIO read/write functions

FORWARD = 8
RIGHT = 6
STOP = 5
LEFT = 4
BACKWARD = 2

-- two dimensional array
Motor = {}
Motor[1] = {}
Motor[2] = {} 
Motor[1].pinA = 22
Motor[1].pinB = 21
Motor[2].pinB = 19
Motor[2].pinA = 18
pinMode(Motor[1].pinA, OUTPUT)
pinMode(Motor[1].pinB, OUTPUT)
pinMode(Motor[2].pinA, OUTPUT)
pinMode(Motor[2].pinB, OUTPUT)


function motor_run(motor, direction)
	if direction == FORWARD then
		digitalWrite(Motor[motor].pinA, 1)
		digitalWrite(Motor[motor].pinB, 0)
		
	elseif  direction == BACKWARD then
		digitalWrite(Motor[motor].pinA, 0)
		digitalWrite(Motor[motor].pinB, 1)
	else
		digitalWrite(Motor[motor].pinA, 0)
		digitalWrite(Motor[motor].pinB, 0)
	end
end


function car_run(direction)
	if direction == FORWARD then
		motor_run(1, FORWARD)
		motor_run(2, FORWARD)
	elseif direction == BACKWARD then
		motor_run(1, BACKWARD)
		motor_run(2, BACKWARD)
	elseif direction == LEFT then
		motor_run(2, STOP)
		motor_run(1, FORWARD)
	elseif direction == RIGHT then
		motor_run(2, FORWARD)
		motor_run(1, STOP)
	else
		motor_run(1, STOP)
		motor_run(2, STOP)
	end
end
