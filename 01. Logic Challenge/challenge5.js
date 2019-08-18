//memanipulasi string berdasarkan huruf pertama
function stringManipulation(word){
    //asumsi tidak case-sensitive
    var vokal = ['a','i','u','e','o'];
    var isKonsonan = true;
    var i = 0;
    var output = word;
    while(i <= 4 && isKonsonan){
        if(word.charAt(0) == vokal[i])
            isKonsonan = false;
        else
            i++;  
    }
    if(isKonsonan)
        output = word.slice(1) + word.charAt(0) + "nyo";
    return output;
}
console.log(stringManipulation('ayam'));
console.log(stringManipulation('bebek'));