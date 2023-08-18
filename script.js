const inputSlider = document.querySelector("[datalengthSlider]");
const lengthDisplay = document.querySelector(".data-lengthNumber") ;
const passwordDisplay = document.querySelector("[data-passwordDisplay]") ;
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]") ;
const uppercaseCheck = document.querySelector("#uppercase") ;
const lowercaseCheck = document.querySelector("#lowercase") ;
const numbersCheck = document.querySelector("#numbers") ;
const symbolCheck = document.querySelector("#symbols") ;
const indicator = document.querySelector("[data-indicator]") ;
const generateBtn = document.querySelector(".generateButton") ;
const allCheckBox = document.querySelectorAll("input[type=checkbox]");


let password="" ;
let passwordLength = 10 ;
let checkCount=0 ;
handleSlider() ;
//set strength circle color to grey

//sets password length acc to slider
function handleSlider(){
    lengthDisplay.innerText= passwordLength ;
    inputSlider.value = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color ;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min) ) + min ;
}


function generateRandomNumber(){
    return getRndInteger(0,9) ;
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

let symbols ="~!@#$%^&*()_+-=[]{};/':.,<>`\|" ;
function generateSymbol(){
    let l = symbols.length ;
    const s = getRndInteger(0,l) ;
    return symbols[s] ;
}

function calcStrength(){
    let hasUpper = false ;
    let hasLower = false ;
    let hasNum = false ;
    let hasSym = false ;
    if(uppercaseCheck.checked) hasUpper = true ;
    if(lowercaseCheck.checked) hasLower = true ;
    if(numbersCheck.checked) hasNum = true ;
    if(symbolCheck.checked) hasSym = true ;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0") ;
    }
    else if( (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#ff0") ;
    }
    else{
        setIndicator("#f00") ;
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value) ;
        copyMsg.innerText = "Text Copied" ;
    }
    catch(e){
        copyMsg.innerText = "Failed" ;
    }
    //to make copy wala span visible
    copyMsg.classList.add("active") ;

    setTimeout( () =>{
        copyMsg.classList.remove("active") ;
    },2000) ;
}

function handleCheckBoxChange(){
     checkCount=0 ;
     allCheckBox.forEach( (checkbox)=>{
        if(checkbox.checked){
            ++checkCount ;
        }
     })

     if(passwordLength<checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
     }
}

allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange) ;
})

inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value ;
    handleSlider() ;
})

copyBtn.addEventListener('click',() =>{
    if(passwordDisplay.value){
        copyContent() ;
    }
})

generateBtn.addEventListener('click',() =>{
    if(checkCount<=0) return ;

    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider() ;
    }
    //new password
    password="" ; 
    var funcArr = [] ;
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase) ;
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase) ;
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber) ;
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol) ;
    }
    for(let i=0;i<funcArr.length;i++){
        password+= funcArr[i]() ;
    }
    for(let i=0;i<passwordLength-funcArr.length;++i){
        let randIndex = getRndInteger(0,funcArr.length) ;
        password+= funcArr[randIndex]() ; 
    }
    password = shufflePassword(password) ;
    passwordDisplay.value = password ;
    calcStrength() ;
})

function shufflePassword(pass){
    return shuffled = pass.split('').sort(function(){return 0.5-Math.random()}).join('');
}

