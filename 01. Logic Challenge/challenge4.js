//menghitung index bilangan prima
function indexPrime(param1){
    var i,j;
    i = 1; j = 2;
    while (i <= param1){
        var k = 2;
        var prime = true; 
        while (k < j && prime){
            if ( j % k == 0)
                prime = false;
             else 
                k++;
        }
        if(prime){
            i++;
            result = j;
        }
        j++;
    }

    return result;
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));