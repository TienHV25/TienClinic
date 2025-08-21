"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _sequelize = require("sequelize");
var _index = _interopRequireDefault(require("../models/index"));
var _moment = _interopRequireDefault(require("moment"));
var _emailService = _interopRequireDefault(require("./emailService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var _require = require('buffer'),
  Buffer = _require.Buffer;
var MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
var getTopDoctorHome = function getTopDoctorHome(limit, keyword) {
  return new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var whereCondition, keywordLower, users;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            whereCondition = {
              roleID: 'R2'
            };
            if (keyword) {
              keywordLower = keyword.toLowerCase();
              whereCondition[_sequelize.Op.or] = [(0, _sequelize.where)((0, _sequelize.fn)('LOWER', (0, _sequelize.col)('firstName')), _defineProperty({}, _sequelize.Op.like, "%".concat(keywordLower, "%"))), (0, _sequelize.where)((0, _sequelize.fn)('LOWER', (0, _sequelize.col)('lastName')), _defineProperty({}, _sequelize.Op.like, "%".concat(keywordLower, "%"))), (0, _sequelize.where)((0, _sequelize.fn)('LOWER', (0, _sequelize.fn)('CONCAT', (0, _sequelize.col)('lastName'), ' ', (0, _sequelize.col)('firstName'))), _defineProperty({}, _sequelize.Op.like, "%".concat(keywordLower, "%")))];
            }
            _context.next = 5;
            return _index["default"].User.findAll({
              limit: limit || undefined,
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ['password']
              },
              where: whereCondition,
              include: [{
                model: _index["default"].Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].Allcode,
                as: 'genderData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: true,
              nest: true
            });
          case 5:
            users = _context.sent;
            if (users && users.length > 0) {
              users = users.map(function (item) {
                item.image = Buffer.from(item.image, 'base64').toString('binary');
                return item;
              });
            }
            resolve({
              errCode: 0,
              data: users
            });
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllDoctors = function getAllDoctors() {
  return new Promise(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var doctors;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].User.findAll({
              where: {
                roleID: 'R2'
              },
              attributes: {
                exclude: ['password', 'image']
              }
            });
          case 3:
            doctors = _context2.sent;
            resolve({
              errCode: 0,
              data: doctors
            });
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var saveInforDoctor = function saveInforDoctor(inputdata) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (!(!inputdata.doctorId || !inputdata.contentHTML || !inputdata.contentMarkdown || !inputdata.action || !inputdata.priceId || !inputdata.paymentId || !inputdata.provinceId || !inputdata.nameClinic || !inputdata.addressClinic || !inputdata.specialtyId || !inputdata.clinicId)) {
              _context3.next = 6;
              break;
            }
            resolve({
              errCode: 1,
              message: "Misisng input parameter"
            });
            return _context3.abrupt("return");
          case 6:
            if (!(inputdata.action === "CREATE")) {
              _context3.next = 13;
              break;
            }
            _context3.next = 9;
            return _index["default"].Markdown.create({
              contentHTML: inputdata.contentHTML,
              contentMarkdown: inputdata.contentMarkdown,
              description: inputdata.description,
              doctorId: inputdata.doctorId
            });
          case 9:
            _context3.next = 11;
            return _index["default"].Doctor_infor.create({
              doctorId: inputdata.doctorId,
              priceId: inputdata.priceId,
              paymentId: inputdata.paymentId,
              provinceId: inputdata.provinceId,
              specialtyId: inputdata.specialtyId,
              clinicId: inputdata.clinicId,
              nameClinic: inputdata.nameClinic,
              addressClinic: inputdata.addressClinic,
              note: inputdata.note
            });
          case 11:
            _context3.next = 22;
            break;
          case 13:
            if (!(inputdata.action === "EDIT")) {
              _context3.next = 20;
              break;
            }
            _context3.next = 16;
            return _index["default"].Markdown.update({
              contentHTML: inputdata.contentHTML,
              contentMarkdown: inputdata.contentMarkdown,
              description: inputdata.description
            }, {
              where: {
                doctorId: inputdata.doctorId
              }
            });
          case 16:
            _context3.next = 18;
            return _index["default"].Doctor_infor.update({
              priceId: inputdata.priceId,
              paymentId: inputdata.paymentId,
              provinceId: inputdata.provinceId,
              specialtyId: inputdata.specialtyId,
              clinicId: inputdata.clinicId,
              nameClinic: inputdata.nameClinic,
              addressClinic: inputdata.addressClinic,
              note: inputdata.note
            }, {
              where: {
                doctorId: inputdata.doctorId
              }
            });
          case 18:
            _context3.next = 22;
            break;
          case 20:
            resolve({
              errCode: 1,
              message: "Invalid action. Must be CREATE or EDIT"
            });
            return _context3.abrupt("return");
          case 22:
            resolve({
              errCode: 0,
              message: "Save infor data successfully"
            });
          case 23:
            _context3.next = 29;
            break;
          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](0);
            console.error('Error in saveInforDoctor:', _context3.t0);
            reject(_context3.t0);
          case 29:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 25]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getDetailDoctorById = function getDetailDoctorById(id) {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            if (id) {
              _context4.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Mising id"
            });
            _context4.next = 11;
            break;
          case 5:
            _context4.next = 7;
            return _index["default"].User.findOne({
              attributes: {
                exclude: ['password']
              },
              where: {
                id: id
              },
              include: [{
                model: _index["default"].Markdown,
                attributes: ['description', 'contentMarkdown', 'contentHTML']
              }, {
                model: _index["default"].Doctor_infor,
                attributes: ['priceId', 'paymentId', 'provinceId', 'specialtyId', 'clinicId', 'nameClinic', 'addressClinic', 'note']
              }, {
                model: _index["default"].Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context4.sent;
            if (data && data.image) {
              data.image = Buffer.from(data.image, 'base64').toString('binary');
            }
            if (!data) data = [];
            resolve({
              errCode: 0,
              data: data
            });
          case 11:
            _context4.next = 16;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 13]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var bulkCreateSchedule = function bulkCreateSchedule(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var schedule, existingSchedules, conflictingTimeType;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            if (data.arrSchedule) {
              _context5.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Mising required parameters"
            });
            _context5.next = 16;
            break;
          case 5:
            schedule = data.arrSchedule;
            if (!(schedule && schedule.length > 0)) {
              _context5.next = 15;
              break;
            }
            _context5.next = 9;
            return _index["default"].Schedule.findAll({
              where: _defineProperty({}, _sequelize.Op.or, schedule.map(function (item) {
                return {
                  doctorID: item.doctorID,
                  date: item.date,
                  timeType: item.timeType
                };
              }))
            });
          case 9:
            existingSchedules = _context5.sent;
            if (existingSchedules && existingSchedules.length > 0) {
              conflictingTimeType = existingSchedules[0].timeType;
              resolve({
                errCode: 2,
                message: "This doctor already has a schedule for this time slot",
                conflictingTimeType: conflictingTimeType
              });
            }
            if (!(existingSchedules.length === 0)) {
              _context5.next = 15;
              break;
            }
            schedule = schedule.map(function (item) {
              item.maxNumber = MAX_NUMBER_SCHEDULE;
              item.date = new Date(item.date);
              return item;
            });
            _context5.next = 15;
            return _index["default"].Schedule.bulkCreate(schedule);
          case 15:
            resolve({
              errCode: 0,
              essage: "Create schedule successfully"
            });
          case 16:
            _context5.next = 21;
            break;
          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 21:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 18]]);
    }));
    return function (_x9, _x0) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var getScheduleByDate = function getScheduleByDate(doctorID, date) {
  return new Promise(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            if (!(!doctorID || !date)) {
              _context6.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing requried parameter"
            });
            _context6.next = 10;
            break;
          case 5:
            _context6.next = 7;
            return _index["default"].Schedule.findAll({
              where: {
                doctorID: doctorID,
                date: date
              },
              include: [{
                model: _index["default"].Allcode,
                as: 'timeTypeData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context6.sent;
            if (!data) data = [];
            resolve({
              errCode: 0,
              message: 'Get schedule successfully',
              data: data
            });
          case 10:
            _context6.next = 15;
            break;
          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 15:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 12]]);
    }));
    return function (_x1, _x10) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getExtraInforDoctorById = function getExtraInforDoctorById(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (doctorId) {
              _context7.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Mising required parameters"
            });
            _context7.next = 9;
            break;
          case 5:
            _context7.next = 7;
            return _index["default"].Doctor_infor.findOne({
              where: {
                doctorId: doctorId
              },
              include: [{
                model: _index["default"].Allcode,
                as: 'priceIdData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].Allcode,
                as: 'provinceIdData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].Allcode,
                as: 'paymentIdData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context7.sent;
            resolve({
              errCode: 0,
              message: 'Get doctor infor successfully',
              data: data
            });
          case 9:
            _context7.next = 14;
            break;
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 14:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 11]]);
    }));
    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getProfileDoctorById = function getProfileDoctorById(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (doctorId) {
              _context8.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Mising required parameters"
            });
            _context8.next = 12;
            break;
          case 5:
            _context8.next = 7;
            return _index["default"].User.findOne({
              attributes: {
                exclude: ['password']
              },
              where: {
                id: doctorId
              },
              include: [{
                model: _index["default"].Markdown,
                attributes: ['description']
              }, {
                model: _index["default"].Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].Doctor_infor,
                attributes: {
                  exclude: ['id', 'doctorId']
                },
                include: [{
                  model: _index["default"].Allcode,
                  as: 'priceIdData',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].Allcode,
                  as: 'provinceIdData',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].Allcode,
                  as: 'paymentIdData',
                  attributes: ['valueEn', 'valueVi']
                }]
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context8.sent;
            if (data && data.image) {
              data.image = Buffer.from(data.image, 'base64').toString('binary');
            }
            ;
            if (!data) data = [];
            resolve({
              errCode: 0,
              message: 'Get doctor infor successfully',
              data: data
            });
          case 12:
            _context8.next = 17;
            break;
          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 14]]);
    }));
    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getSpecialtyDoctorById = function getSpecialtyDoctorById(id) {
  return new Promise(/*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (id) {
              _context9.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Misisng input parameter !"
            });
            _context9.next = 9;
            break;
          case 5:
            _context9.next = 7;
            return _index["default"].Doctor_infor.findAll({
              where: {
                doctorId: id
              }
            });
          case 7:
            data = _context9.sent;
            resolve({
              errCode: 0,
              message: "Get specialty succedd !",
              data: data
            });
          case 9:
            _context9.next = 14;
            break;
          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 14:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 11]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getPatientByDocotorId = function getPatientByDocotorId(doctorID, date) {
  return new Promise(/*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee0$(_context0) {
        while (1) switch (_context0.prev = _context0.next) {
          case 0:
            _context0.prev = 0;
            if (!(!doctorID || !date)) {
              _context0.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Mising input parameters"
            });
            _context0.next = 10;
            break;
          case 5:
            _context0.next = 7;
            return _index["default"].Booking.findAll({
              attributes: {
                exclude: ['token']
              },
              where: {
                doctorID: doctorID,
                date: date,
                statusID: 'S2'
              },
              include: [{
                model: _index["default"].User,
                as: 'patientData',
                attributes: ['address', 'phonenumber', 'gender', 'firstName', 'lastName', 'email'],
                include: [{
                  model: _index["default"].Allcode,
                  as: 'genderData',
                  attributes: ['valueEn', 'valueVi']
                }]
              }, {
                model: _index["default"].Allcode,
                as: 'timeTypeDataBooking',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: false,
              nest: true
            });
          case 7:
            data = _context0.sent;
            if (!data) data = [];
            resolve({
              errCode: 0,
              data: data
            });
          case 10:
            _context0.next = 15;
            break;
          case 12:
            _context0.prev = 12;
            _context0.t0 = _context0["catch"](0);
            reject(_context0.t0);
          case 15:
          case "end":
            return _context0.stop();
        }
      }, _callee0, null, [[0, 12]]);
    }));
    return function (_x17, _x18) {
      return _ref0.apply(this, arguments);
    };
  }());
};
var confirmPatientAppointment = function confirmPatientAppointment(inputData) {
  return new Promise(/*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(resolve, reject) {
      var emailData;
      return _regeneratorRuntime().wrap(function _callee1$(_context1) {
        while (1) switch (_context1.prev = _context1.next) {
          case 0:
            _context1.prev = 0;
            if (!(!inputData.email || !inputData.billImage || !inputData.id)) {
              _context1.next = 4;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing required parameters"
            });
            return _context1.abrupt("return");
          case 4:
            _context1.next = 6;
            return _index["default"].Booking.update({
              statusID: 'S3'
            }, {
              where: {
                id: inputData.id
              }
            });
          case 6:
            emailData = {
              receiverEmail: inputData.email,
              patientName: inputData.patientName,
              language: inputData.language,
              billImage: inputData.billImage
            };
            _context1.next = 9;
            return _emailService["default"].sendBillEmail(emailData);
          case 9:
            resolve({
              errCode: 0,
              message: "Confirm appointment and send bill successfully"
            });
            _context1.next = 16;
            break;
          case 12:
            _context1.prev = 12;
            _context1.t0 = _context1["catch"](0);
            console.error('Error in confirmPatientAppointment:', _context1.t0);
            reject(_context1.t0);
          case 16:
          case "end":
            return _context1.stop();
        }
      }, _callee1, null, [[0, 12]]);
    }));
    return function (_x19, _x20) {
      return _ref1.apply(this, arguments);
    };
  }());
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveInforDoctor: saveInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getSpecialtyDoctorById: getSpecialtyDoctorById,
  getPatientByDocotorId: getPatientByDocotorId,
  confirmPatientAppointment: confirmPatientAppointment
};