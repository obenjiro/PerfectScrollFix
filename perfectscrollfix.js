/**
* The MIT License (MIT)
* 
* Copyright (c) 2013 Ai_boy
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function (win) {

//flag that allow to handle some of prefectScrollFix problems
var _preventMove = false,
    //constant
    DEFAULT_DEPTH = 100;

//singlton PerfectScrollFix object
win.PerfectScrollFix = {
    enable: function() {
        document.addEventListener('touchmove', _psfTouchMove, true);
        document.addEventListener('touchstart', _psfTouchStart, true);
        document.addEventListener('touchend', _psfTouchEnd, true);
    },
    disable: function() {
        document.removeEventListener('touchmove', _psfTouchMove, true);
        document.removeEventListener('touchstart', _psfTouchStart, true);
        document.removeEventListener('touchend', _psfTouchEnd, true);
    }
};

function _psfTouchMove(e) {
    var scrollableParent = _lookUpInclusive(e.target, 'scrollable', DEFAULT_DEPTH);
    if (scrollableParent == null || _preventMove) {
        //preventing scrolling
        console.log('preventing scrolling');
        e.preventDefault();
    }
}

function _psfTouchStart(e) {
    //if we clicked on element that have scrollable parent
    var targetElement = _lookUpInclusive(e.target, 'scrollable', DEFAULT_DEPTH);
    if (targetElement != null) {
        //if we allready on top - move scrollTop a little lower to prevent overscroll
        if (targetElement.scrollTop <= 0) {
            targetElement.scrollTop = 1;
        }
        //if we allready on bottm - move scrollTop a little higher to prevent overscroll
        if (targetElement.scrollTop + targetElement.offsetHeight >= targetElement.scrollHeight) {
            targetElement.scrollTop = targetElement.scrollHeight - targetElement.offsetHeight - 1;
        }
        //if content height of scrollable div is lower then div it self
        //we need to stop scrolling
        if (Math.abs(targetElement.scrollHeight - targetElement.offsetHeight) < 4) {
            _preventMove = true;
        }
        //if user trying to scroll '.scrollable' div
        //we need to stop that action
        if (e.target === targetElement) {
            _preventMove = true;
        }
    }
}

function _psfTouchEnd() {
    //setting flag back to false
    _preventMove = false;
}

function _lookUpInclusive(element, className, depth) {
    if (depth <= 0) {
        return null;
    }
    if (element.classList.contains(className)) {
        return element;
    } else {
        if (element.parentElement) {
            return _lookUpInclusive(element.parentElement, className, depth - 1);
        } else {
            return null;
        }
    }
}

})(window);