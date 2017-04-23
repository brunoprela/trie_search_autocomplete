(function() {
  document.addEventListener('DOMContentLoaded', function () {

    var controller = Controller();

    // Instantiate trie.
    var trie = Trie();

    // Add words to trie.
    WORDS.forEach(function(word) {
      trie.addWord(word);
    });

    // After instantiating and populating the trie above, we need
    // to register a listener function to be called after each 
    // keypress. The body of the function below will serve this
    // purpose -- note that, as a listener, it will be called _each time_
    // a keypress occurs. The current value in the search box will be passed 
    // in via the argument 'prefix'.
    controller.registerAutocompleteListener(function(prefix) {

      controller.clearSearchResults();

      // Populate autocompletions.
      trie.autocomplete(prefix).forEach(function(word) {
        controller.appendToSearchResults(word);
      });
    });

  });
})()