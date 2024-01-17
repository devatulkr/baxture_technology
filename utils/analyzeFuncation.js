const fs = require('fs');

function countWords(filename) {
  try {
    const content = fs.readFileSync(`uploads/${filename}`, 'utf-8');
    const words = content.split(/\s+/).filter(word => word.length > 0);
    return { statusValue: true, count: words.length };
  } catch (error) {
    console.error(error);
    return { statusValue: false, error: 'Error counting words' };
  }
}

function countUniqueWords(filename) {
  try {
    const content = fs.readFileSync(`uploads/${filename}`, 'utf-8');
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const uniqueWords = new Set(words);
    return { statusValue: true, count: uniqueWords.size };
  } catch (error) {
    console.error(error);
    return { statusValue: false, error: 'Error counting unique words' };
  }
}

function findTopKWords(filename, k) {
  try {
    const content = fs.readFileSync(`uploads/${filename}`, 'utf-8');
    const words = content.split(/\s+/).filter(word => word.length > 0);

    const wordFrequency = {};
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

    return { statusValue: true, topWords: sortedWords.slice(0, k) };
  } catch (error) {
    console.error(error);
    return { statusValue: false, error: 'Error finding top words' };
  }
}

module.exports = { countWords, countUniqueWords, findTopKWords };
