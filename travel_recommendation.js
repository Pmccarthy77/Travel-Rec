function search() {
    var userInput = document.getElementById('searchInput').value.toLowerCase();

    // Fetch data from JSON file
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var recommendations = [];

            // Check user input against keywords in JSON data
            if (userInput === 'country' || userInput === 'countries') {
                recommendations = data.countries.reduce((acc, country) => acc.concat(country.cities), []);
            } else if (userInput === 'temple' || userInput === 'temples') {
                recommendations = data.temples;
            } else if (userInput === 'beach' || userInput === 'beaches') {
                recommendations = data.beaches;
            }

            displayResults(recommendations);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function displayResults(recommendations) {
    var output = '';
    recommendations.forEach(item => {
        output += '<div class="result">';
        output += '<h3>' + item.name + '</h3>';
        output += '<img class="result-image" src="' + item.imageUrl + '" alt="' + item.name + '">';
        output += '<p>' + item.description + '</p>';
        output += '</div>';
    });
    document.getElementById('results').innerHTML = output;
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}