var
    data, countdownTimer, sessionTime, phase,
    warmMin, warmSec, workMin, workSec, restMin, restSec, rounds, coolMin, coolSec,
    incrementTimer = false, startWK,
    currentPhase = 'stopped', currentRound,
    phaseTimer = false, overallTimer = false;

data = {
    "warmup": 8,
    "work": 5,
    "rest": 10,
    "rounds": 4,
    "cooldown": 6
}

function init() {

    phase = document.querySelector('#phase');
    countdownTimer = document.querySelector('#countdownTimer');
    sessionTime = document.querySelector('#sessionTime');

    warmMin = document.querySelector('#warmup-min');
    warmSec = document.querySelector('#warmup-sec');

    workMin = document.querySelector('#workout-min');
    workSec = document.querySelector('#workout-sec');

    restMin = document.querySelector('#rest-min');
    restSec = document.querySelector('#rest-sec');

    rounds = document.querySelector('#rounds');

    coolMin = document.querySelector('#cooldown-min');
    coolSec = document.querySelector('#cooldown-sec');

    startWK = document.querySelector('#startWorkout');

    initValues();
    initEvents();
}

function initValues() {
    warmMin.value = formatTime(data.warmup).minutes;
    warmSec.value = formatTime(data.warmup).seconds;

    workMin.value = formatTime(data.work).minutes;
    workSec.value = formatTime(data.work).seconds;

    restMin.value = formatTime(data.rest).minutes;
    restSec.value = formatTime(data.rest).seconds;

    rounds.value = data.rounds;

    coolMin.value = formatTime(data.cooldown).minutes;
    coolSec.value = formatTime(data.cooldown).seconds;

    getTotalTime();
}

function initEvents() {
    var
        plusButtons = document.querySelectorAll('.plusbutton'),
        minusButtons = document.querySelectorAll('.minusbutton'),
        i, j;

    for (i = 0; i < plusButtons.length; i += 1) {
        Spektral.attachEventListener(plusButtons[i], 'mousedown', onIncrementDown);
    }

    for (j = 0; j < minusButtons.length; j += 1) {
        Spektral.attachEventListener(minusButtons[j], 'mousedown', onIncrementDown);
    }

    Spektral.attachEventListener(startWK, 'click', onStartWorkout);
}

function onIncrementDown(evt) {
    var
        target = Spektral.getTarget(evt),
        id = target.id;

    Spektral.detachEventListener(target, 'mousedown', onIncrementDown);
    Spektral.attachEventListener(target, 'mouseup', onIncrementUp);

    updateValues(id);

    incrementTimer = Spektral.createTimer(0.15, function(){
       updateValues(id);
    });
}

function onIncrementUp(evt) {
    var target = Spektral.getTarget(evt);

    Spektral.stopTimer(incrementTimer);
    incrementTimer = false;

    Spektral.attachEventListener(target, 'mousedown', onIncrementDown);
    Spektral.detachEventListener(target, 'mouseup', onIncrementUp);
}

function updateValues(id) {
    if (id === "warm-plus") {
        data.warmup ++;
    } else if (id === 'workout-plus') {
        data.work ++;
    } else if (id === 'rest-plus') {
        data.rest ++;
    } else if (id === 'rounds-plus') {
        data.rounds ++;
    } else if (id === 'cooldown-plus') {
        data.cooldown ++;
    } else if (id === 'warm-minus') {
        data.warmup --;
        if (data.warmup < 0) {
            data.warmup = 0;
        }
    } else if (id === 'workout-minus') {
        data.work --;
        if (data.work < 0) {
            data.work = 0;
        }
    } else if (id === 'rest-minus') {
        data.rest --;
        if (data.rest < 0) {
            data.rest = 0;
        }
    } else if (id === 'rounds-minus') {
        data.rounds --;
        if (data.rounds < 1) {
            data.rounds = 1;
        }
    } else if (id === 'cooldown-minus') {
        data.cooldown --;
        if (data.cooldown < 0) {
            data.cooldown = 0;
        }
    } else if (id === 'warm-minus') {
        data.warmup --;
        if (data.warmup < 0) {
            data.warmup = 0;
        }
    } else {
        console.warn('Unrecognized id: ' + id);
    }
    warmMin.value = formatTime(data.warmup).minutes;
    warmSec.value = formatTime(data.warmup).seconds;

    workMin.value = formatTime(data.work).minutes;
    workSec.value = formatTime(data.work).seconds;

    restMin.value = formatTime(data.rest).minutes;
    restSec.value = formatTime(data.rest).seconds;

    rounds.value = data.rounds;

    coolMin.value = formatTime(data.cooldown).minutes;
    coolSec.value = formatTime(data.cooldown).seconds;

    getTotalTime();
}

function onStartWorkout() {
    var warmupTime = data.warmup;
    currentPhase = 'warmup';
    setWorkoutPhase('Warm Up');
    phaseTimer = Spektral.createTimer(1, function(){
        warmupTime --;
        if (warmupTime <= 0) {
            Spektral.stopTimer(phaseTimer);
            phaseTimer = false;
            beginWorkout();
        }
    }, 1000);

    currentRound = data.rounds;

    function beginWorkout() {
        var workoutTime = data.work;
        currentPhase = 'workout';
        setWorkoutPhase('Work Out');
        phaseTimer = Spektral.createTimer(1, function(){
            workoutTime --;
            if (workoutTime <= 0) {
                Spektral.stopTimer(phaseTimer);
                phaseTimer = false;
                beginRest();
            }
        });
    }

    function beginRest() {
        var restTime = data.rest;
        currentPhase = 'rest';
        setWorkoutPhase('Rest');
        phaseTimer = Spektral.createTimer(1, function(){
           restTime --;
           if(restTime <= 0)
            if (currentRound > 0) {
                currentRound --;
                beginRest();
            } else {
                console.log('End of rounds, starting cooldown.');
                beginCooldown();
            }
        });
    }

    function beginCooldown() {
        var cooldownTime = data.cooldown;
        currentPhase = 'cooldown';
        setWorkoutPhase('Cool down');
        phaseTimer = Spektral.createTimer(1, function(){
            cooldownTime --;
            if (cooldownTime <= 0) {
                Spektral.stopTimer(phaseTimer);
                phaseTimer = false;
                currentPhase = 'complete';
                setWorkoutPhase('Complete');
            }
        });
    }
}

function setWorkoutPhase(phase, message) {
    phase.innerHTML = "Current Phase: " + phase + ' ' + message;
}

function getTotalTime() {
    var totalTime = data.warmup + ((data.work + data.rest) * data.rounds) + data.cooldown;
    ///console.log("Session time: " + formatTime(totalTime).minutes + ":" + formatTime(totalTime).seconds);
    //sessionTime.innerHTML = "Session time: " + formatTime(totalTime).minutes + ":" + formatTime(totalTime).seconds;
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

function formatTime (time) {
    var
        formattedTime = {},
        hours = Math.floor(time / (60 * 60)),
        minDivisor = time % (60 * 60)
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
