window.app.Wysiwyg.registerPlugin('text',  (function () {
  function Text(options) {
    if (options && options.el) {
      this.el = options.el;
    } else {
      this.el = $('<span contenteditable="true"></span>');
    }

    this.focus = function () {
      this.el.focus();
    };

    this.blur = function () {
      this.el.blur();
    };

    this.getElement = function () {
      return this.el;
    };

    this.typing = function (str) {
      this.el.html(this.el.html() + str);
    };

    this.onKeyDownHook = function () {

    };
  }

  return Text;
})());
