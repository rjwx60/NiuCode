// Title: 
// 统计数组 arr 中值为 item 的元素出现次数

var testArr = [11,11,'a',NaN,null,undefined,undefined,,,,Infinity,Infinity,+0,-0,0],
	result = 0;


// way1: can't handle empty element in arr, can't distinguish +0 and -0
result = (function(value){
	return testArr.reduce((ac,cv) => {
		if(ac[cv]){
			ac[cv]++;
		}else{
			ac[cv] = 1;
		}
		return ac;
	},{})[value]
})(null)



// way2: same way1 but can't
result = (function(value){
	return testArr.reduce((ac,cv) => {
		return cv === value ? ac + 1 : ac;
	},0)
})(11)


// way3: can't handle null、empty element, most importantly, will solve 'NaN' 's 'a' if I test with 'a'
result = (function(value){
	return testArr.join().split(value).length - 1
})('a')



// way4: better than way3, but has big problem.. 
result = (function(value){
	return testArr.toString().match(new RegExp(value,'g'))
})(11)
result = result ? result.length : 0;



// way5: can’t handle NaN
result = (function(value){
	var result = [];
	var pos = testArr.indexOf(value);
	while (pos > -1) {
		result.push(pos);
		pos = testArr.indexOf(value, pos + 1);
	}
	return result.length
})(NaN)



console.log("origin data: ", testArr);
console.log("calculation results:    ", result);


// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 浅拷贝 原理和方法
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply
// 4. eval 会将字符串内容作为代码执行
// 5. 熟悉各项 api 的底层实现和原理非常有必要，清晰它们的痛点，以应对多变

// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]
// 3. indexOf 和 lastIndexOf 底层使用的是 ===, 故 === 的痛点也就是 indexOf 的痛点
// 4. filter 只会 return return后表达式为 true 的值，需要熟悉底层实现
// 5. Object.keys 内部有对空元素的处理
// 6. 柯里化、递归使用，待整
// 7. 很多API具有 隐藏的 匹配 的功能，如 split，不要局限于特定范围的 API，
// 8. 正则中无法使用 `` 
// 9. toString 和 join 转换数组时会忽略其中的 undefined、null 元素, 但却不会忽略 empty Element