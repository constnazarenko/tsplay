console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)));
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6));
console.log(7);




function promiseAll(...promises) {
    return new Promise((resolve, reject) => {
      let counter = promises.length;
      promises.forEach((p, i) => {
        p.then(() => {
          counter--;
          console.log('c', counter);
          if (counter === 0) {
            console.log("end of resolve in ForEach", counter);
            resolve("resolve");
          }
          }).catch(() => reject());
        console.log("ForEach", i);
      });
      console.log("end of ForEach");
    });
  }
  
  const promise1 = new Promise((resolve, reject) => {
    resolve("resolve 1");
  });
  const promise2 = new Promise((resolve, reject) => {
    resolve("resolve 2");
  });
  
  console.log(promiseAll(promise1, promise2));

  console.log(promiseAll(promise1, promise2));