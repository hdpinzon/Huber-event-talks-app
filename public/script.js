document.addEventListener('DOMContentLoaded', () => {
    let allTalks = [];
    let activeFilter = 'All';

    const scheduleContainer = document.getElementById('schedule');
    const tagsContainer = document.getElementById('category-tags');

    // Fetch talks from the API
    async function fetchTalks() {
        try {
            const response = await fetch('/api/talks');
            allTalks = await response.json();
            renderFilters();
            renderSchedule();
        } catch (error) {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p style="color: red;">CRITICAL ERROR: Failed to load event data.</p>';
        }
    }

    // Extract all unique categories and render filter tags
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

    // Render the schedule based on active filter
    function renderSchedule() {
        scheduleContainer.innerHTML = '';
        
        const filteredTalks = activeFilter === 'All' 
            ? allTalks 
            : allTalks.filter(talk => talk.categories.includes(activeFilter) || talk.id === 'lunch');

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
