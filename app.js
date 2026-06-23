async function loadGames() {
    try {
        //get the json file of free games
        const response = await fetch('games.json');
        const games = await response.json();
        
        const container = document.getElementById('games-container');
        container.innerHTML = ''; // Clear loading text

        if (games.length === 0) {
            container.innerHTML = '<p>No free games found right now.</p>';
            return;
        }

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.title}" style="width:100%; max-width:300px;">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <small>Free until: ${new Date(game.expiryDate).toLocaleDateString()}</small>
            `;
            container.appendChild(gameCard);
        });
    } catch (error) {
        console.error("Error loading games:", error);
        document.getElementById('games-container').innerText = "Failed to load games.";
    }
}

loadGames();