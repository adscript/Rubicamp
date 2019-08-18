//memanfaatkan readline di Nodejs
const readline = require('readline');

function sentenceManipulation(sentence){
    var start = [];
    var end = [];
    var i = 0;
    var j = 0;
    var k = 0;
    while(i < sentence.length){
        if(i == 0){
            start[j] = i;
            j++;
        }
        else if(sentence[i-1] == " "){
            start[j] = i;
            j++;
        }
        
        if(i == sentence.length - 1 || sentence[i+1] == " "){
            end[k] = i+1;
            k++;
        }
        i++; 
    }

    i = 0;
    var word = [];
    var newsentence = "";
    var vokal = ['a','i','u','e','o'];
    while ( i < start.length ){
        word[i] = sentence.slice(start[i],end[i]);
        var isKonsonan = true;
        var j = 0;
        var output = word[i];
        while(j <= 4 && isKonsonan){
            if(word[i].charAt(0) == vokal[j])
                isKonsonan = false;
            else
                j++;  
        }
        if(isKonsonan)
            newsentence += word[i].slice(1) + word[i].charAt(0) + "nyo ";
        else
            newsentence += word[i] + " ";
        i++;
    }

    return newsentence;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "tulis kalimatmu disini > "
});

rl.prompt();
rl.on('line', (answer) => {
    console.log("hasil konversi: " + sentenceManipulation(`${answer}`));
    rl.prompt();
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);
});