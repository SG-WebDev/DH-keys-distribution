var crypto = require("crypto");
var AES256 = "aes256";


var usr1 = crypto.createECDH("curve25519");
var usr1Key = usr1.generateKeys();

var usr2 = crypto.createECDH("curve25519");
var usr2Key = usr2.generateKeys();

var usr3 = crypto.createECDH("curve25519");
var usr3Key = usr3.generateKeys();

console.log(usr3Key);

var Tempusr1Secret = usr1.computeSecret(usr2Key);   //1 z 2
var Tempusr2Secret = usr2.computeSecret(usr3Key);   //2 z 3
var Tempusr3Secret = usr3.computeSecret(usr1Key);   //3 z 1


var usr1Secret = usr1.computeSecret(Tempusr2Secret);
var usr2Secret = usr2.computeSecret(Tempusr3Secret);
var usr3Secret = usr3.computeSecret(Tempusr1Secret);

Tempusr1Secret = Tempusr1Secret.toString("hex");
Tempusr2Secret = Tempusr2Secret.toString("hex");
Tempusr3Secret = Tempusr3Secret.toString("hex");
console.log("Temp 1:" + Tempusr1Secret);
console.log("Temp 2:" + Tempusr2Secret);
console.log("Temp 3:" + Tempusr3Secret);

console.log("\n")


console.log("User1 Public Key: " + usr1.getPublicKey("hex"));
console.log("User1 Private Key: " + usr1.getPrivateKey("hex"));

console.log("\n");

console.log("User2 Public Key: " + usr2.getPublicKey("hex"));
console.log("User2 Private Key: " + usr2.getPrivateKey("hex"));

console.log("\n");

console.log("User3 Public Key: " + usr3.getPublicKey("hex"));
console.log("User3 Private Key: " + usr3.getPrivateKey("hex"));

console.log("\n");

usr1Secret = usr1Secret.toString("hex");
usr2Secret = usr2Secret.toString("hex");
usr3Secret = usr3Secret.toString("hex");

//Wyswietlenie sekretow

console.log("User1 secret: " + usr1Secret);
console.log("User2 secret: " + usr2Secret);
console.log("User3 secret: " + usr3Secret);

console.log("\n");

//Szyfrowanie wiadomosci

var usr1Cipher = crypto.createCipher(AES256, usr1Secret);
//var usr1Decipher = crypto.createDecipher(AES256, usr1Secret);

//var usr2Cipher = crypto.createCipher(AES256, usr2Secret);
var usr2Decipher = crypto.createDecipher(AES256, usr2Secret);

//var usr3Cipher = crypto.createCipher(AES256, usr3Secret);
var usr3Decipher = crypto.createDecipher(AES256, usr3Secret);

var message1 = "Wspólna wiadomoœæ od usera 1 do wszystkich";
var encr_message1 = usr1Cipher.update(message1, "utf8", "hex");
encr_message1 += usr1Cipher.final("hex");
console.log("User1 says (clear): " + message1);
console.log("User1 says (ciphered): " + encr_message1);

console.log("\n");

var decr_message1 = usr2Decipher.update(encr_message1, "hex", "utf8");
decr_message1 += usr2Decipher.final("utf8");
console.log("User2 receives (ciphered): " + encr_message1);
console.log("User2 receives (deciphered): " + decr_message1);

console.log("\n");

var decr_message2 = usr3Decipher.update(encr_message1, "hex", "utf8");
decr_message2 += usr3Decipher.final("utf8");
console.log("User3 receives (ciphered): " + encr_message1);
console.log("User3 receives (deciphered): " + decr_message2);
