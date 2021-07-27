"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

var _PostGresService = require("../services/PostGresService");

var _csvParser = _interopRequireDefault(require("csv-parser"));

var _fs = _interopRequireDefault(require("fs"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var athletesData = 'DatabaseInitialization/data/athletesArchive/athlete_events.csv';
var ATHLETES_TABLE = 'athlete_events';

var readAthletesDataSource = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            results = [];
            _context.next = 3;
            return new Promise(function (resolve, reject) {
              _fs["default"].createReadStream(athletesData).pipe((0, _csvParser["default"])()).on('data', function (data) {
                return results.push(data);
              }).on('end', function () {
                resolve(results);
              }).on('error', function (err) {
                console.log(err);
                reject(err);
              });
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readAthletesDataSource() {
    return _ref.apply(this, arguments);
  };
}();

var populateAthletesTable = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readAthletesDataSource();

          case 2:
            data = _context2.sent;
            console.log(data[0]); //for (let i = 0; i < data.length; i++) {

            _context2.next = 6;
            return (0, _PostGresService.insertIntoTable)(ATHLETES_TABLE, data);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function populateAthletesTable() {
    return _ref2.apply(this, arguments);
  };
}();

var main = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return populateAthletesTable();

          case 3:
            process.exit();
            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            process.exit(1);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function main() {
    return _ref3.apply(this, arguments);
  };
}();

exports.main = main;