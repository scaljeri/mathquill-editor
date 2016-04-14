window.app.keys = (function() {
  var mapKeys = {
    pi: '\\pi',
    sqrt: '\\sqrt{}'
  };

  function setup(listOfKeys, wysiwyg) {
    listOfKeys.click(function (e) {
      var action = $(e.target).closest('button').attr('key-action');
      wysiwyg.typing(mapKeys[action]);

      e.stopImmediatePropagation();
    });
  }

  return {
    setup: setup
  };
})();
