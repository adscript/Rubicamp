//membuat array yang berisi bilangan spiral dari matrix persegi
function spiral(param1){
    var matrix = [];
    var output = [];
    var k = 0;
    for(var i = 0; i < param1; i++){
        matrix[i] = [];
        for(var j = 0; j < param1; j++){
            matrix[i][j] = k;
            k++;
        }
    }
    
    var IndexKolom = param1;
    var b = IndexKolom - 1;
    var c = b - 1;
    var indexBaris = 0;
    var counter = 0;
    var startA = 0;
    var startB = startA + 1;
    var startC = param1 - 2;
    var startD = param1 - 2;
    var maxIdx = param1;
    var statA = 0;
    var statB = param1 - 1;
    var statC = param1 - 1;
    var statD = 0;
    while(maxIdx > 0){
        for(i = startA; i < maxIdx; i++){            //loop = n + [0,0]
            output[counter] = matrix[statA][i];
            counter++;
        }
        for(i = startB; i < maxIdx; i++){             //loop = n-1 + [1,4]
            output[counter] = matrix[i][statB];
            counter++;
        }
        var minIdx = param1 - maxIdx;
        for(i = startC; i >= minIdx; i--){             //loop = n-1 - [4,3]
            output[counter] = matrix[statC][i];
            counter++;
        }
        
        for(i = startD; i > minIdx; i--){
            output[counter] = matrix[i][statD];
            counter++;
        }
        startA++; statA++;  
        startB++; statB--;
        startC--; statC--;
        startD--; statD++;
        maxIdx -= 1; 
    }
    
    return output;
}
console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));