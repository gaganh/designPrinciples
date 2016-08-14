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

  $scope.answerCorrect = 0;
  $scope.answerChoices = [];

  function selectQuestion() {
  	
  	function findRandom() {
  		return $scope.principles[Math.floor(Math.random()*$scope.principles.length)];
		};

		var selected = findRandom();

		// set correct answer and multiple choice options
  	switch(selected.status) {
    	case 1: // if Not Learned
  			$scope.answerCorrect = selected.id;
      	$scope.answerChoices.push(selected.id);
  			var i;
    		for (i=0;i<9;i++) {
    			$scope.answerChoices.push(findRandom().id);
    		}
        break;
    	case 2: // if Learned
    		$scope.answerCorrect = selected;
  			var i;
      	for (i=0;i<10;i++) {
      		$scope.answerChoices.push(findRandom().id);
      	}
        break;
    	case 3: // if Locked In
    		console.log('reroll');
		}

		// select principle description based on correct answer
		$scope.getInclude = function(){
		    if($scope.answerCorrect != 0){
		        return "partials/principle-"+$scope.answerCorrect+".html"
		    }
		    else
		    	console.log ("getInclude has failed!")
		}
  };

  selectQuestion();
  console.log("scope answer CORRECT:" + $scope.answerCorrect);
  console.log("scope answer CHOICES:" + $scope.answerChoices);

 	$scope.reroll = function() {
  	$scope.answerCorrect = 0;
  	$scope.answerChoices = [];
  	selectQuestion();
  };

}); // END of Controller
