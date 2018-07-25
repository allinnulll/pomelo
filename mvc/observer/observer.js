// 将对象属性转化成访问器属性
function observer(obj) {
    if(Object.prototype.toString.call(obj) !== '[object Object]'){
        return;
    }
    new Observer(obj);
}


// 遍历对象
function Observer(obj) {
    this.walk(obj);
}
Observer.prototype.walk = function(obj){
    var keys = Object.keys(obj);
    for(var i = 0; i < keys.length; i++){
        defineReactive(obj, keys[i], obj[keys[i]]);
    }
}


// 数据劫持
function defineReactive(data, key, val) {
    observer(val); // 递归观察
    var dep = new Dep(); // 当前数据的所有订阅者
    Object.defineProperty(data, key, {
        configurable: true, // 可配置，即可修改
        enumerable: true, // 可枚举
        get: function() {
            dep.addSub();
            return val;
        },
        set: function(newV) {
            if(val === newV) return;
            observer(newV);
            dep.notify(val, newV);
            val = newV;
        }
    })
}