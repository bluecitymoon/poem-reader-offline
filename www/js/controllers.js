angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('SearchCtrl', function ($scope, PoemService, $state) {

    $scope.keyword = {content: ''};
    $scope.search = function () {

      if ($scope.keyword.content && $scope.keyword.content.length > 1) {

        $scope.poems = [];
        PoemService.readAllPoems().success(function (data) {

          angular.forEach(data, function(value) {

            var searchText = $scope.keyword.content;
            if (value.titlePinyin.indexOf(searchText) > -1
              || value.title.indexOf(searchText) > -1
              || (value.anthorName && value.anthorName.indexOf(searchText) > -1)) {

              $scope.poems.push(value);

            }

          });

        });
      }

    };

    $scope.showSinglePoem = function (poem) {

      $state.go('single-book');

      PoemService.setSelectedPoem(poem);

    };
  })

  .controller('PoemCtrl', function ($scope, PoemService, $stateParams, $state) {

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

  .controller('PoemDetailCtrl', function ($scope, PoemService, $state, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function (e) {
      $scope.poem = PoemService.getSelectedPoem();

      $scope.sentances = $scope.poem.content.split("。").join(",").split("，").join(",").split(",");

      console.debug($scope.sentances);

      $ionicScrollDelegate.scrollTop();
    });

    $scope.goback = function () {
      $state.go('tab.book');
    };


  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
