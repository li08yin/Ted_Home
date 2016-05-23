/**
 * Created by lyin08 on 5/7/16.
 */

angular.module('helloWorldApp')
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        var dish= menuFactory.getDish(parseInt($stateParams.id,10));
        $scope.dish = dish;
    }])

.controller('DishCommentController', ['$scope', function($scope) {
    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.comment = {
        rating: "5",
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function () {
        //Step 2: This is how you record the date
        //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
        $scope.comment.date = new Date().toISOString();
        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.comment);
        //Step 4: reset your form to pristine
        $scope.commentForm.$setPristine();

        console.log($scope.dish);
        //Step 5: reset your JavaScript object that holds your comment
        $scope.comment = {
            author: "",
            rating: "5",
            comment: "",
            date:""
        };
    };
}]);