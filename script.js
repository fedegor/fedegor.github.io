var _scroller;
        _scroller = function() {
            return {
                speed: 30,
                direct: -1,
                position: 0,
                t: null,
                init: function() {
                    var el;
                    el = document.getElementById('scroller_container');
                    _scroller.addEvent(el, 'mousewheel', _scroller.wheel);
                    _scroller.addEvent(el, 'DOMMouseScroll', _scroller.wheel);
                    _scroller.timer(_scroller.direct);
                },
                scroll: function(wheel) {
                    var el = document.getElementById('scroller_container').firstElementChild;
                    var o, oi, width;
                    _scroller.position += wheel;
                    if (wheel > 0) {
                        if (_scroller.position >= 0) {
                            o = el;
                            oi = o.lastElementChild;
                            width = oi.firstElementChild.clientWidth;
                            o.insertBefore(oi, o.firstElementChild);
                            _scroller.position -= width;
                        }
                    } else {
                        o = el;
                        oi = o.firstElementChild;
                        width = oi.firstElementChild.clientWidth;
                        if (_scroller.position < -width) {
                            o.appendChild(oi);
                            _scroller.position += width;
                        }
                    }
                    el.style.left = _scroller.position + 'px';
                },

                timer: function(wheel) {
                    _scroller.stop();
                    _scroller.t = setInterval("_scroller.scroll(" + wheel + ");", _scroller.speed);
                },
                stop: function() {
                    if (_scroller.t != null) {
                        clearInterval(_scroller.t);
                        _scroller.t = null;
                    }
                },
                addEvent: function(el, evType, fn, useCapture) {
                    if (el.addEventListener) {
                        el.addEventListener(evType, fn, useCapture);
                    } else if (el.attachEvent) {
                        var r = el.attachEvent('on' + evType, fn);
                    } else el['on' + evType] = fn;
                }
            };
        }();
        window.onload = function() {
            setTimeout(_scroller.init, 100);
        };
