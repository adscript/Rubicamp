//membuat bilangan romawi
function romawi(n){
    var A = ["M", "D", "C", "L", "X", "V", "I"];
    var B = [1000, 500, 100, 50, 10, 5, 1];
    var C = [900,400,90,40,9,4];
    var D = ["CM", "CD", "XC", "XL", "IX", "IV"];
    var sisa = n;
    var hasil = "";
    var num = n.toString();
    for(var i = 0; i <= 6; i++){
        hb = Math.floor(sisa / B[i]);
        if (hb >= 1 && i % 2 == 1){
            hb2 = Math.floor(sisa / B[i+1]);
            if (hb2 == 9){
                hasil += D[i-1];
                sisa %= B[i+1];
            } else {
                for (var j = 1; j <= hb; j++){
                    hasil += A[i];
                    sisa %= B[i];
                }
            }
        }else{
            if (hb == 4 && i % 2 == 0){
                hasil += D[i-1];
                sisa %= B[i];
            }
            else {
                for (var j = 1; j <= hb; j++){
                    hasil += A[i];
                    sisa %= B[i];
                }
            }
        }
    }
    return hasil;
}
console.log("Script Testing untuk Konversi Romawi \n");
console.log("input | expected | result");
console.log("------|----------|-------");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IX       | ", romawi(9));
console.log("13    | XIII     | ", romawi(13));
console.log("1453  | MCDLIII  | ", romawi(1453));
console.log("1646  | MDCXLVI  | ", romawi(1646));

