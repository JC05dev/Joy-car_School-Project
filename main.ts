serial.redirectToUSB()
basic.showString("BOOT")
let mode = 0
let obP = 0
let obL = 0
let obR = 0
basic.showNumber(0)
basic.forever(function () {
    if (mode == 0) {
        if (!(JoyCar.speed(SensorLRSelection.Left))) {
            JoyCar.drivePwm(
            0,
            0,
            0,
            25
            )
            basic.showString("L")
        } else {
            JoyCar.drivePwm(
            0,
            0,
            0,
            0
            )
            basic.showString("0")
        }
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (!(JoyCar.speed(SensorLRSelection.Right))) {
            JoyCar.drivePwm(
            0,
            25,
            0,
            0
            )
            basic.showString("R")
        } else {
            JoyCar.drivePwm(
            0,
            0,
            0,
            0
            )
            basic.showString("0")
        }
    }
})
basic.forever(function () {
    serial.writeLine("" + (JoyCar.readAdc()))
})
basic.forever(function () {
    if (obP > 0) {
        if (JoyCar.obstacleavoidance(SensorLRSelection.Right) == true) {
            obR = 1
        } else {
            obR = 0
        }
        if (JoyCar.obstacleavoidance(SensorLRSelection.Left) == true) {
            obL = 1
        } else {
            obL = 0
        }
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        mode = 0
        obP = 0
        obL = 0
        obR = 0
        basic.showNumber(0)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        mode += 1
        if (mode == 1) {
            basic.showString("D")
            obP = 1
        }
        if (mode == 2) {
            basic.showNumber(1)
            JoyCar.drive(FRDirection.Forward, 60)
        }
        if (mode == 0) {
            JoyCar.stop(StopIntensity.Intense)
        }
    }
})
basic.forever(function () {
    if (obR == 1) {
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.drivePwm(
        0,
        155,
        155,
        0
        )
    } else if (obL == 1) {
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.drivePwm(
        155,
        0,
        0,
        155
        )
    } else if (mode == 1 && (obL == 0 && obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.stop(StopIntensity.Intense)
    } else if (mode == 2 && (obL == 0 && obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
    }
})
basic.forever(function () {
    if (mode == 2) {
        if (JoyCar.linefinder(SensorLCRSelection.Left) && (!(JoyCar.linefinder(SensorLCRSelection.Center)) && !(JoyCar.linefinder(SensorLCRSelection.Right)))) {
            JoyCar.drivePwm(
            0,
            100,
            100,
            0
            )
        } else if (!(JoyCar.linefinder(SensorLCRSelection.Left)) && (!(JoyCar.linefinder(SensorLCRSelection.Center)) && JoyCar.linefinder(SensorLCRSelection.Right))) {
            JoyCar.drivePwm(
            100,
            0,
            0,
            100
            )
        } else {
        	
        }
    }
})
