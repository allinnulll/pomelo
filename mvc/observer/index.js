var obj = {
    a: 12,
    b: {
        c: '1234',
        d: 'adsf'
    }
};
observer(obj);

new Watch('a', function(oldV, newV){
    console.log(oldV, newV);
});
new Watch('b', function(oldV, newV){
    console.log(oldV, newV);
});