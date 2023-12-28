console.log("Test1");



// let counter = 0;
const callMe = async()=>{
  let a = 0;
  process.on('message', function (m) {
      
    console.log('Child process received:', m);
    a = m.a;
    
  });
 

return new Promise(async (resolve, reject) => {
console.log("A",a)
      await callMe2()
      console.log("A2",a)
    resolve(a)
})
}


const callMe2 = async()=>{
  return new Promise((resolve, reject) => {
    for(let ab = 1 ; ab<= 10000000000;ab++){

    }
    console.log("aaaaa")
    resolve("true")
  })
}

// setInterval(() => {
//   process.send({ counter: counter++ });
// console.log(`Process ::: ${JSON.stringify(process)}`)
//   if(counter == 3 ) process.exit(1)
// }, 1000);


(async () => {
  await callMe().then((data)=>{
    console.log("Res",data)
    process.send({ a:data });
  })})
  ()