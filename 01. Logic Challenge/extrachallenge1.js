//memanfaatkan rekursif untuk membuat cermin angka tanpa perulangan
function recOsci(param){
    if(param <= 0)
        return `${param}`;
    else
        return `${param} ` + recOsci(param-5) + ` ${param}`; 
}
console.log(recOsci(16));
console.log(recOsci(10));