(function() {
  mocha.setup("bdd");
  var assert = chai.assert;
  describe("Trie", function() {
    describe("autocomplete", function() {
        it("addWord should be responsive ", function() { // check addWord briefly
            var testTrie = Trie();
            var testWords = ["be", "and", "of", "a", "in"];
            testWords.forEach(function(word) {
                testTrie.addWord(word);
            });
            var answerArr = [];
            assert.equal(testTrie.autocomplete('x')[0], answerArr[0]);
            testTrie.addWord('xylophone');
            assert.equal(testTrie.autocomplete('x')[0],['xylophone']);
            testTrie.addWord('xenophobe');
            assert.equal(testTrie.autocomplete('x')[0],['xenophobe']);
            assert.equal(testTrie.autocomplete('x')[1],['xylophone']);
        });

      it("should not find x ", function() { // word not there
        var testTrie = Trie();
        var testWords = ["be", "and", "of", "a", "in"];
        testWords.forEach(function(word) {
          testTrie.addWord(word);
        });
        var answerArr = [];
        assert.equal(testTrie.autocomplete('x')[0], answerArr[0]);
      });

      it("should find aaa and bb", function() { // word is there
        var testTrie = Trie();
        var testWords = ["a", "aa", "aaa", "b", "bb"];
        testWords.forEach(function(word) {
          testTrie.addWord(word);
        });
        assert.equal(testTrie.autocomplete('a').sort()[2], ['aaa']);
        assert.equal(testTrie.autocomplete('aa').sort()[1], ['aaa']);
        assert.equal(testTrie.autocomplete('b').sort()[1], ['bb']);
        assert.equal(testTrie.autocomplete('bb').sort()[0], ['bb']);
      });

      it("should find can't", function() { // word has special characters
        var testTrie = Trie();
        var testWords = ["a", "aa", "aaa", "b", "bb", "can", "can't", "cancer"];
        testWords.forEach(function(word) {
          testTrie.addWord(word);
        });
        assert.equal(testTrie.autocomplete('c').sort()[1], ["can't"]);
        assert.equal(testTrie.autocomplete('ca').sort()[2], ['cancer']);
      });

      it("should find many words with same prefix ", function() { // many words have prefix
        var testTrie = Trie();
        var testWords = ["ant", "antenna", "anteater", "annabelle", "anna", "ana", "animal", "answer"];
        testWords.forEach(function(word) {
            testTrie.addWord(word);
        });
        assert.equal(testTrie.autocomplete('a').sort()[1], ["animal"]);
        assert.equal(testTrie.autocomplete('a').sort()[6], ["anteater"]);
        assert.equal(testTrie.autocomplete('an').sort()[2], ['anna']);
        assert.equal(testTrie.autocomplete('ant').sort()[0], ['ant']);
        assert.equal(testTrie.autocomplete('ant').sort()[1], ['anteater']);
        assert.equal(testTrie.autocomplete('ant').sort()[2], ['antenna']);
      });
    });
  });

  mocha.run();
})();
