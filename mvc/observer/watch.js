function Watch(exp, callback){
    this.exp = exp;
    this.callback = callback;
    pushTarget(this);
    obj[exp];
}