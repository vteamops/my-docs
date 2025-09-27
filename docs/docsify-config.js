window.$docsify = {
  name: 'VTeamOps Docs',
  repo: 'https://github.com/vteamops/my-docs.git',
  loadSidebar: true,
  hooks: {
    doneEach: function() {
      if (window.Prism) {
        window.Prism.highlightAll();
      }
    }
  }
}