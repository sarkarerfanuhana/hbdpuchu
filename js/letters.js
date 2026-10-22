/* ==========================================================================
   Letters Vault & Modal Viewer
   Contains the 3 authentic handwritten letters from Erfan to Subarna
   ========================================================================== */

const LETTERS_DATA = [
  {
    id: 1,
    title: "You're My Cuppycake",
    subtitle: "A sweet handwritten melody from my heart",
    status: "handwritten",
    badgeText: "Handwritten by Erfan",
    image: "assets/handwritten_letter_1.jpg",
    previewSnippet: "You're my honeybunch, sugarplum, pumpy-umpy-umpkin...",
    content: `I Love you Sonu baby

You're my honeybunch, sugarplum
Pumpy-umpy-umpkin
You're my sweetie pie
You're my cuppycake, gumdrop
Snoogums-boogums
You're the apple of my eye

Forever yours,
Erfan`
  },
  {
    id: 2,
    title: "My Whole Universe",
    subtitle: "Your biggest fan, supporter, and lover",
    status: "handwritten",
    badgeText: "Handwritten by Erfan",
    image: "assets/handwritten_letter_2.jpg",
    previewSnippet: "Hi Sonu baby, First of all I Love you so much. I Love you more than anything in this universe...",
    content: `Hi Sonu baby,

First of all I Love you so much.
I Love you more than anything in this universe.
You are the most important thing I have in my life. I cannot think of a life without you in it. I am the biggest fan of yours, supporter of yours and last but not the least lover of yours.

Always and forever yours,
Erfan`
  },
  {
    id: 3,
    title: "Our Sacred Oaths",
    subtitle: "The 5 vows I swear to you on your 21st birthday",
    status: "handwritten",
    badgeText: "Handwritten by Erfan",
    image: "assets/handwritten_letter_3.jpg",
    previewSnippet: "To my puchu, my forever home, Here are the oaths I swear to you on your 21st Birthday...",
    content: `To my puchu, my forever home,

Here are the oaths I swear to you on your 21st Birthday:

I. I promise to always be your safe place - the one place where you can be entirely, unapologetically yourself without a shadow of doubt.
II. I promise to listen to you, not just with patience, but with an open heart that seeks to understand your silence just as deeply as your words.
III. I promise to celebrate every victory of yours as if it were my own, and to stand as your unwavering anchor whenever the ground feels unsteady.
IV. I promise to never let routine dull the way I look at you. Even fifty years from now, I will look at you with the same awe I feel tonight.
V. I promise that no distance, no obstacle, and no storm will ever be stronger than my commitment to loving you and cherishing you.

With all my devotion,
Erfan`
  }
];

function renderLettersVault() {
  const container = document.getElementById('letters-vault-grid');
  if (!container) return;

  container.innerHTML = LETTERS_DATA.map(letter => {
    return `
      <div class="letter-card completed" data-id="${letter.id}">
        <div>
          <span class="letter-card-number">Letter 0${letter.id}</span>
          <h3 class="letter-card-title">${letter.title}</h3>
          <span class="letter-badge-status status-handwritten">
            ${letter.badgeText}
          </span>
          <div class="letter-preview-thumb" onclick="openLetterModal(${letter.id})">
            <img src="${letter.image}" alt="${letter.title}" loading="lazy" style="background:#fff; object-fit:contain; padding:4px;" />
          </div>
        </div>
        <div style="display:flex; gap: 8px; margin-top: 10px;">
          <button class="btn-luxury" style="width: 100%; padding: 11px 16px; font-size: 0.92rem;" onclick="openLetterModal(${letter.id})">
            📖 Read Handwritten Letter
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openLetterModal(id) {
  const letter = LETTERS_DATA.find(l => l.id === id);
  if (!letter) return;

  const modal = document.getElementById('letter-modal');
  const body = document.getElementById('modal-letter-body');

  body.innerHTML = `
    <div style="text-align: center;">
      <span class="chapter-tag">Handwritten Letter 0${letter.id}</span>
      <h2 style="font-family: var(--font-display); color: #fff; margin-bottom: 6px;">${letter.title}</h2>
      <p style="font-style: italic; color: var(--gold-primary); margin-bottom: 20px;">${letter.subtitle}</p>
      
      <div style="max-height: 70vh; overflow-y: auto; border-radius: 8px; border: 1px solid var(--border-gold); background: #ffffff; box-shadow: 0 10px 40px rgba(0,0,0,0.7); padding: 12px;">
        <img src="${letter.image}" alt="${letter.title}" style="width: 100%; height: auto; display: block; margin: 0 auto; max-width: 680px;" />
      </div>

      <div style="margin-top: 20px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <a href="${letter.image}" target="_blank" class="btn-luxury">🔍 View Full Size</a>
      </div>
    </div>
  `;

  modal.classList.add('open');
  if (window.audioEngine) window.audioEngine.playChime();
}

function closeLetterModal() {
  const modal = document.getElementById('letter-modal');
  if (modal) modal.classList.remove('open');
}

function copyLetterText(id) {
  const letter = LETTERS_DATA.find(l => l.id === id);
  if (!letter) return;

  navigator.clipboard.writeText(letter.content).then(() => {
    alert(`💌 Letter 0${id} copied to clipboard!`);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = letter.content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(`💌 Letter 0${id} copied to clipboard!`);
  });
}

window.LETTERS_DATA = LETTERS_DATA;
window.renderLettersVault = renderLettersVault;
window.openLetterModal = openLetterModal;
window.closeLetterModal = closeLetterModal;
window.copyLetterText = copyLetterText;
