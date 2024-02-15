obP = 0
obL = 0
obR = 0
mode = 0
Distance = 0
serial.redirect_to_usb()
basic.show_string("BOOT")
basic.show_number(0)

def on_every_interval():
    global Distance
    Distance = JoyCar.sonar()
loops.every_interval(10, on_every_interval)

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
    serial.write_line("" + str(Distance))
basic.forever(on_forever3)

def on_forever4():
    if obR == 1:
        JoyCar.stop(StopIntensity.INTENSE)
        JoyCar.drive_pwm(0, 155, 155, 0)
    elif obL == 1:
        JoyCar.stop(StopIntensity.INTENSE)
        JoyCar.drive_pwm(155, 0, 0, 155)
    elif mode == 1 and (obL == 0 and (obR == 0 and (0) == (1))):
        JoyCar.stop(StopIntensity.INTENSE)
    elif mode == 2 and (obL == 0 and (obR == 0 and (0) == (1))):
        JoyCar.drive(FRDirection.FORWARD, 80)
basic.forever(on_forever4)

def on_forever5():
    global mode, obP, obL, obR
    if input.button_is_pressed(Button.B):
        mode = 0
        obP = 0
        obL = 0
        obR = 0
        basic.show_number(0)
basic.forever(on_forever5)

def on_forever6():
    if mode > 0:
        if JoyCar.linefinder(SensorLCRSelection.LEFT) and (not (JoyCar.linefinder(SensorLCRSelection.CENTER)) and not (JoyCar.linefinder(SensorLCRSelection.RIGHT))):
            JoyCar.stop(StopIntensity.SOFT)
            JoyCar.drive_pwm(155, 0, 0, 155)
        elif not (JoyCar.linefinder(SensorLCRSelection.LEFT)) and (not (JoyCar.linefinder(SensorLCRSelection.CENTER)) and JoyCar.linefinder(SensorLCRSelection.RIGHT)):
            JoyCar.stop(StopIntensity.SOFT)
            JoyCar.drive_pwm(0, 155, 155, 0)
        elif not (JoyCar.linefinder(SensorLCRSelection.LEFT)) and (JoyCar.linefinder(SensorLCRSelection.CENTER) and JoyCar.linefinder(SensorLCRSelection.RIGHT)):
            JoyCar.stop(StopIntensity.SOFT)
            JoyCar.drive_pwm(0, 255, 255, 0)
        elif JoyCar.linefinder(SensorLCRSelection.LEFT) and (JoyCar.linefinder(SensorLCRSelection.CENTER) and not (JoyCar.linefinder(SensorLCRSelection.RIGHT))):
            JoyCar.stop(StopIntensity.SOFT)
            JoyCar.drive_pwm(255, 0, 0, 255)
        elif not (JoyCar.linefinder(SensorLCRSelection.LEFT)) and (not (JoyCar.linefinder(SensorLCRSelection.CENTER)) and not (JoyCar.linefinder(SensorLCRSelection.RIGHT))):
            if mode == 1:
                JoyCar.stop(StopIntensity.INTENSE)
            if mode == 2:
                JoyCar.drive(FRDirection.FORWARD, 80)
basic.forever(on_forever6)

def on_forever7():
    global mode, obP
    if input.button_is_pressed(Button.A):
        mode += 1
        if mode == 1:
            basic.show_string("D")
            obP = 1
        if mode == 2:
            basic.show_number(1)
            JoyCar.drive(FRDirection.FORWARD, 80)
        if mode == 0:
            JoyCar.stop(StopIntensity.INTENSE)
basic.forever(on_forever7)

def on_forever8():
    if Distance < 10 and Distance >= 0:
        if mode == 1:
            JoyCar.stop(StopIntensity.INTENSE)
        if mode == 2:
            if Distance < 10 and Distance > 0:
                JoyCar.stop(StopIntensity.INTENSE)
            elif Distance > 15:
                JoyCar.drive(FRDirection.FORWARD, 80)
basic.forever(on_forever8)

def on_every_interval2():
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
loops.every_interval(100, on_every_interval2)
