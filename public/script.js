document.addEventListener('DOMContentLoaded', () => {
    let allTalks = [];
    let activeFilter = 'All';
    let searchQuery = '';

    const scheduleContainer = document.getElementById('schedule');
    const tagsContainer = document.getElementById('category-tags');
    const searchInput = document.getElementById('speaker-search');
    const clearBtn = document.getElementById('clear-filters');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Fetch talks from the API
    async function fetchTalks() {
        loadingOverlay.style.display = 'flex';
        try {
            const response = await fetch('/api/talks');
            allTalks = await response.json();
            renderFilters();
            renderSchedule();
        } catch (error) {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p style="color: red; padding: 40px; text-align: center;">CRITICAL ERROR: Failed to load event data.</p>';
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderSchedule();
    });

    // Handle clear filters
    clearBtn.addEventListener('click', () => {
        searchQuery = '';
        activeFilter = 'All';
        searchInput.value = '';
        renderFilters();
        renderSchedule();
    });
    function renderFilters() {
        const categories = new Set(['All']);
        allTalks.forEach(talk => {
            talk.categories.forEach(cat => categories.add(cat));
        });

        tagsContainer.innerHTML = '';
        categories.forEach(category => {
            const tagEl = document.createElement('button');
            tagEl.className = `tag ${activeFilter === category ? 'active' : ''}`;
            tagEl.textContent = category;
            tagEl.onclick = () => {
                activeFilter = category;
                renderFilters(); // Re-render tags to update active state
                renderSchedule();
            };
            tagsContainer.appendChild(tagEl);
        });
    }

    // Render the schedule based on active filter and search query
    function renderSchedule() {
        scheduleContainer.innerHTML = '';
        
        const filteredTalks = allTalks.filter(talk => {
            const matchesCategory = activeFilter === 'All' || talk.categories.includes(activeFilter) || talk.id === 'lunch';
            const matchesSpeaker = talk.speakers.some(s => s.toLowerCase().includes(searchQuery)) || talk.id === 'lunch';
            return matchesCategory && matchesSpeaker;
        });

        if (filteredTalks.length === 0) {
            scheduleContainer.innerHTML = '<p class="no-results">NO PROTOCOLS MATCH YOUR SEARCH CRITERIA.</p>';
            return;
        }

        filteredTalks.forEach(talk => {
            const isLunch = talk.id === 'lunch';
            const card = document.createElement('div');
            card.className = `talk-card ${isLunch ? 'lunch' : ''}`;
            
            const speakers = talk.speakers.length > 0 
                ? `<div class="talk-speakers">// SPEAKERS: ${talk.speakers.join(', ')}</div>`
                : '';

            const categories = talk.categories
                .map(cat => `<span class="mini-tag">#${cat.toUpperCase()}</span>`)
                .join(' ');

            card.innerHTML = `
                <span class="talk-time">${talk.startTime} - ${talk.endTime}</span>
                <h3 class="talk-title">${talk.title}</h3>
                ${speakers}
                <p class="talk-description">${talk.description}</p>
                <div class="talk-categories">${categories}</div>
            `;
            
            scheduleContainer.appendChild(card);
        });
    }

    fetchTalks();
});
