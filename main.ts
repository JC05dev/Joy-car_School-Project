let obP = 0
let obL = 0
let obR = 0
let mode = 0
let Distance = 0
serial.redirectToUSB()
basic.showString("BOOT")
basic.showNumber(0)
loops.everyInterval(10, function () {
    Distance = JoyCar.sonar()
})
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
    serial.writeLine("" + Distance)
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
        JoyCar.indicator(ToggleSwitch.On, SensorLRSelection.Right)
    } else if (obL == 1) {
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.drivePwm(
        155,
        0,
        0,
        155
        )
        JoyCar.indicator(ToggleSwitch.On, SensorLRSelection.Left)
    } else if (mode == 1 && (obL == 0 && obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.stop(StopIntensity.Intense)
    } else if (mode == 2 && (obL == 0 && obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.drive(FRDirection.Forward, 80)
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
    if (mode > 0) {
        if (JoyCar.linefinder(SensorLCRSelection.Left) && (!(JoyCar.linefinder(SensorLCRSelection.Center)) && !(JoyCar.linefinder(SensorLCRSelection.Right)))) {
            JoyCar.stop(StopIntensity.Soft)
            JoyCar.drivePwm(
            155,
            0,
            0,
            155
            )
        } else if (!(JoyCar.linefinder(SensorLCRSelection.Left)) && (!(JoyCar.linefinder(SensorLCRSelection.Center)) && JoyCar.linefinder(SensorLCRSelection.Right))) {
            JoyCar.stop(StopIntensity.Soft)
            JoyCar.drivePwm(
            0,
            155,
            155,
            0
            )
        } else if (!(JoyCar.linefinder(SensorLCRSelection.Left)) && (JoyCar.linefinder(SensorLCRSelection.Center) && JoyCar.linefinder(SensorLCRSelection.Right))) {
            JoyCar.stop(StopIntensity.Soft)
            JoyCar.drivePwm(
            0,
            255,
            255,
            0
            )
        } else if (JoyCar.linefinder(SensorLCRSelection.Left) && (JoyCar.linefinder(SensorLCRSelection.Center) && !(JoyCar.linefinder(SensorLCRSelection.Right)))) {
            JoyCar.stop(StopIntensity.Soft)
            JoyCar.drivePwm(
            255,
            0,
            0,
            255
            )
        } else if (!(JoyCar.linefinder(SensorLCRSelection.Left)) && (!(JoyCar.linefinder(SensorLCRSelection.Center)) && !(JoyCar.linefinder(SensorLCRSelection.Right)))) {
            if (mode == 1) {
                JoyCar.stop(StopIntensity.Intense)
            }
            if (mode == 2) {
                JoyCar.drive(FRDirection.Forward, 80)
            }
        }
    }
})
basic.forever(function () {
    if (Distance < 10 && Distance >= 0) {
        if (mode == 1) {
            JoyCar.stop(StopIntensity.Intense)
        }
        if (mode == 2) {
            if (Distance < 10 && Distance > 0) {
                JoyCar.stop(StopIntensity.Intense)
                JoyCar.brakelight(ToggleSwitch.On)
            } else if (Distance > 15) {
                JoyCar.drive(FRDirection.Forward, 80)
                JoyCar.brakelight(ToggleSwitch.Off)
            }
        }
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
            JoyCar.drive(FRDirection.Forward, 80)
        }
        if (mode == 0) {
            JoyCar.stop(StopIntensity.Intense)
        }
    }
})
loops.everyInterval(100, function () {
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
