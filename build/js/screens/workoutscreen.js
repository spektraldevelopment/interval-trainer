(function(window){
    "use strict";
    var
        WorkoutScreen = {}, workoutScreenContainer, phaseTimer = false, currentRound, totalRounds,
        phaseIndicator, phaseCountdown, roundIndicator;

    //Public methods
    WorkoutScreen.init = function() {

        workoutScreenContainer = document.querySelector('#workoutScreenContainer');
        phaseIndicator = workoutScreenContainer.querySelector('#phaseIndicator'),
        phaseCountdown = workoutScreenContainer.querySelector('#phaseCountdown');
        roundIndicator = workoutScreenContainer.querySelector('#roundIndicator');

        WorkoutScreen.hide();
    }

    WorkoutScreen.show = function() {
        workoutScreenContainer.setAttribute('class', 'show');
    }

    WorkoutScreen.hide = function(){
        workoutScreenContainer.setAttribute('class', 'hide');
    }

    WorkoutScreen.startWorkout = function() {
        var warmupTime = data.warmup;
        currentPhase = 'warmup';
        setWorkoutPhase('Warm Up');
        phaseTimer = Spektral.createTimer(1, function(){
            updatePhaseCountdown(warmupTime);
            warmupTime --;
            if (warmupTime < 0) {
                Spektral.stopTimer(phaseTimer);
                startRound();
            }
        }, 1000);

        currentRound = 1;
        roundIndicator.innerHTML =  currentRound.toString() + "/" + data.rounds;

        console.log('Start workout');
    }

    WorkoutScreen.stopWorkout = function() {

    }

    //Private Methods
    function startRound() {
        var workoutTime = data.work;

        phaseTimer = Spektral.createTimer(1, function(){
            workoutTime --;
            updatePhaseCountdown(workoutTime);
            if (workoutTime <= 0) {
                Spektral.stopTimer(phaseTimer);
                startRest();
            }
        });

        currentPhase = 'workout';
        setWorkoutPhase('Workout');
        roundIndicator.innerHTML =  currentRound.toString() + "/" + data.rounds;

        console.log('Start Round: ' + currentRound);
    }

    function startRest() {
        var restTime = data.rest;

        phaseTimer = Spektral.createTimer(1, function(){
            restTime --;
            updatePhaseCountdown(restTime);
            console.log('restTime: ' + restTime);
            if(restTime <= 0)
                Spektral.stopTimer(phaseTimer);
                console.log('restOver: phaseTimer: ' + phaseTimer );
                if (currentRound !== data.work) {
                    currentRound ++;
                    startRound();
                } else {
                    console.log('End of rounds, starting cooldown.');
                    startCooldown();
                }
        });

        currentPhase = 'rest';
        setWorkoutPhase('Rest');

        console.log('Start Rest');
    }

    function startCooldown() {
        console.log('Start Cooldown');
    }

    function updatePhaseCountdown(time) {
        phaseCountdown.innerHTML = formatTime(time).minutes + ':' + formatTime(time).seconds;
    }

    function setWorkoutPhase(message) {
        phaseIndicator.innerHTML = "Current Phase: " + message;
    }

    window.WorkoutScreen = WorkoutScreen;
}(window));