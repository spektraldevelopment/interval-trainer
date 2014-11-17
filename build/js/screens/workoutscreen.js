(function(window){
    "use strict";
    var WorkoutScreen = {};

    function onStartWorkout() {
        var warmupTime = data.warmup;
        currentPhase = 'warmup';
        //setWorkoutPhase('Warm Up');
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
            //setWorkoutPhase('Work Out');
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
            //setWorkoutPhase('Rest');
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
            //setWorkoutPhase('Cool down');
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

    window.WorkoutScreen = WorkoutScreen;
}(window));