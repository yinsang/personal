//by weiyinpeng
function deepCopyObj(obj) {
    if (!obj && typeof obj !== 'object') {
        throw new Error('error arguments','shallowClone');
    }
    var returnObj = Object.prototype.toString.call(obj) == "[object Object]" ? {} : [];
    //此处o应该是window.JSON,无敌的window.JSON还可以用于object对比
    if (0) {
        returnObj = JSON.parse(JSON.stringify(obj))
    } else {
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                let objProto = Object.prototype.toString.call(obj)
                if (objProto === 'object object' || objProto === 'object array') {
                    //returnObj[item] = Array.isArray(obj[item]) ? [] : {}; 
                    console.log(obj[item])
                    returnObj[item] = arguments.callee(obj[item])
                } else {
                    returnObj[item] = obj[item]
                }
            }
        }
    }
    return returnObj
}
//by lijiayi
function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments','shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = Array.isArray(source[keys]) ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
                //递归      
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
var s = new String("aaa")
var sym = Symbol("sss")
var arr = [{
    c: 1
}, 5, "love", s, undefined, null, true, NaN, sym]
var arr1 = deepCopyObj(arr)
var arr2 = deepClone(arr) 
console.log(arr, arr1, arr2)


var obj = {z:{z1:4},a:"love",b:undefined,c:null,d:true,e:NaN,f:sym}
var obj1 = deepCopyObj(obj)
var obj2 = deepClone(obj)
console.log(obj,obj1,obj2)
