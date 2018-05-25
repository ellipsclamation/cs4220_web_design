/**
 * Hello, World! Coins
 * You are to mine a solution for our new CS4220 Hello, World! Coin.
 * Specifically, you are to find an input that begins with the string Hello, World!,
 * followed by a nonce, that hashes to an output with three leading zeroes.
 */

const crypto = require('crypto');

const message = 'Hello, World!'

let isCorrectOutput = false;
let i = 1;

while (!isCorrectOutput) {
    const hashingAlgorithm = 'sha256';
    const hash = crypto.createHash(hashingAlgorithm);

    // Update the data to be hashed
    hash.update(message + i);

    // Perform the hash
    let digest = hash.digest('hex');

    // Print the results
    console.log(`The '${hashingAlgorithm}' digest of '${message}${i}' is: ${digest}`);

    if (digest.substring(0, 3) == '000' && digest.substring(3, 4) != '0') {
        isCorrectOutput = true;
    }
    else {
        i++;
    }
}




/**
 * Message Validator
 * You are to read a remote array of objects consisting of message and signature properties,
 * and determine if the message is valid based on the associated signature. Your program should
 * output whether the message is valid or not, followed by the original message.
 */

const request = require('request');
const fs = require('fs');
const path = require('path');

request('http://albertcervantes.com/cs4220/messages.json', (error, response, body) => {

    // Print the error if one occurred
    if (error) {
        console.log('error:', error);
    }

    // Print the HTML for the hello.html doc
    let messages = JSON.parse(body);
    verifyMessage(messages);

});

/**
 * Verifies JSON messages based on the associated signature using the given private key
 * @param {JSON} messages 
 */
function verifyMessage(messages) {
    // Read the private key
    const fullPrivateKeyPath = path.resolve('keys', 'private_key.pem');
    const privateKey = fs.readFileSync(fullPrivateKeyPath, 'utf8');

    for (let i in messages) {
        // Get a new signer object
        sign = crypto.createSign('SHA256');

        // Update the signer object with the message we want to sign
        sign.update(messages[i].message);

        // Generate the signiture
        const signature = sign.sign(privateKey, 'hex');

        if (signature == messages[i].signature) {
            console.log(`true - ${messages[i].message}`);
        }
        else {
            console.log(`false - ${messages[i].message}`);
        }
    }
}