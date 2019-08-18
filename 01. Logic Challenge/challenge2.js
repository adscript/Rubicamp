//Membuat Array number dan string
function deretKaskus(n){
    var output = [];
    var kelipatan;
    var num;
    for (var i = 1; i <= n; i++){
        kelipatan = 3;
        num = i * kelipatan;
        if(num % 6 == 0 && num % 5 == 0)
            output[i-1] = "KASKUS";
        else if(num % 6 == 0)
            output[i-1] = "KUS";
        else if(num % 5 == 0)
            output[i-1] = "KAS";
        else 
            output[i-1] = num;
    }
    return output;
}

console.log(deretKaskus(10));
console.log(13/2)