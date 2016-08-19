window.app.Caret = (function () {
    function Caret(el) {
        this.el = el;
    }

    Caret.prototype.position = function () {
        var caretOffset = 0;
        var element = this.el[0];
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ( (sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    };

    Caret.prototype.end = function () {
        this.el.focus();

        var el = this.el[0];
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    };

    Caret.prototype.isAtEnd = function () {

    };

    Caret.prototype.setCaretAt = function (index) {
        var range = document.createRange();
        var sel = window.getSelection();

        for(var c = 0; c < this.el[0].childNodes.length; c ++) {
            if (this.el[0].childNodes[c].nodeType === 3) {
                if (index < this.el[0].childNodes[c].length) {
                    debugger;
                    range.setStart(this.el[0].childNodes[c], index);
                    console.log(this.el[0].childNodes);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);

                    break;
                } else {
                    index -= this.el[0].childNodes[c].length;
                }
            }
        }

        this.el.focus();
    };

    //Caret.prototype.currentPosition


    /* http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser */
    // atStart is a boolean
    Caret.prototype.start = function (atStart) {
        /*
         function createCaretPlacer(atStart) {
         return function (el) {
         el.focus();
         if (typeof window.getSelection != "undefined"
         && typeof document.createRange != "undefined") {
         var range = document.createRange();
         range.selectNodeContents(el);
         range.collapse(atStart);
         var sel = window.getSelection();
         sel.removeAllRanges();
         sel.addRange(range);
         } else if (typeof document.body.createTextRange != "undefined") {
         var textRange = document.body.createTextRange();
         textRange.moveToElementText(el);
         textRange.collapse(atStart);
         textRange.select();
         }
         };
         }
         */
    };

    Caret.prototype.currentElement = function () {
        var selection;

        if (window.getSelection)
            selection = window.getSelection();
        else if (document.selection && document.selection.type != "Control")
            selection = document.selection;

        return selection.anchorNode;
    };

    Caret.prototype.previousElement = function () {
        var current = this.currentElement();
        return current.previousSibling;
    };

    Caret.prototype.nextElement = function () {
        var current = this.currentElement();
        return current.nextSibling;
    };

    return Caret;
})();
