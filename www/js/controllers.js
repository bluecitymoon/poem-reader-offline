angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('PoemCtrl', function ($scope, PoemService, $stateParams, $state, $rootScope) {

    $scope.poems = [];

    $scope.avaliablePoems = [];
    $scope.currentPage = 0;
    var defaultPageSize = 50;

    PoemService.readAllPoems().success(function (data) {

      $scope.poems = data;

      $scope.avaliablePoems = data.slice(0, defaultPageSize);
    });

    var pageSize = 20;
    $scope.noMoreItemsAvailable = false;
    $scope.loadNextPage = function () {

      var start = $scope.currentPage * pageSize + defaultPageSize;
      var end = start + pageSize;

      if (end > $scope.poems.length) {
        end = $scope.poems.length;

        $scope.noMoreItemsAvailable = true;
      }

      $scope.currentPage++;

      var nextPageItems = $scope.poems.slice(start, end);
      angular.forEach(nextPageItems, function (value) {
        $scope.avaliablePoems.push(value);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.showSinglePoem = function (poem) {

      $state.go('single-book');
      PoemService.setSelectedPoem(poem);

    };

  })

  .controller('PoemDetailCtrl', function ($scope, PoemService, $timeout) {

    $scope.$on('$ionicView.enter', function (e) {
      $scope.poem = PoemService.getSelectedPoem();
    });

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
