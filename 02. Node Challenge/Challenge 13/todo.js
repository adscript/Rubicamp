const fs = require('fs');
const readline = require('readline');
let command = ["list", "add", "delete", "complete", "uncomplete", "list:outstanding", "list:completed", "tag", "filter:"]
if(process.argv.length <= 2 || process.argv[2] == "help"){
    console.log(">>> JS TODO <<<");
    console.log("$ node todo.js <command>");
    console.log("$ node todo.js list");
    console.log("$ node todo.js add <task_content>");
    console.log("$ node todo.js delete <task_id>");
    console.log("$ node todo.js complete <task_id>");
    console.log("$ node todo.js uncomplete <task_id>");
    console.log("$ node todo.js list:outstanding asc|desc");
    console.log("$ node todo.js list:completed asc|desc");
    console.log("$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
    console.log("$ node todo.js filter:<tag_name>");
    process.exit(0);
}else if(process.argv[2] == command[0]){  //LIST TODO
    console.log("DAFTAR PEKERJAAN");
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let list = JSON.parse(data);
        let i = 0;
        let status;
       while(i < Object.keys(list).length){
           if(list[i].status == "complete")
                status = "[X]";
            else 
                status = "[ ]";
           console.log(`${i+1}. ${status} ` + list[i].pekerjaan);
           i++;
       } 
    });
}else if(process.argv[2] == command[6] || process.argv[2] == command[5]){ // SORT TODO
    console.log("DAFTAR PEKERJAAN");
    fs.readFile("todo.json", (err, data) => {
     if(err) 
        throw err;
     let list = JSON.parse(data);
     if(process.argv[3] == "asc"){ 
        let i = 0;
        while(i < Object.keys(list).length){
            if(list[i].status == "complete" && process.argv[2] == command[6]){
                status = "[x]";
                console.log(`${i+1}. ${status} ` + list[i].pekerjaan);
            }else if(process.argv[2] == command[5] && list[i].status == "uncomplete"){
                status = "[]";
                console.log(`${i+1}. ${status} ` + list[i].pekerjaan);
            }
           i++;
        }
    } else {
        let i = Object.keys(list).length - 1;
        while(i >= 0){
            if(list[i].status == "complete" && process.argv[2] == command[6]){
                status = "[x]";
                console.log(`${i+1}. ${status} ` + list[i].pekerjaan);
            }else if(process.argv[2] == command[5] && list[i].status == "uncomplete"){
                status = "[ ]";
                console.log(`${i+1}. ${status} ` + list[i].pekerjaan);
            }
           i--;
        }
    } 
    });
}else if(process.argv[2] == command[1] && process.argv.length > 3){ // ADD NEW TODOS   
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        let todosArr = [];
        let j = 0;
        for(let i = 3; i < process.argv.length; i++){
            todosArr[j] = process.argv[i];
            j++;
        } 
        let newTodo = new Object();
        newTodo.status = "uncomplete";
        newTodo.pekerjaan = todosArr.join(" ");
        newTodo.tags = "";
        arr[Object.keys(arr).length] = newTodo;
        let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
              if(err)
                throw err;
                console.log(`"${newTodo.pekerjaan}" + telah ditambahkan`);
            });
    });
} else if(process.argv[2] == command[2]){ // HAPUS TODO
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        let arr2 = []; 
        if(Object.keys(arr).length >= process.argv[3]){
            let indexHapus = process.argv[3];
            let i = 0;
            for(let k = 0; k < Object.keys(arr).length; k++){
                if(k+1 != indexHapus){
                    arr2[i] = arr[k];
                    i++;
                }
            }
            let dataJson = JSON.stringify(arr2);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexHapus-1].pekerjaan} telah dihapus dari daftar`);
            });
        }
    });
} else if(process.argv[2] == command[3]){ // SUDAH SELESAI
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= process.argv[3]){
            let indexChecklist = process.argv[3]-1;
            arr[indexChecklist].status = "complete";
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexChecklist].pekerjaan} telah selesai`);
            });
        }
    });
} else if(process.argv[2] == command[4]){ //BATAL SELESAI
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= process.argv[3]){
            let indexChecklist = process.argv[3]-1;
            arr[indexChecklist].status = "uncomplete";
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexChecklist].pekerjaan} status selesai dibatalkan`);
            });
        }
    });
} else if(process.argv[2] == command[7]){
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= process.argv[3]){
            let indexTag = process.argv[3]-1;
            let tagsArr = [];
            let j = 0;
            for(let i = 4; i < process.argv.length; i++){
                tagsArr[j] = process.argv[i];
                j++;
            } 
            arr[indexTag].tags = tagsArr.join(",");
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`Tag '${arr[indexTag].tags}' telah ditambahkan ke daftar '${arr[indexTag].pekerjaan}' `);
            });
        }
    });
} else {
    if(process.argv[2].includes(`${command[8]}`)){
        let searchTags = process.argv[2].replace(`${command[8]}`,"");
        console.log("DAFTAR PEKERJAAN");
            fs.readFile("todo.json", (err, data) => {
                if(err) 
                 throw err;
            let list = JSON.parse(data);
            let i = 0; let j = 1; let status;
            while(i < Object.keys(list).length){
                if(list[i].tags.includes(`${searchTags}`)){
                    if(list[i].status == "complete")
                        status = "[X]";
                    else 
                        status = "[ ]";
                    console.log(`${j}. ${status} ` + list[i].pekerjaan);
                    j++;
                }         
                i++;
              } 
             });
    }
} 