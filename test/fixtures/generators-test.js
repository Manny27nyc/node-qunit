/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
test('generators', function* () {
    var data = yield thunk();
    deepEqual(data, {a: 1}, 'woks');
});
