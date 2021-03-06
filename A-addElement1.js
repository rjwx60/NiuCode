// Title: 
// 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组

var testArr = [1,NaN,null,undefined,,'a',{},'',Infinity],
	resultArr = [];

// way1:
resultArr = testArr.concat(6,7,8);

// way2:
resultArr = testArr.map(cv => cv);
resultArr.push(1)

// way3:
resultArr = testArr.slice(0);
[].push.call(resultArr, 1,2,3,4);

// way4:
resultArr = [1,2,3,4,5];
Array.prototype.unshift.apply(resultArr,testArr.slice(0))

// way5:
resultArr = [1].reduce((ac,cv) => {
	return ac.concat(1,2,3,4,5,6)
},testArr)

// way6:
resultArr = [1].reduceRight((ac,cv) => {
	return testArr.concat(ac)
},[1,2,3,4,5,6,7])

// way7: will change the <1 empty item> to undefined
resultArr = [...testArr,1,8];

console.log("origin data: ", testArr);
console.log("new data:    ", resultArr);


// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 浅拷贝 原理和方法
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply

// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]