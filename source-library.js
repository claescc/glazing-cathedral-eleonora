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
  section.innerHTML = `<div class="head"><div><p class="eyebrow">The books, opened</p><h2>Search inside the library.</h2></div><p>Find a recipe, ingredient or technique across the supplied PDFs. Open the original recipe page to read its formula, context and firing notes.</p></div><div class="source-stats" id="sourceStats" aria-live="polite">Loading the source catalogue…</div><div class="source-controls"><label class="search-field"><span class="material-symbols-rounded" aria-hidden="true">search</span><span class="sr-only">Search inside all books</span><input type="search" id="sourceSearch" placeholder="Try ash glaze, copper red, feldspar…" autocomplete="off"></label><label>Book or source<select id="sourceBook"><option value="">Every source</option></select></label><label>Show<select id="sourceScope"><option value="recipes">Recipe-related pages</option><option value="all">All text pages</option></select></label></div><p class="source-note">Recipe-related pages are found from ingredient and formula terms. They can include discussions, variations and tables. Their numbers are not used by the calculator until checked against the page.</p><p id="sourceCount" class="result" role="status"></p><div id="sourceResults" class="source-results"></div><button id="sourceMore" type="button" hidden>Show more pages</button>`;
  document.getElementById("recipes").after(section);
  const dialog = document.createElement("dialog");
  dialog.id = "sourceReader";
  dialog.setAttribute("aria-labelledby", "sourceTitle");
  dialog.innerHTML = `<header><div><small id="sourceCitation"></small><h2 id="sourceTitle"></h2></div><button id="sourceClose" type="button" aria-label="Close source page">Close ×</button></header><nav aria-label="Source page navigation"><button id="sourcePrev" type="button">← Previous page</button><label>PDF page <input id="sourcePageNumber" type="number" min="1"></label><button id="sourceNext" type="button">Next page →</button></nav><div id="sourcePageBody"></div>`;
  document.body.append(dialog);
  const $ = (id) => document.getElementById(id);
  let books = [],
    corpus = null,
    loading = null,
    limit = 30,
    found = [],
    readerPages = [],
    readerBook = null,
    readerIndex = 0,
    readerRequest = 0;
  const bookMap = new Map(),
    pageCache = new Map();
  async function getPages(book) {
    if (!pageCache.has(book.id)) {
      const r = await fetch(`assets/library/${book.id}.json`);
      if (!r.ok) throw Error("Source pages unavailable");
      pageCache.set(book.id, await r.json());
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
      `${readerBook.name} · supplied PDF page ${p.page} of ${readerBook.pages}`;
    $("sourceTitle").textContent = `Page ${p.page}`;
    $("sourcePageNumber").value = p.page;
    $("sourcePageNumber").max = readerBook.pages;
    $("sourcePrev").disabled = readerIndex === 0;
    $("sourceNext").disabled = readerIndex === readerPages.length - 1;
    $("sourcePageBody").innerHTML =
      `${p.image ? `<a class="page-fullsize" href="${p.image}" target="_blank" rel="noopener">Open page at full size ↗</a><img class="source-facsimile" src="${p.image}" alt="Original source page ${p.page} of ${esc(readerBook.name)}">` : ""}<details ${p.image ? "" : "open"}><summary>Searchable text · extraction may contain errors</summary><pre>${esc(p.text || "No extractable text on this page.")}</pre></details>`;
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
  function paintResults() {
    const q = $("sourceSearch").value;
    const slice = found.slice(0, limit);
    $("sourceResults").innerHTML = slice
      .map((p) => {
        const b = bookMap.get(p.book);
        return `<button class="source-hit" data-book="${p.book}" data-page="${p.page}"><span class="page-badge">PDF<br><b>${p.page}</b></span><span><small>${p.recipeCandidate ? "RECIPE-RELATED PAGE" : "SOURCE TEXT"}</small><strong>${esc(b.name)}</strong><span class="source-snippet">${esc(snippet(p.text, q))}</span></span><span aria-hidden="true">↗</span></button>`;
      })
      .join("");
    if (!found.length)
      $("sourceResults").innerHTML =
        "<p>No matching pages. Try a different word, another source, or “All text pages”.</p>";
    $("sourceCount").textContent =
      `${found.length.toLocaleString()} matching pages · ${new Set(found.map((p) => p.book)).size} sources · showing ${slice.length}`;
    $("sourceMore").hidden = limit >= found.length;
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
            (p.text + " " + bookMap.get(p.book).name).toLowerCase().includes(w),
          ),
      );
      limit = 30;
      paintResults();
    } catch (e) {
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
    limit += 30;
    paintResults();
  };
  $("sourceResults").onclick = (e) => {
    const b = e.target.closest("[data-book]");
    if (b) openPage(b.dataset.book, Number(b.dataset.page));
  };
  function selectBook(id) {
    $("sourceBook").value = id;
    $("sourceSearch").value = "";
    $("sourceScope").value = "recipes";
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
        b.name.toLowerCase().includes(q) &&
        (topic === "all" ||
          (topic === "indexed" && b.recipePages.length) ||
          (typeof bookTopic === "function" && bookTopic(b.name) === topic)),
    );
    $("bookResultCount").textContent = list.length;
    $("shelves").innerHTML = list
      .map(
        (b) =>
          `<article><small>${b.status === "unreadable" ? "UNREADABLE FILE" : "SEARCHABLE SOURCE TEXT"}</small><h3>${esc(b.name)}</h3><p>${b.pages} PDF pages · ${b.recipePages.length} recipe-related pages</p>${b.status === "unreadable" ? "<p>A readable replacement is needed.</p>" : `<div class="shelf-actions"><button data-source-open="${b.id}">Open book</button><button data-source-filter="${b.id}">Find recipes</button></div>`}</article>`,
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
  fetch("assets/library/catalogue.json")
    .then((r) => {
      if (!r.ok) throw Error();
      return r.json();
    })
    .then((data) => {
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
        "Open a book or find its recipe-related pages. Searchable text is separate from checked recipe data. Exact duplicate files are counted once; unreadable files remain visible below.";
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
