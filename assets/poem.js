(() => {
  const line = document.querySelector('#poem-line');
  const transcript = document.querySelector('#transcript');
  if (!line || !transcript) return;
  const lines = [...transcript.querySelectorAll('li')];
  const count = document.querySelector('[data-poem-count]');
  const progress = document.querySelector('.poem-progress-fill');
  const play = document.querySelector('[data-poem-play]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let playing = !reduced.matches;
  let timer;
  let wordTimer;
  // Keep the original changing words, without the old rapid image flashes.
  const changingWords = {
    3: { final: 'JUDGING', words: ['INTERFERING', 'CRITIZING', 'DEMINISHING', 'OFFENDING', 'HURTING', 'INTRUDING', 'MEDDLING'] },
    12: { final: 'MOMENT', words: ['SENTENCE', 'PHRASE', 'WORD', 'CHOICE', 'INSTANT', 'DAY', 'GAME'] },
    16: { final: 'RESPONSIBLE', words: ['BETRAYED', 'HURT', 'CONFUSED', 'SUSPICIOUS', 'ANXIOUS', 'MANIC'] }
  };
  function updateButtons() {
    play.textContent = playing ? 'pause' : 'play';
    play.setAttribute('aria-pressed', String(playing));
    play.setAttribute('aria-label', playing ? 'Pause poem' : 'Play poem');
  }
  function schedule() {
    clearTimeout(timer);
    if (playing && !document.hidden) timer = setTimeout(() => show(index + 1), 6500);
  }
  function show(next, manual = false) {
    clearInterval(wordTimer);
    index = (next + lines.length) % lines.length;
    line.setAttribute('aria-live', manual ? 'polite' : 'off');
    line.replaceChildren(...[...lines[index].childNodes].map(node => node.cloneNode(true)));
    line.classList.remove('animate-in');
    void line.offsetWidth;
    if (!reduced.matches) line.classList.add('animate-in');
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${lines.length}`;
    progress.style.width = `${(index + 1) / lines.length * 100}%`;
    if (playing && !reduced.matches && changingWords[index]) {
      const change = changingWords[index];
      const target = [...line.querySelectorAll('span')].find(span => span.textContent.trim() === change.final);
      if (target) {
        let frame = 0;
        wordTimer = setInterval(() => {
          if (frame >= change.words.length) { clearInterval(wordTimer); target.textContent = change.final; return; }
          target.textContent = change.words[frame++];
        }, 420);
      }
    }
    schedule();
  }
  function pause() {
    playing = false; clearTimeout(timer); clearInterval(wordTimer);
    line.replaceChildren(...[...lines[index].childNodes].map(node => node.cloneNode(true)));
    updateButtons();
  }
  play.addEventListener('click', () => {
    if (playing) pause();
    else { playing = true; updateButtons(); schedule(); }
  });
  document.querySelector('[data-poem-next]').addEventListener('click', () => { pause(); show(index + 1, true); });
  document.querySelector('[data-poem-prev]').addEventListener('click', () => { pause(); show(index - 1, true); });
  document.querySelector('[data-poem-restart]').addEventListener('click', () => { pause(); show(0, true); });
  transcript.addEventListener('toggle', () => { if (transcript.open) pause(); });
  reduced.addEventListener('change', () => { if (reduced.matches) pause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(timer); clearInterval(wordTimer); } else if (playing) show(index); });
  updateButtons(); show(0);
})();
