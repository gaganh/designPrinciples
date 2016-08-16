'use strict';

/**
 * @ngdoc function
 * @name designPrinciplesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the designPrinciplesApp
 */

angular.module('designPrinciplesApp').controller('MainCtrl', ['$scope','SweetAlert', function ($scope, SweetAlert) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.principles = [
  	{
  		id: 0,
  		name: "3d Projection",
  		status: 1
  	}, {
  		id: 1,
  		name: "80/20 Rule",
  		status: 1
  	}, {
  		id: 2,
  		name: "Abbe",
  		status: 1
  	}, {
  		id: 3,
  		name: "Accessibility",
  		status: 1
  	}, {
  		id: 4,
  		name: "Aesthetic-Usability Effect",
  		status: 1
  	}, {
  		id: 5,
  		name: "Affordance",
  		status: 1
  	}, {
  		id: 6,
  		name: "Alignment",
  		status: 1
  	}, {
  		id: 7,
  		name: "Anthropomorphism",
  		status: 1
  	}, {
  		id: 8,
  		name: "Apparent Motion",
  		status: 1
  	}, {
  		id: 9,
  		name: "Archetypes",
  		status: 1
  	}, {
  		id: 10,
  		name: "Area Alignment",
  		status: 2
  	}, {
  		id: 11,
  		name: "Attractiveness Bias",
  		status: 2
  	}, {
  		id: 12,
  		name: "Baby-face Bias",
  		status: 2
  	}, {
  		id: 13,
  		name: "Back of the Dresser",
  		status: 2
  	}, {
  		id: 14,
  		name: "Biophilia Effect",
  		status: 2
  	}, {
  		id: 15,
  		name: "Black Effects",
  		status: 2
  	}, {
  		id: 16,
  		name: "Blue Effects",
  		status: 2
  	}, {
  		id: 17,
  		name: "Cathedral Effect",
  		status: 2
  	}, {
  		id: 18,
  		name: "Chunking",
  		status: 2
  	}, {
  		id: 19,
  		name: "Classical Conditioning",
  		status: 3
  	}
  ];

/* Contents:
	x	1. ROLL: Select Principle, Draw Multiplechoice Options, Set Correect Answer 
		2. Filter Multiplechoice Options By Randomly Selected Cards
		3. Apply & Resolve Success/Fail to Submission of Multiple Choice
		5. Apply Status-2 Select2 Dropdown.
		6. Reroll
*/
  // defaults
  $scope.manualAnswer = "";
  $scope.answerCorrect;
  $scope.answerChoices = [];
  $scope.answreOption;
  $scope.filteredAnswerChoices = [];
  $scope.gotInclude = "partials/principle-0.html"

  function selectQuestion() {
  	
  	function findRandom() {
  		var rando = $scope.principles[Math.floor(Math.random()*$scope.principles.length)];
  		return rando;
		};

		var answerSelected = findRandom();
		var answerOption;

		function pickAnswerOption() {
  		answerOption = findRandom().id;
			if ($scope.answerChoices.indexOf(answerOption) !== -1 || !answerOption || answerOption == $scope.answerChoices[0]) {
				pickAnswerOption();
			}
			if ($scope.answerChoices.indexOf(answerOption) == -1 && answerOption > -1) {
				$scope.answerOption = answerOption;
				return;
			}
			else
				console.log('all fail on pickAnswerOption: else')
				pickAnswerOption();
  	};

		// set correct answer and multiple choice options
		console.log("on level: " + answerSelected.status);
  	switch(answerSelected.status) {
    	case 1: // if Not Learned
  			$scope.answerCorrect = answerSelected.id;
      	$scope.answerChoices.push($scope.answerCorrect);
    		for (var i=0;i<9;i++) {
    			pickAnswerOption()
      		$scope.answerChoices.push($scope.answerOption);
    		}
  			console.log("scope answer CHOICES:" + $scope.answerChoices);
  			console.log("scope answer CORRECT:" + $scope.answerCorrect);
        break;
    	case 2: // if Learned
    		$scope.answerCorrect = answerSelected.id;
      	for (var j=0;j<9;j++) {
      		pickAnswerOption()
      		$scope.answerChoices.push($scope.answerOption);
      	}
      	$scope.answerChoices.push($scope.principles[$scope.principles.length - 1].id);
  			console.log("scope answer CHOICES:" + $scope.answerChoices);
  			console.log("scope answer CORRECT:" + $scope.answerCorrect);
        break;
    	case 3: // if Locked In
    		console.log(answerSelected.status);
    		$scope.reroll();
    	default:
    		$scope.reroll();
		};
  };

  // generate array of answerChoices
  function mapIdToAnswer() {
		$scope.filteredAnswerChoices = [];
		for (var m=0; m<$scope.answerChoices.length; m++) {
			$scope.filteredAnswerChoices.push($scope.principles[$scope.answerChoices[m]])
		}
	};

	// select principle description based on correct answer
	function getInclude(){
     $scope.gotInclude = "partials/principle-"+$scope.answerCorrect.toString()+".html";
  };

  // validate submitted answers
	$scope.validateAnswer = function(){
		if ($scope.radioVal == $scope.answerCorrect) {
			switch($scope.principles[$scope.radioVal].status) {
				case 1: // if Not Learned
					$scope.principles[$scope.radioVal].status = 2;
					break;
				case 2: // if Not Learned
					$scope.principles[$scope.radioVal].status = 3;
					break;
				default:
					SweetAlert.swal({
					  title: "Sorry!",
					  text: "Something went wrong. Let's try again",
					  type: "warning"
					});
					break;
			}
			SweetAlert.swal({
			  title: "Good Job!",
			  text: "You got it right!",
			  type: "success",
			  confirmButtonColor: "#00b200",
				confirmButtonText: "Keep going!"},
				function(){ 
			  	$scope.reroll();
			});
			return;
		}

		if ($scope.radioVal && $scope.radioVal !== $scope.answerCorrect) {
			SweetAlert.swal("Oops!", "That wasn't quite right!", "error");
			return;
		}

		if ($scope.manualAnswer.length) {
			$scope.validateNaAnswer();
		}

		else
			SweetAlert.swal("Awkward", "You forgot to select an answer.", "warning");
	};

	$scope.selectNaRadios = function() {
		angular.element('#naRadio').trigger('click');
		$scope.radioVal = null;
	};

	$scope.clearNaInput = function() {
		$scope.manualAnswer = null;
	};

	$scope.validateNaAnswer = function() {
		if ($scope.principles[$scope.answerCorrect].name == $scope.manualAnswer && $scope.principles[$scope.answerCorrect].status == 2) {
			$scope.principles[$scope.answerCorrect].status = 3;
			SweetAlert.swal({
			  title: "zzzzGood Job!",
			  text: "You got it right!",
			  type: "success",
			  confirmButtonColor: "#00b200",
				confirmButtonText: "Keep going!"},
				function(){ 
			  	$scope.reroll();
			});
		}
		else
			$scope.principles[$scope.answerCorrect].status = 1;
			SweetAlert.swal({
				title: "zzzzOops!",
				text: "That wasn't quite right!", 
				type: "error"},
				function(){ 
				  	$scope.reroll();
			});
	};

  // initialize quiz instance (all the things!)
 	$scope.reroll = function() {
  	$scope.radioVal = null;
  	$scope.manualAnswer = "";
	  $scope.answerCorrect;
	  $scope.answerChoices = [];
	  $scope.answreOption;
	  $scope.filteredAnswerChoices = [];
  	selectQuestion();
  	getInclude();
  	mapIdToAnswer();
  };









}]); // END of Controller
