/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
test("Dependency file required as global", function() {
    equal(typeof whereFrom, "function");
    equal(whereFrom(), "I was required as global");
});
