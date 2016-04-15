window.app.Caret = (function () {
  function Caret(el) {
   this.el = el;
  }

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


  /* http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
   // atStart is a boolean
   Caret.prototype.start = function (atStart) {
   function createCaretPlacer(atStart) {
   return function(el) {
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
   };*/

  return Caret;
})();
