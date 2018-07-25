function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function(){
    this.subs.push(Dep.target);
}
Dep.prototype.notify = function(val, newV){
    for(var i = 0; i < this.subs.length; i++){
        this.subs[i].callback(val, newV);
    }
}

Dep.target = null;
function pushTarget(watch){
    Dep.target = watch;
}