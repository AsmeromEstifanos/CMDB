/*! For license information please see main.e2cf64fb.js.LICENSE.txt */
(() => {
  "use strict";
  var e = {
      43: (e, t, n) => {
        e.exports = n(202);
      },
      153: (e, t, n) => {
        var r = n(43),
          a = Symbol.for("react.element"),
          l = Symbol.for("react.fragment"),
          s = Object.prototype.hasOwnProperty,
          i =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          o = { key: !0, ref: !0, __self: !0, __source: !0 };
        function c(e, t, n) {
          var r,
            l = {},
            c = null,
            u = null;
          for (r in (void 0 !== n && (c = "" + n),
          void 0 !== t.key && (c = "" + t.key),
          void 0 !== t.ref && (u = t.ref),
          t))
            s.call(t, r) && !o.hasOwnProperty(r) && (l[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === l[r] && (l[r] = t[r]);
          return {
            $$typeof: a,
            type: e,
            key: c,
            ref: u,
            props: l,
            _owner: i.current,
          };
        }
        (t.Fragment = l), (t.jsx = c), (t.jsxs = c);
      },
      202: (e, t) => {
        var n = Symbol.for("react.element"),
          r = Symbol.for("react.portal"),
          a = Symbol.for("react.fragment"),
          l = Symbol.for("react.strict_mode"),
          s = Symbol.for("react.profiler"),
          i = Symbol.for("react.provider"),
          o = Symbol.for("react.context"),
          c = Symbol.for("react.forward_ref"),
          u = Symbol.for("react.suspense"),
          d = Symbol.for("react.memo"),
          f = Symbol.for("react.lazy"),
          p = Symbol.iterator;
        var m = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          h = Object.assign,
          g = {};
        function x(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || m);
        }
        function v() {}
        function b(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || m);
        }
        (x.prototype.isReactComponent = {}),
          (x.prototype.setState = function (e, t) {
            if ("object" !== typeof e && "function" !== typeof e && null != e)
              throw Error(
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              );
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (x.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (v.prototype = x.prototype);
        var y = (b.prototype = new v());
        (y.constructor = b), h(y, x.prototype), (y.isPureReactComponent = !0);
        var w = Array.isArray,
          j = Object.prototype.hasOwnProperty,
          N = { current: null },
          k = { key: !0, ref: !0, __self: !0, __source: !0 };
        function S(e, t, r) {
          var a,
            l = {},
            s = null,
            i = null;
          if (null != t)
            for (a in (void 0 !== t.ref && (i = t.ref),
            void 0 !== t.key && (s = "" + t.key),
            t))
              j.call(t, a) && !k.hasOwnProperty(a) && (l[a] = t[a]);
          var o = arguments.length - 2;
          if (1 === o) l.children = r;
          else if (1 < o) {
            for (var c = Array(o), u = 0; u < o; u++) c[u] = arguments[u + 2];
            l.children = c;
          }
          if (e && e.defaultProps)
            for (a in (o = e.defaultProps)) void 0 === l[a] && (l[a] = o[a]);
          return {
            $$typeof: n,
            type: e,
            key: s,
            ref: i,
            props: l,
            _owner: N.current,
          };
        }
        function C(e) {
          return "object" === typeof e && null !== e && e.$$typeof === n;
        }
        var E = /\/+/g;
        function _(e, t) {
          return "object" === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function P(e, t, a, l, s) {
          var i = typeof e;
          ("undefined" !== i && "boolean" !== i) || (e = null);
          var o = !1;
          if (null === e) o = !0;
          else
            switch (i) {
              case "string":
              case "number":
                o = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case n:
                  case r:
                    o = !0;
                }
            }
          if (o)
            return (
              (s = s((o = e))),
              (e = "" === l ? "." + _(o, 0) : l),
              w(s)
                ? ((a = ""),
                  null != e && (a = e.replace(E, "$&/") + "/"),
                  P(s, t, a, "", function (e) {
                    return e;
                  }))
                : null != s &&
                  (C(s) &&
                    (s = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      s,
                      a +
                        (!s.key || (o && o.key === s.key)
                          ? ""
                          : ("" + s.key).replace(E, "$&/") + "/") +
                        e
                    )),
                  t.push(s)),
              1
            );
          if (((o = 0), (l = "" === l ? "." : l + ":"), w(e)))
            for (var c = 0; c < e.length; c++) {
              var u = l + _((i = e[c]), c);
              o += P(i, t, a, u, s);
            }
          else if (
            ((u = (function (e) {
              return null === e || "object" !== typeof e
                ? null
                : "function" === typeof (e = (p && e[p]) || e["@@iterator"])
                ? e
                : null;
            })(e)),
            "function" === typeof u)
          )
            for (e = u.call(e), c = 0; !(i = e.next()).done; )
              o += P((i = i.value), t, a, (u = l + _(i, c++)), s);
          else if ("object" === i)
            throw (
              ((t = String(e)),
              Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                  "). If you meant to render a collection of children, use an array instead."
              ))
            );
          return o;
        }
        function D(e, t, n) {
          if (null == e) return e;
          var r = [],
            a = 0;
          return (
            P(e, r, "", "", function (e) {
              return t.call(n, e, a++);
            }),
            r
          );
        }
        function z(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var T = { current: null },
          L = { transition: null },
          A = {
            ReactCurrentDispatcher: T,
            ReactCurrentBatchConfig: L,
            ReactCurrentOwner: N,
          };
        function R() {
          throw Error(
            "act(...) is not supported in production builds of React."
          );
        }
        (t.Children = {
          map: D,
          forEach: function (e, t, n) {
            D(
              e,
              function () {
                t.apply(this, arguments);
              },
              n
            );
          },
          count: function (e) {
            var t = 0;
            return (
              D(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              D(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!C(e))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return e;
          },
        }),
          (t.Component = x),
          (t.Fragment = a),
          (t.Profiler = s),
          (t.PureComponent = b),
          (t.StrictMode = l),
          (t.Suspense = u),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = A),
          (t.act = R),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                "React.cloneElement(...): The argument must be a React element, but you passed " +
                  e +
                  "."
              );
            var a = h({}, e.props),
              l = e.key,
              s = e.ref,
              i = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((s = t.ref), (i = N.current)),
                void 0 !== t.key && (l = "" + t.key),
                e.type && e.type.defaultProps)
              )
                var o = e.type.defaultProps;
              for (c in t)
                j.call(t, c) &&
                  !k.hasOwnProperty(c) &&
                  (a[c] = void 0 === t[c] && void 0 !== o ? o[c] : t[c]);
            }
            var c = arguments.length - 2;
            if (1 === c) a.children = r;
            else if (1 < c) {
              o = Array(c);
              for (var u = 0; u < c; u++) o[u] = arguments[u + 2];
              a.children = o;
            }
            return {
              $$typeof: n,
              type: e.type,
              key: l,
              ref: s,
              props: a,
              _owner: i,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: o,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: i, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = S),
          (t.createFactory = function (e) {
            var t = S.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: c, render: e };
          }),
          (t.isValidElement = C),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: z,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = L.transition;
            L.transition = {};
            try {
              e();
            } finally {
              L.transition = t;
            }
          }),
          (t.unstable_act = R),
          (t.useCallback = function (e, t) {
            return T.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return T.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return T.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return T.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return T.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return T.current.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return T.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return T.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return T.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return T.current.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return T.current.useRef(e);
          }),
          (t.useState = function (e) {
            return T.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return T.current.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return T.current.useTransition();
          }),
          (t.version = "18.3.1");
      },
      234: (e, t) => {
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              a = e[r];
            if (!(0 < l(a, t))) break e;
            (e[r] = t), (e[n] = a), (n = r);
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function a(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, a = e.length, s = a >>> 1; r < s; ) {
              var i = 2 * (r + 1) - 1,
                o = e[i],
                c = i + 1,
                u = e[c];
              if (0 > l(o, n))
                c < a && 0 > l(u, o)
                  ? ((e[r] = u), (e[c] = n), (r = c))
                  : ((e[r] = o), (e[i] = n), (r = i));
              else {
                if (!(c < a && 0 > l(u, n))) break e;
                (e[r] = u), (e[c] = n), (r = c);
              }
            }
          }
          return t;
        }
        function l(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          "object" === typeof performance &&
          "function" === typeof performance.now
        ) {
          var s = performance;
          t.unstable_now = function () {
            return s.now();
          };
        } else {
          var i = Date,
            o = i.now();
          t.unstable_now = function () {
            return i.now() - o;
          };
        }
        var c = [],
          u = [],
          d = 1,
          f = null,
          p = 3,
          m = !1,
          h = !1,
          g = !1,
          x = "function" === typeof setTimeout ? setTimeout : null,
          v = "function" === typeof clearTimeout ? clearTimeout : null,
          b = "undefined" !== typeof setImmediate ? setImmediate : null;
        function y(e) {
          for (var t = r(u); null !== t; ) {
            if (null === t.callback) a(u);
            else {
              if (!(t.startTime <= e)) break;
              a(u), (t.sortIndex = t.expirationTime), n(c, t);
            }
            t = r(u);
          }
        }
        function w(e) {
          if (((g = !1), y(e), !h))
            if (null !== r(c)) (h = !0), L(j);
            else {
              var t = r(u);
              null !== t && A(w, t.startTime - e);
            }
        }
        function j(e, n) {
          (h = !1), g && ((g = !1), v(C), (C = -1)), (m = !0);
          var l = p;
          try {
            for (
              y(n), f = r(c);
              null !== f && (!(f.expirationTime > n) || (e && !P()));

            ) {
              var s = f.callback;
              if ("function" === typeof s) {
                (f.callback = null), (p = f.priorityLevel);
                var i = s(f.expirationTime <= n);
                (n = t.unstable_now()),
                  "function" === typeof i
                    ? (f.callback = i)
                    : f === r(c) && a(c),
                  y(n);
              } else a(c);
              f = r(c);
            }
            if (null !== f) var o = !0;
            else {
              var d = r(u);
              null !== d && A(w, d.startTime - n), (o = !1);
            }
            return o;
          } finally {
            (f = null), (p = l), (m = !1);
          }
        }
        "undefined" !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var N,
          k = !1,
          S = null,
          C = -1,
          E = 5,
          _ = -1;
        function P() {
          return !(t.unstable_now() - _ < E);
        }
        function D() {
          if (null !== S) {
            var e = t.unstable_now();
            _ = e;
            var n = !0;
            try {
              n = S(!0, e);
            } finally {
              n ? N() : ((k = !1), (S = null));
            }
          } else k = !1;
        }
        if ("function" === typeof b)
          N = function () {
            b(D);
          };
        else if ("undefined" !== typeof MessageChannel) {
          var z = new MessageChannel(),
            T = z.port2;
          (z.port1.onmessage = D),
            (N = function () {
              T.postMessage(null);
            });
        } else
          N = function () {
            x(D, 0);
          };
        function L(e) {
          (S = e), k || ((k = !0), N());
        }
        function A(e, n) {
          C = x(function () {
            e(t.unstable_now());
          }, n);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            h || m || ((h = !0), L(j));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (E = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(c);
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, a, l) {
            var s = t.unstable_now();
            switch (
              ("object" === typeof l && null !== l
                ? (l = "number" === typeof (l = l.delay) && 0 < l ? s + l : s)
                : (l = s),
              e)
            ) {
              case 1:
                var i = -1;
                break;
              case 2:
                i = 250;
                break;
              case 5:
                i = 1073741823;
                break;
              case 4:
                i = 1e4;
                break;
              default:
                i = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: a,
                priorityLevel: e,
                startTime: l,
                expirationTime: (i = l + i),
                sortIndex: -1,
              }),
              l > s
                ? ((e.sortIndex = l),
                  n(u, e),
                  null === r(c) &&
                    e === r(u) &&
                    (g ? (v(C), (C = -1)) : (g = !0), A(w, l - s)))
                : ((e.sortIndex = i), n(c, e), h || m || ((h = !0), L(j))),
              e
            );
          }),
          (t.unstable_shouldYield = P),
          (t.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          });
      },
      391: (e, t, n) => {
        var r = n(950);
        (t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot);
      },
      579: (e, t, n) => {
        e.exports = n(153);
      },
      730: (e, t, n) => {
        var r = n(43),
          a = n(853);
        function l(e) {
          for (
            var t =
                "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += "&args[]=" + encodeURIComponent(arguments[n]);
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        var s = new Set(),
          i = {};
        function o(e, t) {
          c(e, t), c(e + "Capture", t);
        }
        function c(e, t) {
          for (i[e] = t, e = 0; e < t.length; e++) s.add(t[e]);
        }
        var u = !(
            "undefined" === typeof window ||
            "undefined" === typeof window.document ||
            "undefined" === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          f =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          p = {},
          m = {};
        function h(e, t, n, r, a, l, s) {
          (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = a),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = l),
            (this.removeEmptyString = s);
        }
        var g = {};
        "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
          .split(" ")
          .forEach(function (e) {
            g[e] = new h(e, 0, !1, e, null, !1, !1);
          }),
          [
            ["acceptCharset", "accept-charset"],
            ["className", "class"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
          ].forEach(function (e) {
            var t = e[0];
            g[t] = new h(t, 1, !1, e[1], null, !1, !1);
          }),
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(
            function (e) {
              g[e] = new h(e, 2, !1, e.toLowerCase(), null, !1, !1);
            }
          ),
          [
            "autoReverse",
            "externalResourcesRequired",
            "focusable",
            "preserveAlpha",
          ].forEach(function (e) {
            g[e] = new h(e, 2, !1, e, null, !1, !1);
          }),
          "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
            .split(" ")
            .forEach(function (e) {
              g[e] = new h(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ["checked", "multiple", "muted", "selected"].forEach(function (e) {
            g[e] = new h(e, 3, !0, e, null, !1, !1);
          }),
          ["capture", "download"].forEach(function (e) {
            g[e] = new h(e, 4, !1, e, null, !1, !1);
          }),
          ["cols", "rows", "size", "span"].forEach(function (e) {
            g[e] = new h(e, 6, !1, e, null, !1, !1);
          }),
          ["rowSpan", "start"].forEach(function (e) {
            g[e] = new h(e, 5, !1, e.toLowerCase(), null, !1, !1);
          });
        var x = /[\-:]([a-z])/g;
        function v(e) {
          return e[1].toUpperCase();
        }
        function b(e, t, n, r) {
          var a = g.hasOwnProperty(t) ? g[t] : null;
          (null !== a
            ? 0 !== a.type
            : r ||
              !(2 < t.length) ||
              ("o" !== t[0] && "O" !== t[0]) ||
              ("n" !== t[1] && "N" !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                "undefined" === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1;
                  switch (typeof t) {
                    case "function":
                    case "symbol":
                      return !0;
                    case "boolean":
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                            "aria-" !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, n, r)
              )
                return !0;
              if (r) return !1;
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, n, a, r) && (n = null),
            r || null === a
              ? (function (e) {
                  return (
                    !!d.call(m, e) ||
                    (!d.call(p, e) &&
                      (f.test(e) ? (m[e] = !0) : ((p[e] = !0), !1)))
                  );
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
              : a.mustUseProperty
              ? (e[a.propertyName] = null === n ? 3 !== a.type && "" : n)
              : ((t = a.attributeName),
                (r = a.attributeNamespace),
                null === n
                  ? e.removeAttribute(t)
                  : ((n =
                      3 === (a = a.type) || (4 === a && !0 === n)
                        ? ""
                        : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
        }
        "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
          .split(" ")
          .forEach(function (e) {
            var t = e.replace(x, v);
            g[t] = new h(t, 1, !1, e, null, !1, !1);
          }),
          "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
            .split(" ")
            .forEach(function (e) {
              var t = e.replace(x, v);
              g[t] = new h(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
            }),
          ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
            var t = e.replace(x, v);
            g[t] = new h(
              t,
              1,
              !1,
              e,
              "http://www.w3.org/XML/1998/namespace",
              !1,
              !1
            );
          }),
          ["tabIndex", "crossOrigin"].forEach(function (e) {
            g[e] = new h(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (g.xlinkHref = new h(
            "xlinkHref",
            1,
            !1,
            "xlink:href",
            "http://www.w3.org/1999/xlink",
            !0,
            !1
          )),
          ["src", "href", "action", "formAction"].forEach(function (e) {
            g[e] = new h(e, 1, !1, e.toLowerCase(), null, !0, !0);
          });
        var y = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          w = Symbol.for("react.element"),
          j = Symbol.for("react.portal"),
          N = Symbol.for("react.fragment"),
          k = Symbol.for("react.strict_mode"),
          S = Symbol.for("react.profiler"),
          C = Symbol.for("react.provider"),
          E = Symbol.for("react.context"),
          _ = Symbol.for("react.forward_ref"),
          P = Symbol.for("react.suspense"),
          D = Symbol.for("react.suspense_list"),
          z = Symbol.for("react.memo"),
          T = Symbol.for("react.lazy");
        Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
        var L = Symbol.for("react.offscreen");
        Symbol.for("react.legacy_hidden"),
          Symbol.for("react.cache"),
          Symbol.for("react.tracing_marker");
        var A = Symbol.iterator;
        function R(e) {
          return null === e || "object" !== typeof e
            ? null
            : "function" === typeof (e = (A && e[A]) || e["@@iterator"])
            ? e
            : null;
        }
        var M,
          O = Object.assign;
        function I(e) {
          if (void 0 === M)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              M = (t && t[1]) || "";
            }
          return "\n" + M + e;
        }
        var F = !1;
        function U(e, t) {
          if (!e || F) return "";
          F = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                "object" === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (c) {
                  var r = c;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (c) {
                  r = c;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (c) {
                r = c;
              }
              e();
            }
          } catch (c) {
            if (c && r && "string" === typeof c.stack) {
              for (
                var a = c.stack.split("\n"),
                  l = r.stack.split("\n"),
                  s = a.length - 1,
                  i = l.length - 1;
                1 <= s && 0 <= i && a[s] !== l[i];

              )
                i--;
              for (; 1 <= s && 0 <= i; s--, i--)
                if (a[s] !== l[i]) {
                  if (1 !== s || 1 !== i)
                    do {
                      if ((s--, 0 > --i || a[s] !== l[i])) {
                        var o = "\n" + a[s].replace(" at new ", " at ");
                        return (
                          e.displayName &&
                            o.includes("<anonymous>") &&
                            (o = o.replace("<anonymous>", e.displayName)),
                          o
                        );
                      }
                    } while (1 <= s && 0 <= i);
                  break;
                }
            }
          } finally {
            (F = !1), (Error.prepareStackTrace = n);
          }
          return (e = e ? e.displayName || e.name : "") ? I(e) : "";
        }
        function V(e) {
          switch (e.tag) {
            case 5:
              return I(e.type);
            case 16:
              return I("Lazy");
            case 13:
              return I("Suspense");
            case 19:
              return I("SuspenseList");
            case 0:
            case 2:
            case 15:
              return (e = U(e.type, !1));
            case 11:
              return (e = U(e.type.render, !1));
            case 1:
              return (e = U(e.type, !0));
            default:
              return "";
          }
        }
        function B(e) {
          if (null == e) return null;
          if ("function" === typeof e) return e.displayName || e.name || null;
          if ("string" === typeof e) return e;
          switch (e) {
            case N:
              return "Fragment";
            case j:
              return "Portal";
            case S:
              return "Profiler";
            case k:
              return "StrictMode";
            case P:
              return "Suspense";
            case D:
              return "SuspenseList";
          }
          if ("object" === typeof e)
            switch (e.$$typeof) {
              case E:
                return (e.displayName || "Context") + ".Consumer";
              case C:
                return (e._context.displayName || "Context") + ".Provider";
              case _:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      "" !== (e = t.displayName || t.name || "")
                        ? "ForwardRef(" + e + ")"
                        : "ForwardRef"),
                  e
                );
              case z:
                return null !== (t = e.displayName || null)
                  ? t
                  : B(e.type) || "Memo";
              case T:
                (t = e._payload), (e = e._init);
                try {
                  return B(e(t));
                } catch (n) {}
            }
          return null;
        }
        function H(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return "Cache";
            case 9:
              return (t.displayName || "Context") + ".Consumer";
            case 10:
              return (t._context.displayName || "Context") + ".Provider";
            case 18:
              return "DehydratedFragment";
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ""),
                t.displayName ||
                  ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef")
              );
            case 7:
              return "Fragment";
            case 5:
              return t;
            case 4:
              return "Portal";
            case 3:
              return "Root";
            case 6:
              return "Text";
            case 16:
              return B(t);
            case 8:
              return t === k ? "StrictMode" : "Mode";
            case 22:
              return "Offscreen";
            case 12:
              return "Profiler";
            case 21:
              return "Scope";
            case 13:
              return "Suspense";
            case 19:
              return "SuspenseList";
            case 25:
              return "TracingMarker";
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ("function" === typeof t)
                return t.displayName || t.name || null;
              if ("string" === typeof t) return t;
          }
          return null;
        }
        function $(e) {
          switch (typeof e) {
            case "boolean":
            case "number":
            case "string":
            case "undefined":
            case "object":
              return e;
            default:
              return "";
          }
        }
        function W(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            "input" === e.toLowerCase() &&
            ("checkbox" === t || "radio" === t)
          );
        }
        function q(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = W(e) ? "checked" : "value",
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = "" + e[t];
              if (
                !e.hasOwnProperty(t) &&
                "undefined" !== typeof n &&
                "function" === typeof n.get &&
                "function" === typeof n.set
              ) {
                var a = n.get,
                  l = n.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return a.call(this);
                    },
                    set: function (e) {
                      (r = "" + e), l.call(this, e);
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r;
                    },
                    setValue: function (e) {
                      r = "" + e;
                    },
                    stopTracking: function () {
                      (e._valueTracker = null), delete e[t];
                    },
                  }
                );
              }
            })(e));
        }
        function Q(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = "";
          return (
            e && (r = W(e) ? (e.checked ? "true" : "false") : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function K(e) {
          if (
            "undefined" ===
            typeof (e =
              e || ("undefined" !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function Y(e, t) {
          var n = t.checked;
          return O({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          });
        }
        function J(e, t) {
          var n = null == t.defaultValue ? "" : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
          (n = $(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                "checkbox" === t.type || "radio" === t.type
                  ? null != t.checked
                  : null != t.value,
            });
        }
        function G(e, t) {
          null != (t = t.checked) && b(e, "checked", t, !1);
        }
        function X(e, t) {
          G(e, t);
          var n = $(t.value),
            r = t.type;
          if (null != n)
            "number" === r
              ? ((0 === n && "" === e.value) || e.value != n) &&
                (e.value = "" + n)
              : e.value !== "" + n && (e.value = "" + n);
          else if ("submit" === r || "reset" === r)
            return void e.removeAttribute("value");
          t.hasOwnProperty("value")
            ? ee(e, t.type, n)
            : t.hasOwnProperty("defaultValue") &&
              ee(e, t.type, $(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked);
        }
        function Z(e, t, n) {
          if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
            var r = t.type;
            if (
              !(
                ("submit" !== r && "reset" !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return;
            (t = "" + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t);
          }
          "" !== (n = e.name) && (e.name = ""),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            "" !== n && (e.name = n);
        }
        function ee(e, t, n) {
          ("number" === t && K(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = "" + e._wrapperState.initialValue)
              : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
        }
        var te = Array.isArray;
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
            for (n = 0; n < e.length; n++)
              (a = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== a && (e[n].selected = a),
                a && r && (e[n].defaultSelected = !0);
          } else {
            for (n = "" + $(n), t = null, a = 0; a < e.length; a++) {
              if (e[a].value === n)
                return (
                  (e[a].selected = !0), void (r && (e[a].defaultSelected = !0))
                );
              null !== t || e[a].disabled || (t = e[a]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(l(91));
          return O({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue,
          });
        }
        function ae(e, t) {
          var n = t.value;
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(l(92));
              if (te(n)) {
                if (1 < n.length) throw Error(l(93));
                n = n[0];
              }
              t = n;
            }
            null == t && (t = ""), (n = t);
          }
          e._wrapperState = { initialValue: $(n) };
        }
        function le(e, t) {
          var n = $(t.value),
            r = $(t.defaultValue);
          null != n &&
            ((n = "" + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = "" + r);
        }
        function se(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue &&
            "" !== t &&
            null !== t &&
            (e.value = t);
        }
        function ie(e) {
          switch (e) {
            case "svg":
              return "http://www.w3.org/2000/svg";
            case "math":
              return "http://www.w3.org/1998/Math/MathML";
            default:
              return "http://www.w3.org/1999/xhtml";
          }
        }
        function oe(e, t) {
          return null == e || "http://www.w3.org/1999/xhtml" === e
            ? ie(t)
            : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
            ? "http://www.w3.org/1999/xhtml"
            : e;
        }
        var ce,
          ue,
          de =
            ((ue = function (e, t) {
              if (
                "http://www.w3.org/2000/svg" !== e.namespaceURI ||
                "innerHTML" in e
              )
                e.innerHTML = t;
              else {
                for (
                  (ce = ce || document.createElement("div")).innerHTML =
                    "<svg>" + t.valueOf().toString() + "</svg>",
                    t = ce.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ue(e, t);
                  });
                }
              : ue);
        function fe(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var pe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          me = ["Webkit", "ms", "Moz", "O"];
        function he(e, t, n) {
          return null == t || "boolean" === typeof t || "" === t
            ? ""
            : n ||
              "number" !== typeof t ||
              0 === t ||
              (pe.hasOwnProperty(e) && pe[e])
            ? ("" + t).trim()
            : t + "px";
        }
        function ge(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf("--"),
                a = he(n, t[n], r);
              "float" === n && (n = "cssFloat"),
                r ? e.setProperty(n, a) : (e[n] = a);
            }
        }
        Object.keys(pe).forEach(function (e) {
          me.forEach(function (t) {
            (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (pe[t] = pe[e]);
          });
        });
        var xe = O(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ve(e, t) {
          if (t) {
            if (
              xe[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(l(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(l(60));
              if (
                "object" !== typeof t.dangerouslySetInnerHTML ||
                !("__html" in t.dangerouslySetInnerHTML)
              )
                throw Error(l(61));
            }
            if (null != t.style && "object" !== typeof t.style)
              throw Error(l(62));
          }
        }
        function be(e, t) {
          if (-1 === e.indexOf("-")) return "string" === typeof t.is;
          switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        }
        var ye = null;
        function we(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var je = null,
          Ne = null,
          ke = null;
        function Se(e) {
          if ((e = ba(e))) {
            if ("function" !== typeof je) throw Error(l(280));
            var t = e.stateNode;
            t && ((t = wa(t)), je(e.stateNode, e.type, t));
          }
        }
        function Ce(e) {
          Ne ? (ke ? ke.push(e) : (ke = [e])) : (Ne = e);
        }
        function Ee() {
          if (Ne) {
            var e = Ne,
              t = ke;
            if (((ke = Ne = null), Se(e), t))
              for (e = 0; e < t.length; e++) Se(t[e]);
          }
        }
        function _e(e, t) {
          return e(t);
        }
        function Pe() {}
        var De = !1;
        function ze(e, t, n) {
          if (De) return e(t, n);
          De = !0;
          try {
            return _e(e, t, n);
          } finally {
            (De = !1), (null !== Ne || null !== ke) && (Pe(), Ee());
          }
        }
        function Te(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = wa(n);
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (r = !r.disabled) ||
                (r = !(
                  "button" === (e = e.type) ||
                  "input" === e ||
                  "select" === e ||
                  "textarea" === e
                )),
                (e = !r);
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && "function" !== typeof n) throw Error(l(231, t, typeof n));
          return n;
        }
        var Le = !1;
        if (u)
          try {
            var Ae = {};
            Object.defineProperty(Ae, "passive", {
              get: function () {
                Le = !0;
              },
            }),
              window.addEventListener("test", Ae, Ae),
              window.removeEventListener("test", Ae, Ae);
          } catch (ue) {
            Le = !1;
          }
        function Re(e, t, n, r, a, l, s, i, o) {
          var c = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, c);
          } catch (u) {
            this.onError(u);
          }
        }
        var Me = !1,
          Oe = null,
          Ie = !1,
          Fe = null,
          Ue = {
            onError: function (e) {
              (Me = !0), (Oe = e);
            },
          };
        function Ve(e, t, n, r, a, l, s, i, o) {
          (Me = !1), (Oe = null), Re.apply(Ue, arguments);
        }
        function Be(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function He(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function $e(e) {
          if (Be(e) !== e) throw Error(l(188));
        }
        function We(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = Be(e))) throw Error(l(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var a = n.return;
                if (null === a) break;
                var s = a.alternate;
                if (null === s) {
                  if (null !== (r = a.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (a.child === s.child) {
                  for (s = a.child; s; ) {
                    if (s === n) return $e(a), e;
                    if (s === r) return $e(a), t;
                    s = s.sibling;
                  }
                  throw Error(l(188));
                }
                if (n.return !== r.return) (n = a), (r = s);
                else {
                  for (var i = !1, o = a.child; o; ) {
                    if (o === n) {
                      (i = !0), (n = a), (r = s);
                      break;
                    }
                    if (o === r) {
                      (i = !0), (r = a), (n = s);
                      break;
                    }
                    o = o.sibling;
                  }
                  if (!i) {
                    for (o = s.child; o; ) {
                      if (o === n) {
                        (i = !0), (n = s), (r = a);
                        break;
                      }
                      if (o === r) {
                        (i = !0), (r = s), (n = a);
                        break;
                      }
                      o = o.sibling;
                    }
                    if (!i) throw Error(l(189));
                  }
                }
                if (n.alternate !== r) throw Error(l(190));
              }
              if (3 !== n.tag) throw Error(l(188));
              return n.stateNode.current === n ? e : t;
            })(e))
            ? qe(e)
            : null;
        }
        function qe(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = qe(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var Qe = a.unstable_scheduleCallback,
          Ke = a.unstable_cancelCallback,
          Ye = a.unstable_shouldYield,
          Je = a.unstable_requestPaint,
          Ge = a.unstable_now,
          Xe = a.unstable_getCurrentPriorityLevel,
          Ze = a.unstable_ImmediatePriority,
          et = a.unstable_UserBlockingPriority,
          tt = a.unstable_NormalPriority,
          nt = a.unstable_LowPriority,
          rt = a.unstable_IdlePriority,
          at = null,
          lt = null;
        var st = Math.clz32
            ? Math.clz32
            : function (e) {
                return (e >>>= 0), 0 === e ? 32 : (31 - ((it(e) / ot) | 0)) | 0;
              },
          it = Math.log,
          ot = Math.LN2;
        var ct = 64,
          ut = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function ft(e, t) {
          var n = e.pendingLanes;
          if (0 === n) return 0;
          var r = 0,
            a = e.suspendedLanes,
            l = e.pingedLanes,
            s = 268435455 & n;
          if (0 !== s) {
            var i = s & ~a;
            0 !== i ? (r = dt(i)) : 0 !== (l &= s) && (r = dt(l));
          } else 0 !== (s = n & ~a) ? (r = dt(s)) : 0 !== l && (r = dt(l));
          if (0 === r) return 0;
          if (
            0 !== t &&
            t !== r &&
            0 === (t & a) &&
            ((a = r & -r) >= (l = t & -t) || (16 === a && 0 !== (4194240 & l)))
          )
            return t;
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (a = 1 << (n = 31 - st(t))), (r |= e[n]), (t &= ~a);
          return r;
        }
        function pt(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function mt(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
            ? 1073741824
            : 0;
        }
        function ht() {
          var e = ct;
          return 0 === (4194240 & (ct <<= 1)) && (ct = 64), e;
        }
        function gt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function xt(e, t, n) {
          (e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - st(t))] = n);
        }
        function vt(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - st(n),
              a = 1 << r;
            (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
          }
        }
        var bt = 0;
        function yt(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1;
        }
        var wt,
          jt,
          Nt,
          kt,
          St,
          Ct = !1,
          Et = [],
          _t = null,
          Pt = null,
          Dt = null,
          zt = new Map(),
          Tt = new Map(),
          Lt = [],
          At =
            "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
              " "
            );
        function Rt(e, t) {
          switch (e) {
            case "focusin":
            case "focusout":
              _t = null;
              break;
            case "dragenter":
            case "dragleave":
              Pt = null;
              break;
            case "mouseover":
            case "mouseout":
              Dt = null;
              break;
            case "pointerover":
            case "pointerout":
              zt.delete(t.pointerId);
              break;
            case "gotpointercapture":
            case "lostpointercapture":
              Tt.delete(t.pointerId);
          }
        }
        function Mt(e, t, n, r, a, l) {
          return null === e || e.nativeEvent !== l
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: l,
                targetContainers: [a],
              }),
              null !== t && null !== (t = ba(t)) && jt(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== a && -1 === t.indexOf(a) && t.push(a),
              e);
        }
        function Ot(e) {
          var t = va(e.target);
          if (null !== t) {
            var n = Be(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = He(n)))
                  return (
                    (e.blockedOn = t),
                    void St(e.priority, function () {
                      Nt(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function It(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Yt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== n)
              return null !== (t = ba(n)) && jt(t), (e.blockedOn = n), !1;
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            (ye = r), n.target.dispatchEvent(r), (ye = null), t.shift();
          }
          return !0;
        }
        function Ft(e, t, n) {
          It(e) && n.delete(t);
        }
        function Ut() {
          (Ct = !1),
            null !== _t && It(_t) && (_t = null),
            null !== Pt && It(Pt) && (Pt = null),
            null !== Dt && It(Dt) && (Dt = null),
            zt.forEach(Ft),
            Tt.forEach(Ft);
        }
        function Vt(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            Ct ||
              ((Ct = !0),
              a.unstable_scheduleCallback(a.unstable_NormalPriority, Ut)));
        }
        function Bt(e) {
          function t(t) {
            return Vt(t, e);
          }
          if (0 < Et.length) {
            Vt(Et[0], e);
            for (var n = 1; n < Et.length; n++) {
              var r = Et[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
          }
          for (
            null !== _t && Vt(_t, e),
              null !== Pt && Vt(Pt, e),
              null !== Dt && Vt(Dt, e),
              zt.forEach(t),
              Tt.forEach(t),
              n = 0;
            n < Lt.length;
            n++
          )
            (r = Lt[n]).blockedOn === e && (r.blockedOn = null);
          for (; 0 < Lt.length && null === (n = Lt[0]).blockedOn; )
            Ot(n), null === n.blockedOn && Lt.shift();
        }
        var Ht = y.ReactCurrentBatchConfig,
          $t = !0;
        function Wt(e, t, n, r) {
          var a = bt,
            l = Ht.transition;
          Ht.transition = null;
          try {
            (bt = 1), Qt(e, t, n, r);
          } finally {
            (bt = a), (Ht.transition = l);
          }
        }
        function qt(e, t, n, r) {
          var a = bt,
            l = Ht.transition;
          Ht.transition = null;
          try {
            (bt = 4), Qt(e, t, n, r);
          } finally {
            (bt = a), (Ht.transition = l);
          }
        }
        function Qt(e, t, n, r) {
          if ($t) {
            var a = Yt(e, t, n, r);
            if (null === a) $r(e, t, r, Kt, n), Rt(e, r);
            else if (
              (function (e, t, n, r, a) {
                switch (t) {
                  case "focusin":
                    return (_t = Mt(_t, e, t, n, r, a)), !0;
                  case "dragenter":
                    return (Pt = Mt(Pt, e, t, n, r, a)), !0;
                  case "mouseover":
                    return (Dt = Mt(Dt, e, t, n, r, a)), !0;
                  case "pointerover":
                    var l = a.pointerId;
                    return zt.set(l, Mt(zt.get(l) || null, e, t, n, r, a)), !0;
                  case "gotpointercapture":
                    return (
                      (l = a.pointerId),
                      Tt.set(l, Mt(Tt.get(l) || null, e, t, n, r, a)),
                      !0
                    );
                }
                return !1;
              })(a, e, t, n, r)
            )
              r.stopPropagation();
            else if ((Rt(e, r), 4 & t && -1 < At.indexOf(e))) {
              for (; null !== a; ) {
                var l = ba(a);
                if (
                  (null !== l && wt(l),
                  null === (l = Yt(e, t, n, r)) && $r(e, t, r, Kt, n),
                  l === a)
                )
                  break;
                a = l;
              }
              null !== a && r.stopPropagation();
            } else $r(e, t, r, null, n);
          }
        }
        var Kt = null;
        function Yt(e, t, n, r) {
          if (((Kt = null), null !== (e = va((e = we(r))))))
            if (null === (t = Be(e))) e = null;
            else if (13 === (n = t.tag)) {
              if (null !== (e = He(t))) return e;
              e = null;
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return (Kt = e), null;
        }
        function Jt(e) {
          switch (e) {
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
              return 1;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "toggle":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
              return 4;
            case "message":
              switch (Xe()) {
                case Ze:
                  return 1;
                case et:
                  return 4;
                case tt:
                case nt:
                  return 16;
                case rt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Gt = null,
          Xt = null,
          Zt = null;
        function en() {
          if (Zt) return Zt;
          var e,
            t,
            n = Xt,
            r = n.length,
            a = "value" in Gt ? Gt.value : Gt.textContent,
            l = a.length;
          for (e = 0; e < r && n[e] === a[e]; e++);
          var s = r - e;
          for (t = 1; t <= s && n[r - t] === a[l - t]; t++);
          return (Zt = a.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tn(e) {
          var t = e.keyCode;
          return (
            "charCode" in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function nn() {
          return !0;
        }
        function rn() {
          return !1;
        }
        function an(e) {
          function t(t, n, r, a, l) {
            for (var s in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = a),
            (this.target = l),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(s) && ((t = e[s]), (this[s] = t ? t(a) : a[s]));
            return (
              (this.isDefaultPrevented = (
                null != a.defaultPrevented
                  ? a.defaultPrevented
                  : !1 === a.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            );
          }
          return (
            O(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : "unknown" !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : "unknown" !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn));
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          );
        }
        var ln,
          sn,
          on,
          cn = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          un = an(cn),
          dn = O({}, cn, { view: 0, detail: 0 }),
          fn = an(dn),
          pn = O({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: Sn,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return "movementX" in e
                ? e.movementX
                : (e !== on &&
                    (on && "mousemove" === e.type
                      ? ((ln = e.screenX - on.screenX),
                        (sn = e.screenY - on.screenY))
                      : (sn = ln = 0),
                    (on = e)),
                  ln);
            },
            movementY: function (e) {
              return "movementY" in e ? e.movementY : sn;
            },
          }),
          mn = an(pn),
          hn = an(O({}, pn, { dataTransfer: 0 })),
          gn = an(O({}, dn, { relatedTarget: 0 })),
          xn = an(
            O({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          vn = O({}, cn, {
            clipboardData: function (e) {
              return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
          bn = an(vn),
          yn = an(O({}, cn, { data: 0 })),
          wn = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified",
          },
          jn = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta",
          },
          Nn = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey",
          };
        function kn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = Nn[e]) && !!t[e];
        }
        function Sn() {
          return kn;
        }
        var Cn = O({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = wn[e.key] || e.key;
                if ("Unidentified" !== t) return t;
              }
              return "keypress" === e.type
                ? 13 === (e = tn(e))
                  ? "Enter"
                  : String.fromCharCode(e)
                : "keydown" === e.type || "keyup" === e.type
                ? jn[e.keyCode] || "Unidentified"
                : "";
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Sn,
            charCode: function (e) {
              return "keypress" === e.type ? tn(e) : 0;
            },
            keyCode: function (e) {
              return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return "keypress" === e.type
                ? tn(e)
                : "keydown" === e.type || "keyup" === e.type
                ? e.keyCode
                : 0;
            },
          }),
          En = an(Cn),
          _n = an(
            O({}, pn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          Pn = an(
            O({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: Sn,
            })
          ),
          Dn = an(
            O({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          zn = O({}, pn, {
            deltaX: function (e) {
              return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
            },
            deltaY: function (e) {
              return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Tn = an(zn),
          Ln = [9, 13, 27, 32],
          An = u && "CompositionEvent" in window,
          Rn = null;
        u && "documentMode" in document && (Rn = document.documentMode);
        var Mn = u && "TextEvent" in window && !Rn,
          On = u && (!An || (Rn && 8 < Rn && 11 >= Rn)),
          In = String.fromCharCode(32),
          Fn = !1;
        function Un(e, t) {
          switch (e) {
            case "keyup":
              return -1 !== Ln.indexOf(t.keyCode);
            case "keydown":
              return 229 !== t.keyCode;
            case "keypress":
            case "mousedown":
            case "focusout":
              return !0;
            default:
              return !1;
          }
        }
        function Vn(e) {
          return "object" === typeof (e = e.detail) && "data" in e
            ? e.data
            : null;
        }
        var Bn = !1;
        var Hn = {
          color: !0,
          date: !0,
          datetime: !0,
          "datetime-local": !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function $n(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return "input" === t ? !!Hn[e.type] : "textarea" === t;
        }
        function Wn(e, t, n, r) {
          Ce(r),
            0 < (t = qr(t, "onChange")).length &&
              ((n = new un("onChange", "change", null, n, r)),
              e.push({ event: n, listeners: t }));
        }
        var qn = null,
          Qn = null;
        function Kn(e) {
          Ir(e, 0);
        }
        function Yn(e) {
          if (Q(ya(e))) return e;
        }
        function Jn(e, t) {
          if ("change" === e) return t;
        }
        var Gn = !1;
        if (u) {
          var Xn;
          if (u) {
            var Zn = "oninput" in document;
            if (!Zn) {
              var er = document.createElement("div");
              er.setAttribute("oninput", "return;"),
                (Zn = "function" === typeof er.oninput);
            }
            Xn = Zn;
          } else Xn = !1;
          Gn = Xn && (!document.documentMode || 9 < document.documentMode);
        }
        function tr() {
          qn && (qn.detachEvent("onpropertychange", nr), (Qn = qn = null));
        }
        function nr(e) {
          if ("value" === e.propertyName && Yn(Qn)) {
            var t = [];
            Wn(t, Qn, e, we(e)), ze(Kn, t);
          }
        }
        function rr(e, t, n) {
          "focusin" === e
            ? (tr(), (Qn = n), (qn = t).attachEvent("onpropertychange", nr))
            : "focusout" === e && tr();
        }
        function ar(e) {
          if ("selectionchange" === e || "keyup" === e || "keydown" === e)
            return Yn(Qn);
        }
        function lr(e, t) {
          if ("click" === e) return Yn(t);
        }
        function sr(e, t) {
          if ("input" === e || "change" === e) return Yn(t);
        }
        var ir =
          "function" === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function or(e, t) {
          if (ir(e, t)) return !0;
          if (
            "object" !== typeof e ||
            null === e ||
            "object" !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var a = n[r];
            if (!d.call(t, a) || !ir(e[a], t[a])) return !1;
          }
          return !0;
        }
        function cr(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function ur(e, t) {
          var n,
            r = cr(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = cr(r);
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : "contains" in e
                  ? e.contains(t)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function fr() {
          for (var e = window, t = K(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = "string" === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = K((e = t.contentWindow).document);
          }
          return t;
        }
        function pr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (("input" === t &&
              ("text" === e.type ||
                "search" === e.type ||
                "tel" === e.type ||
                "url" === e.type ||
                "password" === e.type)) ||
              "textarea" === t ||
              "true" === e.contentEditable)
          );
        }
        function mr(e) {
          var t = fr(),
            n = e.focusedElem,
            r = e.selectionRange;
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && pr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                "selectionStart" in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length));
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection();
                var a = n.textContent.length,
                  l = Math.min(r.start, a);
                (r = void 0 === r.end ? l : Math.min(r.end, a)),
                  !e.extend && l > r && ((a = r), (r = l), (l = a)),
                  (a = ur(n, l));
                var s = ur(n, r);
                a &&
                  s &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== a.node ||
                    e.anchorOffset !== a.offset ||
                    e.focusNode !== s.node ||
                    e.focusOffset !== s.offset) &&
                  ((t = t.createRange()).setStart(a.node, a.offset),
                  e.removeAllRanges(),
                  l > r
                    ? (e.addRange(t), e.extend(s.node, s.offset))
                    : (t.setEnd(s.node, s.offset), e.addRange(t)));
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for (
              "function" === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
          }
        }
        var hr = u && "documentMode" in document && 11 >= document.documentMode,
          gr = null,
          xr = null,
          vr = null,
          br = !1;
        function yr(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
              ? n
              : n.ownerDocument;
          br ||
            null == gr ||
            gr !== K(r) ||
            ("selectionStart" in (r = gr) && pr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (vr && or(vr, r)) ||
              ((vr = r),
              0 < (r = qr(xr, "onSelect")).length &&
                ((t = new un("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = gr))));
        }
        function wr(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n["Webkit" + e] = "webkit" + t),
            (n["Moz" + e] = "moz" + t),
            n
          );
        }
        var jr = {
            animationend: wr("Animation", "AnimationEnd"),
            animationiteration: wr("Animation", "AnimationIteration"),
            animationstart: wr("Animation", "AnimationStart"),
            transitionend: wr("Transition", "TransitionEnd"),
          },
          Nr = {},
          kr = {};
        function Sr(e) {
          if (Nr[e]) return Nr[e];
          if (!jr[e]) return e;
          var t,
            n = jr[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in kr) return (Nr[e] = n[t]);
          return e;
        }
        u &&
          ((kr = document.createElement("div").style),
          "AnimationEvent" in window ||
            (delete jr.animationend.animation,
            delete jr.animationiteration.animation,
            delete jr.animationstart.animation),
          "TransitionEvent" in window || delete jr.transitionend.transition);
        var Cr = Sr("animationend"),
          Er = Sr("animationiteration"),
          _r = Sr("animationstart"),
          Pr = Sr("transitionend"),
          Dr = new Map(),
          zr =
            "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
              " "
            );
        function Tr(e, t) {
          Dr.set(e, t), o(t, [e]);
        }
        for (var Lr = 0; Lr < zr.length; Lr++) {
          var Ar = zr[Lr];
          Tr(Ar.toLowerCase(), "on" + (Ar[0].toUpperCase() + Ar.slice(1)));
        }
        Tr(Cr, "onAnimationEnd"),
          Tr(Er, "onAnimationIteration"),
          Tr(_r, "onAnimationStart"),
          Tr("dblclick", "onDoubleClick"),
          Tr("focusin", "onFocus"),
          Tr("focusout", "onBlur"),
          Tr(Pr, "onTransitionEnd"),
          c("onMouseEnter", ["mouseout", "mouseover"]),
          c("onMouseLeave", ["mouseout", "mouseover"]),
          c("onPointerEnter", ["pointerout", "pointerover"]),
          c("onPointerLeave", ["pointerout", "pointerover"]),
          o(
            "onChange",
            "change click focusin focusout input keydown keyup selectionchange".split(
              " "
            )
          ),
          o(
            "onSelect",
            "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
              " "
            )
          ),
          o("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste",
          ]),
          o(
            "onCompositionEnd",
            "compositionend focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          o(
            "onCompositionStart",
            "compositionstart focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          o(
            "onCompositionUpdate",
            "compositionupdate focusout keydown keypress keyup mousedown".split(
              " "
            )
          );
        var Rr =
            "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
              " "
            ),
          Mr = new Set(
            "cancel close invalid load scroll toggle".split(" ").concat(Rr)
          );
        function Or(e, t, n) {
          var r = e.type || "unknown-event";
          (e.currentTarget = n),
            (function (e, t, n, r, a, s, i, o, c) {
              if ((Ve.apply(this, arguments), Me)) {
                if (!Me) throw Error(l(198));
                var u = Oe;
                (Me = !1), (Oe = null), Ie || ((Ie = !0), (Fe = u));
              }
            })(r, t, void 0, e),
            (e.currentTarget = null);
        }
        function Ir(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              a = r.event;
            r = r.listeners;
            e: {
              var l = void 0;
              if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                  var i = r[s],
                    o = i.instance,
                    c = i.currentTarget;
                  if (((i = i.listener), o !== l && a.isPropagationStopped()))
                    break e;
                  Or(a, i, c), (l = o);
                }
              else
                for (s = 0; s < r.length; s++) {
                  if (
                    ((o = (i = r[s]).instance),
                    (c = i.currentTarget),
                    (i = i.listener),
                    o !== l && a.isPropagationStopped())
                  )
                    break e;
                  Or(a, i, c), (l = o);
                }
            }
          }
          if (Ie) throw ((e = Fe), (Ie = !1), (Fe = null), e);
        }
        function Fr(e, t) {
          var n = t[ha];
          void 0 === n && (n = t[ha] = new Set());
          var r = e + "__bubble";
          n.has(r) || (Hr(t, e, 2, !1), n.add(r));
        }
        function Ur(e, t, n) {
          var r = 0;
          t && (r |= 4), Hr(n, e, r, t);
        }
        var Vr = "_reactListening" + Math.random().toString(36).slice(2);
        function Br(e) {
          if (!e[Vr]) {
            (e[Vr] = !0),
              s.forEach(function (t) {
                "selectionchange" !== t &&
                  (Mr.has(t) || Ur(t, !1, e), Ur(t, !0, e));
              });
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[Vr] || ((t[Vr] = !0), Ur("selectionchange", !1, t));
          }
        }
        function Hr(e, t, n, r) {
          switch (Jt(t)) {
            case 1:
              var a = Wt;
              break;
            case 4:
              a = qt;
              break;
            default:
              a = Qt;
          }
          (n = a.bind(null, t, n, e)),
            (a = void 0),
            !Le ||
              ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
              (a = !0),
            r
              ? void 0 !== a
                ? e.addEventListener(t, n, { capture: !0, passive: a })
                : e.addEventListener(t, n, !0)
              : void 0 !== a
              ? e.addEventListener(t, n, { passive: a })
              : e.addEventListener(t, n, !1);
        }
        function $r(e, t, n, r, a) {
          var l = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var s = r.tag;
              if (3 === s || 4 === s) {
                var i = r.stateNode.containerInfo;
                if (i === a || (8 === i.nodeType && i.parentNode === a)) break;
                if (4 === s)
                  for (s = r.return; null !== s; ) {
                    var o = s.tag;
                    if (
                      (3 === o || 4 === o) &&
                      ((o = s.stateNode.containerInfo) === a ||
                        (8 === o.nodeType && o.parentNode === a))
                    )
                      return;
                    s = s.return;
                  }
                for (; null !== i; ) {
                  if (null === (s = va(i))) return;
                  if (5 === (o = s.tag) || 6 === o) {
                    r = l = s;
                    continue e;
                  }
                  i = i.parentNode;
                }
              }
              r = r.return;
            }
          ze(function () {
            var r = l,
              a = we(n),
              s = [];
            e: {
              var i = Dr.get(e);
              if (void 0 !== i) {
                var o = un,
                  c = e;
                switch (e) {
                  case "keypress":
                    if (0 === tn(n)) break e;
                  case "keydown":
                  case "keyup":
                    o = En;
                    break;
                  case "focusin":
                    (c = "focus"), (o = gn);
                    break;
                  case "focusout":
                    (c = "blur"), (o = gn);
                    break;
                  case "beforeblur":
                  case "afterblur":
                    o = gn;
                    break;
                  case "click":
                    if (2 === n.button) break e;
                  case "auxclick":
                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    o = mn;
                    break;
                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    o = hn;
                    break;
                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    o = Pn;
                    break;
                  case Cr:
                  case Er:
                  case _r:
                    o = xn;
                    break;
                  case Pr:
                    o = Dn;
                    break;
                  case "scroll":
                    o = fn;
                    break;
                  case "wheel":
                    o = Tn;
                    break;
                  case "copy":
                  case "cut":
                  case "paste":
                    o = bn;
                    break;
                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    o = _n;
                }
                var u = 0 !== (4 & t),
                  d = !u && "scroll" === e,
                  f = u ? (null !== i ? i + "Capture" : null) : i;
                u = [];
                for (var p, m = r; null !== m; ) {
                  var h = (p = m).stateNode;
                  if (
                    (5 === p.tag &&
                      null !== h &&
                      ((p = h),
                      null !== f &&
                        null != (h = Te(m, f)) &&
                        u.push(Wr(m, h, p))),
                    d)
                  )
                    break;
                  m = m.return;
                }
                0 < u.length &&
                  ((i = new o(i, c, null, n, a)),
                  s.push({ event: i, listeners: u }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((o = "mouseout" === e || "pointerout" === e),
                (!(i = "mouseover" === e || "pointerover" === e) ||
                  n === ye ||
                  !(c = n.relatedTarget || n.fromElement) ||
                  (!va(c) && !c[ma])) &&
                  (o || i) &&
                  ((i =
                    a.window === a
                      ? a
                      : (i = a.ownerDocument)
                      ? i.defaultView || i.parentWindow
                      : window),
                  o
                    ? ((o = r),
                      null !==
                        (c = (c = n.relatedTarget || n.toElement)
                          ? va(c)
                          : null) &&
                        (c !== (d = Be(c)) || (5 !== c.tag && 6 !== c.tag)) &&
                        (c = null))
                    : ((o = null), (c = r)),
                  o !== c))
              ) {
                if (
                  ((u = mn),
                  (h = "onMouseLeave"),
                  (f = "onMouseEnter"),
                  (m = "mouse"),
                  ("pointerout" !== e && "pointerover" !== e) ||
                    ((u = _n),
                    (h = "onPointerLeave"),
                    (f = "onPointerEnter"),
                    (m = "pointer")),
                  (d = null == o ? i : ya(o)),
                  (p = null == c ? i : ya(c)),
                  ((i = new u(h, m + "leave", o, n, a)).target = d),
                  (i.relatedTarget = p),
                  (h = null),
                  va(a) === r &&
                    (((u = new u(f, m + "enter", c, n, a)).target = p),
                    (u.relatedTarget = d),
                    (h = u)),
                  (d = h),
                  o && c)
                )
                  e: {
                    for (f = c, m = 0, p = u = o; p; p = Qr(p)) m++;
                    for (p = 0, h = f; h; h = Qr(h)) p++;
                    for (; 0 < m - p; ) (u = Qr(u)), m--;
                    for (; 0 < p - m; ) (f = Qr(f)), p--;
                    for (; m--; ) {
                      if (u === f || (null !== f && u === f.alternate)) break e;
                      (u = Qr(u)), (f = Qr(f));
                    }
                    u = null;
                  }
                else u = null;
                null !== o && Kr(s, i, o, u, !1),
                  null !== c && null !== d && Kr(s, d, c, u, !0);
              }
              if (
                "select" ===
                  (o =
                    (i = r ? ya(r) : window).nodeName &&
                    i.nodeName.toLowerCase()) ||
                ("input" === o && "file" === i.type)
              )
                var g = Jn;
              else if ($n(i))
                if (Gn) g = sr;
                else {
                  g = ar;
                  var x = rr;
                }
              else
                (o = i.nodeName) &&
                  "input" === o.toLowerCase() &&
                  ("checkbox" === i.type || "radio" === i.type) &&
                  (g = lr);
              switch (
                (g && (g = g(e, r))
                  ? Wn(s, g, n, a)
                  : (x && x(e, i, r),
                    "focusout" === e &&
                      (x = i._wrapperState) &&
                      x.controlled &&
                      "number" === i.type &&
                      ee(i, "number", i.value)),
                (x = r ? ya(r) : window),
                e)
              ) {
                case "focusin":
                  ($n(x) || "true" === x.contentEditable) &&
                    ((gr = x), (xr = r), (vr = null));
                  break;
                case "focusout":
                  vr = xr = gr = null;
                  break;
                case "mousedown":
                  br = !0;
                  break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                  (br = !1), yr(s, n, a);
                  break;
                case "selectionchange":
                  if (hr) break;
                case "keydown":
                case "keyup":
                  yr(s, n, a);
              }
              var v;
              if (An)
                e: {
                  switch (e) {
                    case "compositionstart":
                      var b = "onCompositionStart";
                      break e;
                    case "compositionend":
                      b = "onCompositionEnd";
                      break e;
                    case "compositionupdate":
                      b = "onCompositionUpdate";
                      break e;
                  }
                  b = void 0;
                }
              else
                Bn
                  ? Un(e, n) && (b = "onCompositionEnd")
                  : "keydown" === e &&
                    229 === n.keyCode &&
                    (b = "onCompositionStart");
              b &&
                (On &&
                  "ko" !== n.locale &&
                  (Bn || "onCompositionStart" !== b
                    ? "onCompositionEnd" === b && Bn && (v = en())
                    : ((Xt = "value" in (Gt = a) ? Gt.value : Gt.textContent),
                      (Bn = !0))),
                0 < (x = qr(r, b)).length &&
                  ((b = new yn(b, e, null, n, a)),
                  s.push({ event: b, listeners: x }),
                  v ? (b.data = v) : null !== (v = Vn(n)) && (b.data = v))),
                (v = Mn
                  ? (function (e, t) {
                      switch (e) {
                        case "compositionend":
                          return Vn(t);
                        case "keypress":
                          return 32 !== t.which ? null : ((Fn = !0), In);
                        case "textInput":
                          return (e = t.data) === In && Fn ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Bn)
                        return "compositionend" === e || (!An && Un(e, t))
                          ? ((e = en()), (Zt = Xt = Gt = null), (Bn = !1), e)
                          : null;
                      switch (e) {
                        case "paste":
                        default:
                          return null;
                        case "keypress":
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case "compositionend":
                          return On && "ko" !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (r = qr(r, "onBeforeInput")).length &&
                  ((a = new yn("onBeforeInput", "beforeinput", null, n, a)),
                  s.push({ event: a, listeners: r }),
                  (a.data = v));
            }
            Ir(s, t);
          });
        }
        function Wr(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function qr(e, t) {
          for (var n = t + "Capture", r = []; null !== e; ) {
            var a = e,
              l = a.stateNode;
            5 === a.tag &&
              null !== l &&
              ((a = l),
              null != (l = Te(e, n)) && r.unshift(Wr(e, l, a)),
              null != (l = Te(e, t)) && r.push(Wr(e, l, a))),
              (e = e.return);
          }
          return r;
        }
        function Qr(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Kr(e, t, n, r, a) {
          for (var l = t._reactName, s = []; null !== n && n !== r; ) {
            var i = n,
              o = i.alternate,
              c = i.stateNode;
            if (null !== o && o === r) break;
            5 === i.tag &&
              null !== c &&
              ((i = c),
              a
                ? null != (o = Te(n, l)) && s.unshift(Wr(n, o, i))
                : a || (null != (o = Te(n, l)) && s.push(Wr(n, o, i)))),
              (n = n.return);
          }
          0 !== s.length && e.push({ event: t, listeners: s });
        }
        var Yr = /\r\n?/g,
          Jr = /\u0000|\uFFFD/g;
        function Gr(e) {
          return ("string" === typeof e ? e : "" + e)
            .replace(Yr, "\n")
            .replace(Jr, "");
        }
        function Xr(e, t, n) {
          if (((t = Gr(t)), Gr(e) !== t && n)) throw Error(l(425));
        }
        function Zr() {}
        var ea = null,
          ta = null;
        function na(e, t) {
          return (
            "textarea" === e ||
            "noscript" === e ||
            "string" === typeof t.children ||
            "number" === typeof t.children ||
            ("object" === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var ra = "function" === typeof setTimeout ? setTimeout : void 0,
          aa = "function" === typeof clearTimeout ? clearTimeout : void 0,
          la = "function" === typeof Promise ? Promise : void 0,
          sa =
            "function" === typeof queueMicrotask
              ? queueMicrotask
              : "undefined" !== typeof la
              ? function (e) {
                  return la.resolve(null).then(e).catch(ia);
                }
              : ra;
        function ia(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function oa(e, t) {
          var n = t,
            r = 0;
          do {
            var a = n.nextSibling;
            if ((e.removeChild(n), a && 8 === a.nodeType))
              if ("/$" === (n = a.data)) {
                if (0 === r) return e.removeChild(a), void Bt(t);
                r--;
              } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
            n = a;
          } while (n);
          Bt(t);
        }
        function ca(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
              if ("/$" === t) return null;
            }
          }
          return e;
        }
        function ua(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("$" === n || "$!" === n || "$?" === n) {
                if (0 === t) return e;
                t--;
              } else "/$" === n && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var da = Math.random().toString(36).slice(2),
          fa = "__reactFiber$" + da,
          pa = "__reactProps$" + da,
          ma = "__reactContainer$" + da,
          ha = "__reactEvents$" + da,
          ga = "__reactListeners$" + da,
          xa = "__reactHandles$" + da;
        function va(e) {
          var t = e[fa];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[ma] || n[fa])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = ua(e); null !== e; ) {
                  if ((n = e[fa])) return n;
                  e = ua(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function ba(e) {
          return !(e = e[fa] || e[ma]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function ya(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(l(33));
        }
        function wa(e) {
          return e[pa] || null;
        }
        var ja = [],
          Na = -1;
        function ka(e) {
          return { current: e };
        }
        function Sa(e) {
          0 > Na || ((e.current = ja[Na]), (ja[Na] = null), Na--);
        }
        function Ca(e, t) {
          Na++, (ja[Na] = e.current), (e.current = t);
        }
        var Ea = {},
          _a = ka(Ea),
          Pa = ka(!1),
          Da = Ea;
        function za(e, t) {
          var n = e.type.contextTypes;
          if (!n) return Ea;
          var r = e.stateNode;
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
          var a,
            l = {};
          for (a in n) l[a] = t[a];
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = l)),
            l
          );
        }
        function Ta(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function La() {
          Sa(Pa), Sa(_a);
        }
        function Aa(e, t, n) {
          if (_a.current !== Ea) throw Error(l(168));
          Ca(_a, t), Ca(Pa, n);
        }
        function Ra(e, t, n) {
          var r = e.stateNode;
          if (
            ((t = t.childContextTypes), "function" !== typeof r.getChildContext)
          )
            return n;
          for (var a in (r = r.getChildContext()))
            if (!(a in t)) throw Error(l(108, H(e) || "Unknown", a));
          return O({}, n, r);
        }
        function Ma(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Ea),
            (Da = _a.current),
            Ca(_a, e),
            Ca(Pa, Pa.current),
            !0
          );
        }
        function Oa(e, t, n) {
          var r = e.stateNode;
          if (!r) throw Error(l(169));
          n
            ? ((e = Ra(e, t, Da)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              Sa(Pa),
              Sa(_a),
              Ca(_a, e))
            : Sa(Pa),
            Ca(Pa, n);
        }
        var Ia = null,
          Fa = !1,
          Ua = !1;
        function Va(e) {
          null === Ia ? (Ia = [e]) : Ia.push(e);
        }
        function Ba() {
          if (!Ua && null !== Ia) {
            Ua = !0;
            var e = 0,
              t = bt;
            try {
              var n = Ia;
              for (bt = 1; e < n.length; e++) {
                var r = n[e];
                do {
                  r = r(!0);
                } while (null !== r);
              }
              (Ia = null), (Fa = !1);
            } catch (a) {
              throw (null !== Ia && (Ia = Ia.slice(e + 1)), Qe(Ze, Ba), a);
            } finally {
              (bt = t), (Ua = !1);
            }
          }
          return null;
        }
        var Ha = [],
          $a = 0,
          Wa = null,
          qa = 0,
          Qa = [],
          Ka = 0,
          Ya = null,
          Ja = 1,
          Ga = "";
        function Xa(e, t) {
          (Ha[$a++] = qa), (Ha[$a++] = Wa), (Wa = e), (qa = t);
        }
        function Za(e, t, n) {
          (Qa[Ka++] = Ja), (Qa[Ka++] = Ga), (Qa[Ka++] = Ya), (Ya = e);
          var r = Ja;
          e = Ga;
          var a = 32 - st(r) - 1;
          (r &= ~(1 << a)), (n += 1);
          var l = 32 - st(t) + a;
          if (30 < l) {
            var s = a - (a % 5);
            (l = (r & ((1 << s) - 1)).toString(32)),
              (r >>= s),
              (a -= s),
              (Ja = (1 << (32 - st(t) + a)) | (n << a) | r),
              (Ga = l + e);
          } else (Ja = (1 << l) | (n << a) | r), (Ga = e);
        }
        function el(e) {
          null !== e.return && (Xa(e, 1), Za(e, 1, 0));
        }
        function tl(e) {
          for (; e === Wa; )
            (Wa = Ha[--$a]), (Ha[$a] = null), (qa = Ha[--$a]), (Ha[$a] = null);
          for (; e === Ya; )
            (Ya = Qa[--Ka]),
              (Qa[Ka] = null),
              (Ga = Qa[--Ka]),
              (Qa[Ka] = null),
              (Ja = Qa[--Ka]),
              (Qa[Ka] = null);
        }
        var nl = null,
          rl = null,
          al = !1,
          ll = null;
        function sl(e, t) {
          var n = zc(5, null, null, 0);
          (n.elementType = "DELETED"),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n);
        }
        function il(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (nl = e), (rl = ca(t.firstChild)), !0)
              );
            case 6:
              return (
                null !==
                  (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (nl = e), (rl = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== Ya ? { id: Ja, overflow: Ga } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = zc(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (nl = e),
                (rl = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function ol(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function cl(e) {
          if (al) {
            var t = rl;
            if (t) {
              var n = t;
              if (!il(e, t)) {
                if (ol(e)) throw Error(l(418));
                t = ca(n.nextSibling);
                var r = nl;
                t && il(e, t)
                  ? sl(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (al = !1), (nl = e));
              }
            } else {
              if (ol(e)) throw Error(l(418));
              (e.flags = (-4097 & e.flags) | 2), (al = !1), (nl = e);
            }
          }
        }
        function ul(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return;
          nl = e;
        }
        function dl(e) {
          if (e !== nl) return !1;
          if (!al) return ul(e), (al = !0), !1;
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                "head" !== (t = e.type) &&
                "body" !== t &&
                !na(e.type, e.memoizedProps)),
            t && (t = rl))
          ) {
            if (ol(e)) throw (fl(), Error(l(418)));
            for (; t; ) sl(e, t), (t = ca(t.nextSibling));
          }
          if ((ul(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(l(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data;
                  if ("/$" === n) {
                    if (0 === t) {
                      rl = ca(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
                }
                e = e.nextSibling;
              }
              rl = null;
            }
          } else rl = nl ? ca(e.stateNode.nextSibling) : null;
          return !0;
        }
        function fl() {
          for (var e = rl; e; ) e = ca(e.nextSibling);
        }
        function pl() {
          (rl = nl = null), (al = !1);
        }
        function ml(e) {
          null === ll ? (ll = [e]) : ll.push(e);
        }
        var hl = y.ReactCurrentBatchConfig;
        function gl(e, t, n) {
          if (
            null !== (e = n.ref) &&
            "function" !== typeof e &&
            "object" !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(l(309));
                var r = n.stateNode;
              }
              if (!r) throw Error(l(147, e));
              var a = r,
                s = "" + e;
              return null !== t &&
                null !== t.ref &&
                "function" === typeof t.ref &&
                t.ref._stringRef === s
                ? t.ref
                : ((t = function (e) {
                    var t = a.refs;
                    null === e ? delete t[s] : (t[s] = e);
                  }),
                  (t._stringRef = s),
                  t);
            }
            if ("string" !== typeof e) throw Error(l(284));
            if (!n._owner) throw Error(l(290, e));
          }
          return e;
        }
        function xl(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              l(
                31,
                "[object Object]" === e
                  ? "object with keys {" + Object.keys(t).join(", ") + "}"
                  : e
              )
            ))
          );
        }
        function vl(e) {
          return (0, e._init)(e._payload);
        }
        function bl(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) t(n, r), (r = r.sibling);
            return null;
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling);
            return e;
          }
          function a(e, t) {
            return ((e = Lc(e, t)).index = 0), (e.sibling = null), e;
          }
          function s(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function i(t) {
            return e && null === t.alternate && (t.flags |= 2), t;
          }
          function o(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Oc(n, e.mode, r)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function c(e, t, n, r) {
            var l = n.type;
            return l === N
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                (t.elementType === l ||
                  ("object" === typeof l &&
                    null !== l &&
                    l.$$typeof === T &&
                    vl(l) === t.type))
              ? (((r = a(t, n.props)).ref = gl(e, t, n)), (r.return = e), r)
              : (((r = Ac(n.type, n.key, n.props, null, e.mode, r)).ref = gl(
                  e,
                  t,
                  n
                )),
                (r.return = e),
                r);
          }
          function u(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Ic(n, e.mode, r)).return = e), t)
              : (((t = a(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, l) {
            return null === t || 7 !== t.tag
              ? (((t = Rc(n, e.mode, r, l)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function f(e, t, n) {
            if (("string" === typeof t && "" !== t) || "number" === typeof t)
              return ((t = Oc("" + t, e.mode, n)).return = e), t;
            if ("object" === typeof t && null !== t) {
              switch (t.$$typeof) {
                case w:
                  return (
                    ((n = Ac(t.type, t.key, t.props, null, e.mode, n)).ref = gl(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  );
                case j:
                  return ((t = Ic(t, e.mode, n)).return = e), t;
                case T:
                  return f(e, (0, t._init)(t._payload), n);
              }
              if (te(t) || R(t))
                return ((t = Rc(t, e.mode, n, null)).return = e), t;
              xl(e, t);
            }
            return null;
          }
          function p(e, t, n, r) {
            var a = null !== t ? t.key : null;
            if (("string" === typeof n && "" !== n) || "number" === typeof n)
              return null !== a ? null : o(e, t, "" + n, r);
            if ("object" === typeof n && null !== n) {
              switch (n.$$typeof) {
                case w:
                  return n.key === a ? c(e, t, n, r) : null;
                case j:
                  return n.key === a ? u(e, t, n, r) : null;
                case T:
                  return p(e, t, (a = n._init)(n._payload), r);
              }
              if (te(n) || R(n)) return null !== a ? null : d(e, t, n, r, null);
              xl(e, n);
            }
            return null;
          }
          function m(e, t, n, r, a) {
            if (("string" === typeof r && "" !== r) || "number" === typeof r)
              return o(t, (e = e.get(n) || null), "" + r, a);
            if ("object" === typeof r && null !== r) {
              switch (r.$$typeof) {
                case w:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a
                  );
                case j:
                  return u(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a
                  );
                case T:
                  return m(e, t, n, (0, r._init)(r._payload), a);
              }
              if (te(r) || R(r))
                return d(t, (e = e.get(n) || null), r, a, null);
              xl(t, r);
            }
            return null;
          }
          function h(a, l, i, o) {
            for (
              var c = null, u = null, d = l, h = (l = 0), g = null;
              null !== d && h < i.length;
              h++
            ) {
              d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
              var x = p(a, d, i[h], o);
              if (null === x) {
                null === d && (d = g);
                break;
              }
              e && d && null === x.alternate && t(a, d),
                (l = s(x, l, h)),
                null === u ? (c = x) : (u.sibling = x),
                (u = x),
                (d = g);
            }
            if (h === i.length) return n(a, d), al && Xa(a, h), c;
            if (null === d) {
              for (; h < i.length; h++)
                null !== (d = f(a, i[h], o)) &&
                  ((l = s(d, l, h)),
                  null === u ? (c = d) : (u.sibling = d),
                  (u = d));
              return al && Xa(a, h), c;
            }
            for (d = r(a, d); h < i.length; h++)
              null !== (g = m(d, a, h, i[h], o)) &&
                (e &&
                  null !== g.alternate &&
                  d.delete(null === g.key ? h : g.key),
                (l = s(g, l, h)),
                null === u ? (c = g) : (u.sibling = g),
                (u = g));
            return (
              e &&
                d.forEach(function (e) {
                  return t(a, e);
                }),
              al && Xa(a, h),
              c
            );
          }
          function g(a, i, o, c) {
            var u = R(o);
            if ("function" !== typeof u) throw Error(l(150));
            if (null == (o = u.call(o))) throw Error(l(151));
            for (
              var d = (u = null), h = i, g = (i = 0), x = null, v = o.next();
              null !== h && !v.done;
              g++, v = o.next()
            ) {
              h.index > g ? ((x = h), (h = null)) : (x = h.sibling);
              var b = p(a, h, v.value, c);
              if (null === b) {
                null === h && (h = x);
                break;
              }
              e && h && null === b.alternate && t(a, h),
                (i = s(b, i, g)),
                null === d ? (u = b) : (d.sibling = b),
                (d = b),
                (h = x);
            }
            if (v.done) return n(a, h), al && Xa(a, g), u;
            if (null === h) {
              for (; !v.done; g++, v = o.next())
                null !== (v = f(a, v.value, c)) &&
                  ((i = s(v, i, g)),
                  null === d ? (u = v) : (d.sibling = v),
                  (d = v));
              return al && Xa(a, g), u;
            }
            for (h = r(a, h); !v.done; g++, v = o.next())
              null !== (v = m(h, a, g, v.value, c)) &&
                (e &&
                  null !== v.alternate &&
                  h.delete(null === v.key ? g : v.key),
                (i = s(v, i, g)),
                null === d ? (u = v) : (d.sibling = v),
                (d = v));
            return (
              e &&
                h.forEach(function (e) {
                  return t(a, e);
                }),
              al && Xa(a, g),
              u
            );
          }
          return function e(r, l, s, o) {
            if (
              ("object" === typeof s &&
                null !== s &&
                s.type === N &&
                null === s.key &&
                (s = s.props.children),
              "object" === typeof s && null !== s)
            ) {
              switch (s.$$typeof) {
                case w:
                  e: {
                    for (var c = s.key, u = l; null !== u; ) {
                      if (u.key === c) {
                        if ((c = s.type) === N) {
                          if (7 === u.tag) {
                            n(r, u.sibling),
                              ((l = a(u, s.props.children)).return = r),
                              (r = l);
                            break e;
                          }
                        } else if (
                          u.elementType === c ||
                          ("object" === typeof c &&
                            null !== c &&
                            c.$$typeof === T &&
                            vl(c) === u.type)
                        ) {
                          n(r, u.sibling),
                            ((l = a(u, s.props)).ref = gl(r, u, s)),
                            (l.return = r),
                            (r = l);
                          break e;
                        }
                        n(r, u);
                        break;
                      }
                      t(r, u), (u = u.sibling);
                    }
                    s.type === N
                      ? (((l = Rc(s.props.children, r.mode, o, s.key)).return =
                          r),
                        (r = l))
                      : (((o = Ac(
                          s.type,
                          s.key,
                          s.props,
                          null,
                          r.mode,
                          o
                        )).ref = gl(r, l, s)),
                        (o.return = r),
                        (r = o));
                  }
                  return i(r);
                case j:
                  e: {
                    for (u = s.key; null !== l; ) {
                      if (l.key === u) {
                        if (
                          4 === l.tag &&
                          l.stateNode.containerInfo === s.containerInfo &&
                          l.stateNode.implementation === s.implementation
                        ) {
                          n(r, l.sibling),
                            ((l = a(l, s.children || [])).return = r),
                            (r = l);
                          break e;
                        }
                        n(r, l);
                        break;
                      }
                      t(r, l), (l = l.sibling);
                    }
                    ((l = Ic(s, r.mode, o)).return = r), (r = l);
                  }
                  return i(r);
                case T:
                  return e(r, l, (u = s._init)(s._payload), o);
              }
              if (te(s)) return h(r, l, s, o);
              if (R(s)) return g(r, l, s, o);
              xl(r, s);
            }
            return ("string" === typeof s && "" !== s) || "number" === typeof s
              ? ((s = "" + s),
                null !== l && 6 === l.tag
                  ? (n(r, l.sibling), ((l = a(l, s)).return = r), (r = l))
                  : (n(r, l), ((l = Oc(s, r.mode, o)).return = r), (r = l)),
                i(r))
              : n(r, l);
          };
        }
        var yl = bl(!0),
          wl = bl(!1),
          jl = ka(null),
          Nl = null,
          kl = null,
          Sl = null;
        function Cl() {
          Sl = kl = Nl = null;
        }
        function El(e) {
          var t = jl.current;
          Sa(jl), (e._currentValue = t);
        }
        function _l(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function Pl(e, t) {
          (Nl = e),
            (Sl = kl = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (vi = !0), (e.firstContext = null));
        }
        function Dl(e) {
          var t = e._currentValue;
          if (Sl !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === kl)
            ) {
              if (null === Nl) throw Error(l(308));
              (kl = e), (Nl.dependencies = { lanes: 0, firstContext: e });
            } else kl = kl.next = e;
          return t;
        }
        var zl = null;
        function Tl(e) {
          null === zl ? (zl = [e]) : zl.push(e);
        }
        function Ll(e, t, n, r) {
          var a = t.interleaved;
          return (
            null === a
              ? ((n.next = n), Tl(t))
              : ((n.next = a.next), (a.next = n)),
            (t.interleaved = n),
            Al(e, r)
          );
        }
        function Al(e, t) {
          e.lanes |= t;
          var n = e.alternate;
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return);
          return 3 === n.tag ? n.stateNode : null;
        }
        var Rl = !1;
        function Ml(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Ol(e, t) {
          (e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              });
        }
        function Il(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          };
        }
        function Fl(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & _o))) {
            var a = r.pending;
            return (
              null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
              (r.pending = t),
              Al(e, n)
            );
          }
          return (
            null === (a = r.interleaved)
              ? ((t.next = t), Tl(r))
              : ((t.next = a.next), (a.next = t)),
            (r.interleaved = t),
            Al(e, n)
          );
        }
        function Ul(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), vt(e, n);
          }
        }
        function Vl(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var a = null,
              l = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var s = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                };
                null === l ? (a = l = s) : (l = l.next = s), (n = n.next);
              } while (null !== n);
              null === l ? (a = l = t) : (l = l.next = t);
            } else a = l = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: l,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            );
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t);
        }
        function Bl(e, t, n, r) {
          var a = e.updateQueue;
          Rl = !1;
          var l = a.firstBaseUpdate,
            s = a.lastBaseUpdate,
            i = a.shared.pending;
          if (null !== i) {
            a.shared.pending = null;
            var o = i,
              c = o.next;
            (o.next = null), null === s ? (l = c) : (s.next = c), (s = o);
            var u = e.alternate;
            null !== u &&
              (i = (u = u.updateQueue).lastBaseUpdate) !== s &&
              (null === i ? (u.firstBaseUpdate = c) : (i.next = c),
              (u.lastBaseUpdate = o));
          }
          if (null !== l) {
            var d = a.baseState;
            for (s = 0, u = c = o = null, i = l; ; ) {
              var f = i.lane,
                p = i.eventTime;
              if ((r & f) === f) {
                null !== u &&
                  (u = u.next =
                    {
                      eventTime: p,
                      lane: 0,
                      tag: i.tag,
                      payload: i.payload,
                      callback: i.callback,
                      next: null,
                    });
                e: {
                  var m = e,
                    h = i;
                  switch (((f = t), (p = n), h.tag)) {
                    case 1:
                      if ("function" === typeof (m = h.payload)) {
                        d = m.call(p, d, f);
                        break e;
                      }
                      d = m;
                      break e;
                    case 3:
                      m.flags = (-65537 & m.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (f =
                            "function" === typeof (m = h.payload)
                              ? m.call(p, d, f)
                              : m) ||
                        void 0 === f
                      )
                        break e;
                      d = O({}, d, f);
                      break e;
                    case 2:
                      Rl = !0;
                  }
                }
                null !== i.callback &&
                  0 !== i.lane &&
                  ((e.flags |= 64),
                  null === (f = a.effects) ? (a.effects = [i]) : f.push(i));
              } else
                (p = {
                  eventTime: p,
                  lane: f,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null,
                }),
                  null === u ? ((c = u = p), (o = d)) : (u = u.next = p),
                  (s |= f);
              if (null === (i = i.next)) {
                if (null === (i = a.shared.pending)) break;
                (i = (f = i).next),
                  (f.next = null),
                  (a.lastBaseUpdate = f),
                  (a.shared.pending = null);
              }
            }
            if (
              (null === u && (o = d),
              (a.baseState = o),
              (a.firstBaseUpdate = c),
              (a.lastBaseUpdate = u),
              null !== (t = a.shared.interleaved))
            ) {
              a = t;
              do {
                (s |= a.lane), (a = a.next);
              } while (a !== t);
            } else null === l && (a.shared.lanes = 0);
            (Mo |= s), (e.lanes = s), (e.memoizedState = d);
          }
        }
        function Hl(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                a = r.callback;
              if (null !== a) {
                if (((r.callback = null), (r = n), "function" !== typeof a))
                  throw Error(l(191, a));
                a.call(r);
              }
            }
        }
        var $l = {},
          Wl = ka($l),
          ql = ka($l),
          Ql = ka($l);
        function Kl(e) {
          if (e === $l) throw Error(l(174));
          return e;
        }
        function Yl(e, t) {
          switch ((Ca(Ql, t), Ca(ql, e), Ca(Wl, $l), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : oe(null, "");
              break;
            default:
              t = oe(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              );
          }
          Sa(Wl), Ca(Wl, t);
        }
        function Jl() {
          Sa(Wl), Sa(ql), Sa(Ql);
        }
        function Gl(e) {
          Kl(Ql.current);
          var t = Kl(Wl.current),
            n = oe(t, e.type);
          t !== n && (Ca(ql, e), Ca(Wl, n));
        }
        function Xl(e) {
          ql.current === e && (Sa(Wl), Sa(ql));
        }
        var Zl = ka(0);
        function es(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  "$?" === n.data ||
                  "$!" === n.data)
              )
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
          return null;
        }
        var ts = [];
        function ns() {
          for (var e = 0; e < ts.length; e++)
            ts[e]._workInProgressVersionPrimary = null;
          ts.length = 0;
        }
        var rs = y.ReactCurrentDispatcher,
          as = y.ReactCurrentBatchConfig,
          ls = 0,
          ss = null,
          is = null,
          os = null,
          cs = !1,
          us = !1,
          ds = 0,
          fs = 0;
        function ps() {
          throw Error(l(321));
        }
        function ms(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!ir(e[n], t[n])) return !1;
          return !0;
        }
        function hs(e, t, n, r, a, s) {
          if (
            ((ls = s),
            (ss = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (rs.current = null === e || null === e.memoizedState ? Xs : Zs),
            (e = n(r, a)),
            us)
          ) {
            s = 0;
            do {
              if (((us = !1), (ds = 0), 25 <= s)) throw Error(l(301));
              (s += 1),
                (os = is = null),
                (t.updateQueue = null),
                (rs.current = ei),
                (e = n(r, a));
            } while (us);
          }
          if (
            ((rs.current = Gs),
            (t = null !== is && null !== is.next),
            (ls = 0),
            (os = is = ss = null),
            (cs = !1),
            t)
          )
            throw Error(l(300));
          return e;
        }
        function gs() {
          var e = 0 !== ds;
          return (ds = 0), e;
        }
        function xs() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === os ? (ss.memoizedState = os = e) : (os = os.next = e), os
          );
        }
        function vs() {
          if (null === is) {
            var e = ss.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = is.next;
          var t = null === os ? ss.memoizedState : os.next;
          if (null !== t) (os = t), (is = e);
          else {
            if (null === e) throw Error(l(310));
            (e = {
              memoizedState: (is = e).memoizedState,
              baseState: is.baseState,
              baseQueue: is.baseQueue,
              queue: is.queue,
              next: null,
            }),
              null === os ? (ss.memoizedState = os = e) : (os = os.next = e);
          }
          return os;
        }
        function bs(e, t) {
          return "function" === typeof t ? t(e) : t;
        }
        function ys(e) {
          var t = vs(),
            n = t.queue;
          if (null === n) throw Error(l(311));
          n.lastRenderedReducer = e;
          var r = is,
            a = r.baseQueue,
            s = n.pending;
          if (null !== s) {
            if (null !== a) {
              var i = a.next;
              (a.next = s.next), (s.next = i);
            }
            (r.baseQueue = a = s), (n.pending = null);
          }
          if (null !== a) {
            (s = a.next), (r = r.baseState);
            var o = (i = null),
              c = null,
              u = s;
            do {
              var d = u.lane;
              if ((ls & d) === d)
                null !== c &&
                  (c = c.next =
                    {
                      lane: 0,
                      action: u.action,
                      hasEagerState: u.hasEagerState,
                      eagerState: u.eagerState,
                      next: null,
                    }),
                  (r = u.hasEagerState ? u.eagerState : e(r, u.action));
              else {
                var f = {
                  lane: d,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                };
                null === c ? ((o = c = f), (i = r)) : (c = c.next = f),
                  (ss.lanes |= d),
                  (Mo |= d);
              }
              u = u.next;
            } while (null !== u && u !== s);
            null === c ? (i = r) : (c.next = o),
              ir(r, t.memoizedState) || (vi = !0),
              (t.memoizedState = r),
              (t.baseState = i),
              (t.baseQueue = c),
              (n.lastRenderedState = r);
          }
          if (null !== (e = n.interleaved)) {
            a = e;
            do {
              (s = a.lane), (ss.lanes |= s), (Mo |= s), (a = a.next);
            } while (a !== e);
          } else null === a && (n.lanes = 0);
          return [t.memoizedState, n.dispatch];
        }
        function ws(e) {
          var t = vs(),
            n = t.queue;
          if (null === n) throw Error(l(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            a = n.pending,
            s = t.memoizedState;
          if (null !== a) {
            n.pending = null;
            var i = (a = a.next);
            do {
              (s = e(s, i.action)), (i = i.next);
            } while (i !== a);
            ir(s, t.memoizedState) || (vi = !0),
              (t.memoizedState = s),
              null === t.baseQueue && (t.baseState = s),
              (n.lastRenderedState = s);
          }
          return [s, r];
        }
        function js() {}
        function Ns(e, t) {
          var n = ss,
            r = vs(),
            a = t(),
            s = !ir(r.memoizedState, a);
          if (
            (s && ((r.memoizedState = a), (vi = !0)),
            (r = r.queue),
            Rs(Cs.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              s ||
              (null !== os && 1 & os.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ds(9, Ss.bind(null, n, r, a, t), void 0, null),
              null === Po)
            )
              throw Error(l(349));
            0 !== (30 & ls) || ks(n, t, a);
          }
          return a;
        }
        function ks(e, t, n) {
          (e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = ss.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (ss.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
              ? (t.stores = [e])
              : n.push(e);
        }
        function Ss(e, t, n, r) {
          (t.value = n), (t.getSnapshot = r), Es(t) && _s(e);
        }
        function Cs(e, t, n) {
          return n(function () {
            Es(t) && _s(e);
          });
        }
        function Es(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !ir(e, n);
          } catch (r) {
            return !0;
          }
        }
        function _s(e) {
          var t = Al(e, 1);
          null !== t && nc(t, e, 1, -1);
        }
        function Ps(e) {
          var t = xs();
          return (
            "function" === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: bs,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Qs.bind(null, ss, e)),
            [t.memoizedState, e]
          );
        }
        function Ds(e, t, n, r) {
          return (
            (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
            null === (t = ss.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (ss.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          );
        }
        function zs() {
          return vs().memoizedState;
        }
        function Ts(e, t, n, r) {
          var a = xs();
          (ss.flags |= e),
            (a.memoizedState = Ds(1 | t, n, void 0, void 0 === r ? null : r));
        }
        function Ls(e, t, n, r) {
          var a = vs();
          r = void 0 === r ? null : r;
          var l = void 0;
          if (null !== is) {
            var s = is.memoizedState;
            if (((l = s.destroy), null !== r && ms(r, s.deps)))
              return void (a.memoizedState = Ds(t, n, l, r));
          }
          (ss.flags |= e), (a.memoizedState = Ds(1 | t, n, l, r));
        }
        function As(e, t) {
          return Ts(8390656, 8, e, t);
        }
        function Rs(e, t) {
          return Ls(2048, 8, e, t);
        }
        function Ms(e, t) {
          return Ls(4, 2, e, t);
        }
        function Os(e, t) {
          return Ls(4, 4, e, t);
        }
        function Is(e, t) {
          return "function" === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
            ? ((e = e()),
              (t.current = e),
              function () {
                t.current = null;
              })
            : void 0;
        }
        function Fs(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Ls(4, 4, Is.bind(null, t, e), n)
          );
        }
        function Us() {}
        function Vs(e, t) {
          var n = vs();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ms(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function Bs(e, t) {
          var n = vs();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ms(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        }
        function Hs(e, t, n) {
          return 0 === (21 & ls)
            ? (e.baseState && ((e.baseState = !1), (vi = !0)),
              (e.memoizedState = n))
            : (ir(n, t) ||
                ((n = ht()), (ss.lanes |= n), (Mo |= n), (e.baseState = !0)),
              t);
        }
        function $s(e, t) {
          var n = bt;
          (bt = 0 !== n && 4 > n ? n : 4), e(!0);
          var r = as.transition;
          as.transition = {};
          try {
            e(!1), t();
          } finally {
            (bt = n), (as.transition = r);
          }
        }
        function Ws() {
          return vs().memoizedState;
        }
        function qs(e, t, n) {
          var r = tc(e);
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            Ks(e))
          )
            Ys(t, n);
          else if (null !== (n = Ll(e, t, n, r))) {
            nc(n, e, r, ec()), Js(n, t, r);
          }
        }
        function Qs(e, t, n) {
          var r = tc(e),
            a = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            };
          if (Ks(e)) Ys(t, a);
          else {
            var l = e.alternate;
            if (
              0 === e.lanes &&
              (null === l || 0 === l.lanes) &&
              null !== (l = t.lastRenderedReducer)
            )
              try {
                var s = t.lastRenderedState,
                  i = l(s, n);
                if (((a.hasEagerState = !0), (a.eagerState = i), ir(i, s))) {
                  var o = t.interleaved;
                  return (
                    null === o
                      ? ((a.next = a), Tl(t))
                      : ((a.next = o.next), (o.next = a)),
                    void (t.interleaved = a)
                  );
                }
              } catch (c) {}
            null !== (n = Ll(e, t, a, r)) &&
              (nc(n, e, r, (a = ec())), Js(n, t, r));
          }
        }
        function Ks(e) {
          var t = e.alternate;
          return e === ss || (null !== t && t === ss);
        }
        function Ys(e, t) {
          us = cs = !0;
          var n = e.pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
        function Js(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), vt(e, n);
          }
        }
        var Gs = {
            readContext: Dl,
            useCallback: ps,
            useContext: ps,
            useEffect: ps,
            useImperativeHandle: ps,
            useInsertionEffect: ps,
            useLayoutEffect: ps,
            useMemo: ps,
            useReducer: ps,
            useRef: ps,
            useState: ps,
            useDebugValue: ps,
            useDeferredValue: ps,
            useTransition: ps,
            useMutableSource: ps,
            useSyncExternalStore: ps,
            useId: ps,
            unstable_isNewReconciler: !1,
          },
          Xs = {
            readContext: Dl,
            useCallback: function (e, t) {
              return (xs().memoizedState = [e, void 0 === t ? null : t]), e;
            },
            useContext: Dl,
            useEffect: As,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                Ts(4194308, 4, Is.bind(null, t, e), n)
              );
            },
            useLayoutEffect: function (e, t) {
              return Ts(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return Ts(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = xs();
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              );
            },
            useReducer: function (e, t, n) {
              var r = xs();
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = qs.bind(null, ss, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return (e = { current: e }), (xs().memoizedState = e);
            },
            useState: Ps,
            useDebugValue: Us,
            useDeferredValue: function (e) {
              return (xs().memoizedState = e);
            },
            useTransition: function () {
              var e = Ps(!1),
                t = e[0];
              return (
                (e = $s.bind(null, e[1])), (xs().memoizedState = e), [t, e]
              );
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = ss,
                a = xs();
              if (al) {
                if (void 0 === n) throw Error(l(407));
                n = n();
              } else {
                if (((n = t()), null === Po)) throw Error(l(349));
                0 !== (30 & ls) || ks(r, t, n);
              }
              a.memoizedState = n;
              var s = { value: n, getSnapshot: t };
              return (
                (a.queue = s),
                As(Cs.bind(null, r, s, e), [e]),
                (r.flags |= 2048),
                Ds(9, Ss.bind(null, r, s, n, t), void 0, null),
                n
              );
            },
            useId: function () {
              var e = xs(),
                t = Po.identifierPrefix;
              if (al) {
                var n = Ga;
                (t =
                  ":" +
                  t +
                  "R" +
                  (n = (Ja & ~(1 << (32 - st(Ja) - 1))).toString(32) + n)),
                  0 < (n = ds++) && (t += "H" + n.toString(32)),
                  (t += ":");
              } else t = ":" + t + "r" + (n = fs++).toString(32) + ":";
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          Zs = {
            readContext: Dl,
            useCallback: Vs,
            useContext: Dl,
            useEffect: Rs,
            useImperativeHandle: Fs,
            useInsertionEffect: Ms,
            useLayoutEffect: Os,
            useMemo: Bs,
            useReducer: ys,
            useRef: zs,
            useState: function () {
              return ys(bs);
            },
            useDebugValue: Us,
            useDeferredValue: function (e) {
              return Hs(vs(), is.memoizedState, e);
            },
            useTransition: function () {
              return [ys(bs)[0], vs().memoizedState];
            },
            useMutableSource: js,
            useSyncExternalStore: Ns,
            useId: Ws,
            unstable_isNewReconciler: !1,
          },
          ei = {
            readContext: Dl,
            useCallback: Vs,
            useContext: Dl,
            useEffect: Rs,
            useImperativeHandle: Fs,
            useInsertionEffect: Ms,
            useLayoutEffect: Os,
            useMemo: Bs,
            useReducer: ws,
            useRef: zs,
            useState: function () {
              return ws(bs);
            },
            useDebugValue: Us,
            useDeferredValue: function (e) {
              var t = vs();
              return null === is
                ? (t.memoizedState = e)
                : Hs(t, is.memoizedState, e);
            },
            useTransition: function () {
              return [ws(bs)[0], vs().memoizedState];
            },
            useMutableSource: js,
            useSyncExternalStore: Ns,
            useId: Ws,
            unstable_isNewReconciler: !1,
          };
        function ti(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = O({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          return t;
        }
        function ni(e, t, n, r) {
          (n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : O({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n);
        }
        var ri = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && Be(e) === e;
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = ec(),
              a = tc(e),
              l = Il(r, a);
            (l.payload = t),
              void 0 !== n && null !== n && (l.callback = n),
              null !== (t = Fl(e, l, a)) && (nc(t, e, a, r), Ul(t, e, a));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = ec(),
              a = tc(e),
              l = Il(r, a);
            (l.tag = 1),
              (l.payload = t),
              void 0 !== n && null !== n && (l.callback = n),
              null !== (t = Fl(e, l, a)) && (nc(t, e, a, r), Ul(t, e, a));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = ec(),
              r = tc(e),
              a = Il(n, r);
            (a.tag = 2),
              void 0 !== t && null !== t && (a.callback = t),
              null !== (t = Fl(e, a, r)) && (nc(t, e, r, n), Ul(t, e, r));
          },
        };
        function ai(e, t, n, r, a, l, s) {
          return "function" === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, l, s)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !or(n, r) ||
                !or(a, l);
        }
        function li(e, t, n) {
          var r = !1,
            a = Ea,
            l = t.contextType;
          return (
            "object" === typeof l && null !== l
              ? (l = Dl(l))
              : ((a = Ta(t) ? Da : _a.current),
                (l = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? za(e, a)
                  : Ea)),
            (t = new t(n, l)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = ri),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                a),
              (e.__reactInternalMemoizedMaskedChildContext = l)),
            t
          );
        }
        function si(e, t, n, r) {
          (e = t.state),
            "function" === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            "function" === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && ri.enqueueReplaceState(t, t.state, null);
        }
        function ii(e, t, n, r) {
          var a = e.stateNode;
          (a.props = n), (a.state = e.memoizedState), (a.refs = {}), Ml(e);
          var l = t.contextType;
          "object" === typeof l && null !== l
            ? (a.context = Dl(l))
            : ((l = Ta(t) ? Da : _a.current), (a.context = za(e, l))),
            (a.state = e.memoizedState),
            "function" === typeof (l = t.getDerivedStateFromProps) &&
              (ni(e, t, l, n), (a.state = e.memoizedState)),
            "function" === typeof t.getDerivedStateFromProps ||
              "function" === typeof a.getSnapshotBeforeUpdate ||
              ("function" !== typeof a.UNSAFE_componentWillMount &&
                "function" !== typeof a.componentWillMount) ||
              ((t = a.state),
              "function" === typeof a.componentWillMount &&
                a.componentWillMount(),
              "function" === typeof a.UNSAFE_componentWillMount &&
                a.UNSAFE_componentWillMount(),
              t !== a.state && ri.enqueueReplaceState(a, a.state, null),
              Bl(e, n, a, r),
              (a.state = e.memoizedState)),
            "function" === typeof a.componentDidMount && (e.flags |= 4194308);
        }
        function oi(e, t) {
          try {
            var n = "",
              r = t;
            do {
              (n += V(r)), (r = r.return);
            } while (r);
            var a = n;
          } catch (l) {
            a = "\nError generating stack: " + l.message + "\n" + l.stack;
          }
          return { value: e, source: t, stack: a, digest: null };
        }
        function ci(e, t, n) {
          return {
            value: e,
            source: null,
            stack: null != n ? n : null,
            digest: null != t ? t : null,
          };
        }
        function ui(e, t) {
          try {
            console.error(t.value);
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        var di = "function" === typeof WeakMap ? WeakMap : Map;
        function fi(e, t, n) {
          ((n = Il(-1, n)).tag = 3), (n.payload = { element: null });
          var r = t.value;
          return (
            (n.callback = function () {
              $o || (($o = !0), (Wo = r)), ui(0, t);
            }),
            n
          );
        }
        function pi(e, t, n) {
          (n = Il(-1, n)).tag = 3;
          var r = e.type.getDerivedStateFromError;
          if ("function" === typeof r) {
            var a = t.value;
            (n.payload = function () {
              return r(a);
            }),
              (n.callback = function () {
                ui(0, t);
              });
          }
          var l = e.stateNode;
          return (
            null !== l &&
              "function" === typeof l.componentDidCatch &&
              (n.callback = function () {
                ui(0, t),
                  "function" !== typeof r &&
                    (null === qo ? (qo = new Set([this])) : qo.add(this));
                var e = t.stack;
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : "",
                });
              }),
            n
          );
        }
        function mi(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new di();
            var a = new Set();
            r.set(t, a);
          } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
          a.has(n) || (a.add(n), (e = Sc.bind(null, e, t, n)), t.then(e, e));
        }
        function hi(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function gi(e, t, n, r, a) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = Il(-1, 1)).tag = 2), Fl(n, t, 1))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = a), e);
        }
        var xi = y.ReactCurrentOwner,
          vi = !1;
        function bi(e, t, n, r) {
          t.child = null === e ? wl(t, null, n, r) : yl(t, e.child, n, r);
        }
        function yi(e, t, n, r, a) {
          n = n.render;
          var l = t.ref;
          return (
            Pl(t, a),
            (r = hs(e, t, n, r, l, a)),
            (n = gs()),
            null === e || vi
              ? (al && n && el(t), (t.flags |= 1), bi(e, t, r, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                Hi(e, t, a))
          );
        }
        function wi(e, t, n, r, a) {
          if (null === e) {
            var l = n.type;
            return "function" !== typeof l ||
              Tc(l) ||
              void 0 !== l.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = Ac(n.type, null, r, t, t.mode, a)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = l), ji(e, t, l, r, a));
          }
          if (((l = e.child), 0 === (e.lanes & a))) {
            var s = l.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : or)(s, r) &&
              e.ref === t.ref
            )
              return Hi(e, t, a);
          }
          return (
            (t.flags |= 1),
            ((e = Lc(l, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function ji(e, t, n, r, a) {
          if (null !== e) {
            var l = e.memoizedProps;
            if (or(l, r) && e.ref === t.ref) {
              if (((vi = !1), (t.pendingProps = r = l), 0 === (e.lanes & a)))
                return (t.lanes = e.lanes), Hi(e, t, a);
              0 !== (131072 & e.flags) && (vi = !0);
            }
          }
          return Si(e, t, n, r, a);
        }
        function Ni(e, t, n) {
          var r = t.pendingProps,
            a = r.children,
            l = null !== e ? e.memoizedState : null;
          if ("hidden" === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Ca(Lo, To),
                (To |= n);
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== l ? l.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Ca(Lo, To),
                  (To |= e),
                  null
                );
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== l ? l.baseLanes : n),
                Ca(Lo, To),
                (To |= r);
            }
          else
            null !== l
              ? ((r = l.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Ca(Lo, To),
              (To |= r);
          return bi(e, t, a, n), t.child;
        }
        function ki(e, t) {
          var n = t.ref;
          ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function Si(e, t, n, r, a) {
          var l = Ta(n) ? Da : _a.current;
          return (
            (l = za(t, l)),
            Pl(t, a),
            (n = hs(e, t, n, r, l, a)),
            (r = gs()),
            null === e || vi
              ? (al && r && el(t), (t.flags |= 1), bi(e, t, n, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                Hi(e, t, a))
          );
        }
        function Ci(e, t, n, r, a) {
          if (Ta(n)) {
            var l = !0;
            Ma(t);
          } else l = !1;
          if ((Pl(t, a), null === t.stateNode))
            Bi(e, t), li(t, n, r), ii(t, n, r, a), (r = !0);
          else if (null === e) {
            var s = t.stateNode,
              i = t.memoizedProps;
            s.props = i;
            var o = s.context,
              c = n.contextType;
            "object" === typeof c && null !== c
              ? (c = Dl(c))
              : (c = za(t, (c = Ta(n) ? Da : _a.current)));
            var u = n.getDerivedStateFromProps,
              d =
                "function" === typeof u ||
                "function" === typeof s.getSnapshotBeforeUpdate;
            d ||
              ("function" !== typeof s.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof s.componentWillReceiveProps) ||
              ((i !== r || o !== c) && si(t, s, r, c)),
              (Rl = !1);
            var f = t.memoizedState;
            (s.state = f),
              Bl(t, r, s, a),
              (o = t.memoizedState),
              i !== r || f !== o || Pa.current || Rl
                ? ("function" === typeof u &&
                    (ni(t, n, u, r), (o = t.memoizedState)),
                  (i = Rl || ai(t, n, i, r, f, o, c))
                    ? (d ||
                        ("function" !== typeof s.UNSAFE_componentWillMount &&
                          "function" !== typeof s.componentWillMount) ||
                        ("function" === typeof s.componentWillMount &&
                          s.componentWillMount(),
                        "function" === typeof s.UNSAFE_componentWillMount &&
                          s.UNSAFE_componentWillMount()),
                      "function" === typeof s.componentDidMount &&
                        (t.flags |= 4194308))
                    : ("function" === typeof s.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = o)),
                  (s.props = r),
                  (s.state = o),
                  (s.context = c),
                  (r = i))
                : ("function" === typeof s.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1));
          } else {
            (s = t.stateNode),
              Ol(e, t),
              (i = t.memoizedProps),
              (c = t.type === t.elementType ? i : ti(t.type, i)),
              (s.props = c),
              (d = t.pendingProps),
              (f = s.context),
              "object" === typeof (o = n.contextType) && null !== o
                ? (o = Dl(o))
                : (o = za(t, (o = Ta(n) ? Da : _a.current)));
            var p = n.getDerivedStateFromProps;
            (u =
              "function" === typeof p ||
              "function" === typeof s.getSnapshotBeforeUpdate) ||
              ("function" !== typeof s.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof s.componentWillReceiveProps) ||
              ((i !== d || f !== o) && si(t, s, r, o)),
              (Rl = !1),
              (f = t.memoizedState),
              (s.state = f),
              Bl(t, r, s, a);
            var m = t.memoizedState;
            i !== d || f !== m || Pa.current || Rl
              ? ("function" === typeof p &&
                  (ni(t, n, p, r), (m = t.memoizedState)),
                (c = Rl || ai(t, n, c, r, f, m, o) || !1)
                  ? (u ||
                      ("function" !== typeof s.UNSAFE_componentWillUpdate &&
                        "function" !== typeof s.componentWillUpdate) ||
                      ("function" === typeof s.componentWillUpdate &&
                        s.componentWillUpdate(r, m, o),
                      "function" === typeof s.UNSAFE_componentWillUpdate &&
                        s.UNSAFE_componentWillUpdate(r, m, o)),
                    "function" === typeof s.componentDidUpdate &&
                      (t.flags |= 4),
                    "function" === typeof s.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ("function" !== typeof s.componentDidUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    "function" !== typeof s.getSnapshotBeforeUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = m)),
                (s.props = r),
                (s.state = m),
                (s.context = o),
                (r = c))
              : ("function" !== typeof s.componentDidUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                "function" !== typeof s.getSnapshotBeforeUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return Ei(e, t, n, r, l, a);
        }
        function Ei(e, t, n, r, a, l) {
          ki(e, t);
          var s = 0 !== (128 & t.flags);
          if (!r && !s) return a && Oa(t, n, !1), Hi(e, t, l);
          (r = t.stateNode), (xi.current = t);
          var i =
            s && "function" !== typeof n.getDerivedStateFromError
              ? null
              : r.render();
          return (
            (t.flags |= 1),
            null !== e && s
              ? ((t.child = yl(t, e.child, null, l)),
                (t.child = yl(t, null, i, l)))
              : bi(e, t, i, l),
            (t.memoizedState = r.state),
            a && Oa(t, n, !0),
            t.child
          );
        }
        function _i(e) {
          var t = e.stateNode;
          t.pendingContext
            ? Aa(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Aa(0, t.context, !1),
            Yl(e, t.containerInfo);
        }
        function Pi(e, t, n, r, a) {
          return pl(), ml(a), (t.flags |= 256), bi(e, t, n, r), t.child;
        }
        var Di,
          zi,
          Ti,
          Li,
          Ai = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Ri(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Mi(e, t, n) {
          var r,
            a = t.pendingProps,
            s = Zl.current,
            i = !1,
            o = 0 !== (128 & t.flags);
          if (
            ((r = o) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & s)),
            r
              ? ((i = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (s |= 1),
            Ca(Zl, 1 & s),
            null === e)
          )
            return (
              cl(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : "$!" === e.data
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824),
                  null)
                : ((o = a.children),
                  (e = a.fallback),
                  i
                    ? ((a = t.mode),
                      (i = t.child),
                      (o = { mode: "hidden", children: o }),
                      0 === (1 & a) && null !== i
                        ? ((i.childLanes = 0), (i.pendingProps = o))
                        : (i = Mc(o, a, 0, null)),
                      (e = Rc(e, a, n, null)),
                      (i.return = t),
                      (e.return = t),
                      (i.sibling = e),
                      (t.child = i),
                      (t.child.memoizedState = Ri(n)),
                      (t.memoizedState = Ai),
                      e)
                    : Oi(t, o))
            );
          if (null !== (s = e.memoizedState) && null !== (r = s.dehydrated))
            return (function (e, t, n, r, a, s, i) {
              if (n)
                return 256 & t.flags
                  ? ((t.flags &= -257), Ii(e, t, i, (r = ci(Error(l(422))))))
                  : null !== t.memoizedState
                  ? ((t.child = e.child), (t.flags |= 128), null)
                  : ((s = r.fallback),
                    (a = t.mode),
                    (r = Mc(
                      { mode: "visible", children: r.children },
                      a,
                      0,
                      null
                    )),
                    ((s = Rc(s, a, i, null)).flags |= 2),
                    (r.return = t),
                    (s.return = t),
                    (r.sibling = s),
                    (t.child = r),
                    0 !== (1 & t.mode) && yl(t, e.child, null, i),
                    (t.child.memoizedState = Ri(i)),
                    (t.memoizedState = Ai),
                    s);
              if (0 === (1 & t.mode)) return Ii(e, t, i, null);
              if ("$!" === a.data) {
                if ((r = a.nextSibling && a.nextSibling.dataset))
                  var o = r.dgst;
                return (
                  (r = o), Ii(e, t, i, (r = ci((s = Error(l(419))), r, void 0)))
                );
              }
              if (((o = 0 !== (i & e.childLanes)), vi || o)) {
                if (null !== (r = Po)) {
                  switch (i & -i) {
                    case 4:
                      a = 2;
                      break;
                    case 16:
                      a = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      a = 32;
                      break;
                    case 536870912:
                      a = 268435456;
                      break;
                    default:
                      a = 0;
                  }
                  0 !== (a = 0 !== (a & (r.suspendedLanes | i)) ? 0 : a) &&
                    a !== s.retryLane &&
                    ((s.retryLane = a), Al(e, a), nc(r, e, a, -1));
                }
                return hc(), Ii(e, t, i, (r = ci(Error(l(421)))));
              }
              return "$?" === a.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Ec.bind(null, e)),
                  (a._reactRetry = t),
                  null)
                : ((e = s.treeContext),
                  (rl = ca(a.nextSibling)),
                  (nl = t),
                  (al = !0),
                  (ll = null),
                  null !== e &&
                    ((Qa[Ka++] = Ja),
                    (Qa[Ka++] = Ga),
                    (Qa[Ka++] = Ya),
                    (Ja = e.id),
                    (Ga = e.overflow),
                    (Ya = t)),
                  (t = Oi(t, r.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, o, a, r, s, n);
          if (i) {
            (i = a.fallback), (o = t.mode), (r = (s = e.child).sibling);
            var c = { mode: "hidden", children: a.children };
            return (
              0 === (1 & o) && t.child !== s
                ? (((a = t.child).childLanes = 0),
                  (a.pendingProps = c),
                  (t.deletions = null))
                : ((a = Lc(s, c)).subtreeFlags = 14680064 & s.subtreeFlags),
              null !== r
                ? (i = Lc(r, i))
                : ((i = Rc(i, o, n, null)).flags |= 2),
              (i.return = t),
              (a.return = t),
              (a.sibling = i),
              (t.child = a),
              (a = i),
              (i = t.child),
              (o =
                null === (o = e.child.memoizedState)
                  ? Ri(n)
                  : {
                      baseLanes: o.baseLanes | n,
                      cachePool: null,
                      transitions: o.transitions,
                    }),
              (i.memoizedState = o),
              (i.childLanes = e.childLanes & ~n),
              (t.memoizedState = Ai),
              a
            );
          }
          return (
            (e = (i = e.child).sibling),
            (a = Lc(i, { mode: "visible", children: a.children })),
            0 === (1 & t.mode) && (a.lanes = n),
            (a.return = t),
            (a.sibling = null),
            null !== e &&
              (null === (n = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : n.push(e)),
            (t.child = a),
            (t.memoizedState = null),
            a
          );
        }
        function Oi(e, t) {
          return (
            ((t = Mc(
              { mode: "visible", children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          );
        }
        function Ii(e, t, n, r) {
          return (
            null !== r && ml(r),
            yl(t, e.child, null, n),
            ((e = Oi(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function Fi(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          null !== r && (r.lanes |= t), _l(e.return, t, n);
        }
        function Ui(e, t, n, r, a) {
          var l = e.memoizedState;
          null === l
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: a,
              })
            : ((l.isBackwards = t),
              (l.rendering = null),
              (l.renderingStartTime = 0),
              (l.last = r),
              (l.tail = n),
              (l.tailMode = a));
        }
        function Vi(e, t, n) {
          var r = t.pendingProps,
            a = r.revealOrder,
            l = r.tail;
          if ((bi(e, t, r.children, n), 0 !== (2 & (r = Zl.current))))
            (r = (1 & r) | 2), (t.flags |= 128);
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Fi(e, n, t);
                else if (19 === e.tag) Fi(e, n, t);
                else if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            r &= 1;
          }
          if ((Ca(Zl, r), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (a) {
              case "forwards":
                for (n = t.child, a = null; null !== n; )
                  null !== (e = n.alternate) && null === es(e) && (a = n),
                    (n = n.sibling);
                null === (n = a)
                  ? ((a = t.child), (t.child = null))
                  : ((a = n.sibling), (n.sibling = null)),
                  Ui(t, !1, a, n, l);
                break;
              case "backwards":
                for (n = null, a = t.child, t.child = null; null !== a; ) {
                  if (null !== (e = a.alternate) && null === es(e)) {
                    t.child = a;
                    break;
                  }
                  (e = a.sibling), (a.sibling = n), (n = a), (a = e);
                }
                Ui(t, !0, n, null, l);
                break;
              case "together":
                Ui(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function Bi(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function Hi(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Mo |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(l(153));
          if (null !== t.child) {
            for (
              n = Lc((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = Lc(e, e.pendingProps)).return = t);
            n.sibling = null;
          }
          return t.child;
        }
        function $i(e, t) {
          if (!al)
            switch (e.tailMode) {
              case "hidden":
                t = e.tail;
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling);
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case "collapsed":
                n = e.tail;
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling);
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Wi(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var a = e.child; null !== a; )
              (n |= a.lanes | a.childLanes),
                (r |= 14680064 & a.subtreeFlags),
                (r |= 14680064 & a.flags),
                (a.return = e),
                (a = a.sibling);
          else
            for (a = e.child; null !== a; )
              (n |= a.lanes | a.childLanes),
                (r |= a.subtreeFlags),
                (r |= a.flags),
                (a.return = e),
                (a = a.sibling);
          return (e.subtreeFlags |= r), (e.childLanes = n), t;
        }
        function qi(e, t, n) {
          var r = t.pendingProps;
          switch ((tl(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return Wi(t), null;
            case 1:
            case 17:
              return Ta(t.type) && La(), Wi(t), null;
            case 3:
              return (
                (r = t.stateNode),
                Jl(),
                Sa(Pa),
                Sa(_a),
                ns(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (dl(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== ll && (sc(ll), (ll = null)))),
                zi(e, t),
                Wi(t),
                null
              );
            case 5:
              Xl(t);
              var a = Kl(Ql.current);
              if (((n = t.type), null !== e && null != t.stateNode))
                Ti(e, t, n, r, a),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(l(166));
                  return Wi(t), null;
                }
                if (((e = Kl(Wl.current)), dl(t))) {
                  (r = t.stateNode), (n = t.type);
                  var s = t.memoizedProps;
                  switch (
                    ((r[fa] = t), (r[pa] = s), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case "dialog":
                      Fr("cancel", r), Fr("close", r);
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      Fr("load", r);
                      break;
                    case "video":
                    case "audio":
                      for (a = 0; a < Rr.length; a++) Fr(Rr[a], r);
                      break;
                    case "source":
                      Fr("error", r);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      Fr("error", r), Fr("load", r);
                      break;
                    case "details":
                      Fr("toggle", r);
                      break;
                    case "input":
                      J(r, s), Fr("invalid", r);
                      break;
                    case "select":
                      (r._wrapperState = { wasMultiple: !!s.multiple }),
                        Fr("invalid", r);
                      break;
                    case "textarea":
                      ae(r, s), Fr("invalid", r);
                  }
                  for (var o in (ve(n, s), (a = null), s))
                    if (s.hasOwnProperty(o)) {
                      var c = s[o];
                      "children" === o
                        ? "string" === typeof c
                          ? r.textContent !== c &&
                            (!0 !== s.suppressHydrationWarning &&
                              Xr(r.textContent, c, e),
                            (a = ["children", c]))
                          : "number" === typeof c &&
                            r.textContent !== "" + c &&
                            (!0 !== s.suppressHydrationWarning &&
                              Xr(r.textContent, c, e),
                            (a = ["children", "" + c]))
                        : i.hasOwnProperty(o) &&
                          null != c &&
                          "onScroll" === o &&
                          Fr("scroll", r);
                    }
                  switch (n) {
                    case "input":
                      q(r), Z(r, s, !0);
                      break;
                    case "textarea":
                      q(r), se(r);
                      break;
                    case "select":
                    case "option":
                      break;
                    default:
                      "function" === typeof s.onClick && (r.onclick = Zr);
                  }
                  (r = a), (t.updateQueue = r), null !== r && (t.flags |= 4);
                } else {
                  (o = 9 === a.nodeType ? a : a.ownerDocument),
                    "http://www.w3.org/1999/xhtml" === e && (e = ie(n)),
                    "http://www.w3.org/1999/xhtml" === e
                      ? "script" === n
                        ? (((e = o.createElement("div")).innerHTML =
                            "<script></script>"),
                          (e = e.removeChild(e.firstChild)))
                        : "string" === typeof r.is
                        ? (e = o.createElement(n, { is: r.is }))
                        : ((e = o.createElement(n)),
                          "select" === n &&
                            ((o = e),
                            r.multiple
                              ? (o.multiple = !0)
                              : r.size && (o.size = r.size)))
                      : (e = o.createElementNS(e, n)),
                    (e[fa] = t),
                    (e[pa] = r),
                    Di(e, t, !1, !1),
                    (t.stateNode = e);
                  e: {
                    switch (((o = be(n, r)), n)) {
                      case "dialog":
                        Fr("cancel", e), Fr("close", e), (a = r);
                        break;
                      case "iframe":
                      case "object":
                      case "embed":
                        Fr("load", e), (a = r);
                        break;
                      case "video":
                      case "audio":
                        for (a = 0; a < Rr.length; a++) Fr(Rr[a], e);
                        a = r;
                        break;
                      case "source":
                        Fr("error", e), (a = r);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Fr("error", e), Fr("load", e), (a = r);
                        break;
                      case "details":
                        Fr("toggle", e), (a = r);
                        break;
                      case "input":
                        J(e, r), (a = Y(e, r)), Fr("invalid", e);
                        break;
                      case "option":
                      default:
                        a = r;
                        break;
                      case "select":
                        (e._wrapperState = { wasMultiple: !!r.multiple }),
                          (a = O({}, r, { value: void 0 })),
                          Fr("invalid", e);
                        break;
                      case "textarea":
                        ae(e, r), (a = re(e, r)), Fr("invalid", e);
                    }
                    for (s in (ve(n, a), (c = a)))
                      if (c.hasOwnProperty(s)) {
                        var u = c[s];
                        "style" === s
                          ? ge(e, u)
                          : "dangerouslySetInnerHTML" === s
                          ? null != (u = u ? u.__html : void 0) && de(e, u)
                          : "children" === s
                          ? "string" === typeof u
                            ? ("textarea" !== n || "" !== u) && fe(e, u)
                            : "number" === typeof u && fe(e, "" + u)
                          : "suppressContentEditableWarning" !== s &&
                            "suppressHydrationWarning" !== s &&
                            "autoFocus" !== s &&
                            (i.hasOwnProperty(s)
                              ? null != u && "onScroll" === s && Fr("scroll", e)
                              : null != u && b(e, s, u, o));
                      }
                    switch (n) {
                      case "input":
                        q(e), Z(e, r, !1);
                        break;
                      case "textarea":
                        q(e), se(e);
                        break;
                      case "option":
                        null != r.value &&
                          e.setAttribute("value", "" + $(r.value));
                        break;
                      case "select":
                        (e.multiple = !!r.multiple),
                          null != (s = r.value)
                            ? ne(e, !!r.multiple, s, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0);
                        break;
                      default:
                        "function" === typeof a.onClick && (e.onclick = Zr);
                    }
                    switch (n) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        r = !!r.autoFocus;
                        break e;
                      case "img":
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                  }
                  r && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return Wi(t), null;
            case 6:
              if (e && null != t.stateNode) Li(e, t, e.memoizedProps, r);
              else {
                if ("string" !== typeof r && null === t.stateNode)
                  throw Error(l(166));
                if (((n = Kl(Ql.current)), Kl(Wl.current), dl(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[fa] = t),
                    (s = r.nodeValue !== n) && null !== (e = nl))
                  )
                    switch (e.tag) {
                      case 3:
                        Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                    }
                  s && (t.flags |= 4);
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[fa] = t),
                    (t.stateNode = r);
              }
              return Wi(t), null;
            case 13:
              if (
                (Sa(Zl),
                (r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (
                  al &&
                  null !== rl &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags)
                )
                  fl(), pl(), (t.flags |= 98560), (s = !1);
                else if (((s = dl(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!s) throw Error(l(318));
                    if (
                      !(s =
                        null !== (s = t.memoizedState) ? s.dehydrated : null)
                    )
                      throw Error(l(317));
                    s[fa] = t;
                  } else
                    pl(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4);
                  Wi(t), (s = !1);
                } else null !== ll && (sc(ll), (ll = null)), (s = !0);
                if (!s) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = n), t)
                : ((r = null !== r) !==
                    (null !== e && null !== e.memoizedState) &&
                    r &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & Zl.current)
                        ? 0 === Ao && (Ao = 3)
                        : hc())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Wi(t),
                  null);
            case 4:
              return (
                Jl(),
                zi(e, t),
                null === e && Br(t.stateNode.containerInfo),
                Wi(t),
                null
              );
            case 10:
              return El(t.type._context), Wi(t), null;
            case 19:
              if ((Sa(Zl), null === (s = t.memoizedState))) return Wi(t), null;
              if (((r = 0 !== (128 & t.flags)), null === (o = s.rendering)))
                if (r) $i(s, !1);
                else {
                  if (0 !== Ao || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (o = es(e))) {
                        for (
                          t.flags |= 128,
                            $i(s, !1),
                            null !== (r = o.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((s = n).flags &= 14680066),
                            null === (o = s.alternate)
                              ? ((s.childLanes = 0),
                                (s.lanes = e),
                                (s.child = null),
                                (s.subtreeFlags = 0),
                                (s.memoizedProps = null),
                                (s.memoizedState = null),
                                (s.updateQueue = null),
                                (s.dependencies = null),
                                (s.stateNode = null))
                              : ((s.childLanes = o.childLanes),
                                (s.lanes = o.lanes),
                                (s.child = o.child),
                                (s.subtreeFlags = 0),
                                (s.deletions = null),
                                (s.memoizedProps = o.memoizedProps),
                                (s.memoizedState = o.memoizedState),
                                (s.updateQueue = o.updateQueue),
                                (s.type = o.type),
                                (e = o.dependencies),
                                (s.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling);
                        return Ca(Zl, (1 & Zl.current) | 2), t.child;
                      }
                      e = e.sibling;
                    }
                  null !== s.tail &&
                    Ge() > Bo &&
                    ((t.flags |= 128),
                    (r = !0),
                    $i(s, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!r)
                  if (null !== (e = es(o))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      $i(s, !0),
                      null === s.tail &&
                        "hidden" === s.tailMode &&
                        !o.alternate &&
                        !al)
                    )
                      return Wi(t), null;
                  } else
                    2 * Ge() - s.renderingStartTime > Bo &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      $i(s, !1),
                      (t.lanes = 4194304));
                s.isBackwards
                  ? ((o.sibling = t.child), (t.child = o))
                  : (null !== (n = s.last) ? (n.sibling = o) : (t.child = o),
                    (s.last = o));
              }
              return null !== s.tail
                ? ((t = s.tail),
                  (s.rendering = t),
                  (s.tail = t.sibling),
                  (s.renderingStartTime = Ge()),
                  (t.sibling = null),
                  (n = Zl.current),
                  Ca(Zl, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (Wi(t), null);
            case 22:
            case 23:
              return (
                dc(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & To) &&
                    (Wi(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Wi(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(l(156, t.tag));
        }
        function Qi(e, t) {
          switch ((tl(t), t.tag)) {
            case 1:
              return (
                Ta(t.type) && La(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 3:
              return (
                Jl(),
                Sa(Pa),
                Sa(_a),
                ns(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return Xl(t), null;
            case 13:
              if (
                (Sa(Zl),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(l(340));
                pl();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return Sa(Zl), null;
            case 4:
              return Jl(), null;
            case 10:
              return El(t.type._context), null;
            case 22:
            case 23:
              return dc(), null;
            default:
              return null;
          }
        }
        (Di = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
            else if (4 !== n.tag && null !== n.child) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break;
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return;
              n = n.return;
            }
            (n.sibling.return = n.return), (n = n.sibling);
          }
        }),
          (zi = function () {}),
          (Ti = function (e, t, n, r) {
            var a = e.memoizedProps;
            if (a !== r) {
              (e = t.stateNode), Kl(Wl.current);
              var l,
                s = null;
              switch (n) {
                case "input":
                  (a = Y(e, a)), (r = Y(e, r)), (s = []);
                  break;
                case "select":
                  (a = O({}, a, { value: void 0 })),
                    (r = O({}, r, { value: void 0 })),
                    (s = []);
                  break;
                case "textarea":
                  (a = re(e, a)), (r = re(e, r)), (s = []);
                  break;
                default:
                  "function" !== typeof a.onClick &&
                    "function" === typeof r.onClick &&
                    (e.onclick = Zr);
              }
              for (u in (ve(n, r), (n = null), a))
                if (!r.hasOwnProperty(u) && a.hasOwnProperty(u) && null != a[u])
                  if ("style" === u) {
                    var o = a[u];
                    for (l in o)
                      o.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
                  } else
                    "dangerouslySetInnerHTML" !== u &&
                      "children" !== u &&
                      "suppressContentEditableWarning" !== u &&
                      "suppressHydrationWarning" !== u &&
                      "autoFocus" !== u &&
                      (i.hasOwnProperty(u)
                        ? s || (s = [])
                        : (s = s || []).push(u, null));
              for (u in r) {
                var c = r[u];
                if (
                  ((o = null != a ? a[u] : void 0),
                  r.hasOwnProperty(u) && c !== o && (null != c || null != o))
                )
                  if ("style" === u)
                    if (o) {
                      for (l in o)
                        !o.hasOwnProperty(l) ||
                          (c && c.hasOwnProperty(l)) ||
                          (n || (n = {}), (n[l] = ""));
                      for (l in c)
                        c.hasOwnProperty(l) &&
                          o[l] !== c[l] &&
                          (n || (n = {}), (n[l] = c[l]));
                    } else n || (s || (s = []), s.push(u, n)), (n = c);
                  else
                    "dangerouslySetInnerHTML" === u
                      ? ((c = c ? c.__html : void 0),
                        (o = o ? o.__html : void 0),
                        null != c && o !== c && (s = s || []).push(u, c))
                      : "children" === u
                      ? ("string" !== typeof c && "number" !== typeof c) ||
                        (s = s || []).push(u, "" + c)
                      : "suppressContentEditableWarning" !== u &&
                        "suppressHydrationWarning" !== u &&
                        (i.hasOwnProperty(u)
                          ? (null != c && "onScroll" === u && Fr("scroll", e),
                            s || o === c || (s = []))
                          : (s = s || []).push(u, c));
              }
              n && (s = s || []).push("style", n);
              var u = s;
              (t.updateQueue = u) && (t.flags |= 4);
            }
          }),
          (Li = function (e, t, n, r) {
            n !== r && (t.flags |= 4);
          });
        var Ki = !1,
          Yi = !1,
          Ji = "function" === typeof WeakSet ? WeakSet : Set,
          Gi = null;
        function Xi(e, t) {
          var n = e.ref;
          if (null !== n)
            if ("function" === typeof n)
              try {
                n(null);
              } catch (r) {
                kc(e, t, r);
              }
            else n.current = null;
        }
        function Zi(e, t, n) {
          try {
            n();
          } catch (r) {
            kc(e, t, r);
          }
        }
        var eo = !1;
        function to(e, t, n) {
          var r = t.updateQueue;
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var a = (r = r.next);
            do {
              if ((a.tag & e) === e) {
                var l = a.destroy;
                (a.destroy = void 0), void 0 !== l && Zi(t, n, l);
              }
              a = a.next;
            } while (a !== r);
          }
        }
        function no(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next);
            do {
              if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
              }
              n = n.next;
            } while (n !== t);
          }
        }
        function ro(e) {
          var t = e.ref;
          if (null !== t) {
            var n = e.stateNode;
            e.tag, (e = n), "function" === typeof t ? t(e) : (t.current = e);
          }
        }
        function ao(e) {
          var t = e.alternate;
          null !== t && ((e.alternate = null), ao(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[fa],
              delete t[pa],
              delete t[ha],
              delete t[ga],
              delete t[xa]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null);
        }
        function lo(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function so(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || lo(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              (e.child.return = e), (e = e.child);
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function io(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = Zr));
          else if (4 !== r && null !== (e = e.child))
            for (io(e, t, n), e = e.sibling; null !== e; )
              io(e, t, n), (e = e.sibling);
        }
        function oo(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
          else if (4 !== r && null !== (e = e.child))
            for (oo(e, t, n), e = e.sibling; null !== e; )
              oo(e, t, n), (e = e.sibling);
        }
        var co = null,
          uo = !1;
        function fo(e, t, n) {
          for (n = n.child; null !== n; ) po(e, t, n), (n = n.sibling);
        }
        function po(e, t, n) {
          if (lt && "function" === typeof lt.onCommitFiberUnmount)
            try {
              lt.onCommitFiberUnmount(at, n);
            } catch (i) {}
          switch (n.tag) {
            case 5:
              Yi || Xi(n, t);
            case 6:
              var r = co,
                a = uo;
              (co = null),
                fo(e, t, n),
                (uo = a),
                null !== (co = r) &&
                  (uo
                    ? ((e = co),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : co.removeChild(n.stateNode));
              break;
            case 18:
              null !== co &&
                (uo
                  ? ((e = co),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? oa(e.parentNode, n)
                      : 1 === e.nodeType && oa(e, n),
                    Bt(e))
                  : oa(co, n.stateNode));
              break;
            case 4:
              (r = co),
                (a = uo),
                (co = n.stateNode.containerInfo),
                (uo = !0),
                fo(e, t, n),
                (co = r),
                (uo = a);
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Yi &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                a = r = r.next;
                do {
                  var l = a,
                    s = l.destroy;
                  (l = l.tag),
                    void 0 !== s &&
                      (0 !== (2 & l) || 0 !== (4 & l)) &&
                      Zi(n, t, s),
                    (a = a.next);
                } while (a !== r);
              }
              fo(e, t, n);
              break;
            case 1:
              if (
                !Yi &&
                (Xi(n, t),
                "function" === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  (r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount();
                } catch (i) {
                  kc(n, t, i);
                }
              fo(e, t, n);
              break;
            case 21:
              fo(e, t, n);
              break;
            case 22:
              1 & n.mode
                ? ((Yi = (r = Yi) || null !== n.memoizedState),
                  fo(e, t, n),
                  (Yi = r))
                : fo(e, t, n);
              break;
            default:
              fo(e, t, n);
          }
        }
        function mo(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var n = e.stateNode;
            null === n && (n = e.stateNode = new Ji()),
              t.forEach(function (t) {
                var r = _c.bind(null, e, t);
                n.has(t) || (n.add(t), t.then(r, r));
              });
          }
        }
        function ho(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var a = n[r];
              try {
                var s = e,
                  i = t,
                  o = i;
                e: for (; null !== o; ) {
                  switch (o.tag) {
                    case 5:
                      (co = o.stateNode), (uo = !1);
                      break e;
                    case 3:
                    case 4:
                      (co = o.stateNode.containerInfo), (uo = !0);
                      break e;
                  }
                  o = o.return;
                }
                if (null === co) throw Error(l(160));
                po(s, i, a), (co = null), (uo = !1);
                var c = a.alternate;
                null !== c && (c.return = null), (a.return = null);
              } catch (u) {
                kc(a, t, u);
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) go(t, e), (t = t.sibling);
        }
        function go(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((ho(t, e), xo(e), 4 & r)) {
                try {
                  to(3, e, e.return), no(3, e);
                } catch (g) {
                  kc(e, e.return, g);
                }
                try {
                  to(5, e, e.return);
                } catch (g) {
                  kc(e, e.return, g);
                }
              }
              break;
            case 1:
              ho(t, e), xo(e), 512 & r && null !== n && Xi(n, n.return);
              break;
            case 5:
              if (
                (ho(t, e),
                xo(e),
                512 & r && null !== n && Xi(n, n.return),
                32 & e.flags)
              ) {
                var a = e.stateNode;
                try {
                  fe(a, "");
                } catch (g) {
                  kc(e, e.return, g);
                }
              }
              if (4 & r && null != (a = e.stateNode)) {
                var s = e.memoizedProps,
                  i = null !== n ? n.memoizedProps : s,
                  o = e.type,
                  c = e.updateQueue;
                if (((e.updateQueue = null), null !== c))
                  try {
                    "input" === o &&
                      "radio" === s.type &&
                      null != s.name &&
                      G(a, s),
                      be(o, i);
                    var u = be(o, s);
                    for (i = 0; i < c.length; i += 2) {
                      var d = c[i],
                        f = c[i + 1];
                      "style" === d
                        ? ge(a, f)
                        : "dangerouslySetInnerHTML" === d
                        ? de(a, f)
                        : "children" === d
                        ? fe(a, f)
                        : b(a, d, f, u);
                    }
                    switch (o) {
                      case "input":
                        X(a, s);
                        break;
                      case "textarea":
                        le(a, s);
                        break;
                      case "select":
                        var p = a._wrapperState.wasMultiple;
                        a._wrapperState.wasMultiple = !!s.multiple;
                        var m = s.value;
                        null != m
                          ? ne(a, !!s.multiple, m, !1)
                          : p !== !!s.multiple &&
                            (null != s.defaultValue
                              ? ne(a, !!s.multiple, s.defaultValue, !0)
                              : ne(a, !!s.multiple, s.multiple ? [] : "", !1));
                    }
                    a[pa] = s;
                  } catch (g) {
                    kc(e, e.return, g);
                  }
              }
              break;
            case 6:
              if ((ho(t, e), xo(e), 4 & r)) {
                if (null === e.stateNode) throw Error(l(162));
                (a = e.stateNode), (s = e.memoizedProps);
                try {
                  a.nodeValue = s;
                } catch (g) {
                  kc(e, e.return, g);
                }
              }
              break;
            case 3:
              if (
                (ho(t, e),
                xo(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Bt(t.containerInfo);
                } catch (g) {
                  kc(e, e.return, g);
                }
              break;
            case 4:
            default:
              ho(t, e), xo(e);
              break;
            case 13:
              ho(t, e),
                xo(e),
                8192 & (a = e.child).flags &&
                  ((s = null !== a.memoizedState),
                  (a.stateNode.isHidden = s),
                  !s ||
                    (null !== a.alternate &&
                      null !== a.alternate.memoizedState) ||
                    (Vo = Ge())),
                4 & r && mo(e);
              break;
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((Yi = (u = Yi) || d), ho(t, e), (Yi = u))
                  : ho(t, e),
                xo(e),
                8192 & r)
              ) {
                if (
                  ((u = null !== e.memoizedState),
                  (e.stateNode.isHidden = u) && !d && 0 !== (1 & e.mode))
                )
                  for (Gi = e, d = e.child; null !== d; ) {
                    for (f = Gi = d; null !== Gi; ) {
                      switch (((m = (p = Gi).child), p.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          to(4, p, p.return);
                          break;
                        case 1:
                          Xi(p, p.return);
                          var h = p.stateNode;
                          if ("function" === typeof h.componentWillUnmount) {
                            (r = p), (n = p.return);
                            try {
                              (t = r),
                                (h.props = t.memoizedProps),
                                (h.state = t.memoizedState),
                                h.componentWillUnmount();
                            } catch (g) {
                              kc(r, n, g);
                            }
                          }
                          break;
                        case 5:
                          Xi(p, p.return);
                          break;
                        case 22:
                          if (null !== p.memoizedState) {
                            wo(f);
                            continue;
                          }
                      }
                      null !== m ? ((m.return = p), (Gi = m)) : wo(f);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, f = e; ; ) {
                  if (5 === f.tag) {
                    if (null === d) {
                      d = f;
                      try {
                        (a = f.stateNode),
                          u
                            ? "function" === typeof (s = a.style).setProperty
                              ? s.setProperty("display", "none", "important")
                              : (s.display = "none")
                            : ((o = f.stateNode),
                              (i =
                                void 0 !== (c = f.memoizedProps.style) &&
                                null !== c &&
                                c.hasOwnProperty("display")
                                  ? c.display
                                  : null),
                              (o.style.display = he("display", i)));
                      } catch (g) {
                        kc(e, e.return, g);
                      }
                    }
                  } else if (6 === f.tag) {
                    if (null === d)
                      try {
                        f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                      } catch (g) {
                        kc(e, e.return, g);
                      }
                  } else if (
                    ((22 !== f.tag && 23 !== f.tag) ||
                      null === f.memoizedState ||
                      f === e) &&
                    null !== f.child
                  ) {
                    (f.child.return = f), (f = f.child);
                    continue;
                  }
                  if (f === e) break e;
                  for (; null === f.sibling; ) {
                    if (null === f.return || f.return === e) break e;
                    d === f && (d = null), (f = f.return);
                  }
                  d === f && (d = null),
                    (f.sibling.return = f.return),
                    (f = f.sibling);
                }
              }
              break;
            case 19:
              ho(t, e), xo(e), 4 & r && mo(e);
            case 21:
          }
        }
        function xo(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (lo(n)) {
                    var r = n;
                    break e;
                  }
                  n = n.return;
                }
                throw Error(l(160));
              }
              switch (r.tag) {
                case 5:
                  var a = r.stateNode;
                  32 & r.flags && (fe(a, ""), (r.flags &= -33)),
                    oo(e, so(e), a);
                  break;
                case 3:
                case 4:
                  var s = r.stateNode.containerInfo;
                  io(e, so(e), s);
                  break;
                default:
                  throw Error(l(161));
              }
            } catch (i) {
              kc(e, e.return, i);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function vo(e, t, n) {
          (Gi = e), bo(e, t, n);
        }
        function bo(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== Gi; ) {
            var a = Gi,
              l = a.child;
            if (22 === a.tag && r) {
              var s = null !== a.memoizedState || Ki;
              if (!s) {
                var i = a.alternate,
                  o = (null !== i && null !== i.memoizedState) || Yi;
                i = Ki;
                var c = Yi;
                if (((Ki = s), (Yi = o) && !c))
                  for (Gi = a; null !== Gi; )
                    (o = (s = Gi).child),
                      22 === s.tag && null !== s.memoizedState
                        ? jo(a)
                        : null !== o
                        ? ((o.return = s), (Gi = o))
                        : jo(a);
                for (; null !== l; ) (Gi = l), bo(l, t, n), (l = l.sibling);
                (Gi = a), (Ki = i), (Yi = c);
              }
              yo(e);
            } else
              0 !== (8772 & a.subtreeFlags) && null !== l
                ? ((l.return = a), (Gi = l))
                : yo(e);
          }
        }
        function yo(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yi || no(5, t);
                      break;
                    case 1:
                      var r = t.stateNode;
                      if (4 & t.flags && !Yi)
                        if (null === n) r.componentDidMount();
                        else {
                          var a =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : ti(t.type, n.memoizedProps);
                          r.componentDidUpdate(
                            a,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var s = t.updateQueue;
                      null !== s && Hl(t, s, r);
                      break;
                    case 3:
                      var i = t.updateQueue;
                      if (null !== i) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode;
                          }
                        Hl(t, i, n);
                      }
                      break;
                    case 5:
                      var o = t.stateNode;
                      if (null === n && 4 & t.flags) {
                        n = o;
                        var c = t.memoizedProps;
                        switch (t.type) {
                          case "button":
                          case "input":
                          case "select":
                          case "textarea":
                            c.autoFocus && n.focus();
                            break;
                          case "img":
                            c.src && (n.src = c.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var u = t.alternate;
                        if (null !== u) {
                          var d = u.memoizedState;
                          if (null !== d) {
                            var f = d.dehydrated;
                            null !== f && Bt(f);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(l(163));
                  }
                Yi || (512 & t.flags && ro(t));
              } catch (p) {
                kc(t, t.return, p);
              }
            }
            if (t === e) {
              Gi = null;
              break;
            }
            if (null !== (n = t.sibling)) {
              (n.return = t.return), (Gi = n);
              break;
            }
            Gi = t.return;
          }
        }
        function wo(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            if (t === e) {
              Gi = null;
              break;
            }
            var n = t.sibling;
            if (null !== n) {
              (n.return = t.return), (Gi = n);
              break;
            }
            Gi = t.return;
          }
        }
        function jo(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return;
                  try {
                    no(4, t);
                  } catch (o) {
                    kc(t, n, o);
                  }
                  break;
                case 1:
                  var r = t.stateNode;
                  if ("function" === typeof r.componentDidMount) {
                    var a = t.return;
                    try {
                      r.componentDidMount();
                    } catch (o) {
                      kc(t, a, o);
                    }
                  }
                  var l = t.return;
                  try {
                    ro(t);
                  } catch (o) {
                    kc(t, l, o);
                  }
                  break;
                case 5:
                  var s = t.return;
                  try {
                    ro(t);
                  } catch (o) {
                    kc(t, s, o);
                  }
              }
            } catch (o) {
              kc(t, t.return, o);
            }
            if (t === e) {
              Gi = null;
              break;
            }
            var i = t.sibling;
            if (null !== i) {
              (i.return = t.return), (Gi = i);
              break;
            }
            Gi = t.return;
          }
        }
        var No,
          ko = Math.ceil,
          So = y.ReactCurrentDispatcher,
          Co = y.ReactCurrentOwner,
          Eo = y.ReactCurrentBatchConfig,
          _o = 0,
          Po = null,
          Do = null,
          zo = 0,
          To = 0,
          Lo = ka(0),
          Ao = 0,
          Ro = null,
          Mo = 0,
          Oo = 0,
          Io = 0,
          Fo = null,
          Uo = null,
          Vo = 0,
          Bo = 1 / 0,
          Ho = null,
          $o = !1,
          Wo = null,
          qo = null,
          Qo = !1,
          Ko = null,
          Yo = 0,
          Jo = 0,
          Go = null,
          Xo = -1,
          Zo = 0;
        function ec() {
          return 0 !== (6 & _o) ? Ge() : -1 !== Xo ? Xo : (Xo = Ge());
        }
        function tc(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & _o) && 0 !== zo
            ? zo & -zo
            : null !== hl.transition
            ? (0 === Zo && (Zo = ht()), Zo)
            : 0 !== (e = bt)
            ? e
            : (e = void 0 === (e = window.event) ? 16 : Jt(e.type));
        }
        function nc(e, t, n, r) {
          if (50 < Jo) throw ((Jo = 0), (Go = null), Error(l(185)));
          xt(e, n, r),
            (0 !== (2 & _o) && e === Po) ||
              (e === Po && (0 === (2 & _o) && (Oo |= n), 4 === Ao && ic(e, zo)),
              rc(e, r),
              1 === n &&
                0 === _o &&
                0 === (1 & t.mode) &&
                ((Bo = Ge() + 500), Fa && Ba()));
        }
        function rc(e, t) {
          var n = e.callbackNode;
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                a = e.expirationTimes,
                l = e.pendingLanes;
              0 < l;

            ) {
              var s = 31 - st(l),
                i = 1 << s,
                o = a[s];
              -1 === o
                ? (0 !== (i & n) && 0 === (i & r)) || (a[s] = pt(i, t))
                : o <= t && (e.expiredLanes |= i),
                (l &= ~i);
            }
          })(e, t);
          var r = ft(e, e === Po ? zo : 0);
          if (0 === r)
            null !== n && Ke(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0);
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Ke(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    (Fa = !0), Va(e);
                  })(oc.bind(null, e))
                : Va(oc.bind(null, e)),
                sa(function () {
                  0 === (6 & _o) && Ba();
                }),
                (n = null);
            else {
              switch (yt(r)) {
                case 1:
                  n = Ze;
                  break;
                case 4:
                  n = et;
                  break;
                case 16:
                default:
                  n = tt;
                  break;
                case 536870912:
                  n = rt;
              }
              n = Pc(n, ac.bind(null, e));
            }
            (e.callbackPriority = t), (e.callbackNode = n);
          }
        }
        function ac(e, t) {
          if (((Xo = -1), (Zo = 0), 0 !== (6 & _o))) throw Error(l(327));
          var n = e.callbackNode;
          if (jc() && e.callbackNode !== n) return null;
          var r = ft(e, e === Po ? zo : 0);
          if (0 === r) return null;
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = gc(e, r);
          else {
            t = r;
            var a = _o;
            _o |= 2;
            var s = mc();
            for (
              (Po === e && zo === t) ||
              ((Ho = null), (Bo = Ge() + 500), fc(e, t));
              ;

            )
              try {
                vc();
                break;
              } catch (o) {
                pc(e, o);
              }
            Cl(),
              (So.current = s),
              (_o = a),
              null !== Do ? (t = 0) : ((Po = null), (zo = 0), (t = Ao));
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (a = mt(e)) && ((r = a), (t = lc(e, a))),
              1 === t)
            )
              throw ((n = Ro), fc(e, 0), ic(e, r), rc(e, Ge()), n);
            if (6 === t) ic(e, r);
            else {
              if (
                ((a = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue;
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var a = n[r],
                              l = a.getSnapshot;
                            a = a.value;
                            try {
                              if (!ir(l(), a)) return !1;
                            } catch (i) {
                              return !1;
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n);
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        (t.sibling.return = t.return), (t = t.sibling);
                      }
                    }
                    return !0;
                  })(a) &&
                  (2 === (t = gc(e, r)) &&
                    0 !== (s = mt(e)) &&
                    ((r = s), (t = lc(e, s))),
                  1 === t))
              )
                throw ((n = Ro), fc(e, 0), ic(e, r), rc(e, Ge()), n);
              switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(l(345));
                case 2:
                case 5:
                  wc(e, Uo, Ho);
                  break;
                case 3:
                  if (
                    (ic(e, r),
                    (130023424 & r) === r && 10 < (t = Vo + 500 - Ge()))
                  ) {
                    if (0 !== ft(e, 0)) break;
                    if (((a = e.suspendedLanes) & r) !== r) {
                      ec(), (e.pingedLanes |= e.suspendedLanes & a);
                      break;
                    }
                    e.timeoutHandle = ra(wc.bind(null, e, Uo, Ho), t);
                    break;
                  }
                  wc(e, Uo, Ho);
                  break;
                case 4:
                  if ((ic(e, r), (4194240 & r) === r)) break;
                  for (t = e.eventTimes, a = -1; 0 < r; ) {
                    var i = 31 - st(r);
                    (s = 1 << i), (i = t[i]) > a && (a = i), (r &= ~s);
                  }
                  if (
                    ((r = a),
                    10 <
                      (r =
                        (120 > (r = Ge() - r)
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * ko(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ra(wc.bind(null, e, Uo, Ho), r);
                    break;
                  }
                  wc(e, Uo, Ho);
                  break;
                default:
                  throw Error(l(329));
              }
            }
          }
          return rc(e, Ge()), e.callbackNode === n ? ac.bind(null, e) : null;
        }
        function lc(e, t) {
          var n = Fo;
          return (
            e.current.memoizedState.isDehydrated && (fc(e, t).flags |= 256),
            2 !== (e = gc(e, t)) && ((t = Uo), (Uo = n), null !== t && sc(t)),
            e
          );
        }
        function sc(e) {
          null === Uo ? (Uo = e) : Uo.push.apply(Uo, e);
        }
        function ic(e, t) {
          for (
            t &= ~Io,
              t &= ~Oo,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - st(t),
              r = 1 << n;
            (e[n] = -1), (t &= ~r);
          }
        }
        function oc(e) {
          if (0 !== (6 & _o)) throw Error(l(327));
          jc();
          var t = ft(e, 0);
          if (0 === (1 & t)) return rc(e, Ge()), null;
          var n = gc(e, t);
          if (0 !== e.tag && 2 === n) {
            var r = mt(e);
            0 !== r && ((t = r), (n = lc(e, r)));
          }
          if (1 === n) throw ((n = Ro), fc(e, 0), ic(e, t), rc(e, Ge()), n);
          if (6 === n) throw Error(l(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            wc(e, Uo, Ho),
            rc(e, Ge()),
            null
          );
        }
        function cc(e, t) {
          var n = _o;
          _o |= 1;
          try {
            return e(t);
          } finally {
            0 === (_o = n) && ((Bo = Ge() + 500), Fa && Ba());
          }
        }
        function uc(e) {
          null !== Ko && 0 === Ko.tag && 0 === (6 & _o) && jc();
          var t = _o;
          _o |= 1;
          var n = Eo.transition,
            r = bt;
          try {
            if (((Eo.transition = null), (bt = 1), e)) return e();
          } finally {
            (bt = r), (Eo.transition = n), 0 === (6 & (_o = t)) && Ba();
          }
        }
        function dc() {
          (To = Lo.current), Sa(Lo);
        }
        function fc(e, t) {
          (e.finishedWork = null), (e.finishedLanes = 0);
          var n = e.timeoutHandle;
          if ((-1 !== n && ((e.timeoutHandle = -1), aa(n)), null !== Do))
            for (n = Do.return; null !== n; ) {
              var r = n;
              switch ((tl(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    La();
                  break;
                case 3:
                  Jl(), Sa(Pa), Sa(_a), ns();
                  break;
                case 5:
                  Xl(r);
                  break;
                case 4:
                  Jl();
                  break;
                case 13:
                case 19:
                  Sa(Zl);
                  break;
                case 10:
                  El(r.type._context);
                  break;
                case 22:
                case 23:
                  dc();
              }
              n = n.return;
            }
          if (
            ((Po = e),
            (Do = e = Lc(e.current, null)),
            (zo = To = t),
            (Ao = 0),
            (Ro = null),
            (Io = Oo = Mo = 0),
            (Uo = Fo = null),
            null !== zl)
          ) {
            for (t = 0; t < zl.length; t++)
              if (null !== (r = (n = zl[t]).interleaved)) {
                n.interleaved = null;
                var a = r.next,
                  l = n.pending;
                if (null !== l) {
                  var s = l.next;
                  (l.next = a), (r.next = s);
                }
                n.pending = r;
              }
            zl = null;
          }
          return e;
        }
        function pc(e, t) {
          for (;;) {
            var n = Do;
            try {
              if ((Cl(), (rs.current = Gs), cs)) {
                for (var r = ss.memoizedState; null !== r; ) {
                  var a = r.queue;
                  null !== a && (a.pending = null), (r = r.next);
                }
                cs = !1;
              }
              if (
                ((ls = 0),
                (os = is = ss = null),
                (us = !1),
                (ds = 0),
                (Co.current = null),
                null === n || null === n.return)
              ) {
                (Ao = 1), (Ro = t), (Do = null);
                break;
              }
              e: {
                var s = e,
                  i = n.return,
                  o = n,
                  c = t;
                if (
                  ((t = zo),
                  (o.flags |= 32768),
                  null !== c &&
                    "object" === typeof c &&
                    "function" === typeof c.then)
                ) {
                  var u = c,
                    d = o,
                    f = d.tag;
                  if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                    var p = d.alternate;
                    p
                      ? ((d.updateQueue = p.updateQueue),
                        (d.memoizedState = p.memoizedState),
                        (d.lanes = p.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var m = hi(i);
                  if (null !== m) {
                    (m.flags &= -257),
                      gi(m, i, o, 0, t),
                      1 & m.mode && mi(s, u, t),
                      (c = u);
                    var h = (t = m).updateQueue;
                    if (null === h) {
                      var g = new Set();
                      g.add(c), (t.updateQueue = g);
                    } else h.add(c);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    mi(s, u, t), hc();
                    break e;
                  }
                  c = Error(l(426));
                } else if (al && 1 & o.mode) {
                  var x = hi(i);
                  if (null !== x) {
                    0 === (65536 & x.flags) && (x.flags |= 256),
                      gi(x, i, o, 0, t),
                      ml(oi(c, o));
                    break e;
                  }
                }
                (s = c = oi(c, o)),
                  4 !== Ao && (Ao = 2),
                  null === Fo ? (Fo = [s]) : Fo.push(s),
                  (s = i);
                do {
                  switch (s.tag) {
                    case 3:
                      (s.flags |= 65536),
                        (t &= -t),
                        (s.lanes |= t),
                        Vl(s, fi(0, c, t));
                      break e;
                    case 1:
                      o = c;
                      var v = s.type,
                        b = s.stateNode;
                      if (
                        0 === (128 & s.flags) &&
                        ("function" === typeof v.getDerivedStateFromError ||
                          (null !== b &&
                            "function" === typeof b.componentDidCatch &&
                            (null === qo || !qo.has(b))))
                      ) {
                        (s.flags |= 65536),
                          (t &= -t),
                          (s.lanes |= t),
                          Vl(s, pi(s, o, t));
                        break e;
                      }
                  }
                  s = s.return;
                } while (null !== s);
              }
              yc(n);
            } catch (y) {
              (t = y), Do === n && null !== n && (Do = n = n.return);
              continue;
            }
            break;
          }
        }
        function mc() {
          var e = So.current;
          return (So.current = Gs), null === e ? Gs : e;
        }
        function hc() {
          (0 !== Ao && 3 !== Ao && 2 !== Ao) || (Ao = 4),
            null === Po ||
              (0 === (268435455 & Mo) && 0 === (268435455 & Oo)) ||
              ic(Po, zo);
        }
        function gc(e, t) {
          var n = _o;
          _o |= 2;
          var r = mc();
          for ((Po === e && zo === t) || ((Ho = null), fc(e, t)); ; )
            try {
              xc();
              break;
            } catch (a) {
              pc(e, a);
            }
          if ((Cl(), (_o = n), (So.current = r), null !== Do))
            throw Error(l(261));
          return (Po = null), (zo = 0), Ao;
        }
        function xc() {
          for (; null !== Do; ) bc(Do);
        }
        function vc() {
          for (; null !== Do && !Ye(); ) bc(Do);
        }
        function bc(e) {
          var t = No(e.alternate, e, To);
          (e.memoizedProps = e.pendingProps),
            null === t ? yc(e) : (Do = t),
            (Co.current = null);
        }
        function yc(e) {
          var t = e;
          do {
            var n = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = qi(n, t, To))) return void (Do = n);
            } else {
              if (null !== (n = Qi(n, t)))
                return (n.flags &= 32767), void (Do = n);
              if (null === e) return (Ao = 6), void (Do = null);
              (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            }
            if (null !== (t = t.sibling)) return void (Do = t);
            Do = t = e;
          } while (null !== t);
          0 === Ao && (Ao = 5);
        }
        function wc(e, t, n) {
          var r = bt,
            a = Eo.transition;
          try {
            (Eo.transition = null),
              (bt = 1),
              (function (e, t, n, r) {
                do {
                  jc();
                } while (null !== Ko);
                if (0 !== (6 & _o)) throw Error(l(327));
                n = e.finishedWork;
                var a = e.finishedLanes;
                if (null === n) return null;
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(l(177));
                (e.callbackNode = null), (e.callbackPriority = 0);
                var s = n.lanes | n.childLanes;
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t;
                    (e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements);
                    var r = e.eventTimes;
                    for (e = e.expirationTimes; 0 < n; ) {
                      var a = 31 - st(n),
                        l = 1 << a;
                      (t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~l);
                    }
                  })(e, s),
                  e === Po && ((Do = Po = null), (zo = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Qo ||
                    ((Qo = !0),
                    Pc(tt, function () {
                      return jc(), null;
                    })),
                  (s = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || s)
                ) {
                  (s = Eo.transition), (Eo.transition = null);
                  var i = bt;
                  bt = 1;
                  var o = _o;
                  (_o |= 4),
                    (Co.current = null),
                    (function (e, t) {
                      if (((ea = $t), pr((e = fr())))) {
                        if ("selectionStart" in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          };
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection();
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode;
                              var a = r.anchorOffset,
                                s = r.focusNode;
                              r = r.focusOffset;
                              try {
                                n.nodeType, s.nodeType;
                              } catch (w) {
                                n = null;
                                break e;
                              }
                              var i = 0,
                                o = -1,
                                c = -1,
                                u = 0,
                                d = 0,
                                f = e,
                                p = null;
                              t: for (;;) {
                                for (
                                  var m;
                                  f !== n ||
                                    (0 !== a && 3 !== f.nodeType) ||
                                    (o = i + a),
                                    f !== s ||
                                      (0 !== r && 3 !== f.nodeType) ||
                                      (c = i + r),
                                    3 === f.nodeType &&
                                      (i += f.nodeValue.length),
                                    null !== (m = f.firstChild);

                                )
                                  (p = f), (f = m);
                                for (;;) {
                                  if (f === e) break t;
                                  if (
                                    (p === n && ++u === a && (o = i),
                                    p === s && ++d === r && (c = i),
                                    null !== (m = f.nextSibling))
                                  )
                                    break;
                                  p = (f = p).parentNode;
                                }
                                f = m;
                              }
                              n =
                                -1 === o || -1 === c
                                  ? null
                                  : { start: o, end: c };
                            } else n = null;
                          }
                        n = n || { start: 0, end: 0 };
                      } else n = null;
                      for (
                        ta = { focusedElem: e, selectionRange: n },
                          $t = !1,
                          Gi = t;
                        null !== Gi;

                      )
                        if (
                          ((e = (t = Gi).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (Gi = e);
                        else
                          for (; null !== Gi; ) {
                            t = Gi;
                            try {
                              var h = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== h) {
                                      var g = h.memoizedProps,
                                        x = h.memoizedState,
                                        v = t.stateNode,
                                        b = v.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? g
                                            : ti(t.type, g),
                                          x
                                        );
                                      v.__reactInternalSnapshotBeforeUpdate = b;
                                    }
                                    break;
                                  case 3:
                                    var y = t.stateNode.containerInfo;
                                    1 === y.nodeType
                                      ? (y.textContent = "")
                                      : 9 === y.nodeType &&
                                        y.documentElement &&
                                        y.removeChild(y.documentElement);
                                    break;
                                  default:
                                    throw Error(l(163));
                                }
                            } catch (w) {
                              kc(t, t.return, w);
                            }
                            if (null !== (e = t.sibling)) {
                              (e.return = t.return), (Gi = e);
                              break;
                            }
                            Gi = t.return;
                          }
                      (h = eo), (eo = !1);
                    })(e, n),
                    go(n, e),
                    mr(ta),
                    ($t = !!ea),
                    (ta = ea = null),
                    (e.current = n),
                    vo(n, e, a),
                    Je(),
                    (_o = o),
                    (bt = i),
                    (Eo.transition = s);
                } else e.current = n;
                if (
                  (Qo && ((Qo = !1), (Ko = e), (Yo = a)),
                  (s = e.pendingLanes),
                  0 === s && (qo = null),
                  (function (e) {
                    if (lt && "function" === typeof lt.onCommitFiberRoot)
                      try {
                        lt.onCommitFiberRoot(
                          at,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        );
                      } catch (t) {}
                  })(n.stateNode),
                  rc(e, Ge()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    (a = t[n]),
                      r(a.value, { componentStack: a.stack, digest: a.digest });
                if ($o) throw (($o = !1), (e = Wo), (Wo = null), e);
                0 !== (1 & Yo) && 0 !== e.tag && jc(),
                  (s = e.pendingLanes),
                  0 !== (1 & s)
                    ? e === Go
                      ? Jo++
                      : ((Jo = 0), (Go = e))
                    : (Jo = 0),
                  Ba();
              })(e, t, n, r);
          } finally {
            (Eo.transition = a), (bt = r);
          }
          return null;
        }
        function jc() {
          if (null !== Ko) {
            var e = yt(Yo),
              t = Eo.transition,
              n = bt;
            try {
              if (((Eo.transition = null), (bt = 16 > e ? 16 : e), null === Ko))
                var r = !1;
              else {
                if (((e = Ko), (Ko = null), (Yo = 0), 0 !== (6 & _o)))
                  throw Error(l(331));
                var a = _o;
                for (_o |= 4, Gi = e.current; null !== Gi; ) {
                  var s = Gi,
                    i = s.child;
                  if (0 !== (16 & Gi.flags)) {
                    var o = s.deletions;
                    if (null !== o) {
                      for (var c = 0; c < o.length; c++) {
                        var u = o[c];
                        for (Gi = u; null !== Gi; ) {
                          var d = Gi;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              to(8, d, s);
                          }
                          var f = d.child;
                          if (null !== f) (f.return = d), (Gi = f);
                          else
                            for (; null !== Gi; ) {
                              var p = (d = Gi).sibling,
                                m = d.return;
                              if ((ao(d), d === u)) {
                                Gi = null;
                                break;
                              }
                              if (null !== p) {
                                (p.return = m), (Gi = p);
                                break;
                              }
                              Gi = m;
                            }
                        }
                      }
                      var h = s.alternate;
                      if (null !== h) {
                        var g = h.child;
                        if (null !== g) {
                          h.child = null;
                          do {
                            var x = g.sibling;
                            (g.sibling = null), (g = x);
                          } while (null !== g);
                        }
                      }
                      Gi = s;
                    }
                  }
                  if (0 !== (2064 & s.subtreeFlags) && null !== i)
                    (i.return = s), (Gi = i);
                  else
                    e: for (; null !== Gi; ) {
                      if (0 !== (2048 & (s = Gi).flags))
                        switch (s.tag) {
                          case 0:
                          case 11:
                          case 15:
                            to(9, s, s.return);
                        }
                      var v = s.sibling;
                      if (null !== v) {
                        (v.return = s.return), (Gi = v);
                        break e;
                      }
                      Gi = s.return;
                    }
                }
                var b = e.current;
                for (Gi = b; null !== Gi; ) {
                  var y = (i = Gi).child;
                  if (0 !== (2064 & i.subtreeFlags) && null !== y)
                    (y.return = i), (Gi = y);
                  else
                    e: for (i = b; null !== Gi; ) {
                      if (0 !== (2048 & (o = Gi).flags))
                        try {
                          switch (o.tag) {
                            case 0:
                            case 11:
                            case 15:
                              no(9, o);
                          }
                        } catch (j) {
                          kc(o, o.return, j);
                        }
                      if (o === i) {
                        Gi = null;
                        break e;
                      }
                      var w = o.sibling;
                      if (null !== w) {
                        (w.return = o.return), (Gi = w);
                        break e;
                      }
                      Gi = o.return;
                    }
                }
                if (
                  ((_o = a),
                  Ba(),
                  lt && "function" === typeof lt.onPostCommitFiberRoot)
                )
                  try {
                    lt.onPostCommitFiberRoot(at, e);
                  } catch (j) {}
                r = !0;
              }
              return r;
            } finally {
              (bt = n), (Eo.transition = t);
            }
          }
          return !1;
        }
        function Nc(e, t, n) {
          (e = Fl(e, (t = fi(0, (t = oi(n, t)), 1)), 1)),
            (t = ec()),
            null !== e && (xt(e, 1, t), rc(e, t));
        }
        function kc(e, t, n) {
          if (3 === e.tag) Nc(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                Nc(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  "function" === typeof t.type.getDerivedStateFromError ||
                  ("function" === typeof r.componentDidCatch &&
                    (null === qo || !qo.has(r)))
                ) {
                  (t = Fl(t, (e = pi(t, (e = oi(n, e)), 1)), 1)),
                    (e = ec()),
                    null !== t && (xt(t, 1, e), rc(t, e));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Sc(e, t, n) {
          var r = e.pingCache;
          null !== r && r.delete(t),
            (t = ec()),
            (e.pingedLanes |= e.suspendedLanes & n),
            Po === e &&
              (zo & n) === n &&
              (4 === Ao ||
              (3 === Ao && (130023424 & zo) === zo && 500 > Ge() - Vo)
                ? fc(e, 0)
                : (Io |= n)),
            rc(e, t);
        }
        function Cc(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ut), 0 === (130023424 & (ut <<= 1)) && (ut = 4194304)));
          var n = ec();
          null !== (e = Al(e, t)) && (xt(e, t, n), rc(e, n));
        }
        function Ec(e) {
          var t = e.memoizedState,
            n = 0;
          null !== t && (n = t.retryLane), Cc(e, n);
        }
        function _c(e, t) {
          var n = 0;
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                a = e.memoizedState;
              null !== a && (n = a.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            default:
              throw Error(l(314));
          }
          null !== r && r.delete(t), Cc(e, n);
        }
        function Pc(e, t) {
          return Qe(e, t);
        }
        function Dc(e, t, n, r) {
          (this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null);
        }
        function zc(e, t, n, r) {
          return new Dc(e, t, n, r);
        }
        function Tc(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function Lc(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = zc(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          );
        }
        function Ac(e, t, n, r, a, s) {
          var i = 2;
          if (((r = e), "function" === typeof e)) Tc(e) && (i = 1);
          else if ("string" === typeof e) i = 5;
          else
            e: switch (e) {
              case N:
                return Rc(n.children, a, s, t);
              case k:
                (i = 8), (a |= 8);
                break;
              case S:
                return (
                  ((e = zc(12, n, t, 2 | a)).elementType = S), (e.lanes = s), e
                );
              case P:
                return (
                  ((e = zc(13, n, t, a)).elementType = P), (e.lanes = s), e
                );
              case D:
                return (
                  ((e = zc(19, n, t, a)).elementType = D), (e.lanes = s), e
                );
              case L:
                return Mc(n, a, s, t);
              default:
                if ("object" === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case C:
                      i = 10;
                      break e;
                    case E:
                      i = 9;
                      break e;
                    case _:
                      i = 11;
                      break e;
                    case z:
                      i = 14;
                      break e;
                    case T:
                      (i = 16), (r = null);
                      break e;
                  }
                throw Error(l(130, null == e ? e : typeof e, ""));
            }
          return (
            ((t = zc(i, n, t, a)).elementType = e),
            (t.type = r),
            (t.lanes = s),
            t
          );
        }
        function Rc(e, t, n, r) {
          return ((e = zc(7, e, r, t)).lanes = n), e;
        }
        function Mc(e, t, n, r) {
          return (
            ((e = zc(22, e, r, t)).elementType = L),
            (e.lanes = n),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Oc(e, t, n) {
          return ((e = zc(6, e, null, t)).lanes = n), e;
        }
        function Ic(e, t, n) {
          return (
            ((t = zc(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function Fc(e, t, n, r, a) {
          (this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = a),
            (this.mutableSourceEagerHydrationData = null);
        }
        function Uc(e, t, n, r, a, l, s, i, o) {
          return (
            (e = new Fc(e, t, n, i, o)),
            1 === t ? ((t = 1), !0 === l && (t |= 8)) : (t = 0),
            (l = zc(3, null, null, t)),
            (e.current = l),
            (l.stateNode = e),
            (l.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Ml(l),
            e
          );
        }
        function Vc(e) {
          if (!e) return Ea;
          e: {
            if (Be((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(l(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (Ta(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(l(171));
          }
          if (1 === e.tag) {
            var n = e.type;
            if (Ta(n)) return Ra(e, n, t);
          }
          return t;
        }
        function Bc(e, t, n, r, a, l, s, i, o) {
          return (
            ((e = Uc(n, r, !0, e, 0, l, 0, i, o)).context = Vc(null)),
            (n = e.current),
            ((l = Il((r = ec()), (a = tc(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            Fl(n, l, a),
            (e.current.lanes = a),
            xt(e, a, r),
            rc(e, r),
            e
          );
        }
        function Hc(e, t, n, r) {
          var a = t.current,
            l = ec(),
            s = tc(a);
          return (
            (n = Vc(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = Il(l, s)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            null !== (e = Fl(a, t, s)) && (nc(e, a, s, l), Ul(e, a, s)),
            s
          );
        }
        function $c(e) {
          return (e = e.current).child
            ? (e.child.tag, e.child.stateNode)
            : null;
        }
        function Wc(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function qc(e, t) {
          Wc(e, t), (e = e.alternate) && Wc(e, t);
        }
        No = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || Pa.current) vi = !0;
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (vi = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        _i(t), pl();
                        break;
                      case 5:
                        Gl(t);
                        break;
                      case 1:
                        Ta(t.type) && Ma(t);
                        break;
                      case 4:
                        Yl(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var r = t.type._context,
                          a = t.memoizedProps.value;
                        Ca(jl, r._currentValue), (r._currentValue = a);
                        break;
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Ca(Zl, 1 & Zl.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                            ? Mi(e, t, n)
                            : (Ca(Zl, 1 & Zl.current),
                              null !== (e = Hi(e, t, n)) ? e.sibling : null);
                        Ca(Zl, 1 & Zl.current);
                        break;
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Vi(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (a = t.memoizedState) &&
                            ((a.rendering = null),
                            (a.tail = null),
                            (a.lastEffect = null)),
                          Ca(Zl, Zl.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return (t.lanes = 0), Ni(e, t, n);
                    }
                    return Hi(e, t, n);
                  })(e, t, n)
                );
              vi = 0 !== (131072 & e.flags);
            }
          else (vi = !1), al && 0 !== (1048576 & t.flags) && Za(t, qa, t.index);
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type;
              Bi(e, t), (e = t.pendingProps);
              var a = za(t, _a.current);
              Pl(t, n), (a = hs(null, t, r, e, a, n));
              var s = gs();
              return (
                (t.flags |= 1),
                "object" === typeof a &&
                null !== a &&
                "function" === typeof a.render &&
                void 0 === a.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    Ta(r) ? ((s = !0), Ma(t)) : (s = !1),
                    (t.memoizedState =
                      null !== a.state && void 0 !== a.state ? a.state : null),
                    Ml(t),
                    (a.updater = ri),
                    (t.stateNode = a),
                    (a._reactInternals = t),
                    ii(t, r, e, n),
                    (t = Ei(null, t, r, !0, s, n)))
                  : ((t.tag = 0),
                    al && s && el(t),
                    bi(null, t, a, n),
                    (t = t.child)),
                t
              );
            case 16:
              r = t.elementType;
              e: {
                switch (
                  (Bi(e, t),
                  (e = t.pendingProps),
                  (r = (a = r._init)(r._payload)),
                  (t.type = r),
                  (a = t.tag =
                    (function (e) {
                      if ("function" === typeof e) return Tc(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === _) return 11;
                        if (e === z) return 14;
                      }
                      return 2;
                    })(r)),
                  (e = ti(r, e)),
                  a)
                ) {
                  case 0:
                    t = Si(null, t, r, e, n);
                    break e;
                  case 1:
                    t = Ci(null, t, r, e, n);
                    break e;
                  case 11:
                    t = yi(null, t, r, e, n);
                    break e;
                  case 14:
                    t = wi(null, t, r, ti(r.type, e), n);
                    break e;
                }
                throw Error(l(306, r, ""));
              }
              return t;
            case 0:
              return (
                (r = t.type),
                (a = t.pendingProps),
                Si(e, t, r, (a = t.elementType === r ? a : ti(r, a)), n)
              );
            case 1:
              return (
                (r = t.type),
                (a = t.pendingProps),
                Ci(e, t, r, (a = t.elementType === r ? a : ti(r, a)), n)
              );
            case 3:
              e: {
                if ((_i(t), null === e)) throw Error(l(387));
                (r = t.pendingProps),
                  (a = (s = t.memoizedState).element),
                  Ol(e, t),
                  Bl(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), s.isDehydrated)) {
                  if (
                    ((s = {
                      element: r,
                      isDehydrated: !1,
                      cache: i.cache,
                      pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                      transitions: i.transitions,
                    }),
                    (t.updateQueue.baseState = s),
                    (t.memoizedState = s),
                    256 & t.flags)
                  ) {
                    t = Pi(e, t, r, n, (a = oi(Error(l(423)), t)));
                    break e;
                  }
                  if (r !== a) {
                    t = Pi(e, t, r, n, (a = oi(Error(l(424)), t)));
                    break e;
                  }
                  for (
                    rl = ca(t.stateNode.containerInfo.firstChild),
                      nl = t,
                      al = !0,
                      ll = null,
                      n = wl(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                } else {
                  if ((pl(), r === a)) {
                    t = Hi(e, t, n);
                    break e;
                  }
                  bi(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                Gl(t),
                null === e && cl(t),
                (r = t.type),
                (a = t.pendingProps),
                (s = null !== e ? e.memoizedProps : null),
                (i = a.children),
                na(r, a)
                  ? (i = null)
                  : null !== s && na(r, s) && (t.flags |= 32),
                ki(e, t),
                bi(e, t, i, n),
                t.child
              );
            case 6:
              return null === e && cl(t), null;
            case 13:
              return Mi(e, t, n);
            case 4:
              return (
                Yl(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = yl(t, null, r, n)) : bi(e, t, r, n),
                t.child
              );
            case 11:
              return (
                (r = t.type),
                (a = t.pendingProps),
                yi(e, t, r, (a = t.elementType === r ? a : ti(r, a)), n)
              );
            case 7:
              return bi(e, t, t.pendingProps, n), t.child;
            case 8:
            case 12:
              return bi(e, t, t.pendingProps.children, n), t.child;
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (a = t.pendingProps),
                  (s = t.memoizedProps),
                  (i = a.value),
                  Ca(jl, r._currentValue),
                  (r._currentValue = i),
                  null !== s)
                )
                  if (ir(s.value, i)) {
                    if (s.children === a.children && !Pa.current) {
                      t = Hi(e, t, n);
                      break e;
                    }
                  } else
                    for (
                      null !== (s = t.child) && (s.return = t);
                      null !== s;

                    ) {
                      var o = s.dependencies;
                      if (null !== o) {
                        i = s.child;
                        for (var c = o.firstContext; null !== c; ) {
                          if (c.context === r) {
                            if (1 === s.tag) {
                              (c = Il(-1, n & -n)).tag = 2;
                              var u = s.updateQueue;
                              if (null !== u) {
                                var d = (u = u.shared).pending;
                                null === d
                                  ? (c.next = c)
                                  : ((c.next = d.next), (d.next = c)),
                                  (u.pending = c);
                              }
                            }
                            (s.lanes |= n),
                              null !== (c = s.alternate) && (c.lanes |= n),
                              _l(s.return, n, t),
                              (o.lanes |= n);
                            break;
                          }
                          c = c.next;
                        }
                      } else if (10 === s.tag)
                        i = s.type === t.type ? null : s.child;
                      else if (18 === s.tag) {
                        if (null === (i = s.return)) throw Error(l(341));
                        (i.lanes |= n),
                          null !== (o = i.alternate) && (o.lanes |= n),
                          _l(i, n, t),
                          (i = s.sibling);
                      } else i = s.child;
                      if (null !== i) i.return = s;
                      else
                        for (i = s; null !== i; ) {
                          if (i === t) {
                            i = null;
                            break;
                          }
                          if (null !== (s = i.sibling)) {
                            (s.return = i.return), (i = s);
                            break;
                          }
                          i = i.return;
                        }
                      s = i;
                    }
                bi(e, t, a.children, n), (t = t.child);
              }
              return t;
            case 9:
              return (
                (a = t.type),
                (r = t.pendingProps.children),
                Pl(t, n),
                (r = r((a = Dl(a)))),
                (t.flags |= 1),
                bi(e, t, r, n),
                t.child
              );
            case 14:
              return (
                (a = ti((r = t.type), t.pendingProps)),
                wi(e, t, r, (a = ti(r.type, a)), n)
              );
            case 15:
              return ji(e, t, t.type, t.pendingProps, n);
            case 17:
              return (
                (r = t.type),
                (a = t.pendingProps),
                (a = t.elementType === r ? a : ti(r, a)),
                Bi(e, t),
                (t.tag = 1),
                Ta(r) ? ((e = !0), Ma(t)) : (e = !1),
                Pl(t, n),
                li(t, r, a),
                ii(t, r, a, n),
                Ei(null, t, r, !0, e, n)
              );
            case 19:
              return Vi(e, t, n);
            case 22:
              return Ni(e, t, n);
          }
          throw Error(l(156, t.tag));
        };
        var Qc =
          "function" === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Kc(e) {
          this._internalRoot = e;
        }
        function Yc(e) {
          this._internalRoot = e;
        }
        function Jc(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function Gc(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                " react-mount-point-unstable " !== e.nodeValue))
          );
        }
        function Xc() {}
        function Zc(e, t, n, r, a) {
          var l = n._reactRootContainer;
          if (l) {
            var s = l;
            if ("function" === typeof a) {
              var i = a;
              a = function () {
                var e = $c(s);
                i.call(e);
              };
            }
            Hc(t, s, e, a);
          } else
            s = (function (e, t, n, r, a) {
              if (a) {
                if ("function" === typeof r) {
                  var l = r;
                  r = function () {
                    var e = $c(s);
                    l.call(e);
                  };
                }
                var s = Bc(t, r, e, 0, null, !1, 0, "", Xc);
                return (
                  (e._reactRootContainer = s),
                  (e[ma] = s.current),
                  Br(8 === e.nodeType ? e.parentNode : e),
                  uc(),
                  s
                );
              }
              for (; (a = e.lastChild); ) e.removeChild(a);
              if ("function" === typeof r) {
                var i = r;
                r = function () {
                  var e = $c(o);
                  i.call(e);
                };
              }
              var o = Uc(e, 0, !1, null, 0, !1, 0, "", Xc);
              return (
                (e._reactRootContainer = o),
                (e[ma] = o.current),
                Br(8 === e.nodeType ? e.parentNode : e),
                uc(function () {
                  Hc(t, o, n, r);
                }),
                o
              );
            })(n, t, e, a, r);
          return $c(s);
        }
        (Yc.prototype.render = Kc.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(l(409));
            Hc(e, t, null, null);
          }),
          (Yc.prototype.unmount = Kc.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                uc(function () {
                  Hc(null, e, null, null);
                }),
                  (t[ma] = null);
              }
            }),
          (Yc.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = kt();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < Lt.length && 0 !== t && t < Lt[n].priority;
                n++
              );
              Lt.splice(n, 0, e), 0 === n && Ot(e);
            }
          }),
          (wt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes);
                  0 !== n &&
                    (vt(t, 1 | n),
                    rc(t, Ge()),
                    0 === (6 & _o) && ((Bo = Ge() + 500), Ba()));
                }
                break;
              case 13:
                uc(function () {
                  var t = Al(e, 1);
                  if (null !== t) {
                    var n = ec();
                    nc(t, e, 1, n);
                  }
                }),
                  qc(e, 1);
            }
          }),
          (jt = function (e) {
            if (13 === e.tag) {
              var t = Al(e, 134217728);
              if (null !== t) nc(t, e, 134217728, ec());
              qc(e, 134217728);
            }
          }),
          (Nt = function (e) {
            if (13 === e.tag) {
              var t = tc(e),
                n = Al(e, t);
              if (null !== n) nc(n, e, t, ec());
              qc(e, t);
            }
          }),
          (kt = function () {
            return bt;
          }),
          (St = function (e, t) {
            var n = bt;
            try {
              return (bt = e), t();
            } finally {
              bt = n;
            }
          }),
          (je = function (e, t, n) {
            switch (t) {
              case "input":
                if ((X(e, n), (t = n.name), "radio" === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var a = wa(r);
                      if (!a) throw Error(l(90));
                      Q(r), X(r, a);
                    }
                  }
                }
                break;
              case "textarea":
                le(e, n);
                break;
              case "select":
                null != (t = n.value) && ne(e, !!n.multiple, t, !1);
            }
          }),
          (_e = cc),
          (Pe = uc);
        var eu = {
            usingClientEntryPoint: !1,
            Events: [ba, ya, wa, Ce, Ee, cc],
          },
          tu = {
            findFiberByHostInstance: va,
            bundleType: 0,
            version: "18.3.1",
            rendererPackageName: "react-dom",
          },
          nu = {
            bundleType: tu.bundleType,
            version: tu.version,
            rendererPackageName: tu.rendererPackageName,
            rendererConfig: tu.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: y.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = We(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tu.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
          };
        if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var ru = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!ru.isDisabled && ru.supportsFiber)
            try {
              (at = ru.inject(nu)), (lt = ru);
            } catch (ue) {}
        }
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eu),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (!Jc(t)) throw Error(l(200));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: j,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.createRoot = function (e, t) {
            if (!Jc(e)) throw Error(l(299));
            var n = !1,
              r = "",
              a = Qc;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
              (t = Uc(e, 1, !1, null, 0, n, 0, r, a)),
              (e[ma] = t.current),
              Br(8 === e.nodeType ? e.parentNode : e),
              new Kc(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ("function" === typeof e.render) throw Error(l(188));
              throw ((e = Object.keys(e).join(",")), Error(l(268, e)));
            }
            return (e = null === (e = We(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return uc(e);
          }),
          (t.hydrate = function (e, t, n) {
            if (!Gc(t)) throw Error(l(200));
            return Zc(null, e, t, !0, n);
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Jc(e)) throw Error(l(405));
            var r = (null != n && n.hydratedSources) || null,
              a = !1,
              s = "",
              i = Qc;
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (a = !0),
                void 0 !== n.identifierPrefix && (s = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (i = n.onRecoverableError)),
              (t = Bc(t, null, e, 1, null != n ? n : null, a, 0, s, i)),
              (e[ma] = t.current),
              Br(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (a = (a = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, a])
                    : t.mutableSourceEagerHydrationData.push(n, a);
            return new Yc(t);
          }),
          (t.render = function (e, t, n) {
            if (!Gc(t)) throw Error(l(200));
            return Zc(null, e, t, !1, n);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Gc(e)) throw Error(l(40));
            return (
              !!e._reactRootContainer &&
              (uc(function () {
                Zc(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[ma] = null);
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = cc),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Gc(n)) throw Error(l(200));
            if (null == e || void 0 === e._reactInternals) throw Error(l(38));
            return Zc(e, t, n, !1, r);
          }),
          (t.version = "18.3.1-next-f1338f8080-20240426");
      },
      853: (e, t, n) => {
        e.exports = n(234);
      },
      950: (e, t, n) => {
        !(function e() {
          if (
            "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(730));
      },
    },
    t = {};
  function n(r) {
    var a = t[r];
    if (void 0 !== a) return a.exports;
    var l = (t[r] = { exports: {} });
    return e[r](l, l.exports, n), l.exports;
  }
  (() => {
    var e,
      t = Object.getPrototypeOf
        ? (e) => Object.getPrototypeOf(e)
        : (e) => e.__proto__;
    n.t = function (r, a) {
      if ((1 & a && (r = this(r)), 8 & a)) return r;
      if ("object" === typeof r && r) {
        if (4 & a && r.__esModule) return r;
        if (16 & a && "function" === typeof r.then) return r;
      }
      var l = Object.create(null);
      n.r(l);
      var s = {};
      e = e || [null, t({}), t([]), t(t)];
      for (
        var i = 2 & a && r;
        ("object" == typeof i || "function" == typeof i) && !~e.indexOf(i);
        i = t(i)
      )
        Object.getOwnPropertyNames(i).forEach((e) => (s[e] = () => r[e]));
      return (s.default = () => r), n.d(l, s), l;
    };
  })(),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var r,
    a = n(43),
    l = n.t(a, 2),
    s = n(391),
    i = n(950),
    o = n.t(i, 2);
  function c() {
    return (
      (c = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      c.apply(this, arguments)
    );
  }
  !(function (e) {
    (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
  })(r || (r = {}));
  const u = "popstate";
  function d(e, t) {
    if (!1 === e || null === e || "undefined" === typeof e) throw new Error(t);
  }
  function f(e, t) {
    if (!e) {
      "undefined" !== typeof console && console.warn(t);
      try {
        throw new Error(t);
      } catch (n) {}
    }
  }
  function p(e, t) {
    return { usr: e.state, key: e.key, idx: t };
  }
  function m(e, t, n, r) {
    return (
      void 0 === n && (n = null),
      c(
        {
          pathname: "string" === typeof e ? e : e.pathname,
          search: "",
          hash: "",
        },
        "string" === typeof t ? g(t) : t,
        {
          state: n,
          key: (t && t.key) || r || Math.random().toString(36).substr(2, 8),
        }
      )
    );
  }
  function h(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
      n && "?" !== n && (t += "?" === n.charAt(0) ? n : "?" + n),
      r && "#" !== r && (t += "#" === r.charAt(0) ? r : "#" + r),
      t
    );
  }
  function g(e) {
    let t = {};
    if (e) {
      let n = e.indexOf("#");
      n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
      let r = e.indexOf("?");
      r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
        e && (t.pathname = e);
    }
    return t;
  }
  function x(e, t, n, a) {
    void 0 === a && (a = {});
    let { window: l = document.defaultView, v5Compat: s = !1 } = a,
      i = l.history,
      o = r.Pop,
      f = null,
      g = x();
    function x() {
      return (i.state || { idx: null }).idx;
    }
    function v() {
      o = r.Pop;
      let e = x(),
        t = null == e ? null : e - g;
      (g = e), f && f({ action: o, location: y.location, delta: t });
    }
    function b(e) {
      let t =
          "null" !== l.location.origin ? l.location.origin : l.location.href,
        n = "string" === typeof e ? e : h(e);
      return (
        (n = n.replace(/ $/, "%20")),
        d(
          t,
          "No window.location.(origin|href) available to create URL for href: " +
            n
        ),
        new URL(n, t)
      );
    }
    null == g && ((g = 0), i.replaceState(c({}, i.state, { idx: g }), ""));
    let y = {
      get action() {
        return o;
      },
      get location() {
        return e(l, i);
      },
      listen(e) {
        if (f) throw new Error("A history only accepts one active listener");
        return (
          l.addEventListener(u, v),
          (f = e),
          () => {
            l.removeEventListener(u, v), (f = null);
          }
        );
      },
      createHref: (e) => t(l, e),
      createURL: b,
      encodeLocation(e) {
        let t = b(e);
        return { pathname: t.pathname, search: t.search, hash: t.hash };
      },
      push: function (e, t) {
        o = r.Push;
        let a = m(y.location, e, t);
        n && n(a, e), (g = x() + 1);
        let c = p(a, g),
          u = y.createHref(a);
        try {
          i.pushState(c, "", u);
        } catch (d) {
          if (d instanceof DOMException && "DataCloneError" === d.name) throw d;
          l.location.assign(u);
        }
        s && f && f({ action: o, location: y.location, delta: 1 });
      },
      replace: function (e, t) {
        o = r.Replace;
        let a = m(y.location, e, t);
        n && n(a, e), (g = x());
        let l = p(a, g),
          c = y.createHref(a);
        i.replaceState(l, "", c),
          s && f && f({ action: o, location: y.location, delta: 0 });
      },
      go: (e) => i.go(e),
    };
    return y;
  }
  var v;
  !(function (e) {
    (e.data = "data"),
      (e.deferred = "deferred"),
      (e.redirect = "redirect"),
      (e.error = "error");
  })(v || (v = {}));
  new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
  function b(e, t, n) {
    return void 0 === n && (n = "/"), y(e, t, n, !1);
  }
  function y(e, t, n, r) {
    let a = A(("string" === typeof t ? g(t) : t).pathname || "/", n);
    if (null == a) return null;
    let l = w(e);
    !(function (e) {
      e.sort((e, t) =>
        e.score !== t.score
          ? t.score - e.score
          : (function (e, t) {
              let n =
                e.length === t.length &&
                e.slice(0, -1).every((e, n) => e === t[n]);
              return n ? e[e.length - 1] - t[t.length - 1] : 0;
            })(
              e.routesMeta.map((e) => e.childrenIndex),
              t.routesMeta.map((e) => e.childrenIndex)
            )
      );
    })(l);
    let s = null;
    for (let i = 0; null == s && i < l.length; ++i) {
      let e = L(a);
      s = z(l[i], e, r);
    }
    return s;
  }
  function w(e, t, n, r) {
    void 0 === t && (t = []),
      void 0 === n && (n = []),
      void 0 === r && (r = "");
    let a = (e, a, l) => {
      let s = {
        relativePath: void 0 === l ? e.path || "" : l,
        caseSensitive: !0 === e.caseSensitive,
        childrenIndex: a,
        route: e,
      };
      s.relativePath.startsWith("/") &&
        (d(
          s.relativePath.startsWith(r),
          'Absolute route path "' +
            s.relativePath +
            '" nested under path "' +
            r +
            '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
        ),
        (s.relativePath = s.relativePath.slice(r.length)));
      let i = F([r, s.relativePath]),
        o = n.concat(s);
      e.children &&
        e.children.length > 0 &&
        (d(
          !0 !== e.index,
          'Index routes must not have child routes. Please remove all child routes from route path "' +
            i +
            '".'
        ),
        w(e.children, t, o, i)),
        (null != e.path || e.index) &&
          t.push({ path: i, score: D(i, e.index), routesMeta: o });
    };
    return (
      e.forEach((e, t) => {
        var n;
        if ("" !== e.path && null != (n = e.path) && n.includes("?"))
          for (let r of j(e.path)) a(e, t, r);
        else a(e, t);
      }),
      t
    );
  }
  function j(e) {
    let t = e.split("/");
    if (0 === t.length) return [];
    let [n, ...r] = t,
      a = n.endsWith("?"),
      l = n.replace(/\?$/, "");
    if (0 === r.length) return a ? [l, ""] : [l];
    let s = j(r.join("/")),
      i = [];
    return (
      i.push(...s.map((e) => ("" === e ? l : [l, e].join("/")))),
      a && i.push(...s),
      i.map((t) => (e.startsWith("/") && "" === t ? "/" : t))
    );
  }
  const N = /^:[\w-]+$/,
    k = 3,
    S = 2,
    C = 1,
    E = 10,
    _ = -2,
    P = (e) => "*" === e;
  function D(e, t) {
    let n = e.split("/"),
      r = n.length;
    return (
      n.some(P) && (r += _),
      t && (r += S),
      n
        .filter((e) => !P(e))
        .reduce((e, t) => e + (N.test(t) ? k : "" === t ? C : E), r)
    );
  }
  function z(e, t, n) {
    void 0 === n && (n = !1);
    let { routesMeta: r } = e,
      a = {},
      l = "/",
      s = [];
    for (let i = 0; i < r.length; ++i) {
      let e = r[i],
        o = i === r.length - 1,
        c = "/" === l ? t : t.slice(l.length) || "/",
        u = T(
          { path: e.relativePath, caseSensitive: e.caseSensitive, end: o },
          c
        ),
        d = e.route;
      if (
        (!u &&
          o &&
          n &&
          !r[r.length - 1].route.index &&
          (u = T(
            { path: e.relativePath, caseSensitive: e.caseSensitive, end: !1 },
            c
          )),
        !u)
      )
        return null;
      Object.assign(a, u.params),
        s.push({
          params: a,
          pathname: F([l, u.pathname]),
          pathnameBase: U(F([l, u.pathnameBase])),
          route: d,
        }),
        "/" !== u.pathnameBase && (l = F([l, u.pathnameBase]));
    }
    return s;
  }
  function T(e, t) {
    "string" === typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = (function (e, t, n) {
        void 0 === t && (t = !1);
        void 0 === n && (n = !0);
        f(
          "*" === e || !e.endsWith("*") || e.endsWith("/*"),
          'Route path "' +
            e +
            '" will be treated as if it were "' +
            e.replace(/\*$/, "/*") +
            '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
            e.replace(/\*$/, "/*") +
            '".'
        );
        let r = [],
          a =
            "^" +
            e
              .replace(/\/*\*?$/, "")
              .replace(/^\/*/, "/")
              .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
              .replace(
                /\/:([\w-]+)(\?)?/g,
                (e, t, n) => (
                  r.push({ paramName: t, isOptional: null != n }),
                  n ? "/?([^\\/]+)?" : "/([^\\/]+)"
                )
              );
        e.endsWith("*")
          ? (r.push({ paramName: "*" }),
            (a += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
          : n
          ? (a += "\\/*$")
          : "" !== e && "/" !== e && (a += "(?:(?=\\/|$))");
        let l = new RegExp(a, t ? void 0 : "i");
        return [l, r];
      })(e.path, e.caseSensitive, e.end),
      a = t.match(n);
    if (!a) return null;
    let l = a[0],
      s = l.replace(/(.)\/+$/, "$1"),
      i = a.slice(1);
    return {
      params: r.reduce((e, t, n) => {
        let { paramName: r, isOptional: a } = t;
        if ("*" === r) {
          let e = i[n] || "";
          s = l.slice(0, l.length - e.length).replace(/(.)\/+$/, "$1");
        }
        const o = i[n];
        return (e[r] = a && !o ? void 0 : (o || "").replace(/%2F/g, "/")), e;
      }, {}),
      pathname: l,
      pathnameBase: s,
      pattern: e,
    };
  }
  function L(e) {
    try {
      return e
        .split("/")
        .map((e) => decodeURIComponent(e).replace(/\//g, "%2F"))
        .join("/");
    } catch (t) {
      return (
        f(
          !1,
          'The URL path "' +
            e +
            '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' +
            t +
            ")."
        ),
        e
      );
    }
  }
  function A(e, t) {
    if ("/" === t) return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
      r = e.charAt(n);
    return r && "/" !== r ? null : e.slice(n) || "/";
  }
  function R(e, t, n, r) {
    return (
      "Cannot include a '" +
      e +
      "' character in a manually specified `to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the `to." +
      n +
      '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
    );
  }
  function M(e) {
    return e.filter(
      (e, t) => 0 === t || (e.route.path && e.route.path.length > 0)
    );
  }
  function O(e, t) {
    let n = M(e);
    return t
      ? n.map((e, t) => (t === n.length - 1 ? e.pathname : e.pathnameBase))
      : n.map((e) => e.pathnameBase);
  }
  function I(e, t, n, r) {
    let a;
    void 0 === r && (r = !1),
      "string" === typeof e
        ? (a = g(e))
        : ((a = c({}, e)),
          d(
            !a.pathname || !a.pathname.includes("?"),
            R("?", "pathname", "search", a)
          ),
          d(
            !a.pathname || !a.pathname.includes("#"),
            R("#", "pathname", "hash", a)
          ),
          d(!a.search || !a.search.includes("#"), R("#", "search", "hash", a)));
    let l,
      s = "" === e || "" === a.pathname,
      i = s ? "/" : a.pathname;
    if (null == i) l = n;
    else {
      let e = t.length - 1;
      if (!r && i.startsWith("..")) {
        let t = i.split("/");
        for (; ".." === t[0]; ) t.shift(), (e -= 1);
        a.pathname = t.join("/");
      }
      l = e >= 0 ? t[e] : "/";
    }
    let o = (function (e, t) {
        void 0 === t && (t = "/");
        let {
            pathname: n,
            search: r = "",
            hash: a = "",
          } = "string" === typeof e ? g(e) : e,
          l = n
            ? n.startsWith("/")
              ? n
              : (function (e, t) {
                  let n = t.replace(/\/+$/, "").split("/");
                  return (
                    e.split("/").forEach((e) => {
                      ".." === e
                        ? n.length > 1 && n.pop()
                        : "." !== e && n.push(e);
                    }),
                    n.length > 1 ? n.join("/") : "/"
                  );
                })(n, t)
            : t;
        return { pathname: l, search: V(r), hash: B(a) };
      })(a, l),
      u = i && "/" !== i && i.endsWith("/"),
      f = (s || "." === i) && n.endsWith("/");
    return o.pathname.endsWith("/") || (!u && !f) || (o.pathname += "/"), o;
  }
  const F = (e) => e.join("/").replace(/\/\/+/g, "/"),
    U = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    V = (e) => (e && "?" !== e ? (e.startsWith("?") ? e : "?" + e) : ""),
    B = (e) => (e && "#" !== e ? (e.startsWith("#") ? e : "#" + e) : "");
  Error;
  function H(e) {
    return (
      null != e &&
      "number" === typeof e.status &&
      "string" === typeof e.statusText &&
      "boolean" === typeof e.internal &&
      "data" in e
    );
  }
  const $ = ["post", "put", "patch", "delete"],
    W = (new Set($), ["get", ...$]);
  new Set(W), new Set([301, 302, 303, 307, 308]), new Set([307, 308]);
  Symbol("deferred");
  function q() {
    return (
      (q = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      q.apply(this, arguments)
    );
  }
  const Q = a.createContext(null);
  const K = a.createContext(null);
  const Y = a.createContext(null);
  const J = a.createContext(null);
  const G = a.createContext({ outlet: null, matches: [], isDataRoute: !1 });
  const X = a.createContext(null);
  function Z() {
    return null != a.useContext(J);
  }
  function ee() {
    return Z() || d(!1), a.useContext(J).location;
  }
  function te(e) {
    a.useContext(Y).static || a.useLayoutEffect(e);
  }
  function ne() {
    let { isDataRoute: e } = a.useContext(G);
    return e
      ? (function () {
          let { router: e } = fe(ue.UseNavigateStable),
            t = me(de.UseNavigateStable),
            n = a.useRef(!1);
          return (
            te(() => {
              n.current = !0;
            }),
            a.useCallback(
              function (r, a) {
                void 0 === a && (a = {}),
                  n.current &&
                    ("number" === typeof r
                      ? e.navigate(r)
                      : e.navigate(r, q({ fromRouteId: t }, a)));
              },
              [e, t]
            )
          );
        })()
      : (function () {
          Z() || d(!1);
          let e = a.useContext(Q),
            { basename: t, future: n, navigator: r } = a.useContext(Y),
            { matches: l } = a.useContext(G),
            { pathname: s } = ee(),
            i = JSON.stringify(O(l, n.v7_relativeSplatPath)),
            o = a.useRef(!1);
          return (
            te(() => {
              o.current = !0;
            }),
            a.useCallback(
              function (n, a) {
                if ((void 0 === a && (a = {}), !o.current)) return;
                if ("number" === typeof n) return void r.go(n);
                let l = I(n, JSON.parse(i), s, "path" === a.relative);
                null == e &&
                  "/" !== t &&
                  (l.pathname = "/" === l.pathname ? t : F([t, l.pathname])),
                  (a.replace ? r.replace : r.push)(l, a.state, a);
              },
              [t, r, i, s, e]
            )
          );
        })();
  }
  function re(e, t) {
    let { relative: n } = void 0 === t ? {} : t,
      { future: r } = a.useContext(Y),
      { matches: l } = a.useContext(G),
      { pathname: s } = ee(),
      i = JSON.stringify(O(l, r.v7_relativeSplatPath));
    return a.useMemo(() => I(e, JSON.parse(i), s, "path" === n), [e, i, s, n]);
  }
  function ae(e, t, n, l) {
    Z() || d(!1);
    let { navigator: s } = a.useContext(Y),
      { matches: i } = a.useContext(G),
      o = i[i.length - 1],
      c = o ? o.params : {},
      u = (o && o.pathname, o ? o.pathnameBase : "/");
    o && o.route;
    let f,
      p = ee();
    if (t) {
      var m;
      let e = "string" === typeof t ? g(t) : t;
      "/" === u ||
        (null == (m = e.pathname) ? void 0 : m.startsWith(u)) ||
        d(!1),
        (f = e);
    } else f = p;
    let h = f.pathname || "/",
      x = h;
    if ("/" !== u) {
      let e = u.replace(/^\//, "").split("/");
      x = "/" + h.replace(/^\//, "").split("/").slice(e.length).join("/");
    }
    let v = b(e, { pathname: x });
    let y = ce(
      v &&
        v.map((e) =>
          Object.assign({}, e, {
            params: Object.assign({}, c, e.params),
            pathname: F([
              u,
              s.encodeLocation
                ? s.encodeLocation(e.pathname).pathname
                : e.pathname,
            ]),
            pathnameBase:
              "/" === e.pathnameBase
                ? u
                : F([
                    u,
                    s.encodeLocation
                      ? s.encodeLocation(e.pathnameBase).pathname
                      : e.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      l
    );
    return t && y
      ? a.createElement(
          J.Provider,
          {
            value: {
              location: q(
                {
                  pathname: "/",
                  search: "",
                  hash: "",
                  state: null,
                  key: "default",
                },
                f
              ),
              navigationType: r.Pop,
            },
          },
          y
        )
      : y;
  }
  function le() {
    let e = (function () {
        var e;
        let t = a.useContext(X),
          n = pe(de.UseRouteError),
          r = me(de.UseRouteError);
        if (void 0 !== t) return t;
        return null == (e = n.errors) ? void 0 : e[r];
      })(),
      t = H(e)
        ? e.status + " " + e.statusText
        : e instanceof Error
        ? e.message
        : JSON.stringify(e),
      n = e instanceof Error ? e.stack : null,
      r = "rgba(200,200,200, 0.5)",
      l = { padding: "0.5rem", backgroundColor: r };
    return a.createElement(
      a.Fragment,
      null,
      a.createElement("h2", null, "Unexpected Application Error!"),
      a.createElement("h3", { style: { fontStyle: "italic" } }, t),
      n ? a.createElement("pre", { style: l }, n) : null,
      null
    );
  }
  const se = a.createElement(le, null);
  class ie extends a.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        ("idle" !== t.revalidation && "idle" === e.revalidation)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: void 0 !== e.error ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error(
        "React Router caught the following error during render",
        e,
        t
      );
    }
    render() {
      return void 0 !== this.state.error
        ? a.createElement(
            G.Provider,
            { value: this.props.routeContext },
            a.createElement(X.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  }
  function oe(e) {
    let { routeContext: t, match: n, children: r } = e,
      l = a.useContext(Q);
    return (
      l &&
        l.static &&
        l.staticContext &&
        (n.route.errorElement || n.route.ErrorBoundary) &&
        (l.staticContext._deepestRenderedBoundaryId = n.route.id),
      a.createElement(G.Provider, { value: t }, r)
    );
  }
  function ce(e, t, n, r) {
    var l;
    if (
      (void 0 === t && (t = []),
      void 0 === n && (n = null),
      void 0 === r && (r = null),
      null == e)
    ) {
      var s;
      if (!n) return null;
      if (n.errors) e = n.matches;
      else {
        if (
          !(
            null != (s = r) &&
            s.v7_partialHydration &&
            0 === t.length &&
            !n.initialized &&
            n.matches.length > 0
          )
        )
          return null;
        e = n.matches;
      }
    }
    let i = e,
      o = null == (l = n) ? void 0 : l.errors;
    if (null != o) {
      let e = i.findIndex(
        (e) => e.route.id && void 0 !== (null == o ? void 0 : o[e.route.id])
      );
      e >= 0 || d(!1), (i = i.slice(0, Math.min(i.length, e + 1)));
    }
    let c = !1,
      u = -1;
    if (n && r && r.v7_partialHydration)
      for (let a = 0; a < i.length; a++) {
        let e = i[a];
        if (
          ((e.route.HydrateFallback || e.route.hydrateFallbackElement) &&
            (u = a),
          e.route.id)
        ) {
          let { loaderData: t, errors: r } = n,
            a =
              e.route.loader &&
              void 0 === t[e.route.id] &&
              (!r || void 0 === r[e.route.id]);
          if (e.route.lazy || a) {
            (c = !0), (i = u >= 0 ? i.slice(0, u + 1) : [i[0]]);
            break;
          }
        }
      }
    return i.reduceRight((e, r, l) => {
      let s,
        d = !1,
        f = null,
        p = null;
      var m;
      n &&
        ((s = o && r.route.id ? o[r.route.id] : void 0),
        (f = r.route.errorElement || se),
        c &&
          (u < 0 && 0 === l
            ? ((m = "route-fallback"),
              !1 || he[m] || (he[m] = !0),
              (d = !0),
              (p = null))
            : u === l &&
              ((d = !0), (p = r.route.hydrateFallbackElement || null))));
      let h = t.concat(i.slice(0, l + 1)),
        g = () => {
          let t;
          return (
            (t = s
              ? f
              : d
              ? p
              : r.route.Component
              ? a.createElement(r.route.Component, null)
              : r.route.element
              ? r.route.element
              : e),
            a.createElement(oe, {
              match: r,
              routeContext: { outlet: e, matches: h, isDataRoute: null != n },
              children: t,
            })
          );
        };
      return n && (r.route.ErrorBoundary || r.route.errorElement || 0 === l)
        ? a.createElement(ie, {
            location: n.location,
            revalidation: n.revalidation,
            component: f,
            error: s,
            children: g(),
            routeContext: { outlet: null, matches: h, isDataRoute: !0 },
          })
        : g();
    }, null);
  }
  var ue = (function (e) {
      return (
        (e.UseBlocker = "useBlocker"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        e
      );
    })(ue || {}),
    de = (function (e) {
      return (
        (e.UseBlocker = "useBlocker"),
        (e.UseLoaderData = "useLoaderData"),
        (e.UseActionData = "useActionData"),
        (e.UseRouteError = "useRouteError"),
        (e.UseNavigation = "useNavigation"),
        (e.UseRouteLoaderData = "useRouteLoaderData"),
        (e.UseMatches = "useMatches"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        (e.UseRouteId = "useRouteId"),
        e
      );
    })(de || {});
  function fe(e) {
    let t = a.useContext(Q);
    return t || d(!1), t;
  }
  function pe(e) {
    let t = a.useContext(K);
    return t || d(!1), t;
  }
  function me(e) {
    let t = (function () {
        let e = a.useContext(G);
        return e || d(!1), e;
      })(),
      n = t.matches[t.matches.length - 1];
    return n.route.id || d(!1), n.route.id;
  }
  const he = {};
  function ge(e, t) {
    null == e || e.v7_startTransition,
      void 0 === (null == e ? void 0 : e.v7_relativeSplatPath) &&
        (!t || t.v7_relativeSplatPath),
      t &&
        (t.v7_fetcherPersist,
        t.v7_normalizeFormMethod,
        t.v7_partialHydration,
        t.v7_skipActionErrorRevalidation);
  }
  l.startTransition;
  function xe(e) {
    d(!1);
  }
  function ve(e) {
    let {
      basename: t = "/",
      children: n = null,
      location: l,
      navigationType: s = r.Pop,
      navigator: i,
      static: o = !1,
      future: c,
    } = e;
    Z() && d(!1);
    let u = t.replace(/^\/*/, "/"),
      f = a.useMemo(
        () => ({
          basename: u,
          navigator: i,
          static: o,
          future: q({ v7_relativeSplatPath: !1 }, c),
        }),
        [u, c, i, o]
      );
    "string" === typeof l && (l = g(l));
    let {
        pathname: p = "/",
        search: m = "",
        hash: h = "",
        state: x = null,
        key: v = "default",
      } = l,
      b = a.useMemo(() => {
        let e = A(p, u);
        return null == e
          ? null
          : {
              location: { pathname: e, search: m, hash: h, state: x, key: v },
              navigationType: s,
            };
      }, [u, p, m, h, x, v, s]);
    return null == b
      ? null
      : a.createElement(
          Y.Provider,
          { value: f },
          a.createElement(J.Provider, { children: n, value: b })
        );
  }
  function be(e) {
    let { children: t, location: n } = e;
    return ae(ye(t), n);
  }
  new Promise(() => {});
  a.Component;
  function ye(e, t) {
    void 0 === t && (t = []);
    let n = [];
    return (
      a.Children.forEach(e, (e, r) => {
        if (!a.isValidElement(e)) return;
        let l = [...t, r];
        if (e.type === a.Fragment)
          return void n.push.apply(n, ye(e.props.children, l));
        e.type !== xe && d(!1), e.props.index && e.props.children && d(!1);
        let s = {
          id: e.props.id || l.join("-"),
          caseSensitive: e.props.caseSensitive,
          element: e.props.element,
          Component: e.props.Component,
          index: e.props.index,
          path: e.props.path,
          loader: e.props.loader,
          action: e.props.action,
          errorElement: e.props.errorElement,
          ErrorBoundary: e.props.ErrorBoundary,
          hasErrorBoundary:
            null != e.props.ErrorBoundary || null != e.props.errorElement,
          shouldRevalidate: e.props.shouldRevalidate,
          handle: e.props.handle,
          lazy: e.props.lazy,
        };
        e.props.children && (s.children = ye(e.props.children, l)), n.push(s);
      }),
      n
    );
  }
  function we() {
    return (
      (we = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      we.apply(this, arguments)
    );
  }
  function je(e, t) {
    if (null == e) return {};
    var n,
      r,
      a = {},
      l = Object.keys(e);
    for (r = 0; r < l.length; r++)
      (n = l[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
    return a;
  }
  new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
  ]);
  const Ne = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ];
  try {
    window.__reactRouterVersion = "6";
  } catch (It) {}
  new Map();
  const ke = l.startTransition;
  o.flushSync, l.useId;
  function Se(e) {
    let { basename: t, children: n, future: r, window: l } = e,
      s = a.useRef();
    var i;
    null == s.current &&
      (s.current =
        (void 0 === (i = { window: l, v5Compat: !0 }) && (i = {}),
        x(
          function (e, t) {
            let { pathname: n, search: r, hash: a } = e.location;
            return m(
              "",
              { pathname: n, search: r, hash: a },
              (t.state && t.state.usr) || null,
              (t.state && t.state.key) || "default"
            );
          },
          function (e, t) {
            return "string" === typeof t ? t : h(t);
          },
          null,
          i
        )));
    let o = s.current,
      [c, u] = a.useState({ action: o.action, location: o.location }),
      { v7_startTransition: d } = r || {},
      f = a.useCallback(
        (e) => {
          d && ke ? ke(() => u(e)) : u(e);
        },
        [u, d]
      );
    return (
      a.useLayoutEffect(() => o.listen(f), [o, f]),
      a.useEffect(() => ge(r), [r]),
      a.createElement(ve, {
        basename: t,
        children: n,
        location: c.location,
        navigationType: c.action,
        navigator: o,
        future: r,
      })
    );
  }
  const Ce =
      "undefined" !== typeof window &&
      "undefined" !== typeof window.document &&
      "undefined" !== typeof window.document.createElement,
    Ee = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    _e = a.forwardRef(function (e, t) {
      let n,
        {
          onClick: r,
          relative: l,
          reloadDocument: s,
          replace: i,
          state: o,
          target: c,
          to: u,
          preventScrollReset: f,
          viewTransition: p,
        } = e,
        m = je(e, Ne),
        { basename: g } = a.useContext(Y),
        x = !1;
      if ("string" === typeof u && Ee.test(u) && ((n = u), Ce))
        try {
          let e = new URL(window.location.href),
            t = u.startsWith("//") ? new URL(e.protocol + u) : new URL(u),
            n = A(t.pathname, g);
          t.origin === e.origin && null != n
            ? (u = n + t.search + t.hash)
            : (x = !0);
        } catch (It) {}
      let v = (function (e, t) {
          let { relative: n } = void 0 === t ? {} : t;
          Z() || d(!1);
          let { basename: r, navigator: l } = a.useContext(Y),
            { hash: s, pathname: i, search: o } = re(e, { relative: n }),
            c = i;
          return (
            "/" !== r && (c = "/" === i ? r : F([r, i])),
            l.createHref({ pathname: c, search: o, hash: s })
          );
        })(u, { relative: l }),
        b = (function (e, t) {
          let {
              target: n,
              replace: r,
              state: l,
              preventScrollReset: s,
              relative: i,
              viewTransition: o,
            } = void 0 === t ? {} : t,
            c = ne(),
            u = ee(),
            d = re(e, { relative: i });
          return a.useCallback(
            (t) => {
              if (
                (function (e, t) {
                  return (
                    0 === e.button &&
                    (!t || "_self" === t) &&
                    !(function (e) {
                      return !!(
                        e.metaKey ||
                        e.altKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      );
                    })(e)
                  );
                })(t, n)
              ) {
                t.preventDefault();
                let n = void 0 !== r ? r : h(u) === h(d);
                c(e, {
                  replace: n,
                  state: l,
                  preventScrollReset: s,
                  relative: i,
                  viewTransition: o,
                });
              }
            },
            [u, c, d, r, l, n, e, s, i, o]
          );
        })(u, {
          replace: i,
          state: o,
          target: c,
          preventScrollReset: f,
          relative: l,
          viewTransition: p,
        });
      return a.createElement(
        "a",
        we({}, m, {
          href: n || v,
          onClick:
            x || s
              ? r
              : function (e) {
                  r && r(e), e.defaultPrevented || b(e);
                },
          ref: t,
          target: c,
        })
      );
    });
  var Pe, De;
  (function (e) {
    (e.UseScrollRestoration = "useScrollRestoration"),
      (e.UseSubmit = "useSubmit"),
      (e.UseSubmitFetcher = "useSubmitFetcher"),
      (e.UseFetcher = "useFetcher"),
      (e.useViewTransitionState = "useViewTransitionState");
  })(Pe || (Pe = {})),
    (function (e) {
      (e.UseFetcher = "useFetcher"),
        (e.UseFetchers = "useFetchers"),
        (e.UseScrollRestoration = "useScrollRestoration");
    })(De || (De = {}));
  function ze(e) {
    return (
      (ze =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      ze(e)
    );
  }
  function Te(e) {
    var t = (function (e, t) {
      if ("object" != ze(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(e, t || "default");
        if ("object" != ze(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    })(e, "string");
    return "symbol" == ze(t) ? t : t + "";
  }
  function Le(e, t, n) {
    return (
      (t = Te(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function Ae(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Re(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Ae(Object(n), !0).forEach(function (t) {
            Le(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ae(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
    }
    return e;
  }
  var Me = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const Oe = [
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "children",
  ];
  var Ie = (e, t) => {
    const n = (0, a.forwardRef)((n, r) => {
      let {
          color: l = "currentColor",
          size: s = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: o,
          children: c,
        } = n,
        u = (function (e, t) {
          if (null == e) return {};
          var n,
            r,
            a = (function (e, t) {
              if (null == e) return {};
              var n = {};
              for (var r in e)
                if ({}.hasOwnProperty.call(e, r)) {
                  if (-1 !== t.indexOf(r)) continue;
                  n[r] = e[r];
                }
              return n;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var l = Object.getOwnPropertySymbols(e);
            for (r = 0; r < l.length; r++)
              (n = l[r]),
                -1 === t.indexOf(n) &&
                  {}.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]);
          }
          return a;
        })(n, Oe);
      return (0, a.createElement)(
        "svg",
        Re(
          Re({ ref: r }, Me),
          {},
          {
            width: s,
            height: s,
            stroke: l,
            strokeWidth: o ? (24 * Number(i)) / Number(s) : i,
            className: "lucide lucide-".concat(
              ((d = e), d.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())
            ),
          },
          u
        ),
        [
          ...t.map((e) => {
            let [t, n] = e;
            return (0, a.createElement)(t, n);
          }),
          ...((Array.isArray(c) ? c : [c]) || []),
        ]
      );
      var d;
    });
    return (n.displayName = "".concat(e)), n;
  };
  const Fe = Ie("Home", [
      [
        "path",
        { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" },
      ],
      ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
    ]),
    Ue = Ie("HardDrive", [
      ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
      [
        "path",
        {
          d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
          key: "oot6mr",
        },
      ],
      ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
      ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }],
    ]),
    Ve = Ie("Key", [
      ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }],
      ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
      ["path", { d: "m15.5 7.5 3 3L22 7l-3-3", key: "1rn1fs" }],
    ]),
    Be = Ie("BarChart3", [
      ["path", { d: "M3 3v18h18", key: "1s2lah" }],
      ["path", { d: "M18 17V9", key: "2bz60n" }],
      ["path", { d: "M13 17V5", key: "1frdt8" }],
      ["path", { d: "M8 17v-3", key: "17ska0" }],
    ]),
    He = Ie("Settings", [
      [
        "path",
        {
          d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
          key: "1qme2f",
        },
      ],
      ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
    ]),
    $e = Ie("Database", [
      ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
      ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
      ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
    ]),
    We = Ie("Menu", [
      ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
      ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
      ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
    ]),
    qe = Ie("X", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]),
    Qe = Ie("Shield", [
      [
        "path",
        { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", key: "3xmgem" },
      ],
    ]),
    Ke = Ie("Users", [
      [
        "path",
        { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
      ],
      ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
      ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
      ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
    ]);
  var Ye = n(579);
  const Je = () => {
      const [e, t] = (0, a.useState)(!1),
        n = ee(),
        r = [
          { path: "/", label: "Dashboard", icon: Fe },
          { path: "/assets", label: "Asset Management", icon: Ue },
          { path: "/licenses", label: "License Management", icon: Ve },
          { path: "/reports", label: "Reports & Analytics", icon: Be },
          { path: "/settings", label: "Settings", icon: He },
        ];
      return (0, Ye.jsxs)("nav", {
        className:
          "fixed h-screen z-[1000] shadow-lg bg-gradient-to-br from-slate-800 to-slate-700 text-white transition-[width] duration-300 ".concat(
            e ? "w-[72px]" : "w-72"
          ),
        children: [
          (0, Ye.jsxs)("div", {
            className:
              "flex items-center justify-between px-6 py-5 border-b border-white/10",
            children: [
              (0, Ye.jsx)("div", {
                className: "flex items-center gap-3",
                children:
                  !e &&
                  (0, Ye.jsxs)(Ye.Fragment, {
                    children: [
                      (0, Ye.jsx)($e, { className: "w-8 h-8 text-blue-400" }),
                      (0, Ye.jsx)("span", {
                        className: "text-xl font-bold tracking-tight",
                        children: "SVH CMDB",
                      }),
                    ],
                  }),
              }),
              (0, Ye.jsx)("button", {
                className:
                  "p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10",
                onClick: () => t(!e),
                title: e ? "Expand sidebar" : "Collapse sidebar",
                children: e
                  ? (0, Ye.jsx)(We, { size: 20 })
                  : (0, Ye.jsx)(qe, { size: 20 }),
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className: "flex flex-col py-4",
            children: [
              (0, Ye.jsx)("ul", {
                className: "space-y-1",
                children: r.map((t) => {
                  const r = t.icon,
                    a = ((l = t.path), n.pathname === l);
                  var l;
                  return (0, Ye.jsx)(
                    "li",
                    {
                      children: (0, Ye.jsxs)(_e, {
                        to: t.path,
                        className:
                          "mx-2 flex items-center gap-3 rounded-md px-4 py-2 text-slate-300 hover:text-white transition-colors "
                            .concat(
                              a
                                ? "bg-blue-500 text-white"
                                : "hover:bg-white/10",
                              " "
                            )
                            .concat(e ? "justify-center px-2" : ""),
                        title: e ? t.label : "",
                        children: [
                          (0, Ye.jsx)(r, { size: 20, className: "shrink-0" }),
                          !e &&
                            (0, Ye.jsx)("span", {
                              className: "font-medium",
                              children: t.label,
                            }),
                        ],
                      }),
                    },
                    t.path
                  );
                }),
              }),
              !e &&
                (0, Ye.jsx)("div", {
                  className: "mt-auto px-4 pt-6",
                  children: (0, Ye.jsxs)("div", {
                    className: "space-y-2 text-slate-300",
                    children: [
                      (0, Ye.jsxs)("div", {
                        className: "flex items-center gap-2 text-xs",
                        children: [
                          (0, Ye.jsx)(Qe, { size: 14 }),
                          (0, Ye.jsx)("span", { children: "Secure CMDB" }),
                        ],
                      }),
                      (0, Ye.jsxs)("div", {
                        className: "flex items-center gap-2 text-xs",
                        children: [
                          (0, Ye.jsx)(Ke, { size: 14 }),
                          (0, Ye.jsx)("span", { children: "Multi-Venture" }),
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          }),
        ],
      });
    },
    Ge = () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    Xe = (e) => {
      if (!e) return "";
      return new Date(e).toISOString().split("T")[0];
    },
    Ze = (e) => {
      if (!e) return "N/A";
      return new Date(e).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    et = (e) =>
      null === e || void 0 === e
        ? "$0.00"
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(e),
    tt = (e) => {
      if (!e) return null;
      const t = new Date(),
        n = new Date(e) - t;
      return Math.ceil(n / 864e5);
    },
    nt = (e) => {
      switch (e) {
        case "In Use":
          return "success";
        case "In Repair":
          return "warning";
        case "In Stock":
        default:
          return "info";
        case "Retired":
          return "danger";
      }
    },
    rt = (e) => {
      switch (e) {
        case "Laptop":
          return "\ud83d\udcbb";
        case "Desktop":
        case "Server":
          return "\ud83d\udda5\ufe0f";
        case "Network":
          return "\ud83c\udf10";
        case "Mobile":
          return "\ud83d\udcf1";
        case "Peripheral":
          return "\ud83d\uddb1\ufe0f";
        case "Software":
          return "\ud83d\udcbe";
        default:
          return "\ud83d\udce6";
      }
    },
    at = (e, t) => {
      if (!e || 0 === e.length) return;
      const n = Object.keys(e[0]),
        r = [
          n.join(","),
          ...e.map((e) =>
            n
              .map((t) => {
                const n = e[t];
                return Array.isArray(n)
                  ? '"'.concat(n.join("; "), '"')
                  : "string" === typeof n && n.includes(",")
                  ? '"'.concat(n, '"')
                  : n || "";
              })
              .join(",")
          ),
        ].join("\n"),
        a = new Blob([r], { type: "text/csv;charset=utf-8;" }),
        l = document.createElement("a"),
        s = URL.createObjectURL(a);
      l.setAttribute("href", s),
        l.setAttribute("download", "".concat(t, ".csv")),
        (l.style.visibility = "hidden"),
        document.body.appendChild(l),
        l.click(),
        document.body.removeChild(l);
    },
    lt = (e, t) => {
      if (!e) return;
      const n = JSON.stringify(e, null, 2),
        r = new Blob([n], { type: "application/json" }),
        a = document.createElement("a"),
        l = URL.createObjectURL(r);
      a.setAttribute("href", l),
        a.setAttribute("download", "".concat(t, ".json")),
        (a.style.visibility = "hidden"),
        document.body.appendChild(a),
        a.click(),
        document.body.removeChild(a);
    },
    st = (0, a.createContext)(),
    it = {
      assets: [],
      licenses: [],
      ventures: [
        "SVH Main",
        "SVH Ventures",
        "SVH Tech",
        "SVH Digital",
        "SVH Global",
      ],
      departments: [
        "IT",
        "Finance",
        "HR",
        "Operations",
        "Sales",
        "Marketing",
        "Engineering",
        "Support",
      ],
      categories: [
        "Laptop",
        "Desktop",
        "Server",
        "Network",
        "Mobile",
        "Peripheral",
        "Software",
        "Other",
      ],
      statuses: ["In Use", "In Repair", "In Stock", "Retired"],
      loading: !1,
      error: null,
    },
    ot = (e, t) => {
      switch (t.type) {
        case "SET_LOADING":
          return Re(Re({}, e), {}, { loading: t.payload });
        case "SET_ERROR":
          return Re(Re({}, e), {}, { error: t.payload });
        case "SET_ASSETS":
          return Re(Re({}, e), {}, { assets: t.payload });
        case "ADD_ASSET":
          return Re(Re({}, e), {}, { assets: [...e.assets, t.payload] });
        case "UPDATE_ASSET":
          return Re(
            Re({}, e),
            {},
            {
              assets: e.assets.map((e) =>
                e.id === t.payload.id ? t.payload : e
              ),
            }
          );
        case "DELETE_ASSET":
          return Re(
            Re({}, e),
            {},
            { assets: e.assets.filter((e) => e.id !== t.payload) }
          );
        case "SET_LICENSES":
          return Re(Re({}, e), {}, { licenses: t.payload });
        case "ADD_LICENSE":
          return Re(Re({}, e), {}, { licenses: [...e.licenses, t.payload] });
        case "UPDATE_LICENSE":
          return Re(
            Re({}, e),
            {},
            {
              licenses: e.licenses.map((e) =>
                e.id === t.payload.id ? t.payload : e
              ),
            }
          );
        case "DELETE_LICENSE":
          return Re(
            Re({}, e),
            {},
            { licenses: e.licenses.filter((e) => e.id !== t.payload) }
          );
        case "ADD_VENTURE":
          return Re(Re({}, e), {}, { ventures: [...e.ventures, t.payload] });
        case "ADD_DEPARTMENT":
          return Re(
            Re({}, e),
            {},
            { departments: [...e.departments, t.payload] }
          );
        default:
          return e;
      }
    },
    ct = (e) => {
      let { children: t } = e;
      const [n, r] = (0, a.useReducer)(ot, it);
      (0, a.useEffect)(() => {
        l();
      }, []);
      const l = () => {
          const e = [
              {
                id: Ge(),
                name: "Dell Latitude 5520",
                category: "Laptop",
                status: "In Use",
                venture: "SVH Main",
                department: "IT",
                owner: "John Smith",
                assignedTo: "Jane Doe",
                userTitle: "Software Engineer",
                assignedDate: "2024-01-15",
                location: "Floor 3, Building A",
                assetTag: "LAP-001",
                serialNumber: "DL123456789",
                supplier: "Dell Technologies",
                cost: 1299.99,
                depreciationRate: 20,
                acquiredDate: "2024-01-10",
                warrantyEndDate: "2027-01-10",
                hostname: "JANE-LAPTOP",
                ipAddress: "192.168.1.100",
                operatingSystem: "Windows 11 Pro",
                parentAssetId: null,
                tags: ["development", "engineering"],
                software: ["VS Code", "Chrome", "Office 365"],
                notes: "Primary development machine for Jane Doe",
                history: [
                  {
                    date: "2024-01-15",
                    action: "Assigned to Jane Doe",
                    user: "John Smith",
                  },
                ],
              },
              {
                id: Ge(),
                name: "HP EliteDesk 800 G5",
                category: "Desktop",
                status: "In Use",
                venture: "SVH Tech",
                department: "Engineering",
                owner: "Mike Johnson",
                assignedTo: "Bob Wilson",
                userTitle: "Senior Developer",
                assignedDate: "2024-01-20",
                location: "Floor 2, Building B",
                assetTag: "DESK-001",
                serialNumber: "HP987654321",
                supplier: "HP Inc.",
                cost: 899.99,
                depreciationRate: 20,
                acquiredDate: "2024-01-18",
                warrantyEndDate: "2027-01-18",
                hostname: "BOB-DESKTOP",
                ipAddress: "192.168.1.101",
                operatingSystem: "Ubuntu 22.04 LTS",
                parentAssetId: null,
                tags: ["development", "linux"],
                software: ["Docker", "Git", "IntelliJ IDEA"],
                notes: "Linux development environment",
                history: [
                  {
                    date: "2024-01-20",
                    action: "Assigned to Bob Wilson",
                    user: "Mike Johnson",
                  },
                ],
              },
            ],
            t = [
              {
                id: Ge(),
                name: "Microsoft Office 365 Business",
                licenseNumber: "MS-OFFICE-001",
                renewalDate: "2025-01-15",
                cost: 12.5,
                quantity: 50,
                used: 23,
                venture: "SVH Main",
                department: "IT",
                supplier: "Microsoft",
                notes: "Annual subscription for Office 365",
                history: [
                  {
                    date: "2024-01-15",
                    action: "License renewed",
                    user: "John Smith",
                  },
                ],
              },
              {
                id: Ge(),
                name: "Adobe Creative Suite",
                licenseNumber: "ADOBE-CS-001",
                renewalDate: "2024-06-30",
                cost: 52.99,
                quantity: 10,
                used: 8,
                venture: "SVH Digital",
                department: "Marketing",
                supplier: "Adobe",
                notes: "Creative design software licenses",
                history: [
                  {
                    date: "2024-01-01",
                    action: "License purchased",
                    user: "Sarah Davis",
                  },
                ],
              },
            ];
          r({ type: "SET_ASSETS", payload: e }),
            r({ type: "SET_LICENSES", payload: t });
        },
        s = Re(
          Re({}, n),
          {},
          {
            addAsset: (e) => {
              const t = Re(
                Re({}, e),
                {},
                {
                  id: Ge(),
                  assignedDate: e.assignedDate || Xe(new Date()),
                  history: [
                    {
                      date: Xe(new Date()),
                      action: "Asset created",
                      user: "System",
                    },
                  ],
                }
              );
              return r({ type: "ADD_ASSET", payload: t }), t;
            },
            updateAsset: (e, t) => {
              var a;
              const l = Re(
                Re({}, t),
                {},
                {
                  id: e,
                  history: [
                    ...((null === (a = n.assets.find((t) => t.id === e)) ||
                    void 0 === a
                      ? void 0
                      : a.history) || []),
                    {
                      date: Xe(new Date()),
                      action: "Asset updated",
                      user: "System",
                    },
                  ],
                }
              );
              return r({ type: "UPDATE_ASSET", payload: l }), l;
            },
            deleteAsset: (e) => {
              r({ type: "DELETE_ASSET", payload: e });
            },
            addLicense: (e) => {
              const t = Re(
                Re({}, e),
                {},
                {
                  id: Ge(),
                  history: [
                    {
                      date: Xe(new Date()),
                      action: "License created",
                      user: "System",
                    },
                  ],
                }
              );
              return r({ type: "ADD_LICENSE", payload: t }), t;
            },
            updateLicense: (e, t) => {
              var a;
              const l = Re(
                Re({}, t),
                {},
                {
                  id: e,
                  history: [
                    ...((null === (a = n.licenses.find((t) => t.id === e)) ||
                    void 0 === a
                      ? void 0
                      : a.history) || []),
                    {
                      date: Xe(new Date()),
                      action: "License updated",
                      user: "System",
                    },
                  ],
                }
              );
              return r({ type: "UPDATE_LICENSE", payload: l }), l;
            },
            deleteLicense: (e) => {
              r({ type: "DELETE_LICENSE", payload: e });
            },
            getAssetsByVenture: (e) => n.assets.filter((t) => t.venture === e),
            getAssetsByCategory: (e) =>
              n.assets.filter((t) => t.category === e),
            getAssetsByStatus: (e) => n.assets.filter((t) => t.status === e),
            getExpiringLicenses: function () {
              let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 30;
              const t = new Date(),
                r = new Date(t.getTime() + 24 * e * 60 * 60 * 1e3);
              return n.licenses.filter((e) => new Date(e.renewalDate) <= r);
            },
            searchAssets: (e) => {
              const t = e.toLowerCase();
              return n.assets.filter(
                (e) =>
                  e.name.toLowerCase().includes(t) ||
                  e.assignedTo.toLowerCase().includes(t) ||
                  e.venture.toLowerCase().includes(t) ||
                  e.department.toLowerCase().includes(t) ||
                  e.assetTag.toLowerCase().includes(t)
              );
            },
          }
        );
      return (0, Ye.jsx)(st.Provider, { value: s, children: t });
    },
    ut = () => {
      const e = (0, a.useContext)(st);
      if (!e) throw new Error("useAssets must be used within an AssetProvider");
      return e;
    },
    dt = Ie("DollarSign", [
      ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
      [
        "path",
        {
          d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
          key: "1b0p4s",
        },
      ],
    ]),
    ft = Ie("AlertTriangle", [
      [
        "path",
        {
          d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
          key: "c3ski4",
        },
      ],
      ["path", { d: "M12 9v4", key: "juzpu7" }],
      ["path", { d: "M12 17h.01", key: "p32p05" }],
    ]),
    pt = Ie("TrendingUp", [
      ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
      ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }],
    ]),
    mt = (e) =>
      ({
        Laptop: "\ud83d\udcbb",
        Desktop: "\ud83d\udda5\ufe0f",
        Server: "\ud83d\udda5\ufe0f",
        Network: "\ud83c\udf10",
        Mobile: "\ud83d\udcf1",
        Peripheral: "\ud83d\uddb1\ufe0f",
        Software: "\ud83d\udcbe",
        Other: "\ud83d\udce6",
      }[e] || "\ud83d\udce6"),
    ht = () => {
      const {
          assets: e,
          licenses: t,
          ventures: n,
          getAssetsByVenture: r,
          getAssetsByCategory: l,
          getExpiringLicenses: s,
        } = ut(),
        [i, o] = (0, a.useState)("All Ventures"),
        [c, u] = (0, a.useState)("30"),
        d = e.length,
        f = t.length,
        p = e.reduce((e, t) => e + (t.cost || 0), 0),
        m = s(parseInt(c)),
        h = n.map((e) => ({
          name: e,
          count: r(e).length,
          value: r(e).reduce((e, t) => e + (t.cost || 0), 0),
        })),
        g = [
          "Laptop",
          "Desktop",
          "Server",
          "Network",
          "Mobile",
          "Peripheral",
          "Software",
          "Other",
        ]
          .map((e) => ({ name: e, count: l(e).length }))
          .filter((e) => e.count > 0),
        x = [...e, ...t]
          .flatMap((e) =>
            (e.history || []).map((t) =>
              Re(
                Re({}, t),
                {},
                {
                  itemName: e.name,
                  itemType: e.software ? "License" : "Asset",
                  date: new Date(t.date),
                }
              )
            )
          )
          .sort((e, t) => t.date - e.date)
          .slice(0, 10);
      return (0, Ye.jsxs)("div", {
        className: "space-y-8",
        children: [
          (0, Ye.jsxs)("div", {
            className: "mb-8",
            children: [
              (0, Ye.jsx)("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: "Dashboard",
              }),
              (0, Ye.jsx)("p", {
                className: "text-slate-500 text-lg",
                children:
                  "Overview of your SVH Configuration Management Database",
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            children: [
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                children: [
                  (0, Ye.jsx)("div", {
                    className:
                      "w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center",
                    children: (0, Ye.jsx)(Ue, {}),
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("div", {
                        className: "text-2xl font-bold text-slate-800",
                        children: d,
                      }),
                      (0, Ye.jsx)("div", {
                        className:
                          "text-xs uppercase tracking-wider text-slate-500",
                        children: "Total Assets",
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                children: [
                  (0, Ye.jsx)("div", {
                    className:
                      "w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center",
                    children: (0, Ye.jsx)(Ve, {}),
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("div", {
                        className: "text-2xl font-bold text-slate-800",
                        children: f,
                      }),
                      (0, Ye.jsx)("div", {
                        className:
                          "text-xs uppercase tracking-wider text-slate-500",
                        children: "Active Licenses",
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                children: [
                  (0, Ye.jsx)("div", {
                    className:
                      "w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center",
                    children: (0, Ye.jsx)(dt, {}),
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("div", {
                        className: "text-2xl font-bold text-slate-800",
                        children: et(p),
                      }),
                      (0, Ye.jsx)("div", {
                        className:
                          "text-xs uppercase tracking-wider text-slate-500",
                        children: "Total Asset Value",
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                children: [
                  (0, Ye.jsx)("div", {
                    className:
                      "w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center",
                    children: (0, Ye.jsx)(ft, {}),
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("div", {
                        className: "text-2xl font-bold text-slate-800",
                        children: m.length,
                      }),
                      (0, Ye.jsx)("div", {
                        className:
                          "text-xs uppercase tracking-wider text-slate-500",
                        children: "Licenses Expiring Soon",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsx)("div", {
            className:
              "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
            children: (0, Ye.jsxs)("div", {
              className: "grid gap-4 grid-cols-1 sm:grid-cols-2",
              children: [
                (0, Ye.jsxs)("div", {
                  children: [
                    (0, Ye.jsx)("label", {
                      className: "block text-slate-700 font-medium mb-2",
                      children: "Venture",
                    }),
                    (0, Ye.jsxs)("select", {
                      className:
                        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      value: i,
                      onChange: (e) => o(e.target.value),
                      children: [
                        (0, Ye.jsx)("option", {
                          value: "All Ventures",
                          children: "All Ventures",
                        }),
                        n.map((e) =>
                          (0, Ye.jsx)("option", { value: e, children: e }, e)
                        ),
                      ],
                    }),
                  ],
                }),
                (0, Ye.jsxs)("div", {
                  children: [
                    (0, Ye.jsx)("label", {
                      className: "block text-slate-700 font-medium mb-2",
                      children: "Expiration Period",
                    }),
                    (0, Ye.jsxs)("select", {
                      className:
                        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      value: c,
                      onChange: (e) => u(e.target.value),
                      children: [
                        (0, Ye.jsx)("option", {
                          value: "7",
                          children: "Next 7 days",
                        }),
                        (0, Ye.jsx)("option", {
                          value: "30",
                          children: "Next 30 days",
                        }),
                        (0, Ye.jsx)("option", {
                          value: "90",
                          children: "Next 90 days",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, Ye.jsxs)("div", {
            className: "grid gap-6 grid-cols-1 lg:grid-cols-3",
            children: [
              (0, Ye.jsxs)("div", {
                className: "lg:col-span-2 space-y-6",
                children: [
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                    children: [
                      (0, Ye.jsx)("h3", {
                        className: "text-lg font-semibold text-slate-800 mb-4",
                        children: "Asset Distribution by Venture",
                      }),
                      (0, Ye.jsx)("div", {
                        className: "space-y-3",
                        children: h.map((e, t) =>
                          (0, Ye.jsxs)(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                (0, Ye.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between text-sm",
                                  children: [
                                    (0, Ye.jsx)("span", {
                                      className: "font-medium text-slate-700",
                                      children: e.name,
                                    }),
                                    (0, Ye.jsxs)("span", {
                                      className: "text-slate-500",
                                      children: [e.count, " assets"],
                                    }),
                                  ],
                                }),
                                (0, Ye.jsx)("div", {
                                  className: "h-2 bg-slate-200 rounded",
                                  children: (0, Ye.jsx)("div", {
                                    className: "h-2 rounded",
                                    style: {
                                      width: "".concat(
                                        (e.count /
                                          Math.max(...h.map((e) => e.count))) *
                                          100,
                                        "%"
                                      ),
                                      backgroundColor: "hsl(".concat(
                                        60 * t,
                                        ", 70%, 60%)"
                                      ),
                                    },
                                  }),
                                }),
                                (0, Ye.jsx)("div", {
                                  className:
                                    "text-right text-xs font-medium text-slate-700",
                                  children: et(e.value),
                                }),
                              ],
                            },
                            e.name
                          )
                        ),
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                    children: [
                      (0, Ye.jsx)("h3", {
                        className: "text-lg font-semibold text-slate-800 mb-4",
                        children: "Asset Distribution by Category",
                      }),
                      (0, Ye.jsx)("div", {
                        className:
                          "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
                        children: g.map((e) =>
                          (0, Ye.jsxs)(
                            "div",
                            {
                              className:
                                "flex items-center gap-3 p-3 rounded-md bg-slate-50 border border-slate-200",
                              children: [
                                (0, Ye.jsx)("div", {
                                  className: "text-xl w-8 text-center",
                                  children: mt(e.name),
                                }),
                                (0, Ye.jsxs)("div", {
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className:
                                        "text-sm font-medium text-slate-700",
                                      children: e.name,
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-xs text-slate-500",
                                      children: e.count,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.name
                          )
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                    children: [
                      (0, Ye.jsxs)("h3", {
                        className:
                          "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                        children: [
                          (0, Ye.jsx)(ft, { size: 18 }),
                          "Licenses Expiring Soon",
                        ],
                      }),
                      (0, Ye.jsx)("div", {
                        className: "space-y-3",
                        children:
                          m.length > 0
                            ? m.map((e) => {
                                const t = tt(e.renewalDate);
                                return (0, Ye.jsx)(
                                  "div",
                                  {
                                    className:
                                      "p-3 rounded-md bg-slate-50 border border-slate-200",
                                    children: (0, Ye.jsxs)("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        (0, Ye.jsxs)("div", {
                                          children: [
                                            (0, Ye.jsx)("div", {
                                              className:
                                                "text-sm font-medium text-slate-700",
                                              children: e.name,
                                            }),
                                            (0, Ye.jsx)("div", {
                                              className:
                                                "text-xs text-slate-500",
                                              children: e.venture,
                                            }),
                                          ],
                                        }),
                                        (0, Ye.jsxs)("div", {
                                          className: "text-right",
                                          children: [
                                            (0, Ye.jsxs)("span", {
                                              className:
                                                "inline-flex items-center text-xs font-semibold px-2 py-1 rounded ".concat(
                                                  t <= 7
                                                    ? "bg-rose-100 text-rose-800"
                                                    : t <= 30
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-emerald-100 text-emerald-800"
                                                ),
                                              children: [t, " days"],
                                            }),
                                            (0, Ye.jsx)("div", {
                                              className:
                                                "text-xs text-slate-500 mt-1",
                                              children: Ze(e.renewalDate),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  },
                                  e.id
                                );
                              })
                            : (0, Ye.jsx)("div", {
                                className: "text-center text-slate-500 italic",
                                children: "No licenses expiring soon",
                              }),
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                    children: [
                      (0, Ye.jsxs)("h3", {
                        className:
                          "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                        children: [
                          (0, Ye.jsx)(pt, { size: 18 }),
                          "Recent Activities",
                        ],
                      }),
                      (0, Ye.jsx)("div", {
                        className: "space-y-3",
                        children: x.map((e, t) =>
                          (0, Ye.jsxs)(
                            "div",
                            {
                              className:
                                "flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-200",
                              children: [
                                (0, Ye.jsx)("div", {
                                  className:
                                    "w-8 h-8 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center",
                                  children:
                                    "License" === e.itemType
                                      ? (0, Ye.jsx)(Ve, { size: 16 })
                                      : (0, Ye.jsx)(Ue, { size: 16 }),
                                }),
                                (0, Ye.jsxs)("div", {
                                  className: "text-sm",
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className: "font-medium text-slate-700",
                                      children: e.action,
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-500",
                                      children: e.itemName,
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-xs text-slate-400",
                                      children: Ze(e.date),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            t
                          )
                        ),
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                    children: [
                      (0, Ye.jsx)("h3", {
                        className: "text-lg font-semibold text-slate-800 mb-4",
                        children: "Quick Actions",
                      }),
                      (0, Ye.jsxs)("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                          (0, Ye.jsx)("button", {
                            className: "btn btn-primary",
                            children: "Add New Asset",
                          }),
                          (0, Ye.jsx)("button", {
                            className: "btn btn-secondary",
                            children: "Add New License",
                          }),
                          (0, Ye.jsx)("button", {
                            className: "btn btn-success",
                            children: "Generate Report",
                          }),
                          (0, Ye.jsx)("button", {
                            className: "btn btn-info",
                            children: "Export Data",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    },
    gt = Ie("Search", [
      ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
      ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
    ]),
    xt = Ie("Upload", [
      [
        "path",
        { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
      ],
      ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
      ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
    ]),
    vt = Ie("Download", [
      [
        "path",
        { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
      ],
      ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
      ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }],
    ]),
    bt = Ie("Plus", [
      ["path", { d: "M5 12h14", key: "1ays0h" }],
      ["path", { d: "M12 5v14", key: "s699le" }],
    ]),
    yt = Ie("Filter", [
      [
        "polygon",
        {
          points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
          key: "1yg77f",
        },
      ],
    ]),
    wt = Ie("Eye", [
      [
        "path",
        { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" },
      ],
      ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
    ]),
    jt = Ie("PenSquare", [
      [
        "path",
        {
          d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
          key: "1qinfi",
        },
      ],
      [
        "path",
        { d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z", key: "w2jsv5" },
      ],
    ]),
    Nt = Ie("Trash2", [
      ["path", { d: "M3 6h18", key: "d0wm0j" }],
      ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
      ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
      ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
      ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
    ]),
    kt = Ie("Building", [
      [
        "rect",
        {
          width: "16",
          height: "20",
          x: "4",
          y: "2",
          rx: "2",
          ry: "2",
          key: "76otgf",
        },
      ],
      ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
      ["path", { d: "M8 6h.01", key: "1dz90k" }],
      ["path", { d: "M16 6h.01", key: "1x0f13" }],
      ["path", { d: "M12 6h.01", key: "1vi96p" }],
      ["path", { d: "M12 10h.01", key: "1nrarc" }],
      ["path", { d: "M12 14h.01", key: "1etili" }],
      ["path", { d: "M16 10h.01", key: "1m94wz" }],
      ["path", { d: "M16 14h.01", key: "1gbofw" }],
      ["path", { d: "M8 10h.01", key: "19clt8" }],
      ["path", { d: "M8 14h.01", key: "6423bh" }],
    ]),
    St = Ie("Server", [
      [
        "rect",
        {
          width: "20",
          height: "8",
          x: "2",
          y: "2",
          rx: "2",
          ry: "2",
          key: "ngkwjq",
        },
      ],
      [
        "rect",
        {
          width: "20",
          height: "8",
          x: "2",
          y: "14",
          rx: "2",
          ry: "2",
          key: "iecqi9",
        },
      ],
      ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
      ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }],
    ]),
    Ct = Ie("Tag", [
      [
        "path",
        {
          d: "M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z",
          key: "14b2ls",
        },
      ],
      ["path", { d: "M7 7h.01", key: "7u93v4" }],
    ]),
    Et = Ie("Save", [
      [
        "path",
        {
          d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
          key: "1owoqh",
        },
      ],
      ["polyline", { points: "17 21 17 13 7 13 7 21", key: "1md35c" }],
      ["polyline", { points: "7 3 7 8 15 8", key: "8nz8an" }],
    ]),
    _t = (e) => {
      let { asset: t, onClose: n } = e;
      const {
          addAsset: r,
          updateAsset: l,
          ventures: s,
          departments: i,
          categories: o,
          statuses: c,
          assets: u,
        } = ut(),
        [d, f] = (0, a.useState)({
          name: "",
          category: "",
          status: "",
          venture: "",
          department: "",
          owner: "",
          assignedTo: "",
          userTitle: "",
          assignedDate: "",
          location: "",
          assetTag: "",
          serialNumber: "",
          supplier: "",
          cost: "",
          depreciationRate: "",
          acquiredDate: "",
          warrantyEndDate: "",
          hostname: "",
          ipAddress: "",
          operatingSystem: "",
          parentAssetId: "",
          tags: "",
          software: "",
          notes: "",
        }),
        [p, m] = (0, a.useState)({}),
        [h, g] = (0, a.useState)(!1);
      (0, a.useEffect)(() => {
        f(
          t
            ? {
                name: t.name || "",
                category: t.category || "",
                status: t.status || "",
                venture: t.venture || "",
                department: t.department || "",
                owner: t.owner || "",
                assignedTo: t.assignedTo || "",
                userTitle: t.userTitle || "",
                assignedDate: t.assignedDate || Xe(new Date()),
                location: t.location || "",
                assetTag: t.assetTag || "",
                serialNumber: t.serialNumber || "",
                supplier: t.supplier || "",
                cost: t.cost || "",
                depreciationRate: t.depreciationRate || "",
                acquiredDate: t.acquiredDate || "",
                warrantyEndDate: t.warrantyEndDate || "",
                hostname: t.hostname || "",
                ipAddress: t.ipAddress || "",
                operatingSystem: t.operatingSystem || "",
                parentAssetId: t.parentAssetId || "",
                tags: Array.isArray(t.tags) ? t.tags.join(", ") : t.tags || "",
                software: Array.isArray(t.software)
                  ? t.software.join(", ")
                  : t.software || "",
                notes: t.notes || "",
              }
            : (e) =>
                Re(
                  Re({}, e),
                  {},
                  {
                    status: "In Stock",
                    assignedDate: Xe(new Date()),
                    depreciationRate: "20",
                  }
                )
        );
      }, [t]),
        (0, a.useEffect)(() => {
          if (!t && d.category && !d.assetTag) {
            const e = u.filter((e) => e.category === d.category),
              t = ((e, t) => {
                const n = e.substring(0, 3).toUpperCase();
                return "".concat(n, "-").concat(String(t + 1).padStart(3, "0"));
              })(d.category, e.length);
            f((e) => Re(Re({}, e), {}, { assetTag: t }));
          }
        }, [d.category, t, u]);
      const x = (e) => {
        const { name: t, value: n } = e.target;
        f((e) => Re(Re({}, e), {}, { [t]: n })),
          p[t] && m((e) => Re(Re({}, e), {}, { [t]: "" }));
      };
      return (0, Ye.jsx)("div", {
        className:
          "fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4",
        children: (0, Ye.jsxs)("div", {
          className:
            "bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6",
          children: [
            (0, Ye.jsxs)("div", {
              className:
                "flex items-center justify-between border-b border-slate-200 pb-3 mb-6",
              children: [
                (0, Ye.jsxs)("h2", {
                  className: "text-xl font-semibold flex items-center gap-2",
                  children: [
                    (0, Ye.jsx)(Ue, { size: 22 }),
                    t ? "Edit Asset" : "Add New Asset",
                  ],
                }),
                (0, Ye.jsx)("button", {
                  className: "p-2 rounded-md text-slate-500 hover:bg-slate-100",
                  onClick: n,
                  children: (0, Ye.jsx)(qe, { size: 22 }),
                }),
              ],
            }),
            p.submit &&
              (0, Ye.jsx)("div", {
                className:
                  "border border-rose-300 bg-rose-50 text-rose-800 rounded-md p-3 mb-4 text-sm",
                children: p.submit,
              }),
            (0, Ye.jsxs)("form", {
              onSubmit: async (e) => {
                if (
                  (e.preventDefault(),
                  (() => {
                    const e = {};
                    return (
                      d.name.trim() || (e.name = "Asset name is required"),
                      d.category || (e.category = "Category is required"),
                      d.status || (e.status = "Status is required"),
                      d.venture || (e.venture = "Venture is required"),
                      d.department || (e.department = "Department is required"),
                      d.assignedTo.trim() ||
                        (e.assignedTo = "Assigned user is required"),
                      d.assignedDate ||
                        (e.assignedDate = "Assigned date is required"),
                      d.cost &&
                        isNaN(d.cost) &&
                        (e.cost = "Cost must be a valid number"),
                      d.depreciationRate &&
                        isNaN(d.depreciationRate) &&
                        (e.depreciationRate =
                          "Depreciation rate must be a valid number"),
                      m(e),
                      0 === Object.keys(e).length
                    );
                  })())
                ) {
                  g(!0);
                  try {
                    const e = Re(
                      Re({}, d),
                      {},
                      {
                        cost: d.cost ? parseFloat(d.cost) : null,
                        depreciationRate: d.depreciationRate
                          ? parseFloat(d.depreciationRate)
                          : null,
                        tags: d.tags
                          ? d.tags
                              .split(",")
                              .map((e) => e.trim())
                              .filter(Boolean)
                          : [],
                        software: d.software
                          ? d.software
                              .split(",")
                              .map((e) => e.trim())
                              .filter(Boolean)
                          : [],
                        parentAssetId: d.parentAssetId || null,
                      }
                    );
                    t ? await l(t.id, e) : await r(e), n();
                  } catch (a) {
                    console.error("Error saving asset:", a),
                      m({ submit: "Failed to save asset. Please try again." });
                  } finally {
                    g(!1);
                  }
                }
              },
              className: "space-y-6",
              children: [
                (0, Ye.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, Ye.jsxs)("div", {
                      className:
                        "bg-slate-50 border border-slate-200 rounded-lg p-4",
                      children: [
                        (0, Ye.jsxs)("h3", {
                          className:
                            "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(Ue, { size: 18 }),
                            " Basic Information",
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className:
                            "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Asset Name *",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "name",
                                  className: "form-input ".concat(
                                    p.name
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.name,
                                  onChange: x,
                                  placeholder: "e.g., Dell Latitude 5520",
                                }),
                                p.name &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.name,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Category *",
                                }),
                                (0, Ye.jsxs)("select", {
                                  name: "category",
                                  className: "form-select ".concat(
                                    p.category
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.category,
                                  onChange: x,
                                  children: [
                                    (0, Ye.jsx)("option", {
                                      value: "",
                                      children: "Select Category",
                                    }),
                                    o.map((e) =>
                                      (0, Ye.jsx)(
                                        "option",
                                        { value: e, children: e },
                                        e
                                      )
                                    ),
                                  ],
                                }),
                                p.category &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.category,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Status *",
                                }),
                                (0, Ye.jsxs)("select", {
                                  name: "status",
                                  className: "form-select ".concat(
                                    p.status
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.status,
                                  onChange: x,
                                  children: [
                                    (0, Ye.jsx)("option", {
                                      value: "",
                                      children: "Select Status",
                                    }),
                                    c.map((e) =>
                                      (0, Ye.jsx)(
                                        "option",
                                        { value: e, children: e },
                                        e
                                      )
                                    ),
                                  ],
                                }),
                                p.status &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.status,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Asset Tag",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "assetTag",
                                  className: "form-input",
                                  value: d.assetTag,
                                  onChange: x,
                                  placeholder: "Auto-generated",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "bg-slate-50 border border-slate-200 rounded-lg p-4",
                      children: [
                        (0, Ye.jsxs)("h3", {
                          className:
                            "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(kt, { size: 18 }),
                            " Venture & Assignment",
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className:
                            "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Venture *",
                                }),
                                (0, Ye.jsxs)("select", {
                                  name: "venture",
                                  className: "form-select ".concat(
                                    p.venture
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.venture,
                                  onChange: x,
                                  children: [
                                    (0, Ye.jsx)("option", {
                                      value: "",
                                      children: "Select Venture",
                                    }),
                                    s.map((e) =>
                                      (0, Ye.jsx)(
                                        "option",
                                        { value: e, children: e },
                                        e
                                      )
                                    ),
                                  ],
                                }),
                                p.venture &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.venture,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Department *",
                                }),
                                (0, Ye.jsxs)("select", {
                                  name: "department",
                                  className: "form-select ".concat(
                                    p.department
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.department,
                                  onChange: x,
                                  children: [
                                    (0, Ye.jsx)("option", {
                                      value: "",
                                      children: "Select Department",
                                    }),
                                    i.map((e) =>
                                      (0, Ye.jsx)(
                                        "option",
                                        { value: e, children: e },
                                        e
                                      )
                                    ),
                                  ],
                                }),
                                p.department &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.department,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Owner",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "owner",
                                  className: "form-input",
                                  value: d.owner,
                                  onChange: x,
                                  placeholder:
                                    "Business ownerNameor cost center head",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Assigned To *",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "assignedTo",
                                  className: "form-input ".concat(
                                    p.assignedTo
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.assignedTo,
                                  onChange: x,
                                  placeholder: "User name",
                                }),
                                p.assignedTo &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.assignedTo,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "User Title",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "userTitle",
                                  className: "form-input",
                                  value: d.userTitle,
                                  onChange: x,
                                  placeholder: "Position of assigned user",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Assigned Date *",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "date",
                                  name: "assignedDate",
                                  className: "form-input ".concat(
                                    p.assignedDate
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.assignedDate,
                                  onChange: x,
                                }),
                                p.assignedDate &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.assignedDate,
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "bg-slate-50 border border-slate-200 rounded-lg p-4",
                      children: [
                        (0, Ye.jsxs)("h3", {
                          className:
                            "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(St, { size: 18 }),
                            " Technical Details",
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className:
                            "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Serial Number",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "serialNumber",
                                  className: "form-input",
                                  value: d.serialNumber,
                                  onChange: x,
                                  placeholder: "Manufacturer serial number",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Hostname",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "hostname",
                                  className: "form-input",
                                  value: d.hostname,
                                  onChange: x,
                                  placeholder: "Network name",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "IP Address",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "ipAddress",
                                  className: "form-input",
                                  value: d.ipAddress,
                                  onChange: x,
                                  placeholder: "192.168.1.100",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Operating System",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "operatingSystem",
                                  className: "form-input",
                                  value: d.operatingSystem,
                                  onChange: x,
                                  placeholder: "e.g., Windows 11 Pro",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Parent Asset",
                                }),
                                (0, Ye.jsxs)("select", {
                                  name: "parentAssetId",
                                  className: "form-select",
                                  value: d.parentAssetId,
                                  onChange: x,
                                  children: [
                                    (0, Ye.jsx)("option", {
                                      value: "",
                                      children: "No parent asset",
                                    }),
                                    u
                                      .filter(
                                        (e) =>
                                          e.id !==
                                            (null === t || void 0 === t
                                              ? void 0
                                              : t.id) &&
                                          "Software" !== e.category
                                      )
                                      .map((e) => ({
                                        value: e.id,
                                        label: ""
                                          .concat(e.name, " (")
                                          .concat(e.assetTag, ")"),
                                      }))
                                      .map((e) =>
                                        (0, Ye.jsx)(
                                          "option",
                                          { value: e.value, children: e.label },
                                          e.value
                                        )
                                      ),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "bg-slate-50 border border-slate-200 rounded-lg p-4",
                      children: [
                        (0, Ye.jsxs)("h3", {
                          className:
                            "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(dt, { size: 18 }),
                            " Financial & Location",
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className:
                            "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Cost",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "number",
                                  name: "cost",
                                  className: "form-input ".concat(
                                    p.cost
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.cost,
                                  onChange: x,
                                  placeholder: "0.00",
                                  step: "0.01",
                                  min: "0",
                                }),
                                p.cost &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.cost,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Depreciation Rate (%)",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "number",
                                  name: "depreciationRate",
                                  className: "form-input ".concat(
                                    p.depreciationRate
                                      ? "border-rose-400 ring-rose-100 ring-2"
                                      : ""
                                  ),
                                  value: d.depreciationRate,
                                  onChange: x,
                                  placeholder: "20",
                                  step: "0.1",
                                  min: "0",
                                  max: "100",
                                }),
                                p.depreciationRate &&
                                  (0, Ye.jsx)("span", {
                                    className:
                                      "text-rose-600 text-xs mt-1 block",
                                    children: p.depreciationRate,
                                  }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Location",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "location",
                                  className: "form-input",
                                  value: d.location,
                                  onChange: x,
                                  placeholder: "Physical or virtual location",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Supplier",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "supplier",
                                  className: "form-input",
                                  value: d.supplier,
                                  onChange: x,
                                  placeholder: "Vendor or supplier name",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Acquired Date",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "date",
                                  name: "acquiredDate",
                                  className: "form-input",
                                  value: d.acquiredDate,
                                  onChange: x,
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Warranty End Date",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "date",
                                  name: "warrantyEndDate",
                                  className: "form-input",
                                  value: d.warrantyEndDate,
                                  onChange: x,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "bg-slate-50 border border-slate-200 rounded-lg p-4",
                      children: [
                        (0, Ye.jsxs)("h3", {
                          className:
                            "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(Ct, { size: 18 }),
                            " Additional Information",
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className: "grid gap-4 grid-cols-1",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Tags",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "tags",
                                  className: "form-input",
                                  value: d.tags,
                                  onChange: x,
                                  placeholder:
                                    "Comma-separated tags (e.g., development, engineering)",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Installed Software",
                                }),
                                (0, Ye.jsx)("input", {
                                  type: "text",
                                  name: "software",
                                  className: "form-input",
                                  value: d.software,
                                  onChange: x,
                                  placeholder: "Comma-separated software list",
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("label", {
                                  className: "form-label",
                                  children: "Notes",
                                }),
                                (0, Ye.jsx)("textarea", {
                                  name: "notes",
                                  rows: 3,
                                  className: "form-input",
                                  value: d.notes,
                                  onChange: x,
                                  placeholder: "Additional comments or notes",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, Ye.jsxs)("div", {
                  className:
                    "flex items-center justify-end gap-2 border-t border-slate-200 pt-4",
                  children: [
                    (0, Ye.jsx)("button", {
                      type: "button",
                      className: "btn btn-secondary",
                      onClick: n,
                      children: "Cancel",
                    }),
                    (0, Ye.jsxs)("button", {
                      type: "submit",
                      className: "btn btn-primary",
                      disabled: h,
                      children: [
                        (0, Ye.jsx)(Et, { size: 16 }),
                        (0, Ye.jsx)("span", {
                          className: "ml-2",
                          children: h
                            ? "Saving..."
                            : t
                            ? "Update Asset"
                            : "Create Asset",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    },
    Pt = Ie("History", [
      [
        "path",
        {
          d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
          key: "1357e3",
        },
      ],
      ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
      ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }],
    ]),
    Dt = (e) => {
      let { asset: t, onClose: n, onEdit: r } = e;
      if (!t) return null;
      const a = (e) => {
          switch (nt(e)) {
            case "success":
              return "bg-emerald-100 text-emerald-800";
            case "warning":
              return "bg-amber-100 text-amber-800";
            case "danger":
              return "bg-rose-100 text-rose-800";
            default:
              return "bg-blue-100 text-blue-800";
          }
        },
        l = (e) => (Array.isArray(e) ? e.join(", ") : e || "N/A"),
        s = (e) => (e ? Ze(e) : "N/A");
      return (0, Ye.jsx)("div", {
        className:
          "fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4",
        children: (0, Ye.jsxs)("div", {
          className:
            "bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6",
          children: [
            (0, Ye.jsxs)("div", {
              className:
                "flex items-center justify-between border-b border-slate-200 pb-3 mb-6",
              children: [
                (0, Ye.jsxs)("h2", {
                  className: "text-xl font-semibold flex items-center gap-2",
                  children: [(0, Ye.jsx)(Ue, { size: 22 }), " Asset Details"],
                }),
                (0, Ye.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, Ye.jsxs)("button", {
                      className: "btn btn-primary btn-sm",
                      onClick: r,
                      children: [
                        (0, Ye.jsx)(jt, { size: 16 }),
                        (0, Ye.jsx)("span", {
                          className: "ml-1",
                          children: "Edit",
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("button", {
                      className:
                        "p-2 rounded-md text-slate-500 hover:bg-slate-100",
                      onClick: n,
                      children: (0, Ye.jsx)(qe, { size: 22 }),
                    }),
                  ],
                }),
              ],
            }),
            (0, Ye.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, Ye.jsxs)("div", {
                  className:
                    "flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50",
                  children: [
                    (0, Ye.jsx)("div", {
                      className:
                        "text-4xl w-16 h-16 flex items-center justify-center rounded-xl bg-white shadow-sm",
                      children: rt(t.category),
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        (0, Ye.jsx)("h3", {
                          className: "text-2xl font-bold text-slate-800",
                          children: t.name,
                        }),
                        (0, Ye.jsxs)("div", {
                          className: "flex flex-wrap items-center gap-2 mt-2",
                          children: [
                            (0, Ye.jsx)("span", {
                              className:
                                "px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-sm font-mono",
                              children: t.assetTag,
                            }),
                            (0, Ye.jsx)("span", {
                              className:
                                "px-2 py-1 rounded text-xs font-semibold ".concat(
                                  a(t.status)
                                ),
                              children: t.status,
                            }),
                            (0, Ye.jsx)("span", {
                              className:
                                "px-2 py-1 rounded bg-sky-100 text-sky-800 text-xs font-medium",
                              children: t.category,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, Ye.jsxs)("div", {
                  className: "grid gap-6 grid-cols-1 md:grid-cols-2",
                  children: [
                    (0, Ye.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, Ye.jsxs)("section", {
                          className:
                            "p-4 rounded-lg border border-slate-200 bg-white",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                              children: [
                                (0, Ye.jsx)(Ue, { size: 18 }),
                                " Basic Information",
                              ],
                            }),
                            (0, Ye.jsxs)("dl", {
                              className: "grid grid-cols-2 gap-3 text-sm",
                              children: [
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Asset Name",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.name,
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Category",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.category,
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Status",
                                }),
                                (0, Ye.jsx)("dd", {
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "px-2 py-1 rounded text-xs font-semibold ".concat(
                                        a(t.status)
                                      ),
                                    children: t.status,
                                  }),
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Asset Tag",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "font-mono text-slate-800",
                                  children: t.assetTag,
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Serial Number",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "font-mono text-slate-800",
                                  children: t.serialNumber || "N/A",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Supplier",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.supplier || "N/A",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("section", {
                          className:
                            "p-4 rounded-lg border border-slate-200 bg-white",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                              children: [
                                (0, Ye.jsx)(St, { size: 18 }),
                                " Technical Details",
                              ],
                            }),
                            (0, Ye.jsxs)("dl", {
                              className: "grid grid-cols-2 gap-3 text-sm",
                              children: [
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Hostname",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "font-mono text-slate-800",
                                  children: t.hostname || "N/A",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "IP Address",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "font-mono text-slate-800",
                                  children: t.ipAddress || "N/A",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Operating System",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.operatingSystem || "N/A",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Parent Asset",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.parentAssetId || "None",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Location",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.location || "N/A",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, Ye.jsxs)("section", {
                          className:
                            "p-4 rounded-lg border border-slate-200 bg-white",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                              children: [
                                (0, Ye.jsx)(dt, { size: 18 }),
                                " Financial Information",
                              ],
                            }),
                            (0, Ye.jsxs)("dl", {
                              className: "grid grid-cols-2 gap-3 text-sm",
                              children: [
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Purchase Cost",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className:
                                    "font-mono text-emerald-700 font-semibold",
                                  children: ((i = t.cost), i ? et(i) : "N/A"),
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Depreciation Rate",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: t.depreciationRate
                                    ? "".concat(t.depreciationRate, "%")
                                    : "N/A",
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Acquired Date",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: s(t.acquiredDate),
                                }),
                                (0, Ye.jsx)("dt", {
                                  className: "text-slate-500",
                                  children: "Warranty End Date",
                                }),
                                (0, Ye.jsx)("dd", {
                                  className: "text-slate-800",
                                  children: s(t.warrantyEndDate),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("section", {
                          className:
                            "p-4 rounded-lg border border-slate-200 bg-white",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                              children: [
                                (0, Ye.jsx)(Ct, { size: 18 }),
                                " Additional Information",
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              className: "space-y-3 text-sm",
                              children: [
                                (0, Ye.jsxs)("div", {
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-500",
                                      children: "Tags",
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-800",
                                      children: l(t.tags),
                                    }),
                                  ],
                                }),
                                (0, Ye.jsxs)("div", {
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-500",
                                      children: "Installed Software",
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-800",
                                      children: l(t.software),
                                    }),
                                  ],
                                }),
                                (0, Ye.jsxs)("div", {
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className: "text-slate-500",
                                      children: "Notes",
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className:
                                        "text-slate-800 whitespace-pre-wrap",
                                      children: t.notes || "No notes available",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("section", {
                          className:
                            "p-4 rounded-lg border border-slate-200 bg-white",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-slate-800 font-semibold mb-4 flex items-center gap-2",
                              children: [
                                (0, Ye.jsx)(Pt, { size: 18 }),
                                " Change History",
                              ],
                            }),
                            (0, Ye.jsx)("div", {
                              className: "space-y-2 text-sm",
                              children:
                                t.history && t.history.length > 0
                                  ? t.history.map((e, t) =>
                                      (0, Ye.jsxs)(
                                        "div",
                                        {
                                          className:
                                            "flex items-center gap-3 p-2 rounded-md bg-slate-50 border border-slate-200",
                                          children: [
                                            (0, Ye.jsx)("div", {
                                              className:
                                                "text-slate-500 min-w-[90px]",
                                              children: s(e.date),
                                            }),
                                            (0, Ye.jsx)("div", {
                                              className:
                                                "text-slate-800 flex-1",
                                              children: e.action,
                                            }),
                                            (0, Ye.jsxs)("div", {
                                              className:
                                                "text-slate-500 italic",
                                              children: ["by ", e.user],
                                            }),
                                          ],
                                        },
                                        t
                                      )
                                    )
                                  : (0, Ye.jsx)("div", {
                                      className:
                                        "text-center text-slate-500 italic",
                                      children: "No change history available",
                                    }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, Ye.jsxs)("div", {
              className:
                "flex items-center justify-end gap-2 border-t border-slate-200 pt-4 mt-6",
              children: [
                (0, Ye.jsx)("button", {
                  className: "btn btn-secondary",
                  onClick: n,
                  children: "Close",
                }),
                (0, Ye.jsxs)("button", {
                  className: "btn btn-primary",
                  onClick: r,
                  children: [
                    (0, Ye.jsx)(jt, { size: 16 }),
                    (0, Ye.jsx)("span", {
                      className: "ml-2",
                      children: "Edit Asset",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
      var i;
    },
    zt = () => {
      const {
          assets: e,
          ventures: t,
          categories: n,
          statuses: r,
          deleteAsset: l,
          searchAssets: s,
        } = ut(),
        [i, o] = (0, a.useState)(""),
        [c, u] = (0, a.useState)(""),
        [d, f] = (0, a.useState)(""),
        [p, m] = (0, a.useState)(""),
        [h, g] = (0, a.useState)(!1),
        [x, v] = (0, a.useState)(null),
        [b, y] = (0, a.useState)(null),
        [w, j] = (0, a.useState)("name"),
        [N, k] = (0, a.useState)("asc"),
        S = (0, a.useMemo)(() => {
          let t = e;
          return (
            i && (t = s(i)),
            c && (t = t.filter((e) => e.venture === c)),
            d && (t = t.filter((e) => e.category === d)),
            p && (t = t.filter((e) => e.status === p)),
            t.sort((e, t) => {
              let n = e[w],
                r = t[w];
              return (
                "string" === typeof n &&
                  ((n = n.toLowerCase()), (r = r.toLowerCase())),
                "asc" === N ? (n > r ? 1 : -1) : n < r ? 1 : -1
              );
            }),
            t
          );
        }, [e, i, c, d, p, w, N, s]),
        C = (e) => {
          w === e ? k("asc" === N ? "desc" : "asc") : (j(e), k("asc"));
        },
        E = (e) => (w === e ? ("asc" === N ? "\u2191" : "\u2193") : null);
      return (0, Ye.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, Ye.jsxs)("div", {
            className: "mb-2",
            children: [
              (0, Ye.jsx)("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: "Asset Management",
              }),
              (0, Ye.jsx)("p", {
                className: "text-slate-500",
                children:
                  "Manage hardware and software assets across all SVH ventures",
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
            children: [
              (0, Ye.jsxs)("div", {
                className:
                  "flex items-center bg-white border border-slate-300 rounded-md px-3 py-2 max-w-md w-full",
                children: [
                  (0, Ye.jsx)(gt, { size: 20, className: "text-slate-400" }),
                  (0, Ye.jsx)("input", {
                    type: "text",
                    placeholder: "Search assets...",
                    className: "ml-2 w-full outline-none text-sm",
                    value: i,
                    onChange: (e) => o(e.target.value),
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-secondary",
                    onClick: () => g(!0),
                    children: [
                      (0, Ye.jsx)(xt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Import",
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-secondary",
                    onClick: () => {
                      "csv" === "csv"
                        ? at(S, "svh-assets")
                        : lt(S, "svh-assets");
                    },
                    children: [
                      (0, Ye.jsx)(vt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Export CSV",
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-primary",
                    onClick: () => g(!0),
                    children: [
                      (0, Ye.jsx)(bt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Add Asset",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-4 shadow-sm border border-slate-200",
            children: [
              (0, Ye.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  (0, Ye.jsxs)("h3", {
                    className:
                      "text-slate-800 font-semibold flex items-center gap-2",
                    children: [(0, Ye.jsx)(yt, { size: 18 }), " Filters"],
                  }),
                  (0, Ye.jsx)("button", {
                    className: "btn btn-sm btn-secondary",
                    onClick: () => {
                      o(""), u(""), f(""), m("");
                    },
                    children: "Clear All",
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Venture",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: c,
                        onChange: (e) => u(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Ventures",
                          }),
                          t.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Category",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: d,
                        onChange: (e) => f(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Categories",
                          }),
                          n.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Status",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: p,
                        onChange: (e) => m(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Statuses",
                          }),
                          r.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className: "text-slate-500 text-sm",
            children: ["Showing ", S.length, " of ", e.length, " assets"],
          }),
          (0, Ye.jsx)("div", {
            className:
              "bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto",
            children: (0, Ye.jsxs)("table", {
              className: "min-w-[800px] w-full text-sm",
              children: [
                (0, Ye.jsx)("thead", {
                  className: "bg-slate-50",
                  children: (0, Ye.jsxs)("tr", {
                    className: "text-left text-slate-700",
                    children: [
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("name"),
                        children: ["Asset Name ", E("name")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("category"),
                        children: ["Category ", E("category")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("status"),
                        children: ["Status ", E("status")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("venture"),
                        children: ["Venture ", E("venture")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("assignedTo"),
                        children: ["Assigned To ", E("assignedTo")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("cost"),
                        children: ["Cost ", E("cost")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => C("assignedDate"),
                        children: ["Assigned Date ", E("assignedDate")],
                      }),
                      (0, Ye.jsx)("th", {
                        className: "px-3 py-3",
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                (0, Ye.jsx)("tbody", {
                  children:
                    S.length > 0
                      ? S.map((e) =>
                          (0, Ye.jsxs)(
                            "tr",
                            {
                              className:
                                "border-t border-slate-100 hover:bg-slate-50",
                              children: [
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                      (0, Ye.jsx)("span", {
                                        className: "text-xl w-6 text-center",
                                        children: rt(e.category),
                                      }),
                                      (0, Ye.jsxs)("div", {
                                        className: "leading-tight",
                                        children: [
                                          (0, Ye.jsx)("div", {
                                            className:
                                              "font-medium text-slate-800",
                                            children: e.name,
                                          }),
                                          (0, Ye.jsx)("div", {
                                            className:
                                              "text-xs text-slate-500 font-mono",
                                            children: e.assetTag,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "inline-block text-xs font-medium px-2 py-1 rounded bg-indigo-100 text-indigo-700",
                                    children: e.category,
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "inline-block text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide ".concat(
                                        "success" === nt(e.status)
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "warning" === nt(e.status)
                                          ? "bg-amber-100 text-amber-800"
                                          : "danger" === nt(e.status)
                                          ? "bg-rose-100 text-rose-800"
                                          : "bg-blue-100 text-blue-800"
                                      ),
                                    children: e.status,
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "inline-block text-xs font-medium px-2 py-1 rounded bg-sky-100 text-sky-800",
                                    children: e.venture,
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "leading-tight",
                                    children: [
                                      (0, Ye.jsx)("div", {
                                        className: "text-slate-800",
                                        children: e.assignedTo,
                                      }),
                                      (0, Ye.jsx)("div", {
                                        className: "text-xs text-slate-500",
                                        children: e.userTitle,
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className:
                                    "px-3 py-3 font-mono text-emerald-700 font-semibold",
                                  children: et(e.cost),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3 text-slate-600",
                                  children: Ze(e.assignedDate),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-secondary",
                                        title: "View Details",
                                        onClick: () => ((e) => y(e))(e),
                                        children: (0, Ye.jsx)(wt, { size: 16 }),
                                      }),
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-primary",
                                        title: "Edit Asset",
                                        onClick: () =>
                                          ((e) => {
                                            v(e), g(!0);
                                          })(e),
                                        children: (0, Ye.jsx)(jt, { size: 16 }),
                                      }),
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-danger",
                                        title: "Delete Asset",
                                        onClick: () => {
                                          return (
                                            (t = e.id),
                                            void (
                                              window.confirm(
                                                "Are you sure you want to delete this asset?"
                                              ) && l(t)
                                            )
                                          );
                                          var t;
                                        },
                                        children: (0, Ye.jsx)(Nt, { size: 16 }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.id
                          )
                        )
                      : (0, Ye.jsx)("tr", {
                          children: (0, Ye.jsx)("td", {
                            colSpan: "8",
                            className: "px-3 py-8",
                            children: (0, Ye.jsxs)("div", {
                              className: "text-center text-slate-500",
                              children: [
                                (0, Ye.jsx)(Ue, {
                                  size: 48,
                                  className: "mx-auto mb-2 text-slate-300",
                                }),
                                (0, Ye.jsx)("p", {
                                  children:
                                    "No assets found matching your criteria",
                                }),
                                (0, Ye.jsx)("button", {
                                  className: "btn btn-primary mt-3",
                                  onClick: () => g(!0),
                                  children: "Add Your First Asset",
                                }),
                              ],
                            }),
                          }),
                        }),
                }),
              ],
            }),
          }),
          h &&
            (0, Ye.jsx)(_t, {
              asset: x,
              onClose: () => {
                g(!1), v(null);
              },
            }),
          b &&
            (0, Ye.jsx)(Dt, {
              asset: b,
              onClose: () => y(null),
              onEdit: () => {
                y(null), v(b), g(!0);
              },
            }),
        ],
      });
    },
    Tt = Ie("Calendar", [
      [
        "rect",
        {
          width: "18",
          height: "18",
          x: "3",
          y: "4",
          rx: "2",
          ry: "2",
          key: "eu3xkr",
        },
      ],
      ["line", { x1: "16", x2: "16", y1: "2", y2: "6", key: "m3sa8f" }],
      ["line", { x1: "8", x2: "8", y1: "2", y2: "6", key: "18kwsl" }],
      ["line", { x1: "3", x2: "21", y1: "10", y2: "10", key: "xt86sb" }],
    ]),
    Lt = () => {
      const {
          licenses: e,
          ventures: t,
          departments: n,
          deleteLicense: r,
        } = ut(),
        [l, s] = (0, a.useState)(""),
        [i, o] = (0, a.useState)(""),
        [c, u] = (0, a.useState)(""),
        [d, f] = (0, a.useState)(""),
        [p, m] = (0, a.useState)("name"),
        [h, g] = (0, a.useState)("asc"),
        x = (0, a.useMemo)(() => {
          let t = e;
          if (
            (l &&
              (t = t.filter(
                (e) =>
                  e.name.toLowerCase().includes(l.toLowerCase()) ||
                  e.licenseNumber.toLowerCase().includes(l.toLowerCase()) ||
                  e.venture.toLowerCase().includes(l.toLowerCase()) ||
                  e.department.toLowerCase().includes(l.toLowerCase())
              )),
            i && (t = t.filter((e) => e.venture === i)),
            c && (t = t.filter((e) => e.department === c)),
            d)
          ) {
            const e = parseInt(d);
            t = t.filter((t) => {
              const n = tt(t.renewalDate);
              return null !== n && n <= e;
            });
          }
          return (
            t.sort((e, t) => {
              let n = e[p],
                r = t[p];
              return (
                "renewalDate" === p
                  ? ((n = new Date(n)), (r = new Date(r)))
                  : "string" === typeof n &&
                    ((n = n.toLowerCase()), (r = r.toLowerCase())),
                "asc" === h ? (n > r ? 1 : -1) : n < r ? 1 : -1
              );
            }),
            t
          );
        }, [e, l, i, c, d, p, h]),
        v = (e) => {
          p === e ? g("asc" === h ? "desc" : "asc") : (m(e), g("asc"));
        },
        b = (e) => (p === e ? ("asc" === h ? "\u2191" : "\u2193") : null),
        y = (e) => {
          const t = tt(e);
          return null === t
            ? "bg-slate-200 text-slate-700"
            : t <= 7
            ? "bg-rose-100 text-rose-800"
            : t <= 30
            ? "bg-amber-100 text-amber-800"
            : t <= 90
            ? "bg-blue-100 text-blue-800"
            : "bg-emerald-100 text-emerald-800";
        };
      return (0, Ye.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, Ye.jsxs)("div", {
            children: [
              (0, Ye.jsx)("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: "License Management",
              }),
              (0, Ye.jsx)("p", {
                className: "text-slate-500",
                children:
                  "Manage software licenses and track renewal dates across all SVH ventures",
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
            children: [
              (0, Ye.jsxs)("div", {
                className:
                  "flex items-center bg-white border border-slate-300 rounded-md px-3 py-2 max-w-md w-full",
                children: [
                  (0, Ye.jsx)(gt, { size: 20, className: "text-slate-400" }),
                  (0, Ye.jsx)("input", {
                    type: "text",
                    placeholder: "Search licenses...",
                    className: "ml-2 w-full outline-none text-sm",
                    value: l,
                    onChange: (e) => s(e.target.value),
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-secondary",
                    children: [
                      (0, Ye.jsx)(xt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Import",
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-secondary",
                    onClick: () => {
                      "csv" === "csv"
                        ? at(x, "svh-licenses")
                        : lt(x, "svh-licenses");
                    },
                    children: [
                      (0, Ye.jsx)(vt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Export CSV",
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("button", {
                    className: "btn btn-primary",
                    children: [
                      (0, Ye.jsx)(bt, { size: 16 }),
                      (0, Ye.jsx)("span", {
                        className: "ml-2",
                        children: "Add License",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-4 shadow-sm border border-slate-200",
            children: [
              (0, Ye.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  (0, Ye.jsxs)("h3", {
                    className:
                      "text-slate-800 font-semibold flex items-center gap-2",
                    children: [(0, Ye.jsx)(yt, { size: 18 }), " Filters"],
                  }),
                  (0, Ye.jsx)("button", {
                    className: "btn btn-sm btn-secondary",
                    onClick: () => {
                      s(""), o(""), u(""), f("");
                    },
                    children: "Clear All",
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Venture",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: i,
                        onChange: (e) => o(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Ventures",
                          }),
                          t.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Department",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: c,
                        onChange: (e) => u(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Departments",
                          }),
                          n.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Expiry Filter",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: d,
                        onChange: (e) => f(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "",
                            children: "All Licenses",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "7",
                            children: "Expiring in 7 days",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "30",
                            children: "Expiring in 30 days",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "90",
                            children: "Expiring in 90 days",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className: "text-slate-500 text-sm",
            children: ["Showing ", x.length, " of ", e.length, " licenses"],
          }),
          (0, Ye.jsx)("div", {
            className:
              "bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto",
            children: (0, Ye.jsxs)("table", {
              className: "min-w-[900px] w-full text-sm",
              children: [
                (0, Ye.jsx)("thead", {
                  className: "bg-slate-50",
                  children: (0, Ye.jsxs)("tr", {
                    className: "text-left text-slate-700",
                    children: [
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("name"),
                        children: ["License Name ", b("name")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("licenseNumber"),
                        children: ["License Number ", b("licenseNumber")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("venture"),
                        children: ["Venture ", b("venture")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("department"),
                        children: ["Department ", b("department")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("renewalDate"),
                        children: ["Renewal Date ", b("renewalDate")],
                      }),
                      (0, Ye.jsxs)("th", {
                        className: "px-3 py-3 cursor-pointer",
                        onClick: () => v("cost"),
                        children: ["Cost ", b("cost")],
                      }),
                      (0, Ye.jsx)("th", {
                        className: "px-3 py-3",
                        children: "Usage",
                      }),
                      (0, Ye.jsx)("th", {
                        className: "px-3 py-3",
                        children: "Status",
                      }),
                      (0, Ye.jsx)("th", {
                        className: "px-3 py-3",
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                (0, Ye.jsx)("tbody", {
                  children:
                    x.length > 0
                      ? x.map((e) => {
                          const t = tt(e.renewalDate);
                          return (0, Ye.jsxs)(
                            "tr",
                            {
                              className:
                                "border-t border-slate-100 hover:bg-slate-50",
                              children: [
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                      (0, Ye.jsx)("span", {
                                        className: "text-xl w-6 text-center",
                                        children: "\ud83d\udd11",
                                      }),
                                      (0, Ye.jsxs)("div", {
                                        className: "leading-tight",
                                        children: [
                                          (0, Ye.jsx)("div", {
                                            className:
                                              "font-medium text-slate-800",
                                            children: e.name,
                                          }),
                                          (0, Ye.jsx)("div", {
                                            className: "text-xs text-slate-500",
                                            children: e.supplier,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3 font-mono",
                                  children: e.licenseNumber,
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "px-2 py-1 rounded bg-sky-100 text-sky-800 text-xs font-medium",
                                    children: e.venture,
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsx)("span", {
                                    className:
                                      "px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-medium",
                                    children: e.department,
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "leading-tight",
                                    children: [
                                      (0, Ye.jsx)("div", {
                                        className: "text-slate-800 text-sm",
                                        children: Ze(e.renewalDate),
                                      }),
                                      (0, Ye.jsx)("div", {
                                        className:
                                          "inline-flex items-center text-xs font-semibold px-2 py-1 rounded ".concat(
                                            y(e.renewalDate)
                                          ),
                                        children:
                                          null !== t
                                            ? "".concat(t, " days")
                                            : "Unknown",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className:
                                    "px-3 py-3 font-mono text-emerald-700 font-semibold",
                                  children: et(e.cost),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "min-w-[120px]",
                                    children: [
                                      (0, Ye.jsxs)("div", {
                                        className:
                                          "text-xs text-slate-500 text-center",
                                        children: [e.used, " / ", e.quantity],
                                      }),
                                      (0, Ye.jsx)("div", {
                                        className: "h-1.5 bg-slate-200 rounded",
                                        children: (0, Ye.jsx)("div", {
                                          className:
                                            "h-1.5 bg-emerald-600 rounded",
                                          style: {
                                            width: "".concat(
                                              (e.used / e.quantity) * 100,
                                              "%"
                                            ),
                                          },
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("span", {
                                    className:
                                      "inline-flex items-center text-xs font-semibold px-2 py-1 rounded ".concat(
                                        y(e.renewalDate)
                                      ),
                                    children: [
                                      null !== t &&
                                        (t <= 7
                                          ? (0, Ye.jsx)(ft, { size: 16 })
                                          : (0, Ye.jsx)(Tt, { size: 16 })),
                                      (0, Ye.jsx)("span", {
                                        className: "ml-1",
                                        children:
                                          null !== t
                                            ? t <= 7
                                              ? "urgent"
                                              : t <= 30
                                              ? "warning"
                                              : t <= 90
                                              ? "notice"
                                              : "normal"
                                            : "unknown",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, Ye.jsx)("td", {
                                  className: "px-3 py-3",
                                  children: (0, Ye.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-secondary",
                                        title: "View Details",
                                        children: (0, Ye.jsx)(wt, { size: 16 }),
                                      }),
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-primary",
                                        title: "Edit License",
                                        children: (0, Ye.jsx)(jt, { size: 16 }),
                                      }),
                                      (0, Ye.jsx)("button", {
                                        className: "btn btn-sm btn-danger",
                                        onClick: () => {
                                          return (
                                            (t = e.id),
                                            void (
                                              window.confirm(
                                                "Are you sure you want to delete this license?"
                                              ) && r(t)
                                            )
                                          );
                                          var t;
                                        },
                                        title: "Delete License",
                                        children: (0, Ye.jsx)(Nt, { size: 16 }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.id
                          );
                        })
                      : (0, Ye.jsx)("tr", {
                          children: (0, Ye.jsx)("td", {
                            colSpan: "9",
                            className: "px-3 py-8",
                            children: (0, Ye.jsxs)("div", {
                              className: "text-center text-slate-500",
                              children: [
                                (0, Ye.jsx)(Ve, {
                                  size: 48,
                                  className: "mx-auto mb-2 text-slate-300",
                                }),
                                (0, Ye.jsx)("p", {
                                  children:
                                    "No licenses found matching your criteria",
                                }),
                                (0, Ye.jsx)("button", {
                                  className: "btn btn-primary mt-3",
                                  children: "Add Your First License",
                                }),
                              ],
                            }),
                          }),
                        }),
                }),
              ],
            }),
          }),
        ],
      });
    },
    At = Ie("PieChart", [
      ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }],
      ["path", { d: "M22 12A10 10 0 0 0 12 2v10z", key: "1rfc4y" }],
    ]),
    Rt = () => {
      const {
          assets: e,
          licenses: t,
          ventures: n,
          departments: r,
          categories: l,
          statuses: s,
          getAssetsByVenture: i,
          getAssetsByCategory: o,
          getExpiringLicenses: c,
        } = ut(),
        [u, d] = (0, a.useState)("All Ventures"),
        [f, p] = (0, a.useState)("All Departments"),
        [m, h] = (0, a.useState)("30"),
        [g, x] = (0, a.useState)("overview"),
        v = (0, a.useMemo)(() => {
          const a = e.length,
            u = t.length,
            d = e.reduce((e, t) => e + (t.cost || 0), 0),
            f = c(parseInt(m)),
            p = n.map((e) => ({
              name: e,
              assetCount: i(e).length,
              assetValue: i(e).reduce((e, t) => e + (t.cost || 0), 0),
              licenseCount: t.filter((t) => t.venture === e).length,
            })),
            h = l
              .map((e) => ({
                name: e,
                count: o(e).length,
                value: o(e).reduce((e, t) => e + (t.cost || 0), 0),
              }))
              .filter((e) => e.count > 0),
            g = s
              .map((t) => ({
                name: t,
                count: e.filter((e) => e.status === t).length,
              }))
              .filter((e) => e.count > 0),
            x = r
              .map((n) => ({
                name: n,
                assetCount: e.filter((e) => e.department === n).length,
                licenseCount: t.filter((e) => e.department === n).length,
              }))
              .filter((e) => e.assetCount > 0 || e.licenseCount > 0),
            v = {};
          return (
            e.forEach((e) => {
              if (e.acquiredDate) {
                const t = e.acquiredDate.substring(0, 7);
                v[t] = (v[t] || 0) + (e.cost || 0);
              }
            }),
            {
              totalAssets: a,
              totalLicenses: u,
              totalAssetValue: d,
              expiringLicenses: f,
              ventureStats: p,
              categoryStats: h,
              statusStats: g,
              departmentStats: x,
              monthlyCosts: v,
            }
          );
        }, [e, t, n, r, l, s, m, i, o, c]),
        b = (e) => {
          const t = [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
          ];
          return t[e % t.length];
        },
        y = (e) => {
          const t = [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
            "#84cc16",
            "#f97316",
          ];
          return t[e % t.length];
        };
      return (0, Ye.jsxs)("div", {
        className: "space-y-8",
        children: [
          (0, Ye.jsxs)("div", {
            children: [
              (0, Ye.jsx)("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: "Reports & Analytics",
              }),
              (0, Ye.jsx)("p", {
                className: "text-slate-500",
                children:
                  "Comprehensive insights into your SVH Configuration Management Database",
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
            children: [
              (0, Ye.jsx)("div", {
                className: "border-b border-slate-200 pb-4 mb-4",
                children: (0, Ye.jsxs)("h3", {
                  className:
                    "text-lg font-semibold text-slate-800 flex items-center gap-2",
                  children: [(0, Ye.jsx)(yt, { size: 18 }), " Report Filters"],
                }),
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Venture",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: u,
                        onChange: (e) => d(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "All Ventures",
                            children: "All Ventures",
                          }),
                          n.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Department",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: f,
                        onChange: (e) => p(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "All Departments",
                            children: "All Departments",
                          }),
                          r.map((e) =>
                            (0, Ye.jsx)("option", { value: e, children: e }, e)
                          ),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Expiration Period",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: m,
                        onChange: (e) => h(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "7",
                            children: "Next 7 days",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "30",
                            children: "Next 30 days",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "90",
                            children: "Next 90 days",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    children: [
                      (0, Ye.jsx)("label", {
                        className: "form-label",
                        children: "Report Type",
                      }),
                      (0, Ye.jsxs)("select", {
                        className: "form-select",
                        value: g,
                        onChange: (e) => x(e.target.value),
                        children: [
                          (0, Ye.jsx)("option", {
                            value: "overview",
                            children: "Overview Report",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "financial",
                            children: "Financial Report",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "inventory",
                            children: "Inventory Report",
                          }),
                          (0, Ye.jsx)("option", {
                            value: "licenses",
                            children: "License Report",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, Ye.jsx)("div", {
                className: "flex items-center justify-end mt-4",
                children: (0, Ye.jsxs)("button", {
                  className: "btn btn-primary",
                  onClick: () => {
                    const e = {
                      reportType: g,
                      generatedAt: new Date().toISOString(),
                      filters: { venture: u, department: f, period: m },
                      statistics: v,
                    };
                    "csv" === g
                      ? at([e], "svh-cmdb-report")
                      : lt(e, "svh-cmdb-report");
                  },
                  children: [
                    (0, Ye.jsx)(vt, { size: 16 }),
                    (0, Ye.jsx)("span", {
                      className: "ml-2",
                      children: "Generate Report",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            children: [
              (0, Ye.jsx)("h3", {
                className: "text-xl font-semibold text-slate-800 mb-4",
                children: "Key Metrics",
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                    children: [
                      (0, Ye.jsx)("div", {
                        className:
                          "w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center",
                        children: (0, Ye.jsx)(Ue, {}),
                      }),
                      (0, Ye.jsxs)("div", {
                        children: [
                          (0, Ye.jsx)("div", {
                            className: "text-2xl font-bold text-slate-800",
                            children: v.totalAssets,
                          }),
                          (0, Ye.jsx)("div", {
                            className:
                              "text-xs uppercase tracking-wider text-slate-500",
                            children: "Total Assets",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                    children: [
                      (0, Ye.jsx)("div", {
                        className:
                          "w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center",
                        children: (0, Ye.jsx)(Ve, {}),
                      }),
                      (0, Ye.jsxs)("div", {
                        children: [
                          (0, Ye.jsx)("div", {
                            className: "text-2xl font-bold text-slate-800",
                            children: v.totalLicenses,
                          }),
                          (0, Ye.jsx)("div", {
                            className:
                              "text-xs uppercase tracking-wider text-slate-500",
                            children: "Active Licenses",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                    children: [
                      (0, Ye.jsx)("div", {
                        className:
                          "w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center",
                        children: (0, Ye.jsx)(dt, {}),
                      }),
                      (0, Ye.jsxs)("div", {
                        children: [
                          (0, Ye.jsx)("div", {
                            className: "text-2xl font-bold text-slate-800",
                            children: et(v.totalAssetValue),
                          }),
                          (0, Ye.jsx)("div", {
                            className:
                              "text-xs uppercase tracking-wider text-slate-500",
                            children: "Total Asset Value",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex items-center gap-4",
                    children: [
                      (0, Ye.jsx)("div", {
                        className:
                          "w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center",
                        children: (0, Ye.jsx)(Tt, {}),
                      }),
                      (0, Ye.jsxs)("div", {
                        children: [
                          (0, Ye.jsx)("div", {
                            className: "text-2xl font-bold text-slate-800",
                            children: v.expiringLicenses.length,
                          }),
                          (0, Ye.jsx)("div", {
                            className:
                              "text-xs uppercase tracking-wider text-slate-500",
                            children: "Licenses Expiring Soon",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className: "grid gap-6 grid-cols-1 lg:grid-cols-2",
            children: [
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                children: [
                  (0, Ye.jsxs)("h4", {
                    className:
                      "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                    children: [
                      (0, Ye.jsx)(kt, { size: 18 }),
                      " Asset Distribution by Venture",
                    ],
                  }),
                  (0, Ye.jsx)("div", {
                    className: "space-y-3",
                    children: v.ventureStats.map((e, t) =>
                      (0, Ye.jsxs)(
                        "div",
                        {
                          className: "space-y-2",
                          children: [
                            (0, Ye.jsxs)("div", {
                              className:
                                "flex items-center justify-between text-sm",
                              children: [
                                (0, Ye.jsx)("span", {
                                  className: "font-medium text-slate-700",
                                  children: e.name,
                                }),
                                (0, Ye.jsxs)("span", {
                                  className: "text-slate-500",
                                  children: [e.assetCount, " assets"],
                                }),
                              ],
                            }),
                            (0, Ye.jsx)("div", {
                              className: "h-2 bg-slate-200 rounded",
                              children: (0, Ye.jsx)("div", {
                                className: "h-2 rounded",
                                style: {
                                  width: "".concat(
                                    (e.assetCount /
                                      Math.max(
                                        ...v.ventureStats.map(
                                          (e) => e.assetCount
                                        )
                                      )) *
                                      100,
                                    "%"
                                  ),
                                  backgroundColor: b(t),
                                },
                              }),
                            }),
                            (0, Ye.jsx)("div", {
                              className:
                                "text-right text-xs font-medium text-slate-700",
                              children: et(e.assetValue),
                            }),
                          ],
                        },
                        e.name
                      )
                    ),
                  }),
                ],
              }),
              (0, Ye.jsxs)("div", {
                className:
                  "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
                children: [
                  (0, Ye.jsxs)("h4", {
                    className:
                      "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                    children: [
                      (0, Ye.jsx)(At, { size: 18 }),
                      " Asset Distribution by Category",
                    ],
                  }),
                  (0, Ye.jsx)("div", {
                    className: "space-y-2",
                    children: v.categoryStats.map((e, t) =>
                      (0, Ye.jsxs)(
                        "div",
                        {
                          className:
                            "flex items-center gap-3 p-2 rounded-md bg-slate-50 border border-slate-200",
                          children: [
                            (0, Ye.jsx)("div", {
                              className: "w-3 h-3 rounded bg-slate-400",
                              style: { backgroundColor: y(t) },
                            }),
                            (0, Ye.jsx)("div", {
                              className: "flex-1",
                              children: (0, Ye.jsx)("div", {
                                className: "text-sm font-medium text-slate-700",
                                children: e.name,
                              }),
                            }),
                            (0, Ye.jsx)("div", {
                              className: "text-xs text-slate-500 mr-2",
                              children: e.count,
                            }),
                            (0, Ye.jsx)("div", {
                              className:
                                "text-xs font-medium text-slate-700 min-w-[80px] text-right",
                              children: et(e.value),
                            }),
                          ],
                        },
                        e.name
                      )
                    ),
                  }),
                ],
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
            children: [
              (0, Ye.jsxs)("h4", {
                className:
                  "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                children: [
                  (0, Ye.jsx)(pt, { size: 18 }),
                  " Department Overview",
                ],
              }),
              (0, Ye.jsx)("div", {
                className:
                  "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                children: v.departmentStats.map((e) =>
                  (0, Ye.jsxs)(
                    "div",
                    {
                      className:
                        "p-4 rounded-md bg-slate-50 border border-slate-200",
                      children: [
                        (0, Ye.jsx)("div", {
                          className: "font-semibold text-slate-800 mb-2",
                          children: e.name,
                        }),
                        (0, Ye.jsxs)("div", {
                          className: "flex items-center gap-6",
                          children: [
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("div", {
                                  className: "text-xs text-slate-500",
                                  children: "Assets",
                                }),
                                (0, Ye.jsx)("div", {
                                  className: "text-slate-800 font-semibold",
                                  children: e.assetCount,
                                }),
                              ],
                            }),
                            (0, Ye.jsxs)("div", {
                              children: [
                                (0, Ye.jsx)("div", {
                                  className: "text-xs text-slate-500",
                                  children: "Licenses",
                                }),
                                (0, Ye.jsx)("div", {
                                  className: "text-slate-800 font-semibold",
                                  children: e.licenseCount,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.name
                  )
                ),
              }),
            ],
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
            children: [
              (0, Ye.jsxs)("h4", {
                className:
                  "text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2",
                children: [
                  (0, Ye.jsx)(Tt, { size: 18 }),
                  " Licenses Expiring Soon",
                ],
              }),
              v.expiringLicenses.length > 0
                ? (0, Ye.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      v.expiringLicenses.slice(0, 5).map((e) => {
                        const t = tt(e.renewalDate);
                        return (0, Ye.jsx)(
                          "div",
                          {
                            className:
                              "p-3 rounded-md bg-slate-50 border border-slate-200",
                            children: (0, Ye.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, Ye.jsxs)("div", {
                                  children: [
                                    (0, Ye.jsx)("div", {
                                      className:
                                        "text-sm font-medium text-slate-700",
                                      children: e.name,
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-xs text-slate-500",
                                      children: e.venture,
                                    }),
                                  ],
                                }),
                                (0, Ye.jsxs)("div", {
                                  className: "text-right",
                                  children: [
                                    (0, Ye.jsxs)("span", {
                                      className:
                                        "inline-flex items-center text-xs font-semibold px-2 py-1 rounded ".concat(
                                          t <= 7
                                            ? "bg-rose-100 text-rose-800"
                                            : t <= 30
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-emerald-100 text-emerald-800"
                                        ),
                                      children: [t, " days"],
                                    }),
                                    (0, Ye.jsx)("div", {
                                      className: "text-xs text-slate-500 mt-1",
                                      children: Ze(e.renewalDate),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          e.id
                        );
                      }),
                      v.expiringLicenses.length > 5 &&
                        (0, Ye.jsxs)("div", {
                          className: "text-center text-slate-500 italic",
                          children: [
                            "+",
                            v.expiringLicenses.length - 5,
                            " more licenses expiring soon",
                          ],
                        }),
                    ],
                  })
                : (0, Ye.jsx)("div", {
                    className: "text-center text-slate-500 italic",
                    children: "No licenses expiring in the selected period",
                  }),
            ],
          }),
        ],
      });
    },
    Mt = () => {
      const { ventures: e, departments: t, categories: n, statuses: r } = ut(),
        [l, s] = (0, a.useState)("general"),
        [i, o] = (0, a.useState)(""),
        [c, u] = (0, a.useState)(""),
        [d, f] = (0, a.useState)(""),
        [p, m] = (0, a.useState)(""),
        [h, g] = (0, a.useState)(!1),
        [x, v] = (0, a.useState)(null),
        b = [
          { id: "general", label: "General", icon: He },
          { id: "ventures", label: "Ventures", icon: kt },
          { id: "departments", label: "Departments", icon: Ke },
          { id: "categories", label: "Categories", icon: Ue },
          { id: "statuses", label: "Statuses", icon: Ve },
          { id: "backup", label: "Backup & Restore", icon: $e },
        ];
      return (0, Ye.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, Ye.jsxs)("div", {
            children: [
              (0, Ye.jsx)("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: "Settings",
              }),
              (0, Ye.jsx)("p", {
                className: "text-slate-500",
                children:
                  "Configure your SVH CMDB system preferences and data structure",
              }),
            ],
          }),
          (0, Ye.jsx)("div", {
            className:
              "flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto",
            children: b.map((e) => {
              const t = e.icon,
                n = l === e.id;
              return (0, Ye.jsxs)(
                "button",
                {
                  className:
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ".concat(
                      n
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    ),
                  onClick: () => s(e.id),
                  children: [(0, Ye.jsx)(t, { size: 18 }), e.label],
                },
                e.id
              );
            }),
          }),
          (0, Ye.jsxs)("div", {
            className:
              "bg-white rounded-lg p-6 shadow-sm border border-slate-200",
            children: [
              "general" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "General Settings",
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                      children: [
                        (0, Ye.jsxs)("div", {
                          children: [
                            (0, Ye.jsx)("label", {
                              className: "form-label",
                              children: "System Name",
                            }),
                            (0, Ye.jsx)("input", {
                              type: "text",
                              className: "form-input",
                              defaultValue:
                                "SVH Configuration Management Database",
                              placeholder: "Enter system name",
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          children: [
                            (0, Ye.jsx)("label", {
                              className: "form-label",
                              children: "Default Venture",
                            }),
                            (0, Ye.jsxs)("select", {
                              className: "form-select",
                              children: [
                                (0, Ye.jsx)("option", {
                                  value: "",
                                  children: "Select default venture",
                                }),
                                e.map((e) =>
                                  (0, Ye.jsx)(
                                    "option",
                                    { value: e, children: e },
                                    e
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          children: [
                            (0, Ye.jsx)("label", {
                              className: "form-label",
                              children: "Default Department",
                            }),
                            (0, Ye.jsxs)("select", {
                              className: "form-select",
                              children: [
                                (0, Ye.jsx)("option", {
                                  value: "",
                                  children: "Select default department",
                                }),
                                t.map((e) =>
                                  (0, Ye.jsx)(
                                    "option",
                                    { value: e, children: e },
                                    e
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          children: [
                            (0, Ye.jsx)("label", {
                              className: "form-label",
                              children: "Asset Tag Prefix",
                            }),
                            (0, Ye.jsx)("input", {
                              type: "text",
                              className: "form-input",
                              defaultValue: "SVH",
                              placeholder: "Enter asset tag prefix",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("div", {
                      className:
                        "flex items-center justify-end border-t border-slate-200 pt-4",
                      children: (0, Ye.jsxs)("button", {
                        className: "btn btn-primary",
                        children: [
                          (0, Ye.jsx)(Et, { size: 16 }),
                          (0, Ye.jsx)("span", {
                            className: "ml-2",
                            children: "Save Changes",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              "ventures" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "Ventures Management",
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "flex items-end gap-2 flex-wrap",
                      children: [
                        (0, Ye.jsx)("input", {
                          type: "text",
                          className: "form-input max-w-md",
                          placeholder: "Enter new venture name",
                          value: i,
                          onChange: (e) => o(e.target.value),
                        }),
                        (0, Ye.jsxs)("button", {
                          className: "btn btn-primary",
                          onClick: () => {
                            i.trim() &&
                              (console.log("Adding venture:", i), o(""));
                          },
                          children: [
                            (0, Ye.jsx)(bt, { size: 16 }),
                            (0, Ye.jsx)("span", {
                              className: "ml-2",
                              children: "Add Venture",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("div", {
                      className: "space-y-2",
                      children: e.map((e, t) =>
                        (0, Ye.jsxs)(
                          "div",
                          {
                            className:
                              "flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200",
                            children: [
                              (0, Ye.jsx)("span", {
                                className: "text-slate-800 font-medium text-sm",
                                children: e,
                              }),
                              (0, Ye.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-secondary",
                                    children: "Edit",
                                  }),
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-danger",
                                    children: (0, Ye.jsx)(Nt, { size: 16 }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          t
                        )
                      ),
                    }),
                  ],
                }),
              "departments" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "Departments Management",
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "flex items-end gap-2 flex-wrap",
                      children: [
                        (0, Ye.jsx)("input", {
                          type: "text",
                          className: "form-input max-w-md",
                          placeholder: "Enter new department name",
                          value: c,
                          onChange: (e) => u(e.target.value),
                        }),
                        (0, Ye.jsxs)("button", {
                          className: "btn btn-primary",
                          onClick: () => {
                            c.trim() &&
                              (console.log("Adding department:", c), u(""));
                          },
                          children: [
                            (0, Ye.jsx)(bt, { size: 16 }),
                            (0, Ye.jsx)("span", {
                              className: "ml-2",
                              children: "Add Department",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("div", {
                      className: "space-y-2",
                      children: t.map((e, t) =>
                        (0, Ye.jsxs)(
                          "div",
                          {
                            className:
                              "flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200",
                            children: [
                              (0, Ye.jsx)("span", {
                                className: "text-slate-800 font-medium text-sm",
                                children: e,
                              }),
                              (0, Ye.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-secondary",
                                    children: "Edit",
                                  }),
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-danger",
                                    children: (0, Ye.jsx)(Nt, { size: 16 }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          t
                        )
                      ),
                    }),
                  ],
                }),
              "categories" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "Asset Categories Management",
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "flex items-end gap-2 flex-wrap",
                      children: [
                        (0, Ye.jsx)("input", {
                          type: "text",
                          className: "form-input max-w-md",
                          placeholder: "Enter new category name",
                          value: d,
                          onChange: (e) => f(e.target.value),
                        }),
                        (0, Ye.jsxs)("button", {
                          className: "btn btn-primary",
                          onClick: () => {
                            d.trim() &&
                              (console.log("Adding category:", d), f(""));
                          },
                          children: [
                            (0, Ye.jsx)(bt, { size: 16 }),
                            (0, Ye.jsx)("span", {
                              className: "ml-2",
                              children: "Add Category",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("div", {
                      className: "space-y-2",
                      children: n.map((e, t) =>
                        (0, Ye.jsxs)(
                          "div",
                          {
                            className:
                              "flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200",
                            children: [
                              (0, Ye.jsx)("span", {
                                className: "text-slate-800 font-medium text-sm",
                                children: e,
                              }),
                              (0, Ye.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-secondary",
                                    children: "Edit",
                                  }),
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-danger",
                                    children: (0, Ye.jsx)(Nt, { size: 16 }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          t
                        )
                      ),
                    }),
                  ],
                }),
              "statuses" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "Asset Statuses Management",
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "flex items-end gap-2 flex-wrap",
                      children: [
                        (0, Ye.jsx)("input", {
                          type: "text",
                          className: "form-input max-w-md",
                          placeholder: "Enter new status name",
                          value: p,
                          onChange: (e) => m(e.target.value),
                        }),
                        (0, Ye.jsxs)("button", {
                          className: "btn btn-primary",
                          onClick: () => {
                            p.trim() &&
                              (console.log("Adding status:", p), m(""));
                          },
                          children: [
                            (0, Ye.jsx)(bt, { size: 16 }),
                            (0, Ye.jsx)("span", {
                              className: "ml-2",
                              children: "Add Status",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsx)("div", {
                      className: "space-y-2",
                      children: r.map((e, t) =>
                        (0, Ye.jsxs)(
                          "div",
                          {
                            className:
                              "flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200",
                            children: [
                              (0, Ye.jsx)("span", {
                                className: "text-slate-800 font-medium text-sm",
                                children: e,
                              }),
                              (0, Ye.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-secondary",
                                    children: "Edit",
                                  }),
                                  (0, Ye.jsx)("button", {
                                    className: "btn btn-sm btn-danger",
                                    children: (0, Ye.jsx)(Nt, { size: 16 }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          t
                        )
                      ),
                    }),
                  ],
                }),
              "backup" === l &&
                (0, Ye.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, Ye.jsx)("h3", {
                      className: "text-xl font-semibold text-slate-800",
                      children: "Backup & Restore",
                    }),
                    (0, Ye.jsxs)("div", {
                      className: "grid gap-4 grid-cols-1 md:grid-cols-2",
                      children: [
                        (0, Ye.jsxs)("div", {
                          className:
                            "p-4 rounded-lg bg-slate-50 border border-slate-200 text-center",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2 justify-center",
                              children: [
                                (0, Ye.jsx)(vt, { size: 18 }),
                                " Create Backup",
                              ],
                            }),
                            (0, Ye.jsx)("p", {
                              className: "text-slate-500 mb-3",
                              children:
                                "Export your current system configuration and data structure to a JSON file.",
                            }),
                            (0, Ye.jsxs)("button", {
                              className: "btn btn-primary",
                              onClick: () => {
                                const a = {
                                  ventures: e,
                                  departments: t,
                                  categories: n,
                                  statuses: r,
                                  timestamp: new Date().toISOString(),
                                  version: "1.0.0",
                                };
                                lt(a, "svh-cmdb-backup");
                              },
                              children: [
                                (0, Ye.jsx)(vt, { size: 16 }),
                                (0, Ye.jsx)("span", {
                                  className: "ml-2",
                                  children: "Create Backup",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Ye.jsxs)("div", {
                          className:
                            "p-4 rounded-lg bg-slate-50 border border-slate-200 text-center",
                          children: [
                            (0, Ye.jsxs)("h4", {
                              className:
                                "text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2 justify-center",
                              children: [
                                (0, Ye.jsx)(xt, { size: 18 }),
                                " Restore from Backup",
                              ],
                            }),
                            (0, Ye.jsx)("p", {
                              className: "text-slate-500 mb-3",
                              children:
                                "Restore your system configuration from a previously created backup file.",
                            }),
                            (0, Ye.jsxs)("button", {
                              className: "btn btn-secondary",
                              onClick: () => g(!0),
                              children: [
                                (0, Ye.jsx)(xt, { size: 16 }),
                                (0, Ye.jsx)("span", {
                                  className: "ml-2",
                                  children: "Restore from Backup",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, Ye.jsxs)("div", {
                      className:
                        "p-4 rounded-lg bg-amber-50 border border-amber-200",
                      children: [
                        (0, Ye.jsxs)("h5", {
                          className:
                            "text-amber-800 font-semibold mb-2 flex items-center gap-2",
                          children: [
                            (0, Ye.jsx)(ft, { size: 16 }),
                            " Important Notes",
                          ],
                        }),
                        (0, Ye.jsxs)("ul", {
                          className:
                            "list-disc pl-5 text-sm text-amber-800 space-y-1",
                          children: [
                            (0, Ye.jsx)("li", {
                              children:
                                "Backups include system configuration but not asset data",
                            }),
                            (0, Ye.jsx)("li", {
                              children:
                                "Restoring will overwrite current configuration",
                            }),
                            (0, Ye.jsx)("li", {
                              children:
                                "Always create a backup before restoring",
                            }),
                            (0, Ye.jsx)("li", {
                              children:
                                "Backup files are stored locally on your device",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          h &&
            (0, Ye.jsx)("div", {
              className:
                "fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4",
              children: (0, Ye.jsxs)("div", {
                className: "bg-white rounded-lg w-full max-w-lg p-6",
                children: [
                  (0, Ye.jsxs)("div", {
                    className:
                      "flex items-center justify-between border-b border-slate-200 pb-3 mb-4",
                    children: [
                      (0, Ye.jsx)("h3", {
                        className: "text-xl font-semibold",
                        children: "Restore from Backup",
                      }),
                      (0, Ye.jsx)("button", {
                        className:
                          "p-2 rounded-md text-slate-500 hover:bg-slate-100",
                        onClick: () => g(!1),
                        children: "\xd7",
                      }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className: "space-y-3",
                    children: [
                      (0, Ye.jsxs)("div", {
                        className:
                          "text-center p-6 border-2 border-dashed border-slate-300 rounded-md bg-slate-50",
                        children: [
                          (0, Ye.jsx)("input", {
                            type: "file",
                            accept: ".json",
                            onChange: (e) => {
                              const t = e.target.files[0];
                              t && v(t);
                            },
                            className: "hidden",
                            id: "restore-input",
                          }),
                          (0, Ye.jsx)("label", {
                            htmlFor: "restore-input",
                            className: "cursor-pointer text-slate-600",
                            children:
                              "Select a backup file (.json) to restore your system configuration",
                          }),
                        ],
                      }),
                      x &&
                        (0, Ye.jsx)("div", {
                          className:
                            "p-3 rounded-md bg-emerald-50 border border-emerald-200",
                          children: (0, Ye.jsxs)("span", {
                            className: "text-emerald-800 text-sm font-medium",
                            children: ["Selected: ", x.name],
                          }),
                        }),
                    ],
                  }),
                  (0, Ye.jsxs)("div", {
                    className:
                      "flex items-center justify-end gap-2 border-t border-slate-200 pt-4 mt-4",
                    children: [
                      (0, Ye.jsx)("button", {
                        className: "btn btn-secondary",
                        onClick: () => g(!1),
                        children: "Cancel",
                      }),
                      (0, Ye.jsx)("button", {
                        className: "btn btn-primary",
                        onClick: async () => {
                          if (x)
                            try {
                              const e = await (function (e) {
                                let t =
                                  arguments.length > 1 &&
                                  void 0 !== arguments[1]
                                    ? arguments[1]
                                    : "json";
                                return new Promise((n, r) => {
                                  const a = new FileReader();
                                  (a.onload = (e) => {
                                    try {
                                      if ("json" === t) {
                                        const t = JSON.parse(e.target.result);
                                        n(t);
                                      } else if ("csv" === t) {
                                        const t = e.target.result.split("\n"),
                                          r = t[0]
                                            .split(",")
                                            .map((e) => e.trim()),
                                          a = t
                                            .slice(1)
                                            .filter((e) => e.trim())
                                            .map((e) => {
                                              const t = e
                                                  .split(",")
                                                  .map((e) => e.trim()),
                                                n = {};
                                              return (
                                                r.forEach((e, r) => {
                                                  let a = t[r] || "";
                                                  a.startsWith('"') &&
                                                    a.endsWith('"') &&
                                                    (a = a.slice(1, -1)),
                                                    (n[e] = a);
                                                }),
                                                n
                                              );
                                            });
                                        n(a);
                                      }
                                    } catch (a) {
                                      r(a);
                                    }
                                  }),
                                    (a.onerror = () =>
                                      r(new Error("Failed to read file"))),
                                    a.readAsText(e);
                                });
                              })(x, "json");
                              console.log("Restoring data:", e), g(!1), v(null);
                            } catch (e) {
                              console.error("Error restoring data:", e),
                                alert(
                                  "Error restoring data. Please check the file format."
                                );
                            }
                        },
                        disabled: !x,
                        children: "Restore Configuration",
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      });
    };
  const Ot = function () {
    return (0, Ye.jsx)(ct, {
      children: (0, Ye.jsx)(Se, {
        children: (0, Ye.jsxs)("div", {
          className: "flex min-h-screen",
          children: [
            (0, Ye.jsx)(Je, {}),
            (0, Ye.jsx)("main", {
              className: "flex-1 bg-slate-50 overflow-y-auto p-8 ml-72",
              children: (0, Ye.jsxs)(be, {
                children: [
                  (0, Ye.jsx)(xe, { path: "/", element: (0, Ye.jsx)(ht, {}) }),
                  (0, Ye.jsx)(xe, {
                    path: "/assets",
                    element: (0, Ye.jsx)(zt, {}),
                  }),
                  (0, Ye.jsx)(xe, {
                    path: "/licenses",
                    element: (0, Ye.jsx)(Lt, {}),
                  }),
                  (0, Ye.jsx)(xe, {
                    path: "/reports",
                    element: (0, Ye.jsx)(Rt, {}),
                  }),
                  (0, Ye.jsx)(xe, {
                    path: "/settings",
                    element: (0, Ye.jsx)(Mt, {}),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    });
  };
  s.createRoot(document.getElementById("root")).render(
    (0, Ye.jsx)(a.StrictMode, { children: (0, Ye.jsx)(Ot, {}) })
  );
})();
//# sourceMappingURL=main.e2cf64fb.js.map
