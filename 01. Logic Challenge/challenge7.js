//penjumlahan rekursif
function weirdMultiply(sentence){
    var numChar = sentence.toString();
    if (numChar.length == 1)
        return numChar;
    else {
        var hasilKali = 1;
        for (var i = 0; i < numChar.length; i++){
            hasilKali *= Number(numChar.charAt(i));
        }
        sentence = hasilKali;
        return weirdMultiply(sentence);
    }
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));