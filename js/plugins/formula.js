window.app.Wysiwyg.registerPlugin('formula', (function () {
  var MQ, current, spaceCount = 0;

  function Formula() {
    if (!MQ) {
      MQ = MathQuill.getInterface(2);
    }

    this.el = $('<span class="math-field"></span>');

    this.mathField = MQ.MathField(this.el[0], {
      spaceBehavesLikeTab: true, // configurable
      handlers: {
        edit: function () { // useful event handlers
          //latexSpan.textContent = mathField.latex(); // simple API
        }
      }
    });

    this.focus = function () {
      this.mathField.focus();
      current = this;
    };

    this.blur = function () {
      this.mathField.blur();
      console.log('blur');
      current = null;
    };

    this.getElement = function () {
      return this.el;
    };

    this.typing = function (str) {
      this.mathField.write(str);
      this.focus();
    }
  }

  Formula.keyDownHook = function (key, wysiwyg) {
    if (key === 32) {
      spaceCount++;

      if (spaceCount === 2) {
        if (current) {
          wysiwyg.next();
        } else {
          current = wysiwyg.create('formula');
        }

        spaceCount = 0;
      }
    } else {
      spaceCount = 0;
    }
  };

  Formula.selfInitiate = function (wysiwyg) {
  };

  return Formula;
})());
