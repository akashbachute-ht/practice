//String Master the string todays agenda.


let email='akashb@gmail.com';

console.log(email.includes('@'));
console.log(email.includes('.com'));
console.log(email.split('@')[1]);
console.log(email.indexOf('@'));
console.log(email.startsWith('a'));
console.log(email.slice(email.indexOf('@') + 1));
console.log(email.replace('gmail','yahoo'));
console.log(email.toLowerCase().trim());
console.log(email.toUpperCase());
console.log(email.length);
//Array Master the array todays agenda.

let Fruits=['Banana','Apple','Mango','orange','Pineapple'];
console.log(Fruits);
Fruits.unshift('Grapes');
Fruits.push('Watermelon');
console.log(Fruits);
console.log(Fruits.includes('Mango'));
console.log(Fruits.indexOf('Apple'));
console.log(Fruits.slice(0,3));
console.log(Fruits.length);

//lets use advance methods and loops

Fruits.forEach((item)=>
{
    console.log(item);
});

let Numbers=[5,10,15,20,25,30];


Numbers.map((num)=>{
    return num*2;
});


let evenNumbers=Numbers.filter((num)=>
{
    return num%2==0;
});

console.log(evenNumbers);

let sum=Numbers.reduce((acc,cur)=>(acc+cur),0);

console.log(sum);

Numbers.sort((a,b)=>a-b);//After long time i used sort function
console.log(Numbers);

//Object Master the object todays agenda.

let person={
    name:'Akash',
    age:25,
    city:'Bangalore',
    hobbies:['Reading','Traveling','Gaming'],
    greet:function(){
        console.log('Hello, my name is '+this.name);
    }
}

for(let key in person)
{
    console.log(`${key}  :   ${person[key]}`);
}