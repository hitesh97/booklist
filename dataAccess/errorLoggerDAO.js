'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DAO = require('./dao');

var ErrorLoggerDAO = (function (_DAO) {
    _inherits(ErrorLoggerDAO, _DAO);

    function ErrorLoggerDAO(userId) {
        _classCallCheck(this, ErrorLoggerDAO);

        _get(Object.getPrototypeOf(ErrorLoggerDAO.prototype), 'constructor', this).call(this);
        this.userId = userId;
    }

    _createClass(ErrorLoggerDAO, [{
        key: 'log',
        value: function log(type, err) {
            var db;
            return regeneratorRuntime.async(function log$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(ErrorLoggerDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('errorLog').insert({ type: type, error: err, stack: err.stack || '' }));

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(ErrorLoggerDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }]);

    return ErrorLoggerDAO;
})(DAO);

exports['default'] = ErrorLoggerDAO;
module.exports = exports['default'];