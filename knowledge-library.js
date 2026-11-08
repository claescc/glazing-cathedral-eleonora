/* Shared source-reading paths. Titles and passages remain attributed to a book. */
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const names = {
    path: ['Theory and studio practice', 'Read the supplied books alongside the lessons.'],
    kiln: ['Kilns, heat and firing practice', 'Follow the firing guidance back to its source.'],
    materials: ['Materials and ceramic science', 'Study the supplied material and chemistry references.'],
    restoration: ['Repair, decoration and surface practice', 'Compare the methods and their original context.'],
    masters: ['Ceramic history and traditions', 'Explore the regional histories, archaeological studies and collection references.'],
    recipes: ['Glaze recipes and their context', 'Read the complete source context alongside the structured formulas.']
  };
  fetch('assets/library/expanded/knowledge-paths.json?v=20261108-linked-chapters').then(r => {
    if (!r.ok) throw Error('Source reading paths unavailable');
    return r.json();
  }).then(data => {
    for (const [room, [title, description]] of Object.entries(names)) {
      const host = document.getElementById(room);
      if (!host) continue;
      const section = document.createElement('div');
      section.className = 'knowledge-paths';
      section.innerHTML = `<h3>${title}</h3><p>${description}</p><details><summary>Explore ${data.rooms[room].length} supplied sources</summary><div class="reading-source-links">${data.rooms[room].map(b => `<article><h4>${esc(b.title)}</h4><p>${esc(b.author)}${b.author ? ' · ' : ''}${b.pages} pages in file</p>${b.entryChapter ? `<p>Chapter: ${esc(b.entryChapter)} · page ${b.entryPage} in file</p>` : ""}${b.passage ? `<blockquote>${esc(b.passage.text)}</blockquote><p>Source passage · page ${b.passage.page} in file</p>` : ''}<a href="reading.html?book=${encodeURIComponent(b.id)}&page=${b.entryPage || b.passage?.page || 1}#source-library">Read ${b.entryChapter ? "the chapter" : "the source"}${b.passage ? ' passage' : ''} →</a></article>`).join('')}</div></details>`;
      host.append(section);
    }
    const reading = document.getElementById('reading');
    const note = document.createElement('details');
    note.className = 'source-note';
    note.innerHTML = `<summary>Source coverage and outstanding work</summary><p>Text recognition is a finding aid, not a checked formula. Image-only pages retain their source images. Catalogued, searchable, transcribed and visually checked are separate states.</p><p><a href="assets/library/expanded/coverage.json">Open the dated source and recipe coverage ledger</a> · <a href="assets/library/expanded/recipe-review.json">Formula review and unresolved source issues</a></p>`;
    reading?.append(note);
  }).catch(() => {
    // Keep a usable source destination even if the optional reading paths fail.
    for (const room of Object.keys(names)) {
      const link = document.createElement('a');
      link.href = 'reading.html';
      link.textContent = 'Open the supplied source library →';
      document.getElementById(room)?.append(link);
    }
  });
})();
