(function(window){
    "use strict";
    var
        WorkoutScreen = {}, workoutScreenContainer, phaseTimer = false, currentRound,
        phaseIndicator, phaseCountdown;

    //Public methods
    WorkoutScreen.init = function() {

        workoutScreenContainer = document.querySelector('#workoutScreenContainer');
        phaseIndicator = workoutScreenContainer.querySelector('#phaseIndicator'),
        phaseCountdown = workoutScreenContainer.querySelector('#phaseCountdown');

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
                phaseTimer = false;
                startRound();
            }
        }, 1000);

        currentRound = data.rounds;

        console.log('Start workout');
    }

    WorkoutScreen.stopWorkout = function() {

    }

    //Private Methods
    function startRound() {
        console.log('Start Round: ' + currentRound);
    }

    function startCooldown() {

    }

    function updatePhaseCountdown(time) {
        phaseCountdown.innerHTML = formatTime(time).minutes + ':' + formatTime(time).seconds;
    }

    function onStartWorkout() {
//        var warmupTime = data.warmup;
//        currentPhase = 'warmup';
//        setWorkoutPhase('Warm Up');
//        phaseTimer = Spektral.createTimer(1, function(){
//            warmupTime --;
//            if (warmupTime <= 0) {
//                Spektral.stopTimer(phaseTimer);
//                phaseTimer = false;
//                startRound();
//            }
//        }, 1000);
//
//        currentRound = data.rounds;
//
//        console.log('Start workout');

//        function beginWorkout() {
//            var workoutTime = data.work;
//            currentPhase = 'workout';
//            //setWorkoutPhase('Work Out');
//            phaseTimer = Spektral.createTimer(1, function(){
//                workoutTime --;
//                if (workoutTime <= 0) {
//                    Spektral.stopTimer(phaseTimer);
//                    phaseTimer = false;
//                    beginRest();
//                }
//            });
//        }
//
//        function beginRest() {
//            var restTime = data.rest;
//            currentPhase = 'rest';
//            //setWorkoutPhase('Rest');
//            phaseTimer = Spektral.createTimer(1, function(){
//                restTime --;
//                if(restTime <= 0)
//                    if (currentRound > 0) {
//                        currentRound --;
//                        beginRest();
//                    } else {
//                        console.log('End of rounds, starting cooldown.');
//                        beginCooldown();
//                    }
//            });
//        }
//
//        function beginCooldown() {
//            var cooldownTime = data.cooldown;
//            currentPhase = 'cooldown';
//            //setWorkoutPhase('Cool down');
//            phaseTimer = Spektral.createTimer(1, function(){
//                cooldownTime --;
//                if (cooldownTime <= 0) {
//                    Spektral.stopTimer(phaseTimer);
//                    phaseTimer = false;
//                    currentPhase = 'complete';
//                    setWorkoutPhase('Complete');
//                }
//            });
//        }
    }

    function setWorkoutPhase(message) {
        phaseIndicator.innerHTML = "Current Phase: " + message;
    }

    window.WorkoutScreen = WorkoutScreen;
}(window));