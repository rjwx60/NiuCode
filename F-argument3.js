// Title: 
// 实现函数A, A参数B，A返回C，C调用的结果等同于B
// B的参数是A的1参打后所有参数，和C的所有参数



// way1:
function A(B){
	var arg1 = Array.prototype.slice(arguments,1);
	var C = function(){
		return B.apply(Object.create(null), arg1.concat(Array.from(arguments)))
	}
	return C;
}


// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 各个浅拷贝 原理和方法和痛点
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply
// 4. eval 会将字符串内容作为代码执行
// 5. 熟悉各项 api 的底层实现和原理非常有必要，清晰它们的痛点，以应对多变



// 注意：
// 1. 浅拷贝的 JSON.parse(JSON.stringify()) 内部对 null 等有处理
// 2. ES6 的数组解构方法对空元素有处理 resultArr = [...testArr,1,8]
// 3. indexOf 和 lastIndexOf 底层使用的是 ===, 故 === 的痛点也就是 indexOf 的痛点
// 4. filter 只会 return return 后表达式为 true 的值，需要熟悉底层实现
// 5. Object.keys 内部有对空元素的处理，且会转为 string 类型
// 6. 柯里化、递归使用，待整
// 7. 很多API具有 隐藏的 匹配 的功能，如 split，不要局限于特定范围的 API，
// 8. 正则中无法使用 `` 
// 9. toString 和 join 转换数组时会忽略其中的 undefined、null 元素, 但却不会忽略 empty Element
// 10. 可以使用 obj[value] 的方式，value 允许设置很多类型的值，null、undefined、0、NaN 均可
// 11. 许多 array api 内部实现使用的是 for - in 此操作会过滤掉 empty Element
// 12. filter + filter 可去除首个 filter 产生的 undefined
// 13. map 没有处理 empty Element
// 14. new Set()用于数组去重，Array.from()用于将set结构转为数组
// 15. 使用 push、unshift 和 apply、call 的组合难以合并多个数组，最后的形式为：[[...],[...],[...]]
// 16. 延迟执行函数，大多是使用了闭包，或IIFE，或匿名函数


// 浅拷贝
// 1. concat
// 2. slice(0)
// 3. JSON.parse(JSON.stringify(arr))
// 4. [].push.apply(newArr,arr)
