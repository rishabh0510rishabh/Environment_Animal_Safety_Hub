
import { UserProgress } from './utils/user-progress.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    const displayState = UserProgress.state;
    renderDashboard(displayState);

    // Subscribe to updates real-time
    UserProgress.subscribe((newState) => {
        renderDashboard(newState);
    });
});

function renderDashboard(state) {
    if (!state) return;

    // 1. Update Profile Header
    const userLevelEl = document.getElementById('userLevel');
    if (userLevelEl) userLevelEl.textContent = `Level ${state.level || 1}`;

    const xpTextEl = document.getElementById('xpText');
    if (xpTextEl) xpTextEl.textContent = `${state.xp || 0} / ${state.nextLevelXp || 500} XP`;

    const xpBar = document.getElementById('xpBar');
    if (xpBar) {
        xpBar.value = state.xp || 0;
        xpBar.max = state.nextLevelXp || 500;
    }

    // 2. Update Stats
    const totalXPEl = document.getElementById('totalXP');
    if (totalXPEl) totalXPEl.textContent = state.xp || 0;

    const badgesCountEl = document.getElementById('badgesCount');
    if (badgesCountEl) badgesCountEl.textContent = state.badges ? state.badges.length : 0;

    const quizzesCompletedEl = document.getElementById('quizzesCompleted');
    if (quizzesCompletedEl) quizzesCompletedEl.textContent = state.quizzes ? Object.keys(state.quizzes).length : 0;

    // Calculate total games played
    const games = state.games || {};
    const totalGames = Object.values(games).reduce((sum, game) => sum + (game.plays || 0), 0);
    const gamesPlayedEl = document.getElementById('gamesPlayed');
    if (gamesPlayedEl) gamesPlayedEl.textContent = totalGames;

    // 3. Render Badges
    const badgesGrid = document.getElementById('badgesGrid');
    if (badgesGrid) {
        if (state.badges && state.badges.length > 0) {
            badgesGrid.innerHTML = state.badges.map(badge => `
                <div class="badge-card">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-desc">${badge.description}</div>
                </div>
            `).join('');
        } else {
            badgesGrid.innerHTML = '<div class="empty-state">No badges earned yet. Complete quizzes and games to earn them!</div>';
        }
    }

    // 4. Render Module Progress
    const progressList = document.getElementById('moduleProgressList');
    if (progressList) {
        let progressHTML = '';

        // Quizzes
        const quizzes = state.quizzes || {};
        for (const [id, data] of Object.entries(quizzes)) {
            progressHTML += `
                <div class="progress-item">
                    <div class="progress-info">
                        <h3>Quiz: ${formatId(id)}</h3>
                        <div class="progress-meta">Completed: ${data.lastTaken ? new Date(data.lastTaken).toLocaleDateString() : 'Unknown'}</div>
                    </div>
                    <div class="progress-score">
                        ${data.maxScore} Score
                    </div>
                </div>
            `;
        }

        // Games
        for (const [id, data] of Object.entries(games)) {
            progressHTML += `
                <div class="progress-item">
                    <div class="progress-info">
                        <h3>Game: ${formatId(id)}</h3>
                        <div class="progress-meta">Played ${data.plays} times • Last: ${data.lastPlayed ? new Date(data.lastPlayed).toLocaleDateString() : 'Unknown'}</div>
                    </div>
                    <div class="progress-score">
                        ${data.highScore} High Score
                    </div>
                </div>
            `;
        }

        if (progressHTML === '') {
            progressHTML = '<div class="empty-state">No activity recorded yet. Go explore!</div>';
        }

        progressList.innerHTML = progressHTML;
    }
}

function formatId(id) {
    if (!id) return '';
    return id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
