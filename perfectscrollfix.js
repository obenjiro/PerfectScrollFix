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
var _preventMove = false;

//singlton PerfectScrollFix object
win.PerfectScrollFix = {
    enable: function(){
        document.addEventListener('touchmove', _psf_TouchMove, true);
        document.addEventListener('touchstart', _psf_TouchStart, true);
        document.addEventListener('touchend', _psf_TouchEnd, true);
    },
    disable: function(){
        document.removeEventListener('touchmove', _psf_TouchMove);
        document.removeEventListener('touchstart', _psf_TouchStart);
        document.removeEventListener('touchend', _psf_TouchEnd);
    }
}

function _psf_TouchMove(e){
    if (e.target.querySelector('.scrollable') || _preventMove) {
        //preventing scrolling
        e.preventDefault();
    }
}

function _psf_TouchStart(e){
    //if we clicked on element that have scrollable parent
    if (!e.target.querySelector('.scrollable')) {
        //looking for element with class 'scrollable'
        var targetElement = _lookUpInclusive(e.target, 'scrollable', 1000);
        if (targetElement) {

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
            if (targetElement.scrollHeight === targetElement.offsetHeight) {
                _preventMove = true;
            }
            //if user trying to scroll scrollable div
            //if this happens - we need to stop that
            if (e.target == targetElement) {
                _preventMove = true;
            }

        }
    }
}

function _psf_TouchEnd(e){
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
            return _lookUpInclusive(element.parentElement, className, depth-1);
        } else {
            return null;
        }
    }
}

})(window);