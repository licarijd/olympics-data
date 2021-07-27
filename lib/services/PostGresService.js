"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertIntoTable = void 0;

var _PostGresRepository = require("../repositories/PostGresRepository");

var _pgFormat = _interopRequireDefault(require("pg-format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAthletes = function getAthletes() {};

var getSport = function getSport() {};

var getCountry = function getCountry() {};

var getOlympics = function getOlympics() {};

var insertIntoTable = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(table, rows) {
    var client, i, row, ID, Name, Sex, Age, Height, Weight, Team, NOC, Games, Year, Season, City, Sport, Event, Medal, args, queryTemplate, query;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _PostGresRepository.getSqlClient)();

          case 2:
            client = _context.sent;
            _context.prev = 3;
            _context.next = 6;
            return client.query('BEGIN');

          case 6:
            i = 0;

          case 7:
            if (!(i < rows.length)) {
              _context.next = 20;
              break;
            }

            row = rows[i];
            ID = row.ID, Name = row.Name, Sex = row.Sex, Age = row.Age, Height = row.Height, Weight = row.Weight, Team = row.Team, NOC = row.NOC, Games = row.Games, Year = row.Year, Season = row.Season, City = row.City, Sport = row.Sport, Event = row.Event, Medal = row.Medal;
            args = [parseInt(ID), Name, Sex, parseInt(Age), Sex, parseInt(Height), Sex, parseInt(Weight), Team, NOC, Games, Sex, parseInt(Year), Season, City, Sport, Event, Medal];
            console.log(row);
            queryTemplate = "INSERT INTO ".concat(table, "\n    (id, athleteid, name, sex, age, height, weight, team, noc, games, year, season, city, sport, event, medal)\n    VALUES (\n      ").concat(i, ",\n      ").concat(parseInt(ID), ",\n      '").concat(Name.replace(/'/g, '\'\''), "',\n      '").concat(Sex.replace(/'/g, '\'\''), "',\n      ").concat(Age != 'NA' ? parseInt(Age) : -1, ",\n      ").concat(Height != 'NA' ? parseInt(Height) : -1, ",\n      ").concat(Weight != 'NA' ? parseInt(Weight) : -1, ",\n      '").concat(Team.replace(/'/g, '\'\''), "',\n      '").concat(NOC.replace(/'/g, '\'\''), "',\n      '").concat(Games.replace(/'/g, '\'\''), "',\n      ").concat(parseInt(Year), ",\n      '").concat(Season.replace(/'/g, '\'\''), "',\n      '").concat(City.replace(/'/g, '\'\''), "',\n      '").concat(Sport.replace(/'/g, '\'\''), "',\n      '").concat(Event.replace(/'/g, '\'\''), "',\n      '").concat(Medal != 'NA' ? Medal.replace(/'/g, '\'\'') : -1, "'\n    )");
            query = (0, _pgFormat["default"])(queryTemplate, args);
            console.log(queryTemplate);
            _context.next = 17;
            return client.query(queryTemplate);

          case 17:
            i++;
            _context.next = 7;
            break;

          case 20:
            _context.next = 22;
            return client.query('COMMIT');

          case 22:
            client.release();
            _context.next = 30;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](3);
            _context.next = 29;
            return client.query('ROLLBACK');

          case 29:
            console.error(_context.t0);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 25]]);
  }));

  return function insertIntoTable(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.insertIntoTable = insertIntoTable;