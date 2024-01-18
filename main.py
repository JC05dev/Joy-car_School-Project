serial.redirect_to_usb()
basic.show_string("BOOT")
mode = 0
distance = 0
Sonar = 0
obP = 0
obL = 0
obR = 0
stop = 0
basic.show_number(0)

def on_forever():
    if mode == 0:
        if not (JoyCar.speed(SensorLRSelection.LEFT)):
            JoyCar.drive_pwm(0, 0, 0, 25)
            basic.show_string("L")
        else:
            JoyCar.drive_pwm(0, 0, 0, 0)
            basic.show_string("0")
basic.forever(on_forever)

def on_forever2():
    if mode == 0:
        if not (JoyCar.speed(SensorLRSelection.RIGHT)):
            JoyCar.drive_pwm(0, 25, 0, 0)
            basic.show_string("R")
        else:
            JoyCar.drive_pwm(0, 0, 0, 0)
            basic.show_string("0")
basic.forever(on_forever2)

def on_forever3():
    serial.write_line("" + str((JoyCar.read_adc())))
basic.forever(on_forever3)

def on_forever4():
    global obR, obL
    if obP > 0:
        if JoyCar.obstacleavoidance(SensorLRSelection.RIGHT) == True:
            obR = 1
        else:
            obR = 0
        if JoyCar.obstacleavoidance(SensorLRSelection.LEFT) == True:
            obL = 1
        else:
            obL = 0
basic.forever(on_forever4)

def on_forever5():
    global mode, distance, Sonar, obP, obL, obR, stop
    if input.button_is_pressed(Button.B):
        mode = 0
        distance = 0
        Sonar = 0
        obP = 0
        obL = 0
        obR = 0
        stop = 0
        basic.show_number(0)
        JoyCar.stop(StopIntensity.INTENSE)
basic.forever(on_forever5)

def on_forever6():
    global mode, obP
    if input.button_is_pressed(Button.A):
        mode += 1
        if mode == 1:
            basic.show_string("D")
            obP = 1
        if mode == 2:
            basic.show_number(1)
            JoyCar.drive(FRDirection.FORWARD, 60)
        if mode > 0:
            JoyCar.stop(StopIntensity.INTENSE)
basic.forever(on_forever6)

def on_forever7():
    if obR == 1:
        JoyCar.stop(StopIntensity.INTENSE)
        JoyCar.drive_pwm(0, 155, 155, 0)
    elif obL == 1:
        JoyCar.stop(StopIntensity.INTENSE)
        JoyCar.drive_pwm(155, 0, 0, 155)
    elif mode == 1 and (obL == 0 and obR == 0):
        JoyCar.indicator(ToggleSwitch.OFF, SensorLRSelection.RIGHT)
        JoyCar.indicator(ToggleSwitch.OFF, SensorLRSelection.LEFT)
        JoyCar.stop(StopIntensity.INTENSE)
    elif mode == 2 and (obL == 0 and obR == 0):
        JoyCar.indicator(ToggleSwitch.OFF, SensorLRSelection.RIGHT)
        JoyCar.indicator(ToggleSwitch.OFF, SensorLRSelection.LEFT)
        JoyCar.stop(StopIntensity.INTENSE)
basic.forever(on_forever7)
