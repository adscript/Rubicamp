//menebak angka yang cocok dengan menerapkan regex
function pola(str){
    var strArray = str.split(" ");
    var Ketemu = false;

    while(Ketemu == false){
        var j = 0;
        while(j <= 9 && Ketemu == false){
            var angka1 = Number(strArray[0].replace("#",`${j}`));
            var angka2 = Number(strArray[2]);
            var k = 0;
            while (k <= 9 && Ketemu == false){
                var angka3 = Number(strArray[4].replace("#",`${k}`));
                if(angka1 * angka2 == angka3){
                    Ketemu = true;
                    var faktor = [j, k];
                }
                else 
                    k++;
            }
            j++;
        }
    }


    return faktor;
}

console.log(pola("42#3 * 188 = 80#204")); //[8,5]
console.log(pola("8#61 * 895 = 78410#5")); //[7,9]
