// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
exports.myMethod = function() {
    return 123;
};

exports.myAsyncMethod = function(callback) {
    setTimeout(function() {
        callback(123);
    }, 10000);
};

exports.myOtherMethod = function(callback) {
    return 321;
};
