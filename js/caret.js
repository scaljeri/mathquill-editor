window.app.Caret = (function () {
    function Caret(el) {
        this.el = el;
    }

    Caret.prototype = {
        getElement: function () {
            var selection = window.getSelection();

            return selection.anchorNode;
        },

        getPosition: function () {
            var caretOffset = 0;
            var element = this.el;
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
            } else if ((sel = doc.selection) && sel.type != "Control") {
                var textRange = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset = preCaretTextRange.text.length;
            }
            return caretOffset;
        },

        setPosition: function (index) {
            var walker = document.createTreeWalker(this.el, NodeFilter.SHOW_TEXT, null, false);

            while (walker.nextNode() && index > walker.currentNode.length) {
                index -= walker.currentNode.length;
            }

            var range = document.createRange();
            range.setStart(walker.currentNode, index);
            range.collapse(true);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        },

        moveTOStartOf: function (el) {
            var range = document.createRange();
            range.setStart(el, 0);
            range.collapse(true);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            el.parentNode.focus();
        },

        moveTOEndOf: function (el) {
            var range = document.createRange();
            range.setStart(el, el.length - 1);
            range.collapse(true);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            el.parentNode.focus();
        }
    };

    return Caret;
})();