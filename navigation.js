// Keep one in-app history entry: Android Back returns to Home, not out of the app.
(() => {
  const key = 'siyahNavigation';
  const dialog = document.querySelector('#settings');
  let inside = false, returning = false;
  history.replaceState({[key]: 'home'}, '', location.href);
  function sync() {
    const away = screen !== 'home' || dialog.open;
    if (away && !inside) {
      history.pushState({[key]: 'content'}, '', location.href);
      inside = true;
    } else if (!away && inside && !returning) {
      returning = true;
      history.back();
    }
  }
  window.addEventListener('popstate', () => {
    inside = false;
    returning = false;
    cancelSpeech();
    if (dialog.open) dialog.close();
    home();
    window.scrollTo(0, 0);
  });
  // Observe rendered navigation, including dialogs and every game, without
  // adding history entries for questions, puzzle moves or language changes.
  new MutationObserver(sync).observe(document.querySelector('#app'), {childList: true, subtree: true});
  new MutationObserver(sync).observe(dialog, {attributes: true, attributeFilter: ['open']});
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    cancelSpeech();
    if (dialog.open) dialog.close();
    home();
  });
  sync();
})();
