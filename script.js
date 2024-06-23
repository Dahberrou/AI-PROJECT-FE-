document.getElementById('search-button').addEventListener('click', function() {
    const keyword = document.getElementById('search-input').value;
    if (keyword) {
        fetchSearchResults(keyword);
    } else {
        alert('Please enter a keyword');
    }
});

async function fetchSearchResults(keyword) {
    const apiKey = 'AIzaSyCPA6-ZZ8EYaSgrAI45wt3VRhphdwCh7ss';  // Your actual API key
    const searchEngineId = 'c744e246410264ca4';  // Your actual search engine ID

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${keyword}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    if (results && results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3><a href="${result.link}" target="_blank">${result.title}</a></h3>
                <p>${result.snippet}</p>
            `;
            resultsList.appendChild(listItem);
        });
    } else {
        resultsList.innerHTML = '<li>No results found</li>';
    }
}
