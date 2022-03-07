//Async JS - callbacks and promises

// JS Callbacks

/* 
simply put: A callback is a function that is to be executed after another
function has finished its execution = hence the name callback.

More complex def: In JS, functions are objs. Because of this,
functions can take other functions as arguments(paramaters), and can return functions
by other functions.

Functions that do this are called "higher - order functions". any function,
that is passed as an argument is called a call back func.

The reason we need them is because of the JS Event Loop. In a nutshell
JS is an event driven language so this means, that instead of waiting for
a response before moving on, JS will keep executing while listening for other events.
*/

// Basic example of event loop flipping the expected order of results

let first = () => {
    console.log('first');
}

let second = () => {
    console.log('second');

}

//execute 1st and 2nd
first();
second();

// lets change 1st - lets mimic a longer process by artificially increasing the runtime of the 1st function

first = () => {
    setTimeout(() => {
        console.log('first')}, 5000) // this delays the console.log by 5 secs
}

//execute 1st and 2nd again
first();
second();
// it switches

// this is what is known as an asynchronous process

/* lets look at an example of solving an event loop with a callback */

/* function doneWithClass(callback){
    alert('Click through when you are done with class');
    callback();
} */

// so when we call done with class -> we can pass in a function to be the callback function
// that executes when the alert is clicked through

//doneWithClass(() => {console.log('Hi')});

// solving event loop execution order with callbacks introduces a new prob: callback hell
// what if I had another func that had to execute after the callback func that was doing the console.log?
// I guess I could do another callback? make that func a callback of hte callback?
// but what if there was another func that had to happen after that other one?
// u can see where im going:
//callback hell

/*
callbacks nested within functions

function 1 ( () => {
    function2 ( () => {
        function3 ( () => {
            function4 ( () => {
                function5 ( () => {
                    // maybe something actually happens here!
                })
            })
        })
    })
})
*/

/* solving callback hell: *ish*
JS has 2 systems designed to be more readable / approachable ways to work with callbacks
Method #1 - promises
method #2 - async/await
*/

// difficult thing: an asynchronous process (promise and/or async/await) must remain an asynchronous process
// so u cannot save an async process' results directly as a variable in the global scope

//Promises

// create promise
// a function will return a promise
// that promise is JS saying i'll get u results of this process when I am done with it
//promises have diff statuses - promises can be unresolves/resolved (done or not done )
// and when they finish they must either resolve or reject (successfully run ot fail)

const isFox = (name) => {
    return new Promise( (resolve, reject) => {
        if (name.includes('Fox')){
            resolve(name) // resolve is another func (its a callback)
        } else {
            reject(name) // reject is also callback
        }
    })
}

// use that promise
isFox('Fennex Fox').then(
    //happy resolve success path
    (name)=> {console.log(`This is a fox! ${name}`)}
)
.catch (
    //bad reject path
    (name) => (console.log(`This is not a fox ${name}`))
)

/* Async/Await
Async/Await is a more modern approach to using promises through keywords with the goal of introducing less confusing syntax
1 reminder: async processes are independent of the global scope therefore async processes must remain asynchronous
*/

// function that happens slowly - THIS IS NOT USING ASYNC, this is using a promise because its easier for me to do the artificial delay with a promise
// mimicking some process that takes a couple secs (like maybe an api call)
let slow_raises = (n1, n2) => {
    return new Promise ( (resolve) => { setTimeout (() => resolve (n1+n2), 2000)})
}

// non-async function with a callback to slow_raises (that 2 second long process) - our data will not be properly displayed 
// because slow_raises wont have finished when we try to use the relevant data
// in this scenario we are going to have an event loop problem -> the console and return will execute before
    //slow_raises finishes executing

let increase_salary = (base, raise) => {
    const new_salary = slow_raises(base, raise);
    console.log(`New Salary ${new_salary} - base: ${base}`)
    return new_salary
}
increase_salary(60000, 5000);

//Async await introduces a way to solve this

let async_increase_salary = async (base, raise) => {
    const new_salary = await slow_raises(base, raise);
    console.log(`New Salary ${new_salary} - base: ${base}`)
    return new_salary
}

async_increase_salary(60000, 5000);


