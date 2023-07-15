exports.countVowels = function(string) {
    string = string.toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let i = 0; i < string.length; i++) {
      if (vowels.includes(string[i])) {
        count++;
      }
    }
    return count;
}

exports.countRepeatingLetters = function (string) {
    string = string.toLowerCase();
  
    const charCount = {};
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (!/[a-z]/.test(char) || char === ' ') {
        continue;
      }
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }
    const repeatingCount = Object.values(charCount).filter((count) => count > 1).length;  
    return repeatingCount;
}

exports.countAdjacentRepeatingLetters = function(string) {
    string = string.toLowerCase();
    let count = 0;
    for (let i = 0; i < string.length - 1; i++) {
      if (string[i] === string[i + 1]) {
        count++;
        while (string[i] === string[i + 1]) {
          i++;
        }
      }
    }
    return count;
}
  
  