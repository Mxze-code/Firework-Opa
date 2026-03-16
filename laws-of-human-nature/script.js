/**
 * THE LAWS OF HUMAN NATURE - Main JavaScript
 *
 * localStorage keys:
 * - lawsExplored: array of law IDs viewed
 * - lawsFavorites: array of law IDs favorited
 * - lawsStudied: array of law IDs marked as studied
 * - lawsSaveForLater: array of law IDs saved for later
 * - lawsLastOpened: array of law IDs (most recent first), max 5
 * - lawsLearnings: object { lawId: { learned, inOthers, inMyself, apply, watch, completed, updated } }
 * - quoteDayIndex, quoteDayDate: for daily quote
 * - lastVisitedPage: string (page path)
 * - readingStreakDate, readingStreakCount: for streak
 */

// ========== QUOTES ==========
const STRATEGIC_QUOTES = [
    "The greatest power you can have is the power to understand people.",
    "People are emotional beings who use logic to justify decisions they've already made emotionally.",
    "The winners feed others' vanity while remaining ruthlessly self-aware about their own.",
    "Before important interactions, identify: Who has leverage? Who controls the narrative?",
    "Change emotions first. Understanding shifts second.",
    "The people brave enough to go against the grain become the leaders.",
    "When you judge someone harshly, ask yourself: Is this about them or about me?",
    "Treat people well. Not because it's nice—because it's strategic.",
    "Be aware of envy in others and in yourself. It's a poison that destroys from inside.",
    "Give people a sense of purpose. Make them feel part of something bigger.",
    "Understand that mortality drives behavior. Use this with compassion.",
    "The question isn't whether these laws are real. They are. The question is: Will you see them?",
    "Real power is demonstrated through actions, not words.",
    "Challenge your limiting beliefs. Self-awareness is the foundation of everything.",
    "Use social proof strategically. Show that others already approve.",
    "Acknowledge your insecurities. Then refuse to let them control your actions.",
    "Channel your competitive instincts toward excellence and growth.",
    "Bridge generational gaps by understanding different worldviews."
];

// Top 3 laws for modern life (curated - edit these IDs to change)
const TOP_LAWS_IDS = [1, 5, 7]; // Irrationality, Covetousness, Defensiveness

// Search suggestion terms when empty
const SEARCH_SUGGESTIONS = ['irrationality', 'narcissism', 'role-playing', 'envy', 'conformity', 'mortality'];

// Law page URL - each law has its own dedicated page (law-1.html, law-2.html, etc.)
function lawPageUrl(lawId) {
    return 'law-' + lawId + '.html';
}

// Helper: render law image HTML (thumbnail or full)
function lawImageHtml(law, size) {
    if (!law || !law.image || !law.image.url) return '';
    const cls = size === 'thumb' ? 'law-card-image' : 'law-modal-image';
    return `<img class="${cls}" src="${law.image.url}" alt="${(law.image.title || '')}" loading="lazy">`;
}

// ========== LOCAL STORAGE HELPERS ==========

