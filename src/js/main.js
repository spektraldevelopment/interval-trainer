var
    data, sessionTime, phase, startStopWK,
    currentPhase = 'stopped', currentRound,
    phaseTimer = false;

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

    Spektral.attachEventListener(startStopWK, 'click', onStartStopWK);
}

function onStartStopWK() {
    if(currentPhase === 'stopped') {
        //Start workout
        StartScreen.hide();
    } else {
        //Stop workout
    }
}

//UTILS
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
