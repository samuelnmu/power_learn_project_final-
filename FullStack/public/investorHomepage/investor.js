// Function to toggle the theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');
    document.querySelector('.main-content').classList.toggle('dark-mode');
    document.querySelectorAll('.chart').forEach(chart => {
        chart.classList.toggle('dark-mode');
    });
}

// Function to change the profile picture 
document.getElementById('change-profile-pic').addEventListener('click', () => {
    alert('Change Profile Picture (This would open gallery or file picker)');
});

// Function to load resources based on selected category
function loadResources(category) {
    // Change active link style
    document.querySelectorAll('.nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav ul li a[onclick="loadResources('${category}')"]`).classList.add('active');

    // Update chart content (for demo purposes)
    document.getElementById('asset-chart').innerText = category === 'assets' ? 'Assets Chart' : '';
    document.getElementById('stock-chart').innerText = category === 'stocks' ? 'Stock Chart' : '';
    document.getElementById('crypto-chart').innerText = category === 'crypto' ? 'Crypto Chart' : '';
}

// Function to open Wikipedia resource
function openWikipedia() {
    const resource = document.getElementById('wiki-dropdown').value;
    if (resource) {
        window.open(`https://en.wikipedia.org/wiki/${resource}`, '_blank');
    }
}
