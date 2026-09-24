# Mobile-first acceptance baseline

Project decision: design and verify at 375 × 667 CSS pixels (iPhone SE 2/3 layout viewport). This is the agreed project baseline, not a universal UX standard.

- Start with one readable Atlas column, wrapped filters, 16px form text and 48px primary controls. Enhance the layout at larger widths.
- Labels, titles, characteristics and sources must remain readable without clipping. Neighbouring desktop cards share text tracks.
- Reserve space for bottom navigation and device safe areas. Hide background navigation while a glaze dialog is open.
- Verify long titles, search/filter interaction, opening and closing a recipe, formula content, text enlargement and reduced viewport height with a keyboard.
- Verify desktop as well as the baseline before committing presentation changes. Emulation does not replace testing on a physical iPhone with its native keyboard.
- Typography: Montserrat, 400 body and 600 for prominent headings/titles. Preserve code typography for numeric/formula data.
- Palette direction: 60% light sand foundation, 30% supporting sand/mint surfaces, 10% sunflower #FEC125 accents. This is a composition target, not an exact pixel ratio or accessibility certification.
- Use the supplied personalised EJL sunflower SVG for the site seal. Cone visualisations must remain explicitly labelled; original photographs remain in the detail view.
