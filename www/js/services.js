angular.module('starter.services', [])

  .factory('AuthorService', function ($http) {

    function readAllAuthors() {
      return $http.get('data/author.json');
    }

    var author = {};
    function getSelectedAuthor() {
      return author;
    }

    function setSelectedAuthor(data) {
      author = data;
    }

    return {
      readAllAuthors: readAllAuthors,
      getSelectedAuthor: getSelectedAuthor,
      setSelectedAuthor: setSelectedAuthor
    };
  })

  .factory('PoemService', function ($http) {

    function readAllPoems() {
      return $http.get('data/Poems.json');
    }

    var poem = {};
    function getSelectedPoem() {
      return poem;
    }

    function setSelectedPoem(data) {
      poem = data;
    }

    return {
      readAllPoems: readAllPoems,
      getSelectedPoem: getSelectedPoem,
      setSelectedPoem: setSelectedPoem
    };
  });
