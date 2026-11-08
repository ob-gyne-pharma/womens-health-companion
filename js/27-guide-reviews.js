/* Women & Families 2026.11.08-r25 | js/27-guide-reviews.js
   CR-11 (Agent 2, 7 Nov 2026): a place for a per-guide "last reviewed" date, reviewer name,
   and next-review-due date, required by clinical/clinical-governance-framework-v0.1.md §8
   before any guide can be called clinically governed.
   Classic script (not a module): shares one global scope with every other js/ file,
   so LOAD ORDER IS PART OF THE CODE. Order is defined in index.html and sw.js.

   Deliberately a separate sidecar file, not a change to the 42-entry guideDepth object in
   js/08-guide-data.js: keyed by guide id, so a single entry can be added the moment a named
   reviewer signs it off, without editing guide content.

   Every entry below is empty because no clinical reviewer exists yet (Clinical Governance
   Framework §12, CGF-01). guideReviewLine() returns null for an empty entry, so NOTHING is
   added to the "Sources & scope" section of any guide today -- this file changes nothing a
   reader sees until the founder names a reviewer and Agent 2 fills a date in. */
'use strict';

const GUIDE_REVIEWS = {
  /* 'period-pain': { lastReviewed: '2026-11-07', reviewer: 'Dr Jane Smith, consultant obstetrician', nextReviewDue: '2027-11-07' }, */
};

/* Returns the "Last reviewed: Month YYYY" line (English/Arabic, per the current language),
   or null if this guide has no reviewer and date on file yet -- in which case the caller
   must show nothing, not a placeholder that could be mistaken for a real review. */
function guideReviewLine(guideId) {
  const r = GUIDE_REVIEWS[guideId];
  if (!r || !r.lastReviewed || !r.reviewer) return null;
  const d = new Date(r.lastReviewed + 'T00:00:00');
  if (isNaN(d.getTime())) return null;
  const formatted = d.toLocaleDateString(state.lang === 'ar' ? 'ar' : 'en-GB', { month: 'long', year: 'numeric' });
  return T('Last reviewed: ', 'آخر مراجعة: ') + formatted + T(', by ', '، بواسطة ') + r.reviewer;
}
