// Title: 
// 已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
// 1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
// 2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
// 3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
// 4、调用 c 之后，返回的结果与调用 fn 的返回值一致
// 5、fn 的参数依次为函数 a, b, c 的调用参数



// way1:
// var curryIt = fn => a => b => c => fn(a,b,c);



// way2: this is a good question
var curryIt = function(fn){
	var args = [].slice.call(arguments, 1);
    return args.length < fn.length ? function(a) {
        return curryIt.apply(curryIt, [fn].concat(args, a));
    } : fn.apply(fn, args);
}


// way3: but use callee...
var curryIt = function(fn){
	var formalParLength = fn.length, argumentsArr = [];
    return function(args) {
        argumentsArr.push(args);
        return argumentsArr.length < formalParLength ? arguments.callee : fn.apply(null, argumentsArr);
    }
}

// way4: same as way3:
var curryIt = function(fn){
	var formalParLength = fn.length, argumentsArr = [];
    return function(args){
        argumentsArr.push(args);
        if(argumentsArr.length < formalParLength){
            return arguments.callee;
        }else{
            return fn.apply(null,argumentsArr);
        }
    }
}

// way5:
// ...




var fn = (a,b,c) => a*b*c;
console.log(curryIt(fn)(1)(2)(3));

// 关键：
// 1. 熟练 array api 使用和底层实现
// 2. 熟悉 各个浅拷贝 原理和方法和痛点
// 3. 数组填充不单单只有 push、unshift、splice，还可使用 call、apply
// 4. eval 会将字符串内容作为代码执行
// 5. 熟悉各项 api 的底层实现和原理非常有必要，清晰它们的痛点，以应对多变
// 6. 函数柯里化，容易绕晕啊


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
