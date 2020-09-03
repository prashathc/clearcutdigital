!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n = n || self).LazyLoad = t());
})(this, function () {
  "use strict";
  function n() {
    return (n =
      Object.assign ||
      function (n) {
        for (var t = 1; t < arguments.length; t++) {
          var e = arguments[t];
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
        }
        return n;
      }).apply(this, arguments);
  }
  var t = "undefined" != typeof window,
    e =
      (t && !("onscroll" in window)) ||
      ("undefined" != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    i = t && "IntersectionObserver" in window,
    a = t && "classList" in document.createElement("p"),
    o = t && window.devicePixelRatio > 1,
    r = {
      elements_selector: ".lazy",
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      data_bg_hidpi: "bg-hidpi",
      data_bg_multi: "bg-multi",
      data_bg_multi_hidpi: "bg-multi-hidpi",
      data_poster: "poster",
      class_applied: "applied",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      unobserve_completed: !0,
      unobserve_entered: !1,
      cancel_on_exit: !0,
      callback_enter: null,
      callback_exit: null,
      callback_applied: null,
      callback_loading: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      callback_cancel: null,
      use_native: !1,
    },
    c = function (t) {
      return n({}, r, t);
    },
    l = function (n, t) {
      var e,
        i = new n(t);
      try {
        e = new CustomEvent("LazyLoad::Initialized", {
          detail: { instance: i },
        });
      } catch (n) {
        (e = document.createEvent(
          "CustomEvent"
        )).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: i });
      }
      window.dispatchEvent(e);
    },
    s = function (n, t) {
      return n.getAttribute("data-" + t);
    },
    u = function (n, t, e) {
      var i = "data-" + t;
      null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
    },
    d = function (n) {
      return s(n, "ll-status");
    },
    f = function (n, t) {
      return u(n, "ll-status", t);
    },
    _ = function (n) {
      return f(n, null);
    },
    g = function (n) {
      return null === d(n);
    },
    v = function (n) {
      return "native" === d(n);
    },
    p = ["loading", "loaded", "applied", "error"],
    b = function (n, t, e, i) {
      n && (void 0 === i ? (void 0 === e ? n(t) : n(t, e)) : n(t, e, i));
    },
    h = function (n, t) {
      a ? n.classList.add(t) : (n.className += (n.className ? " " : "") + t);
    },
    m = function (n, t) {
      a
        ? n.classList.remove(t)
        : (n.className = n.className
            .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
            .replace(/^\s+/, "")
            .replace(/\s+$/, ""));
    },
    E = function (n) {
      return n.llTempImage;
    },
    I = function (n, t) {
      if (t) {
        var e = t._observer;
        e && e.unobserve(n);
      }
    },
    y = function (n, t) {
      n && (n.loadingCount += t);
    },
    A = function (n, t) {
      n && (n.toLoadCount = t);
    },
    L = function (n) {
      for (var t, e = [], i = 0; (t = n.children[i]); i += 1)
        "SOURCE" === t.tagName && e.push(t);
      return e;
    },
    w = function (n, t, e) {
      e && n.setAttribute(t, e);
    },
    z = function (n, t) {
      n.removeAttribute(t);
    },
    k = function (n) {
      return !!n.llOriginalAttrs;
    },
    O = function (n) {
      if (!k(n)) {
        var t = {};
        (t.src = n.getAttribute("src")),
          (t.srcset = n.getAttribute("srcset")),
          (t.sizes = n.getAttribute("sizes")),
          (n.llOriginalAttrs = t);
      }
    },
    C = function (n) {
      if (k(n)) {
        var t = n.llOriginalAttrs;
        w(n, "src", t.src), w(n, "srcset", t.srcset), w(n, "sizes", t.sizes);
      }
    },
    N = function (n, t) {
      w(n, "sizes", s(n, t.data_sizes)),
        w(n, "srcset", s(n, t.data_srcset)),
        w(n, "src", s(n, t.data_src));
    },
    x = function (n) {
      z(n, "src"), z(n, "srcset"), z(n, "sizes");
    },
    M = function (n, t) {
      var e = n.parentNode;
      e && "PICTURE" === e.tagName && L(e).forEach(t);
    },
    R = function (n, t) {
      L(n).forEach(t);
    },
    G = {
      IMG: function (n, t) {
        M(n, function (n) {
          O(n), N(n, t);
        }),
          O(n),
          N(n, t);
      },
      IFRAME: function (n, t) {
        w(n, "src", s(n, t.data_src));
      },
      VIDEO: function (n, t) {
        R(n, function (n) {
          w(n, "src", s(n, t.data_src));
        }),
          w(n, "poster", s(n, t.data_poster)),
          w(n, "src", s(n, t.data_src)),
          n.load();
      },
    },
    T = function (n, t) {
      var e = G[n.tagName];
      e && e(n, t);
    },
    D = function (n, t, e) {
      y(e, 1),
        h(n, t.class_loading),
        f(n, "loading"),
        b(t.callback_loading, n, e);
    },
    F = {
      IMG: function (n, t) {
        u(n, t.data_src, null),
          u(n, t.data_srcset, null),
          u(n, t.data_sizes, null),
          M(n, function (n) {
            u(n, t.data_srcset, null), u(n, t.data_sizes, null);
          });
      },
      IFRAME: function (n, t) {
        u(n, t.data_src, null);
      },
      VIDEO: function (n, t) {
        u(n, t.data_src, null),
          u(n, t.data_poster, null),
          R(n, function (n) {
            u(n, t.data_src, null);
          });
      },
    },
    V = function (n, t) {
      u(n, t.data_bg_multi, null), u(n, t.data_bg_multi_hidpi, null);
    },
    j = function (n, t) {
      var e = F[n.tagName];
      e
        ? e(n, t)
        : (function (n, t) {
            u(n, t.data_bg, null), u(n, t.data_bg_hidpi, null);
          })(n, t);
    },
    P = ["IMG", "IFRAME", "VIDEO"],
    S = function (n, t) {
      !t ||
        (function (n) {
          return n.loadingCount > 0;
        })(t) ||
        (function (n) {
          return n.toLoadCount > 0;
        })(t) ||
        b(n.callback_finish, t);
    },
    U = function (n, t, e) {
      n.addEventListener(t, e), (n.llEvLisnrs[t] = e);
    },
    $ = function (n, t, e) {
      n.removeEventListener(t, e);
    },
    q = function (n) {
      return !!n.llEvLisnrs;
    },
    H = function (n) {
      if (q(n)) {
        var t = n.llEvLisnrs;
        for (var e in t) {
          var i = t[e];
          $(n, e, i);
        }
        delete n.llEvLisnrs;
      }
    },
    B = function (n, t, e) {
      !(function (n) {
        delete n.llTempImage;
      })(n),
        y(e, -1),
        (function (n) {
          n && (n.toLoadCount -= 1);
        })(e),
        m(n, t.class_loading),
        t.unobserve_completed && I(n, e);
    },
    J = function (n, t, e) {
      var i = E(n) || n;
      q(i) ||
        (function (n, t, e) {
          q(n) || (n.llEvLisnrs = {});
          var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
          U(n, i, t), U(n, "error", e);
        })(
          i,
          function (a) {
            !(function (n, t, e, i) {
              var a = v(t);
              B(t, e, i),
                h(t, e.class_loaded),
                f(t, "loaded"),
                j(t, e),
                b(e.callback_loaded, t, i),
                a || S(e, i);
            })(0, n, t, e),
              H(i);
          },
          function (a) {
            !(function (n, t, e, i) {
              var a = v(t);
              B(t, e, i),
                h(t, e.class_error),
                f(t, "error"),
                b(e.callback_error, t, i),
                a || S(e, i);
            })(0, n, t, e),
              H(i);
          }
        );
    },
    K = function (n, t, e) {
      !(function (n) {
        n.llTempImage = document.createElement("IMG");
      })(n),
        J(n, t, e),
        (function (n, t, e) {
          var i = s(n, t.data_bg),
            a = s(n, t.data_bg_hidpi),
            r = o && a ? a : i;
          r &&
            ((n.style.backgroundImage = 'url("'.concat(r, '")')),
            E(n).setAttribute("src", r),
            D(n, t, e));
        })(n, t, e),
        (function (n, t, e) {
          var i = s(n, t.data_bg_multi),
            a = s(n, t.data_bg_multi_hidpi),
            r = o && a ? a : i;
          r &&
            ((n.style.backgroundImage = r),
            (function (n, t, e) {
              h(n, t.class_applied),
                f(n, "applied"),
                V(n, t),
                t.unobserve_completed && I(n, t),
                b(t.callback_applied, n, e);
            })(n, t, e));
        })(n, t, e);
    },
    Q = function (n, t, e) {
      !(function (n) {
        return P.indexOf(n.tagName) > -1;
      })(n)
        ? K(n, t, e)
        : (function (n, t, e) {
            J(n, t, e), T(n, t), D(n, t, e);
          })(n, t, e);
    },
    W = ["IMG", "IFRAME"],
    X = function (n) {
      return n.use_native && "loading" in HTMLImageElement.prototype;
    },
    Y = function (n, t, e) {
      n.forEach(function (n) {
        return (function (n) {
          return n.isIntersecting || n.intersectionRatio > 0;
        })(n)
          ? (function (n, t, e, i) {
              f(n, "entered"),
                (function (n, t, e) {
                  t.unobserve_entered && I(n, e);
                })(n, e, i),
                b(e.callback_enter, n, t, i),
                (function (n) {
                  return p.indexOf(d(n)) >= 0;
                })(n) || Q(n, e, i);
            })(n.target, n, t, e)
          : (function (n, t, e, i) {
              g(n) ||
                ((function (n, t, e, i) {
                  e.cancel_on_exit &&
                    (function (n) {
                      return "loading" === d(n);
                    })(n) &&
                    "IMG" === n.tagName &&
                    (H(n),
                    (function (n) {
                      M(n, function (n) {
                        x(n);
                      }),
                        x(n);
                    })(n),
                    (function (n) {
                      M(n, function (n) {
                        C(n);
                      }),
                        C(n);
                    })(n),
                    m(n, e.class_loading),
                    y(i, -1),
                    _(n),
                    b(e.callback_cancel, n, t, i));
                })(n, t, e, i),
                b(e.callback_exit, n, t, i));
            })(n.target, n, t, e);
      });
    },
    Z = function (n) {
      return Array.prototype.slice.call(n);
    },
    nn = function (n) {
      return n.container.querySelectorAll(n.elements_selector);
    },
    tn = function (n) {
      return (function (n) {
        return "error" === d(n);
      })(n);
    },
    en = function (n, t) {
      return (function (n) {
        return Z(n).filter(g);
      })(n || nn(t));
    },
    an = function (n, e) {
      var a = c(n);
      (this._settings = a),
        (this.loadingCount = 0),
        (function (n, t) {
          i &&
            !X(n) &&
            (t._observer = new IntersectionObserver(
              function (e) {
                Y(e, n, t);
              },
              (function (n) {
                return {
                  root: n.container === document ? null : n.container,
                  rootMargin: n.thresholds || n.threshold + "px",
                };
              })(n)
            ));
        })(a, this),
        (function (n, e) {
          t &&
            window.addEventListener("online", function () {
              !(function (n, t) {
                var e;
                ((e = nn(n)), Z(e).filter(tn)).forEach(function (t) {
                  m(t, n.class_error), _(t);
                }),
                  t.update();
              })(n, e);
            });
        })(a, this),
        this.update(e);
    };
  return (
    (an.prototype = {
      update: function (n) {
        var t,
          a,
          o = this._settings,
          r = en(n, o);
        A(this, r.length),
          !e && i
            ? X(o)
              ? (function (n, t, e) {
                  n.forEach(function (n) {
                    -1 !== W.indexOf(n.tagName) &&
                      (n.setAttribute("loading", "lazy"),
                      (function (n, t, e) {
                        J(n, t, e), T(n, t), j(n, t), f(n, "native");
                      })(n, t, e));
                  }),
                    A(e, 0);
                })(r, o, this)
              : ((a = r),
                (function (n) {
                  n.disconnect();
                })((t = this._observer)),
                (function (n, t) {
                  t.forEach(function (t) {
                    n.observe(t);
                  });
                })(t, a))
            : this.loadAll(r);
      },
      destroy: function () {
        this._observer && this._observer.disconnect(),
          nn(this._settings).forEach(function (n) {
            delete n.llOriginalAttrs;
          }),
          delete this._observer,
          delete this._settings,
          delete this.loadingCount,
          delete this.toLoadCount;
      },
      loadAll: function (n) {
        var t = this,
          e = this._settings;
        en(n, e).forEach(function (n) {
          I(n, t), Q(n, e, t);
        });
      },
    }),
    (an.load = function (n, t) {
      var e = c(t);
      Q(n, e);
    }),
    (an.resetStatus = function (n) {
      _(n);
    }),
    t &&
      (function (n, t) {
        if (t)
          if (t.length) for (var e, i = 0; (e = t[i]); i += 1) l(n, e);
          else l(n, t);
      })(an, window.lazyLoadOptions),
    an
  );
});
