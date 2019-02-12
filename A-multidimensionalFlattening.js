// Title: 
// 多维数组扁平化 - Multidimensional array flattening

var treeNodeList = [{
	"name": "一级A",
	"children": [{
		"name": "一级-1",
		"children": [{
			"name": "一级-1-1",
			"children": [{
				"name": "一级-1-1-1",
				"type": "true",
			},
			{
				"name": "一级-1-1-3",
				"type": "true",
			}]
		}]
	}]
},
{
	"name": "二级B",
	"children": [{
		"name": "二级-1",
		"children": [{
			"name": "二级-2-2",
			"children": [{
				"name": "二级-2-2-2",
				"type": "true",
			},
			{
				"name": "二级-2-2-1",
				"type": "true",
			}]
		}]
	}]
},
{
	"name": "三级C",
	"children": [{
		"name": "三级-1",
		"children": [{
			"name": "三级-3-1",
			"children": [{
				"name": "三级-3-3-1",
				"type": "true",
			},
			{
				"name": "三级-3-3-2",
				"type": "true",
			}]
		}]
	}]
}
]

// var query = 'A';

// var filterObj = function (item) {
// 	if (item.name.indexOf(query) > -1) return true;
// 	if (item.hasOwnProperty("children")) {
// 		item.children = item.children.filter(function (child) {
// 			if (child.hasOwnProperty("type")) {
// 				return child.name.indexOf(query) > -1;
// 			} else if (child.hasOwnProperty("children")) {
// 				return filterObj(child);
// 			}
// 		})
// 		if (item.children.length > 0) {
// 			return true;
// 		}
// 	} else {
// 		return child.name.indexOf(query) > -1;
// 	}
// }
// var filter = treeNodeList.filter(function (item) {
// 	return filterObj(item);
// });

// console.log(JSON.stringify(filter));



/**
 * 多维数组指定子项扁平化函数
 * @param array              要执行的扁平化数组
 * @param childrenKeys       要参与扁平的子键名数组 默认 ['']
 * @param flattenParent      默认的父数组
 * @param flattenParentKey   被压平后子项父数组存放键名
 * @returns {Array}
 */
function arrayChildrenFlatten(array, { childrenKeys, flattenParent, flattenParentKey } = {}) {
	childrenKeys = childrenKeys || [''];
	flattenParent = flattenParent || [];
	flattenParentKey = flattenParentKey || 'flattenParent';
	const result = [];
	array.forEach(item => {
		const flattenItem = JSON.parse(JSON.stringify(item));
		flattenItem[flattenParentKey] = flattenParent;
		result.push(flattenItem);
		childrenKeys.forEach(key => {
			if (item[key] && Array.isArray(item[key])) {
				const children = arrayChildrenFlatten(item[key], {
					childrenKeys,
					flattenParent: [...flattenParent, item],
					flattenParentKey,
				});
				result.push(...children);
			}
		});
	});
	return result;
}

