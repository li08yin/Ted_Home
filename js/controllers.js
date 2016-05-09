/**
 * Created by lyin08 on 5/8/16.
 */
var helloWorldApp = angular.module('helloWorldApp');

helloWorldApp.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.userName = "I'm Ted";

    $scope.showDetails = true;

    $scope.btnStyle = "btn pull-right";

    $scope.$watch('showDetails', function(newValue, oldValue){
        if (newValue) $scope.btnStyle = "btn pull-right btn-warning";
        else $scope.btnStyle = "btn pull-right btn-success";
    });

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.tab = 1;

    $scope.filtText = "";

    $scope.select = function(setTab) {
        $scope.tab = setTab;
        switch(setTab) {
            case 2: $scope.filtText = "appetizer"; break;
            case 3: $scope.filtText = "mains"; break;
            case 4: $scope.filtText = "dessert"; break;
            default: $scope.filtText = ""; break;
        }
    };

    $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.dishes= menuFactory.getDishes();
}]);

helloWorldApp.controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}]);

helloWorldApp.controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                agree:false, email:"" };
            $scope.feedback.mychannel="";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}]);
