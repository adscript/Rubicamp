//Penjumlahan parameter
function sum(){
    var jumlah = 0;
    var i;
    for(i = 1; i <= arguments.length; i++){
        jumlah += arguments[i-1];
    }

    return jumlah;
}

sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);

