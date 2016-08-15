'use strict';

/**
 * @ngdoc function
 * @name designPrinciplesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the designPrinciplesApp
 */
angular.module('designPrinciplesApp').controller('MainCtrl', function ($scope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.principles = [
  	{
  		id: 1,
  		name: "3d Projection",
  		status: 1
  	}, {
  		id: 2,
  		name: "80/20 Rule",
  		status: 1
  	}, {
  		id: 3,
  		name: "Abbe",
  		status: 1
  	}, {
  		id: 4,
  		name: "Accessibility",
  		status: 1
  	}, {
  		id: 5,
  		name: "Aesthetic-Usability Effect",
  		status: 1
  	}, {
  		id: 6,
  		name: "Affordance",
  		status: 2
  	}, {
  		id: 7,
  		name: "Alignment",
  		status: 2
  	}, {
  		id: 8,
  		name: "Anthropomorphism",
  		status: 2
  	}, {
  		id: 9,
  		name: "Apparent Motion",
  		status: 2
  	}, {
  		id: 10,
  		name: "Archetypes",
  		status: 2
  	}, {
  		id: 11,
  		name: "Area Alignment",
  		status: 1
  	}, {
  		id: 12,
  		name: "Attractiveness Bias",
  		status: 1
  	}, {
  		id: 13,
  		name: "Baby-face Bias",
  		status: 1
  	}, {
  		id: 14,
  		name: "Back of the Dresser",
  		status: 1
  	}, {
  		id: 15,
  		name: "Biophilia Effect",
  		status: 1
  	}, {
  		id: 16,
  		name: "Black Effects",
  		status: 3
  	}, {
  		id: 17,
  		name: "Blue Effects",
  		status: 3
  	}, {
  		id: 18,
  		name: "Cathedral Effect",
  		status: 3
  	}, {
  		id: 19,
  		name: "Chunking",
  		status: 3
  	}, {
  		id: 20,
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
  $scope.answerCorrect;
  $scope.answerChoices = [];
  $scope.answreOption;
  $scope.filteredAnswerChoices = [];
  $scope.gotInclude = "partials/principle-0.html"

  function selectQuestion() {
  	
  	function findRandom() {
  		return $scope.principles[Math.floor(Math.random()*$scope.principles.length)];
		};

		var answerSelected = findRandom();
		var answerOption;

		function pickAnswerOption() {
  		answerOption = findRandom().id;
			if ($scope.answerChoices.indexOf(answerOption) !== -1 || !answerOption || answerOption == $scope.answerChoices[0]) {
				console.log('fail' + answerOption);
				pickAnswerOption();
			}
			if ($scope.answerChoices.indexOf(answerOption) == -1 && answerOption) {
				console.log('success' + answerOption);
				$scope.answerOption = answerOption;
				return;
			}
			else
				console.log('all fail on pickAnswerOption: else')
				pickAnswerOption();
  	};

		// set correct answer and multiple choice options
  	switch(answerSelected.status) {
    	case 1: // if Not Learned
    		console.log(answerSelected.status);
  			$scope.answerCorrect = answerSelected.id;
      	$scope.answerChoices.push($scope.answerCorrect);
    		for (var i=0;i<9;i++) {
    			pickAnswerOption()
      		$scope.answerChoices.push($scope.answerOption);
    		}
  			console.log("scope answer CHOICES:" + $scope.answerChoices.id);
  			console.log("scope answer CORRECT:" + $scope.answerCorrect);
  			console.log("final answerChoices:" + $scope.filteredAnswerChoices.id);
        break;
    	case 2: // if Learned
    		console.log(answerSelected.status);
    		$scope.answerCorrect = answerSelected.id;
      	for (var j=0;j<10;j++) {
      		pickAnswerOption()
      		$scope.answerChoices.push($scope.answerOption);
      	}
  			console.log("scope answer CHOICES:" + $scope.answerChoices.id);
  			console.log("scope answer CORRECT:" + $scope.answerCorrect);
  			console.log("final answerChoices:" + $scope.filteredAnswerChoices.id);
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
		for (var m=0;m<$scope.answerChoices.length;m++) {
			$scope.filteredAnswerChoices.push($scope.principles[$scope.answerChoices[m]])
		}
	};

	// select principle description based on correct answer
	function getInclude(){
     $scope.gotInclude = "partials/principle-"+$scope.answerCorrect.toString()+".html";
  };

 	$scope.reroll = function() {
  	$scope.answerCorrect = 0;	
  	$scope.answerChoices = [];
  	$scope.filteredAnswerChoices = [];
  	selectQuestion();
  	getInclude();
  	mapIdToAnswer();
  };









}); // END of Controller
