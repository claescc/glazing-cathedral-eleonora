/* Shared source-reading paths. Titles and passages remain attributed to a book. */
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Short, visually checked teaching notes complement the full source reader.
  const learning = document.getElementById('path');
  if (learning) {
    const note = document.createElement('article');
    note.id = 'carving-clay-readiness';
    note.className = 'knowledge-paths';
    note.innerHTML = `<h3>Carving: match the clay stage to the cut</h3>
      <p>Hilda Carr distinguishes two working points within leather-hard clay:</p>
      <ul><li><strong>Sgraffito:</strong> work toward the drier end, before bone dry, to remove the slip layer rather than cut deeply into the body.</li>
      <li><strong>Faceting:</strong> work toward the softer end, with slight tackiness, so a larger tool can remove sections of clay.</li></ul>
      <p>The useful question is therefore which cut you are making, rather than whether the piece has reached one universal carving stage.</p>
      <h4>Read the cut: three clues to readiness</h4>
      <ul><li><strong>Too wet:</strong> removed clay clings to the piece and the cut is untidy; handling can distort the form. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=13#source-library">Carr’s example, PDF page 13</a>.</li>
      <li><strong>Too dry:</strong> the tool scratches instead of slicing, and the extra force risks cracking or distortion. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=15#source-library">Carr’s example, PDF page 15</a>.</li>
      <li><strong>Suitable for the cut:</strong> the tool moves smoothly and the removed clay separates readily. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=16#source-library">Carr’s example, PDF page 16</a>.</li></ul>
      <p>Source: Hilda Carr, <cite>Carve Your Clay</cite>, Quarry Books, 2020, Chapter One: Basics, “The State of Clay”, PDF pages 9, 13, 15 and 16. Printed page numbers are not established for these supplied pages. Publication details verified on PDF page 411, 25 November 2026. Original explanation based on the source; source pages visually checked 21 and 22 November 2026.</p>
      <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=9#source-library">Read Carr’s source page →</a>`;
    learning.append(note);
    const tools = document.createElement('article');
    tools.id = 'carving-tool-sampler';
    tools.className = 'knowledge-paths';
    tools.innerHTML = `<h3>Choose the carving tool by the mark</h3>
      <p>Carr associates loop tools with fluting, texture and angular cuts; a flexible steel rib with broader scraping and shallow curves on drier clay; and a ball-tipped sgraffito tool with fine lines. A scoop tool offers broader scraping with its side and detail with its point.</p>
      <p>Her sampler exercise uses a slab allowed to firm slightly: compare a tool’s different faces, lighter and heavier pressure, free movement and a straightedge. This lets you compare the marks before committing them to a finished form.</p>
      <p>Source: Hilda Carr, <cite>Carve Your Clay</cite>, Quarry Books, 2020, Chapter One: Basics, “Tools for Carving”, PDF pages 17 and 18. Original synthesis; both source pages visually checked 23 November 2026. Printed page numbers are not established here. Publication details verified on PDF page 411, 25 November 2026.</p>
      <p><a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=17#source-library">Read the sampler exercise, PDF page 17 →</a> · <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=18#source-library">Read Carr’s tool descriptions, PDF page 18 →</a></p>`;
    learning.append(tools);
    const forming = document.createElement('article');
    forming.id = 'carving-forming-allowance';
    forming.className = 'knowledge-paths';
    forming.innerHTML = `<h3>Plan the form before you carve</h3>
      <p>Carr’s forming advice is to leave material for the planned cuts: allow “extra thickness in your walls” because carving can remove substantial sections of clay. This passage gives no universal wall-thickness measurement. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=20#source-library">Forming, PDF page 20 →</a></p>
      <ul><li><strong>Wheel-thrown forms:</strong> rotation can become part of the carving process, adding movement to the marks. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=21#source-library">Throwing, PDF page 21 →</a>.</li>
      <li><strong>Slab-built forms:</strong> the surface can be worked flat before assembly. Carr’s example rolls a slab over a design carved into linoleum, contrasting this route with a thrown form. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=22#source-library">Hand-building, PDF page 22 →</a>.</li></ul>
      <p>Source: Hilda Carr, <cite>Carve Your Clay</cite>, Quarry Books, first published 2020, Chapter One: Basics, “Forming”, “Throwing” and “Hand-building”, PDF pages 20–22. Short quotation and original synthesis; source pages visually checked 25 November 2026. Printed page numbers are not established for these supplied pages. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=411#source-library">Publication details, PDF page 411 →</a>.</p>`;
    learning.append(forming);
    const methods = document.createElement('article');
    methods.id = 'carving-forming-methods';
    methods.className = 'knowledge-paths';
    methods.innerHTML = `<h3>Match carving to the forming method</h3>
      <ul><li><strong>Pinched forms:</strong> Carr suggests letting freer carving complement the irregular character of a pinch pot. This is presented as her design advice. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=23#source-library">Pinching, PDF page 23 →</a>.</li>
      <li><strong>Slip-cast forms:</strong> successive layers of differently coloured casting slip can become part of the decoration: carving exposes the underlying colours. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=24#source-library">Slip-casting, PDF page 24 →</a>.</li>
      <li><strong>Mould-supported forms:</strong> a concave slump mould supports the clay while leaving the inside accessible; clay placed over a convex hump mould leaves the outside accessible. Choose the support with the surface you want to work on in mind. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=25#source-library">Slump-molding, PDF page 25 →</a>.</li></ul>
      <p>Source: Hilda Carr, <cite>Carve Your Clay</cite>, Quarry Books, first published 2020, Chapter One: Basics, “Pinching”, “Slip-casting” and “Slump-molding”, PDF pages 23–25. Original synthesis; source pages visually checked 26 November 2026. Printed page numbers are not established for these supplied pages. <a href="reading.html?book=carve-your-clay-hilda-carr-eb4c3f28&amp;page=411#source-library">Publication details, PDF page 411 →</a>.</p>`;
    learning.append(methods);


  }
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