function getExploredLaws() {
    try {
        const data = localStorage.getItem('lawsExplored');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function addExploredLaw(id) {
    const explored = getExploredLaws();
    if (!explored.includes(id)) {
        explored.push(id);
        localStorage.setItem('lawsExplored', JSON.stringify(explored));
    }
}

function getFavorites() {
    try {
        const data = localStorage.getItem('lawsFavorites');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(id);
    localStorage.setItem('lawsFavorites', JSON.stringify(favorites));
    return favorites.includes(id);
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function getStudied() {
    try {
        const data = localStorage.getItem('lawsStudied');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function toggleStudied(id) {
    const studied = getStudied();
    const index = studied.indexOf(id);
    if (index > -1) studied.splice(index, 1);
    else studied.push(id);
    localStorage.setItem('lawsStudied', JSON.stringify(studied));
    return studied.includes(id);
}

function isStudied(id) {
    return getStudied().includes(id);
}

function getSaveForLater() {
    try {
        const data = localStorage.getItem('lawsSaveForLater');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function toggleSaveForLater(id) {
    const saved = getSaveForLater();
    const index = saved.indexOf(id);
    if (index > -1) saved.splice(index, 1);
    else saved.push(id);
    localStorage.setItem('lawsSaveForLater', JSON.stringify(saved));
    return saved.includes(id);
}

function isSaveForLater(id) {
    return getSaveForLater().includes(id);
}

function addLastOpened(id) {
    let last = [];
    try {
        const data = localStorage.getItem('lawsLastOpened');
        if (data) last = JSON.parse(data);
    } catch (e) {}
    last = last.filter(x => x !== id);
    last.unshift(id);
    last = last.slice(0, 5);
    localStorage.setItem('lawsLastOpened', JSON.stringify(last));
}

function getLastOpened() {
    try {
        const data = localStorage.getItem('lawsLastOpened');
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function getLearnings() {
    try {
        const data = localStorage.getItem('lawsLearnings');
        return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
}

function saveLearning(lawId, field, value) {
    const learnings = getLearnings();
    if (!learnings[lawId]) learnings[lawId] = {};
    learnings[lawId][field] = value;
    learnings[lawId].updated = new Date().toISOString();
    localStorage.setItem('lawsLearnings', JSON.stringify(learnings));
}

function setLearningCompleted(lawId, completed) {
    const learnings = getLearnings();
    if (!learnings[lawId]) learnings[lawId] = {};
    learnings[lawId].completed = completed;
    learnings[lawId].updated = new Date().toISOString();
    localStorage.setItem('lawsLearnings', JSON.stringify(learnings));
}

function resetAllLearnings() {
    if (confirm('Are you sure you want to delete all your notes? This cannot be undone.')) {
        localStorage.removeItem('lawsLearnings');
        if (typeof renderLearningsPage === 'function') renderLearningsPage();
        alert('All notes have been reset.');
    }
}

function setLastVisitedPage(path) {
    localStorage.setItem('lastVisitedPage', path);
}

function getLastVisitedPage() {
    return localStorage.getItem('lastVisitedPage') || '';
}

function updateReadingStreak() {
    const today = new Date().toDateString();
    let streakDate = localStorage.getItem('readingStreakDate');
    let count = parseInt(localStorage.getItem('readingStreakCount') || '0', 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (streakDate === today) return count;
    if (streakDate === yesterdayStr) {
        count += 1;
    } else if (!streakDate || streakDate !== today) {
        count = 1;
    }
    localStorage.setItem('readingStreakDate', today);
    localStorage.setItem('readingStreakCount', count.toString());
    return count;
}

function getReadingStreak() {
    const today = new Date().toDateString();
    const streakDate = localStorage.getItem('readingStreakDate');
    const count = parseInt(localStorage.getItem('readingStreakCount') || '0', 10);
    if (streakDate !== today) return 0;
    return count;
}

// ========== NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    setLastVisitedPage(window.location.pathname || 'index.html');
});

// ========== QUOTE OF THE DAY ==========
function loadQuoteOfDay() {
    const quoteEl = document.getElementById('dailyQuote');
    const btn = document.getElementById('newQuoteBtn');
    if (!quoteEl) return;

    const today = new Date().toDateString();
    let quoteIndex = parseInt(localStorage.getItem('quoteDayIndex') || '0', 10);
    const storedDate = localStorage.getItem('quoteDayDate');

    if (storedDate !== today) {
        quoteIndex = Math.floor(Math.random() * STRATEGIC_QUOTES.length);
        localStorage.setItem('quoteDayIndex', quoteIndex.toString());
        localStorage.setItem('quoteDayDate', today);
    }

    quoteEl.textContent = '"' + STRATEGIC_QUOTES[quoteIndex] + '"';

    if (btn) {
        btn.addEventListener('click', function() {
            const newIndex = Math.floor(Math.random() * STRATEGIC_QUOTES.length);
            quoteEl.classList.add('quote-animated');
            quoteEl.style.opacity = '0';
            setTimeout(function() {
                quoteEl.textContent = '"' + STRATEGIC_QUOTES[newIndex] + '"';
                quoteEl.style.opacity = '1';
            }, 200);
        });
    }
}

// ========== HOME PAGE - PLAIN LAW LIST ==========
function loadHomeLawList() {
    const list = document.getElementById('homeLawList');
    if (!list || typeof LAWS_DATA === 'undefined') return;
    list.innerHTML = LAWS_DATA.map(law => `
        <li><a href="${lawPageUrl(law.id)}">Law ${law.id}: ${law.actionTitle} — ${law.title}</a></li>
    `).join('');
}

// ========== TODAY'S LAW (legacy - not used on simplified home) ==========
function loadTodaysLaw() {
    const card = document.getElementById('todaysLawCard');
    if (!card || typeof LAWS_DATA === 'undefined') return;

    const today = new Date().toDateString();
    const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const index = seed % LAWS_DATA.length;
    const law = LAWS_DATA[index];

    card.innerHTML = `
        ${lawImageHtml(law, 'thumb')}
        <span class="law-card-number">Law ${law.id}</span>
        <h3 class="law-card-title">${law.actionTitle}</h3>
        <p class="law-card-subtitle">${law.title}</p>
        <p class="law-card-summary">${law.overview}</p>
    `;
    card.onclick = function() {
        window.location.href = lawPageUrl(law.id);
    };
}

// ========== TOP LAWS ==========
function loadTopLaws() {
    const grid = document.getElementById('topLawsGrid');
    if (!grid || typeof LAWS_DATA === 'undefined') return;

    const ids = TOP_LAWS_IDS.filter(id => LAWS_DATA.some(l => l.id === id));
    const laws = ids.map(id => LAWS_DATA.find(l => l.id === id)).filter(Boolean);

    grid.innerHTML = laws.map(law => `
        <div class="top-law-card law-card" onclick="window.location.href='${lawPageUrl(law.id)}';">
            ${lawImageHtml(law, 'thumb')}
            <span class="law-card-number">Law ${law.id}</span>
            <h3 class="law-card-title">${law.actionTitle}</h3>
            <p class="law-card-subtitle">${law.title}</p>
            <p class="law-card-summary">${law.overview}</p>
        </div>
    `).join('');
}

// ========== HERO CTA ==========
function updateHeroCta() {
    const cta = document.getElementById('heroCta');
    const secondary = document.querySelector('.hero-cta-secondary');
    const explored = getExploredLaws();
    if (explored.length > 0 && secondary) {
        secondary.textContent = 'Continue Journey';
        secondary.href = 'laws.html';
    }
}

// ========== FEATURED LAWS ==========
function loadFeaturedLaws() {
    const container = document.getElementById('featuredLaws');
    if (!container || typeof LAWS_DATA === 'undefined') return;

    const featured = LAWS_DATA.slice(0, 6);
    container.innerHTML = featured.map(law => `
        <article class="law-card">
            <a href="${lawPageUrl(law.id)}" class="law-card-link">
                ${lawImageHtml(law, 'thumb')}
                <span class="law-card-number">Law ${law.id}</span>
                <h3 class="law-card-title">${law.actionTitle}</h3>
                <p class="law-card-subtitle">${law.title}</p>
                <p class="law-card-summary">${law.overview}</p>
            </a>
        </article>
    `).join('');
}

// ========== PROGRESS DISPLAY ==========
function updateProgressDisplay() {
    const countEl = document.getElementById('exploredCount');
    const fillEl = document.getElementById('progressFill');
    const streakEl = document.getElementById('readingStreak');
    if (countEl) countEl.textContent = getExploredLaws().length;
    if (fillEl) fillEl.style.width = (getExploredLaws().length / 18) * 100 + '%';
    if (streakEl) {
        const streak = getReadingStreak();
        streakEl.textContent = streak > 0 ? streak + ' day streak' : '';
    }
}

// ========== LAWS PAGE ==========
function renderLawsPage() {
    if (typeof LAWS_DATA === 'undefined') return;

    const grid = document.getElementById('lawsGrid');
    const searchInput = document.getElementById('lawSearch');
    const noResults = document.getElementById('noResults');
    const searchHints = document.getElementById('searchHints');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const randomBtn = document.getElementById('randomLawBtn');
    const continueSection = document.getElementById('continueSection');
    const continueCards = document.getElementById('continueCards');

    // Favorites section
    const favorites = getFavorites();
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesCards = document.getElementById('favoritesCards');
    if (favoritesSection && favoritesCards && favorites.length > 0) {
        favoritesSection.style.display = 'block';
        favoritesCards.innerHTML = favorites.map(id => {
            const law = LAWS_DATA.find(l => l.id === id);
            return law ? `
                <a href="${lawPageUrl(law.id)}" class="continue-card">
                    <span class="law-card-number">Law ${law.id}</span>
                    <h4>${law.actionTitle}</h4>
                    <span class="continue-card-law">${law.title}</span>
                </a>
            ` : '';
        }).join('');
    }

    // Continue section (last opened)
    const lastOpened = getLastOpened().filter(id => LAWS_DATA.some(l => l.id === id));
    if (continueSection && continueCards && lastOpened.length > 0) {
        continueSection.style.display = 'block';
        continueCards.innerHTML = lastOpened.slice(0, 3).map(id => {
            const law = LAWS_DATA.find(l => l.id === id);
            return law ? `
                <a href="${lawPageUrl(law.id)}" class="continue-card">
                    <span class="law-card-number">Law ${law.id}</span>
                    <h4>${law.actionTitle}</h4>
                    <span class="continue-card-law">${law.title}</span>
                </a>
            ` : '';
        }).join('');
    }

    function renderLaws(filter) {
        const search = (filter || '').toLowerCase().trim();
        let laws = LAWS_DATA;

        if (search) {
            laws = laws.filter(law =>
                (law.actionTitle && law.actionTitle.toLowerCase().includes(search)) ||
                (law.title && law.title.toLowerCase().includes(search)) ||
                (law.overview && law.overview.toLowerCase().includes(search)) ||
                (law.explanation && law.explanation.toLowerCase().includes(search)) ||
                (law.takeaway && law.takeaway.toLowerCase().includes(search)) ||
                (Array.isArray(law.examples) && law.examples.some(ex => ex && ex.toLowerCase().includes(search))) ||
                (Array.isArray(law.commonSigns) && law.commonSigns.some(s => s && s.toLowerCase().includes(search)))
            );
        }

        if (noResults) {
            noResults.style.display = laws.length === 0 ? 'block' : 'none';
        }
        if (searchHints && laws.length === 0) {
            searchHints.textContent = SEARCH_SUGGESTIONS.slice(0, 3).join(', ');
        }
        if (searchSuggestions && search && laws.length === 0) {
            searchSuggestions.textContent = 'Try: ' + SEARCH_SUGGESTIONS.join(', ');
        } else if (searchSuggestions) {
            searchSuggestions.textContent = '';
        }

        grid.innerHTML = laws.map(law => `
            <article class="law-card ${isFavorite(law.id) ? 'favorite' : ''}" data-law-id="${law.id}">
                <button class="law-card-favorite-btn ${isFavorite(law.id) ? 'active' : ''}" onclick="event.preventDefault(); event.stopPropagation(); toggleLawFavorite(${law.id}, this)" aria-label="Toggle favorite">★</button>
                <a href="${lawPageUrl(law.id)}" class="law-card-link">
                    ${lawImageHtml(law, 'thumb')}
                    <span class="law-card-number">Law ${law.id}</span>
                    <h3 class="law-card-title">${law.actionTitle}</h3>
                    <p class="law-card-subtitle">${law.title}</p>
                    <p class="law-card-summary">${law.overview}</p>
                </a>
            </article>
        `).join('');
    }

    renderLaws('');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderLaws(this.value);
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', function() {
            if (!LAWS_DATA || !LAWS_DATA.length) return;
            const randomLaw = LAWS_DATA[Math.floor(Math.random() * LAWS_DATA.length)];
            const outputEl = document.getElementById('randomLawOutput');
            const titleEl = document.getElementById('randomLawTitle');
            const readBtn = document.getElementById('randomLawReadBtn');
            if (outputEl && titleEl && readBtn) {
                outputEl.style.display = 'block';
                titleEl.textContent = '';
                readBtn.href = lawPageUrl(randomLaw.id);
                readBtn.style.opacity = '0';
                readBtn.onclick = function(e) {
                    e.preventDefault();
                    window.location.href = lawPageUrl(randomLaw.id);
                };
                const displayText = `Law ${randomLaw.id}: ${randomLaw.actionTitle}`;
                if (typeof window.LawsAnimations !== 'undefined' && window.LawsAnimations.animateDecrypted) {
                    window.LawsAnimations.animateDecrypted(titleEl, displayText, function() {
                        readBtn.style.transition = 'opacity 0.4s ease';
                        readBtn.style.opacity = '1';
                    });
                } else {
                    titleEl.textContent = displayText;
                    readBtn.style.opacity = '1';
                }
                outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                goToLawPage(randomLaw.id);
            }
        });
    }

    window.toggleLawFavorite = function(id, btn) {
        const isNow = toggleFavorite(id);
        const card = document.querySelector('.law-card[data-law-id="' + id + '"]');
        if (card) card.classList.toggle('favorite', isNow);
        if (btn) btn.classList.toggle('active', isNow);
    };
}

// ========== LAW DETAIL PAGE (laws.html?id=X) ==========
function showLawDetailPage(lawId) {
    const law = typeof LAWS_DATA !== 'undefined' ? LAWS_DATA.find(l => l.id === lawId) : null;
    if (!law) {
        window.location.href = 'laws.html';
        return;
    }

    addExploredLaw(lawId);
    addLastOpened(lawId);
    updateReadingStreak();

    const detailMain = document.getElementById('lawDetailMain');
    const lawsMain = document.getElementById('lawsMain');
    const pageHeader = document.querySelector('.page-header');
    const favoritesSection = document.getElementById('favoritesSection');
    const continueSection = document.getElementById('continueSection');

    if (detailMain) detailMain.style.display = 'block';
    if (lawsMain) lawsMain.style.display = 'none';
    if (pageHeader) pageHeader.style.display = 'none';
    if (favoritesSection) favoritesSection.style.display = 'none';
    if (continueSection) continueSection.style.display = 'none';

    const content = document.getElementById('lawDetailContent');
    const actionsEl = document.getElementById('lawDetailActions');
    const suggestedEl = document.getElementById('lawDetailSuggested');
    const navEl = document.getElementById('lawDetailNav');

    // Prev/next laws
    const prevLaw = LAWS_DATA.find(l => l.id === law.id - 1);
    const nextLaw = LAWS_DATA.find(l => l.id === law.id + 1);

    const commonSignsHtml = Array.isArray(law.commonSigns) && law.commonSigns.length
        ? `<ul class="law-detail-list">${law.commonSigns.map(s => `<li>${s}</li>`).join('')}</ul>`
        : '';
    const examplesHtml = Array.isArray(law.examples) && law.examples.length
        ? law.examples.map(ex => `<li>${ex}</li>`).join('')
        : '';

    if (content) {
        content.innerHTML = `
            ${law.image && law.image.url ? `<div class="law-detail-image-wrap">${lawImageHtml(law, 'modal')}<p class="law-detail-image-credit">${law.image.title || ''} — ${law.image.artist || ''}</p></div>` : ''}
            <span class="law-detail-number">Law ${law.id} of 18</span>
            <h1 class="law-detail-action-title">${law.actionTitle}</h1>
            <p class="law-detail-title">${law.title}</p>
            <p class="law-detail-overview">${law.overview || ''}</p>
            <div class="law-detail-block">
                <h3>Deeper Explanation</h3>
                <p>${law.explanation || ''}</p>
            </div>
            <div class="law-detail-block">
                <h3>Why This Law Matters</h3>
                <p>${law.whyItMatters || ''}</p>
            </div>
            ${commonSignsHtml ? `<div class="law-detail-block"><h3>Common Signs & Patterns</h3>${commonSignsHtml}</div>` : ''}
            ${examplesHtml ? `<div class="law-detail-block"><h3>Examples</h3><ul class="law-detail-list">${examplesHtml}</ul></div>` : ''}
            <div class="law-detail-block law-detail-takeaway">
                <h3>Practical Takeaway</h3>
                <p>${law.takeaway || ''}</p>
            </div>
            <div class="law-detail-block law-detail-reflection">
                <h3>Reflection Prompt</h3>
                <p><em>${law.reflectionPrompt || '—'}</em></p>
            </div>
        `;
    }

    if (navEl) {
        navEl.innerHTML = `
            <div class="law-detail-nav-inner">
                ${prevLaw ? `<a href="${lawPageUrl(prevLaw.id)}" class="law-detail-nav-prev">← Law ${prevLaw.id}: ${prevLaw.actionTitle}</a>` : '<span class="law-detail-nav-prev law-detail-nav-disabled"></span>'}
                <a href="laws.html" class="law-detail-nav-all">All Laws</a>
                ${nextLaw ? `<a href="${lawPageUrl(nextLaw.id)}" class="law-detail-nav-next">Law ${nextLaw.id}: ${nextLaw.actionTitle} →</a>` : '<span class="law-detail-nav-next law-detail-nav-disabled"></span>'}
            </div>
        `;
    }

    if (actionsEl) {
        actionsEl.innerHTML = `
            <button class="modal-action-btn ${isFavorite(law.id) ? 'active' : ''}" data-action="favorite" aria-label="Favorite">★ Favorite</button>
            <button class="modal-action-btn ${isStudied(law.id) ? 'active' : ''}" data-action="studied" aria-label="Studied">✓ Studied</button>
            <button class="modal-action-btn ${isSaveForLater(law.id) ? 'active' : ''}" data-action="saved" aria-label="Save for later">⊞ Save for Later</button>
        `;
        actionsEl.querySelectorAll('.modal-action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const action = this.dataset.action;
                if (action === 'favorite') {
                    const isNow = toggleFavorite(law.id);
                    this.classList.toggle('active', isNow);
                } else if (action === 'studied') {
                    const isNow = toggleStudied(law.id);
                    this.classList.toggle('active', isNow);
                } else if (action === 'saved') {
                    const isNow = toggleSaveForLater(law.id);
                    this.classList.toggle('active', isNow);
                }
            });
        });
    }

    if (suggestedEl && typeof LAWS_DATA !== 'undefined') {
        const others = LAWS_DATA.filter(l => l.id !== law.id);
        const suggested = others.slice(0, 3);
        suggestedEl.innerHTML = `
            <h3>If you liked this, read next…</h3>
            <ul class="law-detail-suggested-list">
                ${suggested.map(l => `<li><a href="${lawPageUrl(l.id)}">Law ${l.id}: ${l.actionTitle} — ${l.title}</a></li>`).join('')}
            </ul>
        `;
    }

    document.title = law.actionTitle + ' | The Laws of Human Nature';
}

// Navigate to law page (used instead of modal)
function goToLawPage(lawId) {
    window.location.href = lawPageUrl(lawId);
}

// openLawModal now navigates to law page (for backwards compatibility)
window.openLawModal = function openLawModal(lawId) {
    goToLawPage(lawId);
};

// ========== LEARNINGS PAGE ==========
const LEARNING_FIELDS = [
    { key: 'learned', label: 'What did I learn?' },
    { key: 'inOthers', label: 'Where do I see this in others?' },
    { key: 'inMyself', label: 'Where do I see this in myself?' },
    { key: 'apply', label: 'How can I apply this wisely?' },
    { key: 'watch', label: 'What should I watch out for?' }
];

function renderLearningsPage() {
    if (typeof LAWS_DATA === 'undefined') return;

    const container = document.getElementById('learningsList');
    const resetBtn = document.getElementById('resetNotes');
    const exportBtn = document.getElementById('exportNotes');
    const progressSummary = document.getElementById('learningsProgressSummary');
    const continueSection = document.getElementById('continueReflectionSection');
    const continueCards = document.getElementById('continueReflectionCards');
    const learnings = getLearnings();

    // Progress summary
    let completed = 0;
    let unfinished = [];
    LAWS_DATA.forEach(law => {
        const l = learnings[law.id];
        if (l && l.completed) completed++;
        else if (l && (l.learned || l.inOthers || l.inMyself || l.apply || l.watch)) unfinished.push(law);
    });
    if (progressSummary) {
        progressSummary.innerHTML = `${completed} of 18 reflections completed. ${unfinished.length} in progress.`;
    }

    // Continue reflection
    if (continueSection && continueCards && unfinished.length > 0) {
        continueSection.style.display = 'block';
        continueCards.innerHTML = unfinished.slice(0, 5).map(law => `
            <div class="continue-reflection-card">
                <a href="#law-${law.id}">Law ${law.id}: ${law.actionTitle}</a>
            </div>
        `).join('');
    }

    container.innerHTML = LAWS_DATA.map(law => {
        const l = learnings[law.id] || {};
        const hasContent = LEARNING_FIELDS.some(f => (l[f.key] || '').trim());
        const isCompleted = l.completed;
        return `
            <div class="learning-item ${isCompleted ? 'learning-item-completed' : ''}" data-law-id="${law.id}" id="law-${law.id}">
                <div class="learning-item-header">
                    <h3 class="learning-item-title">Law ${law.id}: ${law.actionTitle}</h3>
                    <p class="learning-item-summary">${law.title} — ${law.overview || ''}</p>
                </div>
                <div class="learning-reflection-fields">
                    ${LEARNING_FIELDS.map(f => `
                        <div class="learning-field">
                            <label>${f.label}</label>
                            <textarea data-law-id="${law.id}" data-field="${f.key}" placeholder="Your thoughts...">${l[f.key] || ''}</textarea>
                        </div>
                    `).join('')}
                </div>
                <div class="learning-item-actions">
                    <span class="learning-updated">${l.updated ? 'Updated: ' + new Date(l.updated).toLocaleDateString() : ''}</span>
                    <label><input type="checkbox" data-law-id="${law.id}" ${l.completed ? 'checked' : ''}> Mark completed</label>
                </div>
            </div>
        `;
    }).join('');

    let saveTimeout;
    container.querySelectorAll('textarea').forEach(ta => {
        ta.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            const lawId = this.dataset.lawId;
            const field = this.dataset.field;
            saveTimeout = setTimeout(() => {
                saveLearning(lawId, field, this.value);
            }, 500);
        });
    });

    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', function() {
            setLearningCompleted(this.dataset.lawId, this.checked);
            if (typeof renderLearningsPage === 'function') renderLearningsPage();
        });
    });

    if (resetBtn) resetBtn.addEventListener('click', resetAllLearnings);

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            let text = 'THE LAWS OF HUMAN NATURE - My Learnings\n';
            text += 'Exported: ' + new Date().toLocaleString() + '\n\n';
            LAWS_DATA.forEach(law => {
                const l = learnings[law.id];
                if (!l || !LEARNING_FIELDS.some(f => (l[f.key] || '').trim())) return;
                text += '--- Law ' + law.id + ': ' + law.actionTitle + ' — ' + law.title + ' ---\n';
                LEARNING_FIELDS.forEach(f => {
                    if (l[f.key]) text += f.label + '\n' + l[f.key] + '\n\n';
                });
                text += '\n';
            });
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'laws-of-human-nature-notes.txt';
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }
}
