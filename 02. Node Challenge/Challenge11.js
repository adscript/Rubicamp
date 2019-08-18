const fs = require('fs');
const readline = require('readline');
fs.readFile('data.json', (err, data) => {
    if(err) 
        throw err;
    let question = JSON.parse(data);
    var i = 0;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Tebakan: "
      });
    console.log("Pertanyaan: " + `${question[i].definition}` + " ?");
    rl.prompt();
    rl.on('line', (answer) => {
        if(answer == question[i].term){
            console.log("Selamat Anda Benar!\n");
            i++;
            if(i < Object.keys(question).length){
                console.log("Pertanyaan: " + `${question[i].definition}` + " ?");
                rl.prompt();
            } else {
                console.log("\nHore Anda Menang!");
                process.exit(0);
            }
                
        }else{
            console.log("Wkwkwkwk, Anda kurang beruntung!");
            rl.prompt();
        }
    })
    
});







