/**
 * MASTERY - Main JavaScript
 *
 * localStorage keys:
 * - masteryLearnings: object { partId: { reflection1, reflection2, ..., completed, updated } }
 */

// ========== LOCAL STORAGE HELPERS ==========
function getMasteryLearnings() {
    try {
        const data = localStorage.getItem('masteryLearnings');
        return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
}

function saveMasteryLearning(partId, field, value) {
    const learnings = getMasteryLearnings();
    if (!learnings[partId]) learnings[partId] = {};
    learnings[partId][field] = value;
    learnings[partId].updated = new Date().toISOString();
    localStorage.setItem('masteryLearnings', JSON.stringify(learnings));
}

function setMasteryLearningCompleted(partId, completed) {
    const learnings = getMasteryLearnings();
    if (!learnings[partId]) learnings[partId] = {};
    learnings[partId].completed = completed;
    learnings[partId].updated = new Date().toISOString();
    localStorage.setItem('masteryLearnings', JSON.stringify(learnings));
}

function resetAllMasteryLearnings() {
    if (confirm('Are you sure you want to delete all your notes? This cannot be undone.')) {
        localStorage.removeItem('masteryLearnings');
        if (typeof renderMasteryLearningsPage === 'function') renderMasteryLearningsPage();
        alert('All notes have been reset.');
    }
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
});

// ========== LEARNINGS PAGE ==========
function renderMasteryLearningsPage() {
    if (typeof PARTS_DATA === 'undefined') return;

    const container = document.getElementById('learningsList');
    const resetBtn = document.getElementById('resetNotes');
    const exportBtn = document.getElementById('exportNotes');
    const progressSummary = document.getElementById('learningsProgressSummary');
    const learnings = getMasteryLearnings();

    // Progress summary
    let completed = 0;
    PARTS_DATA.forEach(part => {
        const l = learnings[part.id];
        if (l && l.completed) completed++;
    });
    if (progressSummary) {
        progressSummary.innerHTML = `${completed} of 6 reflections completed.`;
    }

    container.innerHTML = PARTS_DATA.map(part => {
        const l = learnings[part.id] || {};
        const isCompleted = l.completed;
        const fields = part.reflectionFields || [part.reflectionPrompt];
        return `
            <div class="learning-item ${isCompleted ? 'learning-item-completed' : ''}" data-part-id="${part.id}" id="part-${part.id}">
                <div class="learning-item-header">
                    <h3 class="learning-item-title">Part ${part.id}: ${part.title}</h3>
                    <p class="learning-item-summary">${part.subtitle} — ${part.overview}</p>
                </div>
                <div class="learning-reflection-fields">
                    ${fields.map((label, i) => {
                        const key = 'reflection' + (i + 1);
                        return `
                            <div class="learning-field">
                                <label>${label}</label>
                                <textarea data-part-id="${part.id}" data-field="${key}" placeholder="Your thoughts...">${l[key] || ''}</textarea>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="learning-item-actions">
                    <span class="learning-updated">${l.updated ? 'Updated: ' + new Date(l.updated).toLocaleDateString() : ''}</span>
                    <label><input type="checkbox" data-part-id="${part.id}" ${l.completed ? 'checked' : ''}> Mark completed</label>
                </div>
            </div>
        `;
    }).join('');

    let saveTimeout;
    container.querySelectorAll('textarea').forEach(ta => {
        ta.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            const partId = this.dataset.partId;
            const field = this.dataset.field;
            saveTimeout = setTimeout(() => {
                saveMasteryLearning(partId, field, this.value);
            }, 500);
        });
    });

    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', function() {
            setMasteryLearningCompleted(this.dataset.partId, this.checked);
            if (typeof renderMasteryLearningsPage === 'function') renderMasteryLearningsPage();
        });
    });

    if (resetBtn) resetBtn.addEventListener('click', resetAllMasteryLearnings);

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            let text = 'MASTERY - My Reflections\n';
            text += 'Exported: ' + new Date().toLocaleString() + '\n\n';
            PARTS_DATA.forEach(part => {
                const l = learnings[part.id];
                const fields = part.reflectionFields || [part.reflectionPrompt];
                let hasContent = false;
                fields.forEach((_, i) => {
                    if (l && l['reflection' + (i + 1)]) hasContent = true;
                });
                if (!hasContent) return;
                text += '--- Part ' + part.id + ': ' + part.title + ' — ' + part.subtitle + ' ---\n';
                fields.forEach((label, i) => {
                    const key = 'reflection' + (i + 1);
                    if (l && l[key]) text += label + '\n' + l[key] + '\n\n';
                });
                text += '\n';
            });
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'mastery-notes.txt';
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }
}
