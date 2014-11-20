(function(window){
    "use strict";
    var
        StartScreen = {}, startScreenContainer,
        warmMin, warmSec, workMin, workSec, restMin, restSec, rounds, coolMin, coolSec,
        incrementTimer = false;

    StartScreen.init = function() {
        startScreenContainer = document.querySelector('#startScreenContainer');

        phase = startScreenContainer.querySelector('#phase');
        sessionTime = startScreenContainer.querySelector('#sessionTime');

        warmMin = startScreenContainer.querySelector('#warmup-min');
        warmSec = startScreenContainer.querySelector('#warmup-sec');

        workMin = startScreenContainer.querySelector('#workout-min');
        workSec = startScreenContainer.querySelector('#workout-sec');

        restMin = startScreenContainer.querySelector('#rest-min');
        restSec = startScreenContainer.querySelector('#rest-sec');

        rounds = startScreenContainer.querySelector('#rounds');

        coolMin = startScreenContainer.querySelector('#cooldown-min');
        coolSec = startScreenContainer.querySelector('#cooldown-sec');

        initValues();
        initEvents();

        console.log('StartScreen init');
    }

    StartScreen.show = function() {
        startScreenContainer.setAttribute('class', 'show');
    }

    StartScreen.hide = function() {
        startScreenContainer.setAttribute('class', 'hide');
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

        updateSessionTime();
    }

    function initEvents() {
        var
            plusButtons = startScreenContainer.querySelectorAll('.plusbutton'),
            minusButtons = startScreenContainer.querySelectorAll('.minusbutton'),
            i, j;

        for (i = 0; i < plusButtons.length; i += 1) {
            Spektral.attachEventListener(plusButtons[i], 'mousedown', onIncrementDown);
        }

        for (j = 0; j < minusButtons.length; j += 1) {
            Spektral.attachEventListener(minusButtons[j], 'mousedown', onIncrementDown);
        }
    }

    function onIncrementDown(evt) {
        var
            target = Spektral.getTarget(evt),
            id = Spektral.getTargetID(evt);

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

        updateSessionTime();
    }

    function updateSessionTime() {
        var totalTime = data.warmup + ((data.work + data.rest) * data.rounds) + data.cooldown;
        sessionTime.innerHTML = "Session time: " + formatTime(totalTime).minutes + ":" + formatTime(totalTime).seconds;
    }

//    //UTILS
//    function formatTime (time) {
//        var
//            formattedTime = {},
//            hours = Math.floor(time / (60 * 60)),
//            minDivisor = time % (60 * 60),
//            minutes = Math.floor(minDivisor / 60),
//            seconds = Math.floor(minDivisor % 60),
//            secondsString = seconds.toString();
//
//        if (seconds < 10) {
//            secondsString = "0" + secondsString;
//        }
//
//        formattedTime["hours"] = hours.toString();
//        formattedTime["minutes"] = minutes.toString();
//        formattedTime["seconds"] = secondsString;
//
//        formattedTime["hoursNum"] = hours;
//        formattedTime["minutesNum"] = minutes;
//        formattedTime["secondsNum"] = seconds;
//
//        return formattedTime;
//    }

    window.StartScreen = StartScreen;
}(window));