




const lines = Array.from(document.querySelectorAll('.line'));
let currentLine = 0;
const triggeredWords = new Set(); // Tracks which dynamic words already animated

// Dynamic word animation function
function animateDynamicWord(elementId, words, finalWord, speed = 200, loops = 3) {
  if (triggeredWords.has(elementId)) return;

  const target = document.getElementById(elementId);
  if (!target) return;

  triggeredWords.add(elementId);

  let frame = 0;
  const interval = setInterval(() => {
    target.textContent = words[frame % words.length];
    frame++;
    if (frame > words.length * loops) {
      clearInterval(interval);
      target.textContent = finalWord;
    }
  }, speed);
}

function animateLine(index) {
  const currentWords = lines[index].querySelectorAll('span');
  const nextIndex = (index + 1) % lines.length;
  const nextLine = lines[nextIndex];
  const nextWords = nextLine.querySelectorAll('span');

  // Prepare next line (hide and move below)
  nextWords.forEach((word) => {
    word.style.opacity = 0;
    word.style.transform = 'translateY(60px)';
    word.style.visibility = 'hidden';
  });

  // Animate out current line
  currentWords.forEach((word, i) => {
    setTimeout(() => {
      word.style.opacity = 0;
    }, i * 200);
  });

  // Animate in next line
  setTimeout(() => {
    nextLine.classList.remove('hidden');
    nextWords.forEach((word, i) => {
      setTimeout(() => {
        word.style.visibility = 'visible';
        word.style.opacity = 1;
        word.style.transform = 'translateY(0)';
      }, i * 100);
    });

    if (nextIndex === 8) { // or whatever line you want
      triggerMultiFlash("image1.png", "image2.png", 10, 150);
    }

    // Trigger dynamic word animations if present in this line
    const dynamicTriggers = [
      { id: "dramatic-word", words: ["SENTENCE", "PHRASE", "WORD", "CHOICE", "INSTANT", "DAY", "GAME"], final: "MOMENT" },
      { id: "dynamic1", words: ["INTERFERING", "CRITIZING", "DEMINISHING","OFFENDING","HURTING","INTRUDING","MEDDLING"], final: "JUDGING" },
      { id: "dynamic2", words: ["BETRAYED", "HURT", "CONFUSED", "SUSPICIOUS", "ANXIOUS","MANIC",], final: "RESPONSIBLE" },
      { id: "dynamic3", words: ["SECOND", "GLANCE", "BLINK"], final: "MOMENT" }
    ];

    dynamicTriggers.forEach(({ id, words, final }) => {
      if (nextLine.querySelector(`#${id}`)) {
        animateDynamicWord(id, words, final);
      }
    });

    // Hide old line and move to the next
    setTimeout(() => {
      lines[index].classList.add('hidden');
      animateLine(nextIndex);
    }, nextWords.length * 100 + 800);

  }, currentWords.length * 100 + 800);



 
}

// Start the loop
animateLine(0);

function triggerMultiFlash(image1, image2, flashes = 10, interval = 200) {
  const overlay = document.getElementById("flashing-overlay");
  if (!overlay) return;

  let count = 0;
  let showingImage1 = true;

  const flashInterval = setInterval(() => {
    overlay.src = showingImage1 ? image1 : image2;
    overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1";
    showingImage1 = !showingImage1;
    count++;

    if (count >= flashes * 2) {
      clearInterval(flashInterval);
      overlay.style.opacity = "0";
    }
  }, interval);
}
