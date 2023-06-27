angular.module('myApp').controller('EventController', function ($scope, $document, $window, $http, $q, $location, AuthService) {
  $scope.selectedOption = ''
  $scope.selectedRadio = ''
  $scope.showColorMenu = false;
  $scope.showTextMenu = false
  $scope.selectedColor = 'blue';
  $scope.backgroundColor = 'white'
  $scope.colors = ['#FF3B30', '#FF2D55', '#FF9500', '#FFCC00',
    '#34C759', '#5AC8FA', '#007AFF', '#5756D6', '#AF52DE', '#8E8E93',
    '#000000', "#FFFFFF"]

  $scope.selectOption = function (option) {
    $scope.selectedOption = option
  }

  $scope.clickRadio = function (radio) {
    $scope.selectedRadio = radio
  }
  $scope.navigateHome = function () {
    $location.path('/home')
  }

  function changeBackgroundColor() {
    if ($scope.backgroundColor === 'white') {
      $scope.backgroundColor = 'gray'
    }
    else {
      $scope.backgroundColor = 'white'
    }
  }


  $scope.changeColor = function (color) {
    $scope.selectedColor = color;
  };

  $scope.openColorMenu = function () {
    $scope.showColorMenu = true;
    changeBackgroundColor();
  };

  $scope.closeColorMenu = function () {
    $scope.showColorMenu = false;
    changeBackgroundColor();
  };


  var colorMenuToggleElement = angular.element(document.querySelector('.line-color')); // Selector for color menu toggle element
  var textMenuToggleElement = angular.element(document.querySelector('.line-text')); // Selector for text menu toggle element

  var closeColorMenu = function (event) {
    var targetElement = event.target;

    if (!colorMenuToggleElement[0].contains(targetElement)) {
      $scope.showColorMenu = false;
      $scope.$apply(); // Notify AngularJS to update the view
      if ($scope.backgroundColor === 'gray') {
        changeBackgroundColor();
      }
    }
  };

  var closeTextMenu = function (event) {
    var targetElement = event.target;
    var isTextOption = targetElement.classList.contains('text-option');

    if ((!textMenuToggleElement[0].contains(targetElement) && !isTextOption) || isTextOption) {
      $scope.showTextMenu = false;
      $scope.$apply(); // Notify AngularJS to update the view
      if ($scope.backgroundColor === 'gray') {
        changeBackgroundColor();
      }
    }
  };

  // Event listener to close color menu on outside click or color circle click
  $document.on('click', closeColorMenu);

  // Event listener to close text menu on outside click or text option click
  $document.on('click', closeTextMenu);

  // Cleanup the event listeners when the controller is destroyed
  $scope.$on('$destroy', function () {
    $document.off('click', closeColorMenu);
    $document.off('click', closeTextMenu);
  });

  $scope.toggleColorMenu = function () {
    $scope.showColorMenu = !$scope.showColorMenu;
    changeBackgroundColor()
  }

  $scope.toggleTextMenu = function () {
    $scope.showTextMenu = !$scope.showTextMenu;
    changeBackgroundColor();
  }

});

