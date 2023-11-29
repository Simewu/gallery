async function fetchAndUpdateCounter(pageName) {
    try {
        const response = await fetch(`https://simewustats.simewu.repl.co/${pageName}.json`);
        let siteData = await response.json();
        document.getElementById('counter').textContent = siteData.total;

        // Set page name in modal and prepare to draw chart
        document.getElementById('modalPageName').textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawChart(siteData.total, siteData.daily, pageName));
    } catch (error) {
        console.error('Error fetching counter:', error);
        document.getElementById('counter').style.display = 'none';
    }
}


function drawChart(totalData, dailyData, pageName) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Visitors');

    // Format dates
    let sortedData = [];
    for (let i = 0; i < dailyData.length; i++) {
        let date = new Date();
        date.setDate(date.getDate() - (dailyData.length - 1 - i));
        let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        sortedData.push([dateString, dailyData[i]]);
    }

    data.addRows(sortedData);

    var options = {
        width: 800,
        height: 400,
        lineWidth: 5,
        colors: [textColorDim],
        hAxis: {
            titleTextStyle: { color: textColor },
            textStyle: { color: textColorDim },
        },
        vAxis: {
            title: 'Number of Visitors',
            titleTextStyle: { color: textColor },
            textStyle: { color: textColorDim },
        },
        backgroundColor: bgColorDimmer,
        legend: 'none'
      };

    var chart = new google.visualization.LineChart(document.getElementById('visitorGraphModal'));
    chart.draw(data, options);

    document.getElementById('totalVisitors').innerHTML = `Total number of visitors for ${pageName}: <span class='text-color'>${totalData}</span>`;
    document.getElementById('yearlyVisitors').innerHTML = `Number of visitors in the past 365 Days: <span class='text-color'>${dailyData.reduce((a, b) => a + b, 0)}</span>`;
}

// Run the function to update the visitor count
let page = location.href.split('/')[location.href.split('/').length - 1].toLowerCase();
if (page === '') {
    page = 'index';
}
// Don't log when pages end in .html
let supportedPages = ['index', 'projects', 'publications', 'gallery', 'resume', 'contact', 'submitted'];
if (supportedPages.includes(page)) {
    fetchAndUpdateCounter(page);
} else {
    document.getElementById('counter').display = 'none';
}

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-LGHB6S47PK');