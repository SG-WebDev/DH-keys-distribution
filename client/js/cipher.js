var crypto = require("crypto");
const algorithm = 'aes-256-cbc';
var login = require('./login.js');


async function keyGenerator(username) {               //
    console.log("Generowanie kluczy");
    login.userSetup(username);
    secretLoop();
}

function encrypt(text) {        //
    let iv = crypto.randomBytes(16);
    console.log("Sekret: " + localStorage.getItem("secret"));
    console.log("Klucz prywatny: " + localStorage.getItem("privateKey"));
    let pk = localStorage.getItem("secret");
    let passwd = pk.toString().substr(0, 32);
    console.log("HASLO: " + passwd);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(passwd), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}


function decrypt(text) {            //
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let pk = localStorage.getItem("secret");
    let passwd = pk.toString().substr(0, 32);
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(passwd), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function secretLoop() {
    let n = login.onlineGeter();
    var usr = [];
    var userSecret = [];
    var secretZero;


    //Utworzenie n userow
    for (var g = 0; g < n; g++) {
        usr[g] = crypto.createECDH("curve25519");
        usr[g].generateKeys();
    }

    //Console log po kluczach
    for (var o = 0; o < n; o++) {
        console.log("Klucz prywatny: " + usr[o].getPrivateKey().toString("hex"));
        console.log("Klucz publiczny: " + usr[o].getPublicKey().toString("hex"));
    }

    //Przeliczanie sekretow dla n userow
    for (var i = 0; i < (n - 1); i++) {
        for (var p = 0; p < n; p++) {
            if (i == 0) {
                if (p == (n - 1)) {
                    userSecret[p] = (usr[p].computeSecret(usr[0].getPublicKey()));
                }
                else {
                    userSecret[p] = (usr[p].computeSecret(usr[p + 1].getPublicKey()));
                }
            }
            else {
                if (p == (n - 1)) {
                    userSecret[p] = (usr[p].computeSecret(secretZero))
                }
                else {
                    if (p == 0) {
                        secretZero = userSecret[p];
                    }
                    userSecret[p] = (usr[p].computeSecret(userSecret[p + 1]));
                }
            }
        }
    }

    userSecret.forEach(sekret => {
        console.log(sekret.toString("hex"));
    })

    localStorage.setItem('secret', userSecret[0].toString("hex"));

    console.log("\n")



}

module.exports = {
    keyGenerator: keyGenerator,
    decrypt: decrypt,
    encrypt : encrypt,
};