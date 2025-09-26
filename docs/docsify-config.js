window.$docsify = {
  name: 'VTeamOps Docs',
  repo: 'https://github.com/vteamops/my-docs.git',
  loadSidebar: true,
  alias: {
      '/.*/_sidebar.md': '/_sidebar.md'
    },
  hooks: {
    doneEach: function() {
      if (window.Prism) {
        window.Prism.highlightAll();
      }
    }
  }
}