function match_abababx(string){
    let state = start;
    for(let c of string){
        console.log(c)
        state = state(c);
    }
    return state === end;
}

function end(c) {
    return end;
}

function start(c) {
    if(c === 'a'){
        return foundA
    }else{
        return start;
    }
   
}

function foundA(c){
	if(c === 'b'){
        return foundB
    }else{
        return start(c);
    }
}

function foundB(c){
 	if(c === 'a'){
        return foundA2
    }else{
        return start(c);
    }
}

function foundA2(c){
	if(c === 'b'){
        return foundB2
    }else{
        return start(c);
    }
}

function foundB2(c){
	if(c === 'a'){
        return foundA3
    }else{
        return start(c);
    }
}

function foundA3(c){
	if(c === 'b'){
        return foundB3
    }else{
        return start(c);
    }
}

function foundB3(c){
	if(c === 'x'){
        return end
    }else{
        return foundB2(c);
    }
}

match_abababx('ababababx')
match_abababx('ababcababx')