let obZ = 0
basic.showString("BOOT")
let mode = 0
let distance = 0
let Sonar = 0
let obP = 0
let obL = 0
let obR = 0
let stop = 0
basic.showNumber(0)
JoyCar.light(ToggleSwitch.On)
basic.forever(function () {
    if (mode == 0) {
        if (JoyCar.speed(SensorLRSelection.Right)) {
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
    if (mode == 0) {
        if (JoyCar.speed(SensorLRSelection.Left)) {
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
    if (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) < 20) {
        JoyCar.stop(StopIntensity.Intense)
        basic.showString("X")
    }
})
basic.forever(function () {
    if (obP > 0) {
        if (JoyCar.obstacleavoidance(SensorLRSelection.Left) && JoyCar.obstacleavoidance(SensorLRSelection.Right)) {
            obZ = 1
        } else {
            obZ = 0
        }
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
        distance = 0
        Sonar = 0
        obP = 0
        obL = 0
        obR = 0
        stop = 0
        basic.showNumber(0)
        JoyCar.brakelight(ToggleSwitch.On)
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.stop(StopIntensity.Intense)
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
            JoyCar.light(ToggleSwitch.On)
            JoyCar.brakelight(ToggleSwitch.Off)
        }
        if (mode > 0) {
            JoyCar.stop(StopIntensity.Intense)
        }
    }
})
basic.forever(function () {
    if (obR == 1) {
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.drivePwm(
        0,
        255,
        255,
        0
        )
        JoyCar.indicator(ToggleSwitch.On, SensorLRSelection.Left)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.brakelight(ToggleSwitch.On)
    } else if (obL == 1) {
        JoyCar.stop(StopIntensity.Intense)
        JoyCar.drivePwm(
        255,
        0,
        0,
        255
        )
        JoyCar.indicator(ToggleSwitch.On, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.brakelight(ToggleSwitch.On)
    } else if (mode == 1 && (obL == 0 || obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
        JoyCar.stop(StopIntensity.Intense)
    } else if (mode == 2 && (obL == 0 || obR == 0)) {
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Right)
        JoyCar.indicator(ToggleSwitch.Off, SensorLRSelection.Left)
    }
})
