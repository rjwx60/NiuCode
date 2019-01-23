// Title: 
// 数组求和，元素均为 Number 类型

var testArr = [1, 37, 55, -7, -5, -1, 20, 1],
	result = 0;


// way1: 
result = testArr.reduceRight((ac, cv) => ac + cv)

// way2:
(function sum1(arr){
	let len = Array.from(arr).length - 1;
	if(len >= 0){
		result += arr[len];
		arr.length = len;
		sum1(arr);
	}
})(testArr)

// way3: eval caculate the stringify result
result = eval(testArr.join('+'));

// way4: like way2 
result = (function sum2(arr){
	let len = arr.length;
    if(len == 0){
        return 0;
    } else if (len == 1){
        return arr[0];
    } else {
        return arr[0] + sum2(arr.slice(1));
    }
})(testArr)



console.log("origin data: ", testArr);
console.log("calculation results:    ", result);


// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 浅拷贝 原理和方法
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply
// 4. eval 会将字符串内容作为代码执行

// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]
// 3. indexOf 和 lastIndexOf 底层使用的是 ===, 故 === 的痛点也就是 indexOf 的痛点
// 4. filter 只会 return return后表达式为 true 的值，需要熟悉底层实现
// 5. Object.keys 内部有对空元素的处理
// 6. 柯里化、递归使用，待整