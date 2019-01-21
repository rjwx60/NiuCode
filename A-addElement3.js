// Title: 
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组

var testArr = [1,NaN,null,undefined,,'a',{},'',Infinity],
	resultArr = [];

// way1:
resultArr = [].concat(testArr);
resultArr.splice(1,0,'item')

// way2:
resultArr = testArr.map(cv => cv);
resultArr.splice(2,0,'item');

// way3:
resultArr = testArr.slice(0);
[].splice.call(resultArr, 3,0,'item');

// way4: splice can't accept array as argument
// resultArr = testArr.slice(0);
// Array.prototype.splice.apply(resultArr,[0,4,'item'])

// way5:
resultArr = testArr.slice(0,4).concat('item', testArr.slice(4));

// way6: will change the <1 empty item> to undefined
// resultArr = [1,8,...testArr];

console.log("origin data: ", testArr);
console.log("new data:    ", resultArr);

// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 浅拷贝 原理和方法
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply

// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]
// 3. splice 不接受数组作为参数，故 apply 和 splice 无法共用