"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var nodemailer = require("nodemailer");
var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          });
          _context.next = 3;
          return transporter.sendMail({
            from: '"TienClinic" <hvtienjv2005@gmail.com>',
            to: dataSend.receiverEmail,
            subject: "Thông tin đặt lệnh khám bệnh",
            html: getBodyHTMLEmail(dataSend)
          });
        case 3:
          info = _context.sent;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var sendBillEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dataSend) {
    var transporter, billBuffer, filename, base64Data, mailOptions, info;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          });
          billBuffer = null;
          filename = 'bill.jpg';
          if (dataSend.billImage) {
            base64Data = dataSend.billImage.replace(/^data:image\/[a-z]+;base64,/, '');
            billBuffer = Buffer.from(base64Data, 'base64');
            if (dataSend.billImage.includes('data:image/png')) {
              filename = 'bill.png';
            } else if (dataSend.billImage.includes('data:application/pdf')) {
              filename = 'bill.pdf';
            }
          }
          mailOptions = {
            from: '"TienClinic" <hvtienjv2005@gmail.com>',
            to: dataSend.receiverEmail,
            subject: dataSend.language === 'vi' ? "Kết quả đặt lịch khám bệnh" : "Medical Appointment Result",
            html: getBillHTMLEmail(dataSend),
            attachments: billBuffer ? [{
              filename: filename,
              content: billBuffer,
              contentType: dataSend.billImage.includes('pdf') ? 'application/pdf' : 'image/jpeg'
            }] : []
          };
          _context2.next = 7;
          return transporter.sendMail(mailOptions);
        case 7:
          info = _context2.sent;
          console.log('Bill email sent: ', info.messageId);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendBillEmail(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getBodyHTMLEmail = function getBodyHTMLEmail(dataSend) {
  var result = '';
  if ((dataSend === null || dataSend === void 0 ? void 0 : dataSend.language) === 'vi') {
    result = "\n      <h3>Xin ch\xE0o ".concat(dataSend.patientName, " !</h3>\n      <p>B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c email n\xE0y v\xEC \u0111\xE3 \u0111\u1EB7t l\u1EC7nh kh\xE1m b\u1EC7nh online tr\xEAn website TienClinic</p>\n      <p>Th\xF4ng tin \u0111\u1EB7t l\u1EC7nh kh\xE1m b\u1EC7nh:</p>\n      <div><b>Th\u1EDDi gian kh\xE1m b\u1EC7nh:").concat(dataSend.time, "</b></div>\n      <br/>\n      <div><b>B\xE1c s\u0129:").concat(dataSend.doctorName, "</b></div>\n\n      <p>N\u1EBFu c\xE1c th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng s\u1EF1 th\u1EADt, vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link b\xEAn d\u01B0\u1EDBi \n          \u0111\u1EC3 x\xE1c nh\u1EADn v\xE0 ho\xE0n t\u1EA5t th\u1EE7 t\u1EE5c \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh. </p>\n      <div>\n      <a href=").concat(dataSend.redirectLink, " target=\"_blank\" >Click here</a>\n      </div>\n\n      <p>Xin c\u1EA3m \u01A1n v\xEC \u0111\xE3 tin t\u01B0\u1EDFng v\xE0 ch\u1ECDn \u0111\u1EB7t l\u1EC7nh kh\xE1m b\u1EC7nh t\u1EA1i TienClinic.Vui l\xF2ng \u0111\u1EBFn s\u1EDBm 10 ph\xFAt \u0111\u1EC3 chu\u1EA9n b\u1ECB c\xE1c th\u1EE7 t\u1EE5c c\u1EA7n thi\u1EBFt !</P>\n    ");
  }
  if ((dataSend === null || dataSend === void 0 ? void 0 : dataSend.language) === 'en') {
    result = "\n      <h3>Hello ".concat(dataSend.patientName, "!</h3>\n      <p>You received this email because you booked a medical appointment online on the TienClinic website.</p>\n      <p>Appointment details:</p>\n      <div><b>Appointment time: ").concat(dataSend.time, "</b></div>\n      <br/>\n      <div><b>Doctor: ").concat(dataSend.doctorName, "</b></div>\n\n      <p>If the information above is correct, please click the link below to confirm and complete your medical appointment booking.</p>\n      <div>\n        <a href=").concat(dataSend.redirectLink, " target=\"_blank\">Click here</a>\n      </div>\n\n      <p>Thank you for trusting and choosing to book your appointment at TienClinic. Please arrive 10 minutes early to complete the necessary procedures!</p>\n    ");
  }
  return result;
};
var getBillHTMLEmail = function getBillHTMLEmail(dataSend) {
  var result = '';
  if ((dataSend === null || dataSend === void 0 ? void 0 : dataSend.language) === 'vi') {
    result = "\n      <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;\">\n        <div style=\"text-align: center; margin-bottom: 30px;\">\n          <h2 style=\"color: #2c5aa0; margin: 0;\">TienClinic</h2>\n          <p style=\"color: #666; margin: 5px 0;\">H\u1EC7 th\u1ED1ng ch\u0103m s\xF3c s\u1EE9c kh\u1ECFe</p>\n        </div>\n        \n        <div style=\"background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;\">\n          <h3 style=\"color: #2c5aa0; margin-top: 0;\">Xin ch\xE0o ".concat(dataSend.patientName, "!</h3>\n          <p>B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c email n\xE0y \u0111\u1EC3 x\xE1c nh\u1EADn vi\u1EC7c ho\xE0n th\xE0nh bu\u1ED5i kh\xE1m b\u1EC7nh t\u1EA1i TienClinic.</p>\n        </div>\n\n        <div style=\"background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #2c5aa0; margin-top: 0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;\">\n            \uD83D\uDCCB Th\xF4ng tin b\u1EC7nh nh\xE2n\n          </h4>\n          <div style=\"margin-bottom: 15px;\">\n            <strong style=\"color: #495057;\">\uD83D\uDCE7 Email b\u1EC7nh nh\xE2n:</strong>\n            <span style=\"margin-left: 10px;\">").concat(dataSend.receiverEmail, "</span>\n          </div>\n          <div style=\"margin-bottom: 15px;\">\n            <strong style=\"color: #495057;\">\uD83D\uDCE7 T\xEAn b\u1EC7nh nh\xE2n:</strong>\n            <span style=\"margin-left: 10px;\">").concat(dataSend.patientName, "</span>\n          </div>\n        </div>\n\n        <div style=\"background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #155724; margin-top: 0;\">\u2705 Tr\u1EA1ng th\xE1i: Ho\xE0n th\xE0nh</h4>\n          <p style=\"margin: 0; color: #155724;\">\n            Bu\u1ED5i kh\xE1m c\u1EE7a b\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c ho\xE0n th\xE0nh th\xE0nh c\xF4ng. H\xF3a \u0111\u01A1n v\xE0 k\u1EBFt qu\u1EA3 kh\xE1m \u0111\u01B0\u1EE3c \u0111\xEDnh k\xE8m trong email n\xE0y.\n          </p>\n        </div>\n\n        <div style=\"background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #856404; margin-top: 0;\">\uD83D\uDCC4 H\xF3a \u0111\u01A1n \u0111\xEDnh k\xE8m</h4>\n          <p style=\"margin: 0; color: #856404;\">\n            Vui l\xF2ng ki\u1EC3m tra file \u0111\xEDnh k\xE8m \u0111\u1EC3 xem chi ti\u1EBFt h\xF3a \u0111\u01A1n v\xE0 k\u1EBFt qu\u1EA3 kh\xE1m b\u1EC7nh.\n          </p>\n        </div>\n\n        <div style=\"background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #2c5aa0; margin-top: 0;\">\uD83D\uDCA1 L\u01B0u \xFD quan tr\u1ECDng</h4>\n          <ul style=\"margin: 0; padding-left: 20px; color: #495057;\">\n            <li>Vui l\xF2ng tu\xE2n theo \u0111\xFAng h\u01B0\u1EDBng d\u1EABn c\u1EE7a b\xE1c s\u0129</li>\n            <li>U\u1ED1ng thu\u1ED1c \u0111\xFAng li\u1EC1u l\u01B0\u1EE3ng v\xE0 th\u1EDDi gian \u0111\u01B0\u1EE3c ch\u1EC9 \u0111\u1ECBnh</li>\n            <li>Li\xEAn h\u1EC7 ngay v\u1EDBi ch\xFAng t\xF4i n\u1EBFu c\xF3 b\u1EA5t k\u1EF3 tri\u1EC7u ch\u1EE9ng b\u1EA5t th\u01B0\u1EDDng n\xE0o</li>\n            <li>L\u01B0u gi\u1EEF h\xF3a \u0111\u01A1n \u0111\u1EC3 ph\u1EE5c v\u1EE5 cho c\xE1c l\u1EA7n t\xE1i kh\xE1m sau n\xE0y</li>\n          </ul>\n        </div>\n\n        <div style=\"text-align: center; background: #2c5aa0; color: white; padding: 20px; border-radius: 8px;\">\n          <p style=\"margin: 0; font-size: 16px;\">\n            \uD83D\uDE4F <strong>C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 tin t\u01B0\u1EDFng v\xE0 l\u1EF1a ch\u1ECDn TienClinic!</strong>\n          </p>\n          <p style=\"margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;\">\n            Ch\xFAng t\xF4i lu\xF4n s\u1EB5n s\xE0ng \u0111\u1ED3ng h\xE0nh c\xF9ng s\u1EE9c kh\u1ECFe c\u1EE7a b\u1EA1n\n          </p>\n        </div>\n\n      </div>\n    ");
  }
  if ((dataSend === null || dataSend === void 0 ? void 0 : dataSend.language) === 'en') {
    result = "\n      <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;\">\n        <div style=\"text-align: center; margin-bottom: 30px;\">\n          <h2 style=\"color: #2c5aa0; margin: 0;\">TienClinic</h2>\n          <p style=\"color: #666; margin: 5px 0;\">Healthcare Management System</p>\n        </div>\n        \n        <div style=\"background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;\">\n          <h3 style=\"color: #2c5aa0; margin-top: 0;\">Hello ".concat(dataSend.patientName, "!</h3>\n          <p>You received this email to confirm the completion of your medical appointment at TienClinic.</p>\n        </div>\n\n        <div style=\"background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #2c5aa0; margin-top: 0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;\">\n            \uD83D\uDCCB Patient Information\n          </h4>\n          <div style=\"margin-bottom: 15px;\">\n            <strong style=\"color: #495057;\">\uD83D\uDCE7 Patient Email:</strong>\n            <span style=\"margin-left: 10px;\">").concat(dataSend.receiverEmail, "</span>\n          </div>\n          <div style=\"margin-bottom: 15px;\">\n            <strong style=\"color: #495057;\">\uD83D\uDCE7 Patient Name:</strong>\n            <span style=\"margin-left: 10px;\">").concat(dataSend.patientName, "</span>\n          </div>\n        </div>\n\n        <div style=\"background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #155724; margin-top: 0;\">\u2705 Status: Completed</h4>\n          <p style=\"margin: 0; color: #155724;\">\n            Your appointment has been successfully completed. The bill and examination results are attached to this email.\n          </p>\n        </div>\n\n        <div style=\"background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #856404; margin-top: 0;\">\uD83D\uDCC4 Bill Attached</h4>\n          <p style=\"margin: 0; color: #856404;\">\n            Please check the attached file for detailed bill and examination results.\n          </p>\n        </div>\n\n        <div style=\"background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;\">\n          <h4 style=\"color: #2c5aa0; margin-top: 0;\">\uD83D\uDCA1 Important Notes</h4>\n          <ul style=\"margin: 0; padding-left: 20px; color: #495057;\">\n            <li>Please follow the doctor's instructions carefully</li>\n            <li>Take medication at the prescribed dosage and timing</li>\n            <li>Contact us immediately if you experience any unusual symptoms</li>\n            <li>Keep the bill for future follow-up appointments</li>\n          </ul>\n        </div>\n\n        <div style=\"text-align: center; background: #2c5aa0; color: white; padding: 20px; border-radius: 8px;\">\n          <p style=\"margin: 0; font-size: 16px;\">\n            \uD83D\uDE4F <strong>Thank you for trusting and choosing TienClinic!</strong>\n          </p>\n          <p style=\"margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;\">\n            We are always ready to accompany your health journey\n          </p>\n        </div>\n\n      </div>\n    ");
  }
  return result;
};
module.exports = {
  sendEmail: sendEmail,
  sendBillEmail: sendBillEmail
};