/**
 * Maps lowercase characters to uppercase and vice-versa and converts the case of the string
 * @param {Boolean} isToUpperCase 
 * @param {String} str 
 */
function convertCase(isToUpperCase, str) {
	const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lower = 'abcdefghijklmnopqrstuvwxyz';

	let strArray = str.split('');
	let charMap = new Map();

	for (let i = 0; i < lower.length; i++) {
		if (isToUpperCase == true) {
			charMap.set(lower.charAt(i), upper.charAt(i));
		}
		else {
			charMap.set(upper.charAt(i), lower.charAt(i));
		}
	}

	for (let i = 0; i < str.length; i++) {
		if (charMap.has(str.charAt(i))) {
			strArray[i] = charMap.get(str.charAt(i));
		}
	}

	return strArray.join('');
}

/**
 * This function takes a single string and returns a copy of the string with all alphabets converted to uppercase characters.
 * @param {String} str 
 */
function upperCase(str) {
	return convertCase(true, str);
}

/**
 * This function takes a single string and returns a copy of the string with all alphabets converted to lowercase characters.
 * @param {String} str 
 */
function lowerCase(str) {
	return convertCase(false, str);
}

/**
 * This function takes two arguments: a single string (str) and an array of strings (unconditionallyCapitalized[]).
 * This function returns a copy of str with the first letter of the first word capitalized, and all other words lower case,
 * except for words that are unconditionally capitalized, such as proper nouns and "I". The unconditionallyCapitalized array
 * contains all words that should be unconditionally capitalized.
 * @param {String} str 
 * @param {Array} unconditionallyCapitalized 
 */
function sentenceCase(str, unconditionallyCapitalized) {
	let strArray = lowerCase(str).split('');
	let toCapitalize = lowerCase(unconditionallyCapitalized.toString()).split(',')

	strArray[0] = upperCase(strArray[0]);
	let sentenceIndex = 0;
	for (let i = 0; i < str.split('. ').length - 1; i++) {
		sentenceIndex = str.indexOf('. ', sentenceIndex);
		strArray[sentenceIndex + 2] = upperCase(strArray[sentenceIndex + 2]);
	}

	let words = strArray.join('').split(' ');

	for (let i = 0; i < words.length; i++) {
		if (toCapitalize.includes(words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))) {
			words[i] = upperCase(words[i].charAt(0)) + words[i].substring(1);
		}
	}

	return words.join(' ');
}

/**
 * This function takes a single string and returns a copy of the string with the first character of each word converted to uppercase.
 * @param {String} str 
 */
function capitalizedCase(str) {
	let words = str.split(' ');

	for (let i = 0; i < words.length; i++) {
		words[i] = upperCase(words[i].charAt(0)) + words[i].substring(1);
	}

	return words.join(' ');
}

/**
 * This function takes a single string and returns a copy of the string comprised of characters that alternate between lower and uppercase.
 * @param {String} str 
 */
function alternatingCase(str) {
	let strArray = str.split('');

	for (let i = 0; i < str.length; i++) {
		if (i % 2 == 0) {
			strArray[i] = lowerCase(strArray[i]);
		}
		else {
			strArray[i] = upperCase(strArray[i]);
		}
	}
	return strArray.join('');
}

/**
 * This function takes two arguments: a single string (str) and an array of strings (lowercaseWords[]).
 * It returns a copy of str with the initial letter of each word capitalized. After the first word in the string,
 * however, articles, conjunctions, and prepositions not more than five letters long should all be lower case.
 * The lowercaseWords array contains all words that should be lowercased.
 * @param {String} str 
 * @param {Array} lowercaseWords
 */
function titleCase(str, lowercaseWords) {
	let words = str.split(' ');

	for (let i = 0; i < words.length; i++) {
		if (lowercaseWords.includes(words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))) {
			words[i] = lowerCase(words[i].charAt(0)) + words[i].substring(1);
		}
		else {
			words[i] = upperCase(words[i].charAt(0)) + words[i].substring(1);
		}
	}

	return words.join(' ');
}

/**
 * This function takes a single string and returns a copy of the string with the first letter of each word lowercased,
 * and all other letters in the word uppercased.
 * @param {String} str 
 */
function inverseCase(str) {
	let words = upperCase(str).split(' ');

	for (let i = 0; i < words.length; i++) {
		words[i] = lowerCase(words[i].charAt(0)) + words[i].substring(1);
	}

	return words.join(' ');
}



/**
 * This function takes a single string (str) argument and returns an object.
 * The object's properties will be the unique letters present in str.
 * The value of each property will be the frequency of each character present in the string.
 * @param {String} str 
 */
function getCharacterFrequency(str) {
	let charFrequency = {};

	for (let i = 0; i < str.length; i++) {
		if (charFrequency[lowerCase(str.charAt(i))] == undefined) {
			charFrequency[lowerCase(str.charAt(i))] = 1;
		}
		else {
			charFrequency[lowerCase(str.charAt(i))] = charFrequency[lowerCase(str.charAt(i))] + 1;
		}
	}
	return charFrequency;
}

/**
 * This function will take a single object. The object should be of the type returned by getCharacterFrequency.
 * This function will display each character and it's corresponding frequency.
 * Each character should be surrounded by quotation marks in your output.
 * @param {Object} charFrequency 
 */
function printCharacterFrequency(charFrequency) {
	for (let property in charFrequency) {
		console.log("'" + property + "' occurs " + charFrequency[property] + " time.");
	}
}




/**
 * Question 1 - String Manipulation
 */
function runStringFunctions() {
	let str = 'I watched the storm, so beautiful yet terrific. The face of the moon was in shadow.'

	let unconditionallyCapitalized = ['I', 'Moon', 'Shadow']
	let lowercaseWords = ['the', 'of', 'in', 'an']

	console.log('upperCase: ', upperCase(str))
	console.log('lowerCase: ', lowerCase(str))
	console.log('sentenceCase: ', sentenceCase(str, unconditionallyCapitalized))
	console.log('capitalizedCase: ', capitalizedCase(str))
	console.log('alternatingCase: ', alternatingCase(str))
	console.log('titleCase: ', titleCase(str, lowercaseWords))
	console.log('inverseCase: ', inverseCase(str))
}

/**
 * Question 2 - Objects
 */
function runCharacterFunctions() {

	let str = 'Hello, World!'

	let frequencyObj = getCharacterFrequency(str)

	printCharacterFrequency(frequencyObj)

}

runStringFunctions();

runCharacterFunctions();