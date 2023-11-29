async function fetchAndUpdateCounter(pageName) {
    try {
        const response = await fetch(`https://simewustats.simewu.repl.co/${pageName}.json`);
        const data = await response.json();
        document.getElementById('counter').textContent = data.total;
    } catch (error) {
        console.error('Error fetching counter:', error);
        document.getElementById('counter').display = 'none';
    }
}

// Run the function to update the visitor count
let page = location.href.split('/')[location.href.split('/').length - 1].toLowerCase();
if (page.endsWith('.html')) {
    page = page.split('.')[0];
}
let supportedPages = ['index', 'projects', 'publications', 'gallery', 'resume', 'contact'];
if (supportedPages.includes(page)) {
    fetchAndUpdateCounter(page);
}

function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LGHB6S47PK');
let containerElement = document.querySelector('.fade');