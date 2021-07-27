"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryPool = exports.getSqlClient = void 0;

var _pg = require("pg");

var _PostGresInfo = _interopRequireDefault(require("../../PostGres.info.json"));

require("regenerator-runtime");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pool = null;

var getPool = function getPool() {
  if (pool) return pool;
  pool = new _pg.Pool({
    user: _PostGresInfo["default"].username,
    host: _PostGresInfo["default"].host,
    database: _PostGresInfo["default"].database,
    password: _PostGresInfo["default"].password,
    port: _PostGresInfo["default"].port,
    ssl: {
      ca: _fs["default"].readFileSync('server/repositories/ca-cert/ca-certificate.crt')
    }
  });
  pool.on('error', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.error("Error initializing PostGres pool: ", err);
              _context.next = 3;
              return pool.end();

            case 3:
              pool = null;

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return pool;
};

var getSqlClient = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _pool, client;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _pool = getPool();
            _context2.next = 4;
            return _pool.connect();

          case 4:
            client = _context2.sent;
            return _context2.abrupt("return", client);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error('Error occured attempting to connect to PostGres server');
            throw _context2.t0;

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getSqlClient() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getSqlClient = getSqlClient;

var queryPool = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var _pool2;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _pool2 = getPool(query);
            _context3.next = 4;
            return _pool2.query(query);

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.error('Error while initializing PostGres client');
            throw _context3.t0;

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function queryPool(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.queryPool = queryPool;