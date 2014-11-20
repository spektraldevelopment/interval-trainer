var
    data, sessionTime, phase, startStopWK,
    currentPhase = 'stopped';

data = {
    "warmup": 8,
    "work": 5,
    "rest": 10,
    "rounds": 4,
    "cooldown": 6
}

function init() {

    startStopWK = document.querySelector('#startStopWorkout');

    StartScreen.init();
    WorkoutScreen.init();

    Spektral.attachEventListener(startStopWK, 'click', onStartStopWK);
}

function onStartStopWK() {
    if(currentPhase === 'stopped') {
        //Start workout
        StartScreen.hide();
        WorkoutScreen.show();
        WorkoutScreen.startWorkout();
    } else {
        //Stop workout
    }
}

//UTILS
//UTILS
function formatTime (time) {
    var
        formattedTime = {},
        hours = Math.floor(time / (60 * 60)),
        minDivisor = time % (60 * 60),
        minutes = Math.floor(minDivisor / 60),
        seconds = Math.floor(minDivisor % 60),
        secondsString = seconds.toString();

    if (seconds < 10) {
        secondsString = "0" + secondsString;
    }

    formattedTime["hours"] = hours.toString();
    formattedTime["minutes"] = minutes.toString();
    formattedTime["seconds"] = secondsString;

    formattedTime["hoursNum"] = hours;
    formattedTime["minutesNum"] = minutes;
    formattedTime["secondsNum"] = seconds;

    return formattedTime;
}

function convertToSeconds (formattedTime) {
    var
        fTimeType = getType(formattedTime),
        convertedSeconds, colonCheck,
        minuteToSec, hourToSec,
        hour, minute, second, mArray;

    if (fTimeType === "number") {
        convertedSeconds = formattedTime;
    } else {
        colonCheck = matchPattern(formattedTime, ":");
        if (colonCheck.isMatch === false) {
            convertedSeconds = parseInt(formattedTime);
        } else {
            mArray = colonCheck.matchArray;
            if (colonCheck.amount === 1) {
                //M:S
                minute = parseInt(mArray[0]);
                second = parseInt(mArray[1]);

                minuteToSec = minute * 60;
                convertedSeconds = minuteToSec + second;
            } else {
                //H:M:S
                hour = parseInt(mArray[0]);
                minute = parseInt(mArray[1]);
                second = parseInt(mArray[2]);

                hourToSec = (hour * 60) * 60;
                minuteToSec = minute * 60;
                convertedSeconds = hourToSec + minuteToSec + second;
            }
        }
    }
    return convertedSeconds;
}
