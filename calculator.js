var inputArr = document.querySelectorAll('.grid-container button');

var outputShow = document.querySelector('#output');

var outputArr = []; // array for output on the window
var calcArr = []; // array to be used for arithmetics
var simpleArr = []; // array of numbers.

Array.prototype.forEach.call(inputArr,
    function (element) {
        element.addEventListener('click', function(){
            
            if(element.value === 'AC'){
                initializeFunc();

            }else if(outputArr.length > 15){
                alert('Exceeded the maximun number');
                initializeFunc();

            } else if(element.value === '='){
                simpleArr = makeSimpleArr(calcArr);
                var result = arithmeticFunc(simpleArr);
                outputShow.innerText = result;
               
            } else{
                outputArr.push(element.value);
                calcArr.push(element.value);
                checkClicks(calcArr);
                outputShow.innerHTML = outputArr.join('');

            } 
        })

    });


var initializeFunc = function() {
    outputArr = [];
    simpleArr = [];
    calcArr = [];
    outputShow.innerText = '0';

}


// made a function to prevent a user from clicking an operator several times
var checkClicks = function (arr){

    for(var j=arr.length-1; j >=0; j--){
        if(Number.isNaN(Number(arr[j])) && arr[j] !== '.'){
            if(Number.isNaN(Number(arr[j-1])) && arr[j-1] !== '.'){
                alert('You clickend an operator twice!');
                initializeFunc();
                break;
            }
        }
    }

    
}
    
// the array of inputs consists of strings, not numbers. I needed to change array of strings to array of numbers and operators.
var makeSimpleArr = function (arr){ 
    var numberArr = [];
    var acc ='';

    for(var k=0; k < arr.length; k++){
   
        if(Number.isNaN(Number(arr[k])) && arr[k] !== '.'){ // when an element is an operator
            numberArr.push(Number(acc));
            numberArr.push(arr[k]);
            acc ='';
            console.log(numberArr);

        }else {
            acc = acc.concat(arr[k]);
        }
    }
    numberArr.push(Number(acc));
    console.log(numberArr);

          
    return numberArr;
}    

// give higer value to * and / over the rest 
var operatorPriority = function(element){
    var value;
    switch(element){
        case '*' : value = 1;
        break;
        case '/' : value = 1;
        break;
        default : value = 0;
        break;
    }
    return value;
}

var arithmeticFunc = function(calcArr){

    // originally I was going to use reduce method but for operator properties in math I just used simple for loop.
   
    var operatorStack =[];
    

    // at first change the array to the postfix array
    var postfixStack = calcArr.reduce(function(acc, cur){
        if(typeof cur =='number'){
            acc.push(cur)
            return acc;
        }else {
            for(var m=operatorStack.length-1; m >= 0; m--){
                if(operatorPriority(cur) <= operatorPriority(operatorStack[m])){
                acc.push(operatorStack.pop());
                 }
            }
                operatorStack.push(cur); 

            return acc;
        }
    }, []);

    // pop out the rest of operators from the stack array and push them into postfix stack array
    for(var n=operatorStack.length-1; n>=0; n-- ){
        postfixStack.push(operatorStack[n]);
        console.log(postfixStack);
        }

    // insert numbers into tempStack and when the postfixStack meets an operator tempStack pops out numbers and do the arithmetics
    var tempStack = [];

    for(var i=0; i < postfixStack.length; i++){
        if(typeof postfixStack[i] ==='number'){
            tempStack.push(postfixStack[i]);

        }else{
            switch(postfixStack[i]){
                case '+' : tempStack.push(add(tempStack)) ;
                break;
                case '-' : tempStack.push(substract(tempStack)) ;
                break;
                case '*' : tempStack.push(multiply(tempStack)) ;
                break;
                case '/' : tempStack.push(divide(tempStack)) ;
                break;
            }
        }
    }
        operatorStack = [];
        postfixStack = [];

        return  tempStack.pop();
        
}

// functions for arithmetics
var add = function(tempStack){
    var element2 = tempStack.pop();
    var element1 = tempStack.pop();

    return element1 + element2;
}

var substract = function(tempStack){
    var element2 = tempStack.pop();
    var element1 = tempStack.pop();

    return element1 - element2;
}

var multiply = function(tempStack){
    var element2 = tempStack.pop();
    var element1 = tempStack.pop();

    return element1 * element2;
}

var divide = function(tempStack){
    var element2 = tempStack.pop();
    var element1 = tempStack.pop();

    return element1 / element2;
}




