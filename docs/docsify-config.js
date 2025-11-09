window.$docsify = {
  name: 'VTeamOps Docs',
  repo: 'https://github.com/vteamops/my-docs.git',
  loadSidebar: true,
  hooks: {
    doneEach: function() {
      if (window.Prism) {
        window.Prism.highlightAll();
      }

      // Collapse/expand sidebar sections: collapse by default,
      // expand the section containing the active link.
      (function initSidebarCollapse() {
        var sidebar = document.querySelector('.sidebar-nav');
        if (!sidebar) return;

        // Collapse all nested lists under top-level items
        var topLis = sidebar.querySelectorAll(':scope > ul > li');
        topLis.forEach(function(li) {
          var nested = li.querySelector(':scope > ul');
          if (!nested) return;
          // hide nested by default
          nested.style.display = 'none';

          // mark the header (link or text) so users can toggle
          var header = li.querySelector(':scope > a') || li.querySelector(':scope > span');
          if (header && !header.dataset.sidebarToggle) {
            header.classList.add('sidebar-toggle');
            header.dataset.sidebarToggle = '1';
            header.addEventListener('click', function(e) {
              // Toggle display of nested list
              nested.style.display = (nested.style.display === 'block') ? 'none' : 'block';
              // allow normal navigation if header is an <a>
            });
          }
        });

        // Expand parents of the active link
        var active = sidebar.querySelector('.active');
        if (active) {
          var parent = active.parentElement; // usually <li> or <ul>
          while (parent && parent !== sidebar) {
            if (parent.tagName === 'UL') parent.style.display = 'block';
            parent = parent.parentElement;
          }
        }
      })();
    }
  }
}