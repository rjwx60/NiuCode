// Title: 
// 返回数组 arr 中重复出现过的元素

var testArr = [1,1,NaN,NaN,null,null,undefined,undefined,,,'a',{},{},'','',Infinity,Infinity],
	resultArr = [];


// way1: indexOf class use '===' inside, can't handle NaN、{}、emptyElement and so on.
// resultArr = testArr.filter((cv,index) => {
// 	return testArr.indexOf(cv) == index && testArr.lastIndexOf(cv) != index;
// })

// result1: [ 1, null, undefined, '', Infinity ]




// way2: lost {}、emptyElement
testArr.sort().map((ac, index, arr) => {
	if(!arr['nan'] && ac !== ac){
		arr['nan'] = true;
		resultArr.push(NaN);
	}else if(!arr['undefined'] && ac === undefined){
		arr['undefined'] = true;
		resultArr.push(undefined);
	}else if(ac !== undefined && ac === arr[index-1] && ac !== arr[index+1]){
		resultArr.push(ac);
	}
})

// result2: [ '', 1, Infinity, NaN, null, undefined ]



// way3: lost emptyElement
resultArr = testArr.reduce((ac,cv) => {
	if(ac[cv]){
		ac[cv]++;
	}else{
		ac[cv] = 1;
	}
	return ac;
},{})

resultArr = Object.keys(resultArr).reduce((ac,cv) => {
	if(resultArr[cv] >= 2){
		ac = ac.concat(cv);
	}
	return ac;
},[])

// result3: [ '1', 'NaN', 'null', 'undefined', '[object Object]', '', 'Infinity' ]




// way4: lost emptyElement, Object.keys inside code do something for emptyElement
testArr.reduce((ac,cv) => {
	ac[cv] ? resultArr[cv] = 1 : ac[cv] = 1;	
	return ac;
},{})
resultArr = Object.keys(resultArr);

// result4: [ '1', 'NaN', 'null', 'undefined', '[object Object]', '', 'Infinity' ]



console.log("origin data: ", testArr);
console.log("new data:    ", resultArr);


// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 浅拷贝 原理和方法
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply

// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]
// 3. indexOf 和 lastIndexOf 底层使用的是 ===, 故 === 的痛点也就是 indexOf 的痛点
// 4. filter 只会 return return后表达式为 true 的值，需要熟悉底层实现
// 5. Object.keys 内部有对空元素的处理