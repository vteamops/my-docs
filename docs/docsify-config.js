window.$docsify = {
  name: '',
  repo: '',
  loadSidebar: true,
  hooks: {
    doneEach: function() {
      if (window.Prism) {
        window.Prism.highlightAll();
      }
    }
  }
}