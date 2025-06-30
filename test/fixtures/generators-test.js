// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
test('generators', function* () {
    var data = yield thunk();
    deepEqual(data, {a: 1}, 'woks');
});
