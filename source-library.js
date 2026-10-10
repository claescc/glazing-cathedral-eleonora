/* Source text is a finding aid; page facsimiles are the authority for numbers. */
(() => {
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const section = document.createElement("section");
  section.id = "source-library";
  section.className = "source-library light";
  section.innerHTML = `<div class="head"><div><p class="eyebrow">The Reading Room</p><h1>Choose a book. Find your next glaze.</h1></div><p>Start with a cover, explore the recipes beside it, and open the original page for the formula, context and firing notes.</p></div><div class="source-stats" id="sourceStats" aria-live="polite">Loading the source catalogue…</div><div class="source-controls"><label class="search-field"><span class="material-symbols-rounded" aria-hidden="true">search</span><span class="sr-only">Search inside all books</span><input type="search" id="sourceSearch" placeholder="Try ash glaze, copper red, feldspar…" autocomplete="off"></label><details class="reading-filters atlas-advanced" id="readingFilters"><summary><span class="material-symbols-rounded" aria-hidden="true">tune</span>Filters <span id="readingFilterCount" class="filter-count" hidden></span><span class="material-symbols-rounded" aria-hidden="true">expand_more</span></summary><div class="reading-filter-options" id="readingFilterOptions"><label>Book or source<select id="sourceBook"><option value="">Every source</option></select></label><label>Show<select id="sourceScope"><option value="recipes">Recipes &amp; related reading</option><option value="all">All text pages</option></select></label></div></details></div><details class="source-note"><summary>About the page numbers and recipe selection</summary><p>“Page in file” is the position in the supplied PDF, counting its cover and front matter. It may differ from the printed book page. Related reading includes discussions and tables found through ingredient and formula terms; inclusion does not mean that a page contains a checked formula. Images are original covers, source pages or photographs identified in existing recipe records.</p></details><p id="sourceCount" class="result" role="status"></p><div id="sourceResults" class="source-results"></div><button id="sourceMore" type="button" hidden>Show more books</button>`;
  document.getElementById("recipes").after(section);
  const dialog = document.createElement("dialog");
  dialog.id = "sourceReader";
  dialog.setAttribute("aria-labelledby", "sourceTitle");
  dialog.innerHTML = `<header><div><small id="sourceCitation"></small><h2 id="sourceTitle"></h2></div><button id="sourceClose" type="button" aria-label="Close source page">Close ×</button></header><nav aria-label="Source page navigation"><button id="sourcePrev" type="button">← Previous page</button><label>Page in file <input id="sourcePageNumber" type="number" min="1"></label><button id="sourceNext" type="button">Next page →</button></nav><div id="sourcePageBody"></div>`;
  document.body.append(dialog);
  const $ = (id) => document.getElementById(id);
  let books = [],
    corpus = null,
    loading = null,
    limit = 6,
    found = [],
    readerPages = [],
    readerBook = null,
    readerIndex = 0,
    readerRequest = 0;
  const bookMap = new Map(),
    pageCache = new Map();
  let visuals = { books: {}, pages: {} };
  const pageLimits = new Map();
  const bookVisual = (b) => visuals.books[b.id] || { title: b.name, author: "", accent: "#096773" };
  const pageVisual = (p) => visuals.pages[`${p.book}:${p.page}`] || {};
  const passage = (p) => p.text.split(/\n/).map(s => s.trim()).find(s => s.length > 15 && !/^https?:|OceanofPDF|^\d+$/.test(s)) || "Read the source text";
  function ashPage(p) {
    if (!p.book.startsWith("ash-glazes")) return null;
    const records = (typeof recipes !== "undefined" ? recipes : []).filter(r => r.sourceBookId === p.book && r.page === p.page && /^Ash glaze \d+/.test(r.name));
    if (!records.length) return null;
    const numbers = records.map(r => Number(r.name.match(/^Ash glaze (\d+)/)[1])).sort((a,b)=>a-b);
    const contiguous = numbers.every((n,i)=>!i || n===numbers[i-1]+1);
    return { title: `Ash recipes ${contiguous ? numbers[0] + "–" + numbers.at(-1) : numbers.join(", ")}`, contributors: new Set(records.map(r=>r.recipeCredit).filter(Boolean)).size };
  }
  const pageTitle = (p) => ashPage(p)?.title || pageVisual(p).title || passage(p);
  function cover(b, className = "") {
    const v = bookVisual(b);
    return v.cover ? `<figure class="reading-cover ${className}"><img src="${esc(v.cover)}" alt="${esc(v.coverKind)} of ${esc(v.title)}" loading="lazy" width="420" height="560">${v.coverKind === "Book cover" ? "" : `<figcaption>${esc(v.coverKind)}</figcaption>`}</figure>` : `<div class="reading-cover-unavailable">Cover unavailable</div>`;
  }
  function pagePhoto(p, b) {
    // Only an exact, verified source photograph may replace a page facsimile.
    const records = typeof recipes !== "undefined" ? recipes : [];
    const record = records.find(x => x.imageVerified && x.image && x.page === p.page &&
      (x.sourceBookId === b.id || (b.name.startsWith("Amazing Glaze Food-Safe") && (x.source || "").includes("Food-Safe")) ||
       (b.name.startsWith("Amazing Glaze Recipes and") && x.source === "Amazing Glaze: Recipes and Combinations")));
    const v = pageVisual(p);
    const image = record?.image || v.photograph || v.thumbnail || bookVisual(b).cover;
    const label = record ? "Recipe photograph" : v.photograph ? `Source photo · page ${v.photographPage}` : v.thumbnail ? "Original page" : bookVisual(b).coverKind || "Source preview";
    return image ? `<span class="reading-page-image ${record || v.photograph ? "is-photograph" : ""}"><img src="${esc(image)}" alt="${esc(record ? record.name : pageTitle(p))}" loading="lazy" width="360" height="460">${record || v.photograph ? "" : `<span>${esc(label)}</span>`}</span>` : `<span class="reading-page-image">Text passage</span>`;
  }
  async function getPages(book) {
    if (!pageCache.has(book.id)) {
      const r = await fetch(`assets/library/${book.id}.json`);
      if (!r.ok) throw Error("Source pages unavailable");
      const pages = await r.json();
      Object.entries(visuals.pages).forEach(([key,v]) => {
        if (key.startsWith(book.id + ":") && v.photographSource && pages[v.photographPage-1])
          pages[v.photographPage-1].image = v.photographSource;
      });
      pageCache.set(book.id, pages);
    }
    return pageCache.get(book.id);
  }
  function showPage(index) {
    if (!readerPages.length) return;
    readerIndex = Math.max(
      0,
      Math.min(
        readerPages.length - 1,
        Number.isFinite(index) ? Math.trunc(index) : 0,
      ),
    );
    const p = readerPages[readerIndex];
    $("sourceCitation").textContent =
      `${bookVisual(readerBook).title}${bookVisual(readerBook).author ? " · " + bookVisual(readerBook).author : ""} · page ${p.page} of ${readerBook.pages} in the supplied file`;
    $("sourceTitle").textContent = pageTitle({ ...p, book: readerBook.id });
    $("sourcePageNumber").value = p.page;
    $("sourcePageNumber").max = readerBook.pages;
    $("sourcePrev").disabled = readerIndex === 0;
    $("sourceNext").disabled = readerIndex === readerPages.length - 1;
    const image = p.image || (p.page === 1 && bookVisual(readerBook).coverKind !== "Source photograph" ? bookVisual(readerBook).cover : null);
    if (p.page === 1) $("sourceTitle").textContent = bookVisual(readerBook).title;
    $("sourcePageBody").innerHTML =
      `${image ? `<a class="page-fullsize" href="${esc(image)}" target="_blank" rel="noopener">Open page image ↗</a><img class="source-facsimile" src="${esc(image)}" alt="Original source page ${p.page} of ${esc(readerBook.name)}">` : ""}<details ${image ? "" : "open"}><summary>Searchable text · extraction may contain errors</summary><pre>${esc(p.text || "No extractable text on this page.")}</pre></details>`;
    dialog.scrollTop = 0;
  }
  async function openPage(bookId, page = 1) {
    const request = ++readerRequest;
    readerBook = bookMap.get(bookId);
    if (!readerBook) return;
    readerPages = [];
    $("sourcePrev").disabled = true;
    $("sourceNext").disabled = true;
    $("sourcePageNumber").disabled = true;
    $("sourceTitle").textContent = "Opening source page…";
    $("sourceCitation").textContent = readerBook.name;
    $("sourcePageBody").innerHTML = "";
    if (!dialog.open) dialog.showModal();
    try {
      const pages = await getPages(readerBook);
      if (request !== readerRequest) return;
      readerPages = pages;
      $("sourcePageNumber").disabled = false;
      if (!pages.length) throw Error("No pages");
      showPage(page - 1);
    } catch (e) {
      if (request !== readerRequest) return;
      $("sourcePageBody").textContent =
        "This source could not be loaded. Close and try again.";
    }
  }
  $("sourceClose").onclick = () => dialog.close();
  dialog.addEventListener("close", () => readerRequest++);
  $("sourcePrev").onclick = () => showPage(readerIndex - 1);
  $("sourceNext").onclick = () => showPage(readerIndex + 1);
  $("sourcePageNumber").onchange = (e) => showPage(Number(e.target.value) - 1);
  function snippet(text, query) {
    const term = query.trim().split(/\s+/)[0] || "";
    const at = term ? text.toLowerCase().indexOf(term.toLowerCase()) : 0;
    const start = Math.max(0, at - 75);
    return (
      (start ? "…" : "") +
      text.slice(start, start + 240).replace(/\s+/g, " ") +
      (text.length > start + 240 ? "…" : "")
    );
  }
  function pageDescription(p, q) {
    const v = pageVisual(p);
    const ash = ashPage(p);
    if (ash) return "";
    if (v.color || v.surface || v.cone) return `<span class="reading-recipe-colour">${esc([v.color,v.surface].filter(Boolean).join(" · "))}</span><span class="reading-recipe-firing">${esc([v.cone ? "Cone " + v.cone : "",v.atmosphere].filter(Boolean).join(" · "))}</span>`;
    return q.trim() ? esc(snippet(p.text,q)) : "";
  }
  function paintResults() {
    const q = $("sourceSearch").value;
    const filters = Number(Boolean($("sourceBook").value)) + Number($("sourceScope").value !== "recipes");
    $("readingFilterCount").textContent = filters;
    $("readingFilterCount").hidden = !filters;
    const groups = new Map();
    found.forEach(p => {
      if (!groups.has(p.book)) groups.set(p.book, []);
      groups.get(p.book).push(p);
    });
    const featured = ["amazing-glaze-food-safe", "amazing-glaze-recipes", "colour-in-glazes", "ash-glazes", "cone-5-6-glazes"];
    const rank = id => { const i = featured.findIndex(prefix => id.startsWith(prefix)); return i < 0 ? featured.length : i; };
    const slice = [...groups].sort((a,b) => rank(a[0]) - rank(b[0])).slice(0, limit);
    let shown = 0;
    $("sourceResults").innerHTML = slice.map(([id, pages]) => {
      const b = bookMap.get(id), v = bookVisual(b);
      if (!q.trim()) pages.sort((a,b) => (pageVisual(a).kind === "Recipe heading" ? 0 : 1) - (pageVisual(b).kind === "Recipe heading" ? 0 : 1) || a.page - b.page);
      const pageLimit = pageLimits.get(id) || 6;
      const visible = pages.slice(0, pageLimit);
      shown += visible.length;
      return `<article class="reading-book-group" style="--book-accent:${esc(v.accent)}" aria-labelledby="book-heading-${id}"><div class="reading-book-root">${cover(b)}<div class="reading-book-info"><h3 id="book-heading-${id}">${esc(v.title)}</h3>${v.author ? `<p class="reading-author">${esc(v.author)}</p>` : ""}<p class="reading-book-count">${b.pages} pages</p><div class="shelf-actions"><button data-book="${id}" data-page="1">Open ${v.coverKind === "Source photograph" ? "source" : "book"}<span aria-hidden="true"> ↗</span></button>${$("sourceBook").value !== id ? `<button class="reading-explore" data-explore="${id}">Explore this source<span aria-hidden="true"> →</span></button>` : ""}</div></div></div><div class="reading-book-pages"><div class="reading-pages-heading"><h4>${$("sourceScope").value === "recipes" ? "Recipes & related reading" : "Source pages"}</h4><span>${visible.length} of ${pages.length} matching pages</span></div><div class="reading-page-grid">${visible.map(p => `<button class="source-hit reading-page-card" data-book="${id}" data-page="${p.page}">${pagePhoto(p,b)}<span class="reading-page-copy"><strong>${esc(pageTitle(p))}</strong>${pageDescription(p,q) ? `<span class="source-snippet">${pageDescription(p,q)}</span>` : ""}<span class="reading-page-action">Open page ${p.page}<span aria-hidden="true">↗</span></span></span></button>`).join("")}</div>${pageLimit < pages.length ? `<button class="reading-more-pages" data-more-pages="${id}">Show more pages from this source <span aria-hidden="true">↓</span></button>` : ""}</div></article>`;
    }).join("");
    if (!found.length)
      $("sourceResults").innerHTML =
        "<p>No matching pages. Try a different word, another source, or “All text pages”.</p>";
    $("sourceCount").textContent =
      `${found.length.toLocaleString()} pages · ${groups.size} sources`;
    $("sourceMore").hidden = limit >= groups.size;
  }
  const corpora = new Map(),
    loads = new Map();
  async function loadCorpus() {
    const scope = $("sourceScope").value;
    if (corpora.has(scope)) return corpora.get(scope);
    if (!loads.has(scope))
      loads.set(
        scope,
        (async () => {
          const read = async (name) => {
            const r = await fetch("assets/library/" + name);
            if (!r.ok) throw Error("Search unavailable");
            return r.json();
          };
          const result =
            scope === "recipes"
              ? await read("recipe-search.json")
              : (
                  await Promise.all((await read("search-parts.json")).map(read))
                ).flat();
          corpora.set(scope, result);
          return result;
        })().catch((e) => {
          loads.delete(scope);
          throw e;
        }),
      );
    return loads.get(scope);
  }
  let searchRequest = 0;
  async function search() {
    const request = ++searchRequest;
    $("sourceCount").textContent = "Searching the library…";
    try {
      const pages = await loadCorpus();
      if (request !== searchRequest) return;
      const words = $("sourceSearch")
        .value.toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      const id = $("sourceBook").value;
      const recipesOnly = $("sourceScope").value === "recipes";
      found = pages.filter(
        (p) =>
          (!id || p.book === id) &&
          (!recipesOnly || p.recipeCandidate) &&
          words.every((w) =>
            (p.text + " " + bookMap.get(p.book).name + " " + pageTitle(p)).toLowerCase().includes(w),
          ),
      );
      limit = 6;
      pageLimits.clear();
      paintResults();
    } catch (e) {
      if (request !== searchRequest) return;
      $("sourceCount").textContent =
        "The search index could not load. Change a filter to retry.";
    }
  }
  let timer;
  $("sourceSearch").oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(search, 200);
  };
  $("sourceBook").onchange = search;
  $("sourceScope").onchange = search;
  $("sourceMore").onclick = () => {
    const previous = $("sourceResults").querySelectorAll(".reading-book-group").length;
    limit += 6;
    paintResults();
    $("sourceResults").querySelectorAll(".reading-book-group")[previous]?.querySelector("button")?.focus();
  };
  $("sourceResults").onclick = (e) => {
    const more = e.target.closest("[data-more-pages]");
    if (more) {
      const id = more.dataset.morePages;
      const scroll = window.scrollY;
      pageLimits.set(id, (pageLimits.get(id) || 6) + 12);
      paintResults();
      const cards = [...$("sourceResults").querySelectorAll(`.reading-page-card[data-book="${id}"]`)];
      cards[pageLimits.get(id) - 12]?.focus({ preventScroll: true });
      window.scrollTo(0, scroll);
      return;
    }
    const explore = e.target.closest("[data-explore]");
    if (explore) { selectBook(explore.dataset.explore); return; }
    const b = e.target.closest("[data-book]");
    if (b) openPage(b.dataset.book, Number(b.dataset.page));
  };
  function selectBook(id) {
    $("sourceBook").value = id;
    $("sourceSearch").value = "";
    $("sourceScope").value = bookMap.get(id)?.recipePages.length ? "recipes" : "all";
    search();
    section.scrollIntoView({ behavior: "smooth" });
    $("sourceSearch").focus({ preventScroll: true });
  }
  const oldReading = document.getElementById("reading");
  function renderShelves() {
    const q = $("bookSearch").value.toLowerCase();
    const topic =
      document.querySelector("#bookFilters .on")?.dataset.bookFilter || "all";
    const list = books.filter(
      (b) =>
        !b.duplicateOf &&
        (b.name + " " + bookVisual(b).title + " " + bookVisual(b).author).toLowerCase().includes(q) &&
        (topic === "all" ||
          (topic === "indexed" && b.recipePages.length) ||
          (typeof bookTopic === "function" && bookTopic(b.name) === topic)),
    );
    $("bookResultCount").textContent = list.length;
    $("shelves").innerHTML = list
      .map(
        (b) =>
          `<article class="reading-shelf-book" style="--book-accent:${esc(bookVisual(b).accent)}">${cover(b)}<div><h3>${esc(bookVisual(b).title)}</h3>${bookVisual(b).author ? `<p class="reading-author">${esc(bookVisual(b).author)}</p>` : ""}<p>${b.pages} pages in file · ${b.recipePages.length} related pages</p>${b.status === "unreadable" ? "<p>A readable replacement is needed.</p>" : `<div class="shelf-actions"><button data-source-open="${b.id}">Open source</button><button data-source-filter="${b.id}">Explore pages</button></div>`}</div></article>`,
      )
      .join("");
  }
  oldReading.addEventListener("click", (e) => {
    const open = e.target.closest("[data-source-open]"),
      filter = e.target.closest("[data-source-filter]");
    if (open) openPage(open.dataset.sourceOpen);
    if (filter) selectBook(filter.dataset.sourceFilter);
  });
  $("bookSearch").oninput = renderShelves;
  document.addEventListener("library-filter-change", renderShelves);
  // Add a page-level source link to recipe records without changing their formulas.
  const modal = document.getElementById("formulaBlock");
  new MutationObserver(() => {
    if (modal.querySelector(".open-source-page")) return;
    const x = typeof selected !== "undefined" ? selected : null;
    if (!x) return;
    const id =
      x.sourceBookId ||
      books.find((b) =>
        x.sourceFile
          ? b.file.split("/").pop() === x.sourceFile
          : (x.source || "").includes("Food-Safe")
            ? b.name.startsWith("Amazing Glaze Food-Safe")
            : x.source === "Amazing Glaze: Recipes and Combinations"
              ? b.name.startsWith("Amazing Glaze Recipes and Combinations")
              : x.id === "glazy-27852"
                ? b.name.startsWith("June Perry Pink")
                : false,
      )?.id;
    if (!id || !x.page) return;
    const button = document.createElement("button");
    button.className = "open-source-page";
    button.textContent = `Read the original source · PDF page ${x.page}`;
    button.onclick = () => openPage(id, x.page);
    modal.append(button);
  }).observe(modal, { childList: true });
  Promise.all(["assets/library/catalogue.json", "assets/library/visuals/index.json"].map(async url => {
    const r = await fetch(url);
    if (!r.ok) throw Error("Source catalogue unavailable");
    return r.json();
  }))
    .then(([data, visualData]) => {
      visuals = visualData;
      books = data;
      books.forEach((b) => bookMap.set(b.id, b));
      const unique = books.filter((b) => !b.duplicateOf),
        readable = unique.filter((b) => b.status !== "unreadable"),
        pages = readable.reduce((n, b) => n + b.textPages, 0),
        candidates = readable.reduce((n, b) => n + b.recipePages.length, 0);
      readable.forEach((b) => $("sourceBook").add(new Option(b.name, b.id)));
      $("sourceStats").innerHTML = [
        [readable.length, "searchable sources"],
        [pages.toLocaleString(), "pages with text"],
        [candidates.toLocaleString(), "recipe-related pages"],
        [
          typeof recipes !== "undefined" ? recipes.length : 0,
          "structured formulas",
        ],
      ]
        .map(([n, label]) => `<div><b>${n}</b><span>${label}</span></div>`)
        .join("");
      $("stats").innerHTML = $("sourceStats").innerHTML;
      $("bookCount").textContent = readable.length;
      $("pageCount").textContent = readable
        .reduce((n, b) => n + b.pages, 0)
        .toLocaleString();
      oldReading.querySelector(".head>p").textContent =
        "Browse the complete collection by its covers and source previews. Choose a book to explore its pages above.";
      oldReading.querySelector("h2").textContent = "All books & sources";
      document.querySelector('[data-book-filter="indexed"]').textContent =
        "With recipe pages";
      renderShelves();
      search();
    })
    .catch(() => {
      $("sourceStats").textContent =
        "The source catalogue could not load. Reload to retry.";
    });
  window.openLibraryPage = openPage;
})();
