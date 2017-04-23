/**
 * Creates a Trie object.
 * @returns {Trie} - The Trie object created.
 */
var Trie = function() {

    // Sets Trie object we will return.
    var that = Object.create(Trie.prototype);

    /**
     * Creates a TrieNode object for use in a Trie.
     * @param letter - The letter value contained in the TrieNode object.
     * @returns {TrieNode} - The TrieNode object.
     */
    var TrieNode = function(letter){

        // The returned TrieNode object.
        var that = Object.create(TrieNode.prototype);

        // Instantiating Variables
        var nodeLetter = letter; // The letter value contained in the TrieNode object.
        var isNodeWord = false; // Does the TrieNode end a word in the Trie. Starts false.
        var nodeWord = undefined; // The word value held by the TrieNode. Formed from root to current TrieNode. Starts undefined.
        var nodeChildren = []; // The children TrieNodes of this TrieNode.

        /** TrieNode RETRIEVER METHODS ---------------------------------------------------------**/

        /**
         * Gets the letter value of the TrieNode.
         * @returns {string} - The nodeLetter value of the TrieNode.
         */
        that.getLetter = function(){
            return nodeLetter;
        };

        /**
         * Gets the isNodeWord value of the TrieNode.
         * @returns {boolean} - The isNodeWord value of the TrieNode.
         */
        that.getIsNodeWord = function(){
            return isNodeWord;
        };

        /**
         * Gets the nodeWord value of the TrieNode.
         * @returns {string} - The nodeWord value of the TrieNode.
         */
        that.getNodeWord = function(){
            return nodeWord;
        };

        /** HELPER METHODS ----------------------------------------------------------------------**/

        /**
         * Gets the child in nodeChildren with nodeLetter equal to value.
         * @param value - The value of nodeLetter you are looking for.
         * @returns {TrieNode} - The child with nodeLetter equal to value.
         */
        that.getChild = function(value){
            // Filter through nodeChildren array for child with nodeLetter value.
            var childArray = nodeChildren.filter(function(child){
                return child.getLetter() === value;
            });
            return childArray[0]; // Should have only one member
        };

        /**
         * Adds a word to the list from the index specified and onward. (index = 0 for entire word)
         * @param word - The word you want to add some or part of.
         * @param index - The index from which you want to start adding the word. (used for recursive purposes)
         */
        that.addWordFromIndex = function(word, index){
            word = word.toLowerCase(); // lowercases all words so that casing does not influence completion
            var wordLength = word.length;
            if (index === wordLength){ // finally reached end of word we are adding
                isNodeWord = true; nodeWord = word;
                return undefined; // end function call
            }
            if (that.getChild(word[index]) === undefined ){
                nodeChildren.push(TrieNode(word[index]));
            }
            that.getChild(word[index]).addWordFromIndex(word, ++index); // recursion
        };

        /**
         * Gets the words in the subtree of the current TrieNode as well as the word it itself contains.
         * @returns {Array<string>} - The array of words in the child nodes
         */
        that.getWordsInChildNodes = function(){
            var wordsList = [];
            if (that.getIsNodeWord() === true && that.getNodeWord() !== undefined ){
                wordsList.push(that.getNodeWord());
            }
            return nodeChildren.reduce(function(x,y) { // concatenate two lists (one empty or with word, and one with rest of childrens' words)
                return x.concat(y.getWordsInChildNodes());
            }, wordsList ).sort();
        };

        /**
         * Gets words that begin with wordPrefix starting from the index provided. (index = 0 for entire word)
         * @param wordPrefix - The word prefix the user has input.
         * @param index - The index from which you want to scan the prefix. (used for recursive purposes)
         * @returns {string} List of autocompleted words.
         */
        that.getWordsInChildNodesThat = function(wordPrefix, index){
            var noWords = [];
            var wordPrefixLength = wordPrefix.length;
            if (index === wordPrefixLength){
                return that.getWordsInChildNodes();
            }
            if (that.getChild(wordPrefix[index]) === undefined){
                return noWords;
            }
            return that.getChild(wordPrefix[index]).getWordsInChildNodesThat(wordPrefix, ++index); // recursion
        };

        // Freezes Trie object to prevent modification.
        Object.freeze(that);
        return that;
    };

    // Initializes and sets the root of the Trie object.
    var trieRoot = TrieNode();

    /** Trie METHODS -----------------------------------------------------------------------------**/

    /**
     * Adds a word into the Trie.
     * @param word - The word to add.
     */
    that.addWord = function(word){
        var START_OF_WORD_INDEX = 0;
        trieRoot.addWordFromIndex(word, START_OF_WORD_INDEX); // add word to root using function defined in TrieNode object
    };

    /**
     * Generates the list of auto-completed words from the users input. Returns lowercase and in sorted lexographical order.
     * @param prefix - The prefix the user has entered, which needs to be auto-completed.
     * @returns {Array.<string>} - The array of auto-completed words.
     */
    that.autocomplete = function(prefix){
        var NUM_WORDS_IN_LIST = 10; var PREFIX_START_INDEX = 0;
        var UnsortedWordList = trieRoot.getWordsInChildNodesThat(prefix, PREFIX_START_INDEX); // gets the autocompleted word list
        var SortedWordList = UnsortedWordList.sort().slice(0, NUM_WORDS_IN_LIST); // sorts the list and gets the first 10
        return SortedWordList;

    };

    // Freezes Trie object to prevent modification.
    Object.freeze(that);
    return that;
};