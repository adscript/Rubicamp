const fs = require('fs');
const readline = require('readline');
if(process.argv.length > 2){
  fs.readFile(`${process.argv[2]}`, (err, data) => {
    if(err) 
        throw err;
    let question = JSON.parse(data);
    var i = 0; var count = 0;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Jawaban: "
      });
    console.log("Pertanyaan: " + `${question[i].definition}` + " ?");
    rl.prompt();
    rl.on('line', (answer) => {
        if(answer == question[i].term){
            console.log("\nAnda Beruntung\n");
            i++; count = 0;
            if(i < Object.keys(question).length){
                console.log("Pertanyaan: " + `${question[i].definition}` + " ?");
                rl.prompt();
            } else {
                console.log("Anda Berhasil!");
                process.exit(0);
            }
        } else if(answer == "skip"){
            let temp = question[i];
            for(let j = i; j < Object.keys(question).length; j++)
                question[j] = question[j+1];
            question[Object.keys(question).length - 1] = temp;
            count = 0; 
            console.log("Pertanyaan: " + `${question[i].definition}` + " ?");
            rl.prompt();
        } else {
            count++;
            console.log("Anda Kurang Beruntung! anda telah salah "+ count + " kali, silahkan coba lagi.");
            rl.prompt();
        }
        
    }) 
  });
} else{ 
    console.log("Tolong sertakan nama file sebagai inputan soalnya \n Misalnya 'node solution.js data.json'");    
}








