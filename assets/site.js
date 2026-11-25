(() => {
  const root = document.documentElement;
  const read = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = read('xeno-motion') === 'paused' || reduced.matches;
  root.dataset.theme = read('xeno-theme') === 'dark' ? 'dark' : 'light';
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const motionButtons = document.querySelectorAll('[data-motion-toggle]');
  function syncControls() {
    root.classList.toggle('motion-paused', paused);
    themeButtons.forEach(button => {
      button.textContent = root.dataset.theme === 'dark' ? 'lights on' : 'lights off';
      button.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
    motionButtons.forEach(button => {
      button.textContent = paused ? 'motion off' : 'motion on';
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? 'Resume background motion' : 'Pause background motion');
      if (reduced.matches) { button.textContent = 'motion off'; button.disabled = true; button.title = 'Your device prefers reduced motion'; }
    });
  }
  themeButtons.forEach(button => button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    save('xeno-theme', root.dataset.theme); syncControls();
  }));
  motionButtons.forEach(button => button.addEventListener('click', () => {
    paused = !paused; save('xeno-motion', paused ? 'paused' : 'running'); syncControls();
  }));
  reduced.addEventListener('change', () => { paused = reduced.matches || read('xeno-motion') === 'paused'; motionButtons.forEach(b => b.disabled = reduced.matches); syncControls(); });
  syncControls();

  const notes = [
    'listen to some new music, something weird, zany.',
    'try a new outfit, something different, foreign, xeno.',
    'make your life, worth living for, its nobody elses responsibility. but yours. :)'
  ];
  const noteDialog = document.querySelector('#little-note');
  let noteIndex = 0;
  if (noteDialog) {
    document.querySelectorAll('[data-open-note]').forEach(button => button.addEventListener('click', () => noteDialog.showModal()));
    noteDialog.querySelector('[data-next-note]').addEventListener('click', () => {
      noteIndex = (noteIndex + 1) % notes.length;
      noteDialog.querySelector('[data-note-copy]').textContent = notes[noteIndex];
    });
  }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const entries = [...document.querySelectorAll('[data-category]')];
  const count = document.querySelector('[data-result-count]');
  function applyFilter(value) {
    const valid = filters.some(b => b.dataset.filter === value) ? value : 'all';
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === valid)));
    entries.forEach(item => item.hidden = valid !== 'all' && item.dataset.category !== valid);
    if (count) { const total = entries.filter(item => !item.hidden).length; count.textContent = `${total} ${total === 1 ? "place" : "places"} to go`; }
  }
  if (filters.length) {
    applyFilter(location.hash.slice(1));
    filters.forEach(button => button.addEventListener('click', () => {
      const value = button.dataset.filter; applyFilter(value);
      history.replaceState(null, '', value === 'all' ? location.pathname + location.search : '#' + value);
    }));
    addEventListener('hashchange', () => applyFilter(location.hash.slice(1)));
  }

  const imageDialog = document.querySelector('#image-viewer');
  if (imageDialog) document.querySelectorAll('[data-view-image]').forEach(button => button.addEventListener('click', () => {
    const original = button.querySelector('img');
    const image = imageDialog.querySelector('img');
    image.src = original.src; image.alt = original.alt;
    imageDialog.querySelector('[data-image-title]').textContent = original.alt;
    imageDialog.showModal();
  }));
})();
