app.Wysiwyg = (function (el) {
  var plugins = {};

  Wysiwyg.registerPlugin = function (name, action) {
    plugins[name] = action;
  };

  function Wysiwyg(el) {
    var wysiwyg = this;
    this.el = el;
    el.addClass('wysiwyg');

    //el.click(this.onClick.bind(this));

    // When to insert char
    el.on('keydown', function (e) {
      var char = e.keyCode;

      Object.keys(plugins).forEach(function (name) {
        var action = plugins[name];
        if (action.keyDownHook) {
          console.log('onin');
          if (action.keyDownHook(e.keyCode, wysiwyg) === false) {
            e.stopImmediatePropagation();
          }
        }
      });
    })
  }

  [function onClick(e) {
    //$(this).find('span').off(listener);
    var target = $(e.target);

    if (target.hasClass('wysiwyg')) {
      this.create('text');
    }
  },
    function insertItem(item) {
      this.el.append(item.getElement ? item.getElement() : item);
      item.focus();
      this.activeElement = item;

      return item;
    },

    function next() {
      var next = this.activeElement.getElement().next();
      this.activeElement.blur();

      if (!next || next.length === 0) {
        this.create('text');
      } else {
        this.create(next.attr('plugin-name'), next);
      }

      this.activeElement = next;
    },
    function create(name, options) {
      if (plugins[name]) {
        if (this.activeElement) {
          this.activeElement.blur();
        }

        this.activeElement = new plugins[name](options);
        this.el.append(this.activeElement.getElement());
        this.activeElement.focus();

        return this.activeElement;
      }
    },
      function typing(string) {
        this.activeElement.typing(string);
      }
  ].forEach(function (func) {
    Wysiwyg.prototype[func.name] = func;
  });

  return Wysiwyg;
})();

/*
 function getCaretPosition(editableDiv) {
 var caretPos = 0,
 sel, range;
 if (window.getSelection) {
 sel = window.getSelection();
 if (sel.rangeCount) {
 range = sel.getRangeAt(0);
 if (range.commonAncestorContainer.parentNode == editableDiv) {
 caretPos = range.endOffset;
 }
 }
 } else if (document.selection && document.selection.createRange) {
 range = document.selection.createRange();
 if (range.parentElement() == editableDiv) {
 var tempEl = document.createElement("span");
 editableDiv.insertBefore(tempEl, editableDiv.firstChild);
 var tempRange = range.duplicate();
 tempRange.moveToElementText(tempEl);
 tempRange.setEndPoint("EndToEnd", range);
 caretPos = tempRange.text.length;
 }
 }
 return caretPos;
 }

 */
