// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
var a = require('assert'),
    chainer = require('chainer'),
    _ = require('underscore');

var tr = require('../lib/testrunner'),
    log = require('../lib/log'),
    generators = require('../lib/generators');

var fixtures = __dirname + '/fixtures',
    chain = chainer();

tr.options.log = {
    // log assertions overview
    // assertions: true,
    // log expected and actual values for failed tests
    // errors: true,
    // log tests overview
    // tests: true,
    // log summary
    // summary: true,
    // log global summary (all files)
    // globalSummary: true,
    // log coverage
    // coverage: true,
    // log global coverage (all files)
    // globalCoverage: true,
    // log currently testing code file
    testing: true
};

// reset log stats every time .next is called
chain.next = function() {
    log.reset();
    return chainer.prototype.next.apply(this, arguments);
};

chain.add('base testrunner', function() {
    tr.run({
        code: fixtures + '/testrunner-code.js',
        tests: fixtures + '/testrunner-tests.js',
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 4,
            assertions: 7,
            failed: 2,
            passed: 5
        };
        a.equal(err, null, 'no errors');
        a.ok(res.runtime > 0, 'Date was modified');
        delete res.runtime;
        delete res.coverage;
        a.deepEqual(stat, res, 'base testrunner test');
        chain.next();
    });
});

chain.add('attach code to global', function() {
    tr.run({
        code: fixtures + '/child-code-global.js',
        tests: fixtures + '/child-tests-global.js',
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 1,
            assertions: 2,
            failed: 0,
            passed: 2
        };

        delete res.runtime;
        delete res.coverage;
        a.equal(err, null, 'no errors');
        a.deepEqual(stat, res, 'attaching code to global works');
        chain.next();
    });
});

chain.add('attach deps to global', function() {
    tr.run({
        deps: fixtures + '/child-code-global.js',
        code: fixtures + '/testrunner-code.js',
        tests: fixtures + '/child-tests-global.js',
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 1,
            assertions: 2,
            failed: 0,
            passed: 2
        };

        delete res.runtime;
        delete res.coverage;
        a.equal(err, null, 'no errors');
        a.deepEqual(stat, res, 'attaching dependencies to global works');
        chain.next();
    });
});

chain.add('attach code to a namespace', function() {
    tr.run({
        code: {
            path: fixtures + '/child-code-namespace.js',
            namespace: 'testns'
        },
        tests: fixtures + '/child-tests-namespace.js',
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 1,
            assertions: 3,
            failed: 0,
            passed: 3
        };

        delete res.runtime;
        delete res.coverage;
        a.equal(err, null, 'no errors');
        a.deepEqual(stat, res, 'attaching code to specified namespace works');
        chain.next();
    });
});

chain.add('async testing logs', function() {
    tr.run({
        code: fixtures + '/async-code.js',
        tests: fixtures + '/async-test.js',
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 4,
            assertions: 6,
            failed: 0,
            passed: 6
        };

        delete res.runtime;
        delete res.coverage;
        a.equal(err, null, 'no errors');
        a.deepEqual(stat, res, 'async code testing works');
        chain.next();
    });
});

chain.add('uncaught exception', function() {
    tr.run({
        code: fixtures + '/uncaught-exception-code.js',
        tests: fixtures + '/uncaught-exception-test.js',
    }, function(err, res) {
        a.ok(err instanceof Error, 'error was forwarded');
        chain.next();
    });
});

chain.add('infinite loop', function() {
    tr.run({
        code: fixtures + '/infinite-loop-code.js',
        tests: fixtures + '/infinite-loop-test.js',
    }, function(err, res) {
        a.ok(err instanceof Error, 'error was forwarded');
        chain.next();
    });
});

chain.add('coverage', function() {
    tr.options.coverage = true;
    tr.run({
        code: fixtures + '/coverage-code.js',
        tests: fixtures + '/coverage-test.js'
    }, function(err, res) {
        var stat = {
            files: 1,
            tests: 2,
            assertions: 3,
            failed: 0,
            passed: 3,
            coverage: {
                files: 1,
                statements: { covered: 6, total: 7 },
                branches: { covered: 0, total: 0 },
                functions: { covered: 3, total: 4 },
                lines: { covered: 6, total: 7 }
            }
        };
        delete res.runtime;
        a.equal(err, null, 'no errors');
        a.deepEqual(stat, res, 'coverage code testing works');
        tr.options.coverage = false;
        chain.next();
    });
});

if (generators.support) {
    chain.add('generators', function() {
        tr.run({
            code: fixtures + '/generators-code.js',
            tests: fixtures + '/generators-test.js'
        }, function(err, res) {
            var stat = {
                files: 1,
                tests: 1,
                assertions: 1,
                failed: 0,
                passed: 1
            };
            delete res.runtime;
            delete res.coverage;
            a.equal(err, null, 'no errors');
            a.deepEqual(stat, res, 'coverage code testing works');
            chain.next();
        });
    });
}

chain.add(function() {
    console.log('\nAll tests ok.');
});

chain.start();
