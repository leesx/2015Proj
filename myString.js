function MyString(str){
    for(i in str){
        console.log(str[i]);
        var arr = [];
        for(var k=0; k<this.length+1;k++){
            arr.push(str[k]);
        };
        this.length = i*1+1;
        this[i] = str[i];
        this.toString = function(){
            return arr = arr.join('');
        };
        this.charAt = function(char){
            for(var m=0; m<arr.length;m++){
                console.log(arr[0])
                if(typeof char == 'number' && char == m){
                    return arr[m];
                }else if(typeof char == 'string' && char == arr[m]){
                    return  k
                }else if(typeof char == 'string' && Number(char) == m){
                    return arr[m];
                }
            }

        };

    }

}

var s = new MyString('hello');
console.log(s.length);
console.log(s[0]);
s.toString();
s.charAt('0')