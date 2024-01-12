let pageName, siteData = {};

counterInit();

// Fetch visitor count from server
// async function fetchCounterStats(pageName) {
//     try {
//         const urlPart1 = 'https://simewu-simple-';
//         const urlPart2 = 'counter.simewu.repl.co/';
//         const response = await fetch(`${urlPart1}${urlPart2}${pageName}.json`);
//         siteData = await response.json();
//     } catch (error) {
//         let counter = document.getElementById('counter')
//         if (counter != null) counter.style.display = 'none';
//     }
// }

// Setup listener for modal
function setupModalListener(siteData) {
    var modal = document.getElementById('visitorModal');
    if (modal) {
        modal.addEventListener('show.bs.modal', function () {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(() => drawChart(siteData.total, siteData.daily, document.getElementById('modalPageName').textContent));
        });
    }
}

// Draw the chart and update the text
function drawChart(totalData, dailyData, pageName) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Visitors');

    let daysData = [];

    dailyData.forEach((count, index) => {
        let date = new Date();
        date.setDate(date.getDate() - (dailyData.length - 1 - index));
        daysData.push({ date, count });
    });

    // Sort by date
    daysData.sort((a, b) => a.date - b.date);

    // Filter out the days with all zero counts until the first non-zero count
    let startIndex = daysData.findIndex(day => day.count > 0);
    let relevantDaysData = daysData.slice(startIndex);

    // Prepare data for the chart
    let chartData = relevantDaysData.map(day => {
        let dateString = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return [dateString, day.count];
    });

    data.addRows(chartData);

    var options = {
        width: 800,
        height: 400,
        lineWidth: 5,
        colors: [textColorDim],
        hAxis: {
            titleTextStyle: { color: textColor },
            textStyle: { color: textColorDim },
            slantedText: true,
            slantedTextAngle: 45
        },
        vAxis: {
            title: 'Number of Visitors',
            titleTextStyle: { color: textColor },
            textStyle: { color: textColorDim },
        },
        backgroundColor: bgColor,
        legend: 'none'
    };

    var chart = new google.visualization.LineChart(document.getElementById('visitorGraphModal'));
    chart.draw(data, options);

    document.getElementById('totalCount').innerHTML = `Total number of visitors for ${pageName}: <span class='text-color'>${totalData}</span>`;

    let visitors365 = dailyData.reduce((a, b) => a + b, 0);
    if (visitors365 == totalData) {
        document.getElementById('yearlyCount').display = 'none';
    } else {
        document.getElementById('yearlyCount').innerHTML = `Number of visitors in the past 365 Days: <span class='text-color'>${visitors365}</span>`;
    }
}

function stats() {
    if (siteData.total === undefined) {
        return false;
    }
    makeScriptTag(scriptTag, (useFullURL ? 'https://simewu.github.io/' : '') + 'lib/js/gcharts.min.js', false);

    if (document.getElementById('counter') !== null) {
        document.getElementById('counter').textContent = siteData.total;
        document.getElementById('modalPageName').addEventListener('click', () => {
            window.location.replace(siteData.source);
        });
        return true;
    }

    var counterDiv = document.createElement('div');
    counterDiv.className = 'col-auto';
    var counterSpan = document.createElement('span');
    counterSpan.id = 'counter';
    counterSpan.className = 'badge badge-pill float-right text-color-dim';
    counterSpan.setAttribute('data-bs-toggle', 'modal');
    counterSpan.setAttribute('data-bs-target', '#visitorModal');
    counterDiv.appendChild(counterSpan);

    var footer = document.querySelector('footer');
    if (footer === null) {
        document.getElementById('counter').display = 'none';
        return false;
    }

    var rowDiv = footer.querySelector('.row');
    if (rowDiv) {
        rowDiv.appendChild(counterDiv);
    }

    var modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'visitorModal';
    modalDiv.setAttribute('aria-labelledby', 'visitorModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');

    var modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-lg';
    modalDiv.appendChild(modalDialog);

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content bg-color-dimmer modal-lg';
    modalDialog.appendChild(modalContent);

    var modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalContent.appendChild(modalHeader);

    var modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'visitorModalLabel';
    modalTitle.innerHTML = 'Counter for <b><span id="modalPageName" class="text-color"></span></b>';
    modalHeader.appendChild(modalTitle);

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close bg-color-inv';
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(closeButton);

    var modalBody = document.createElement('div');
    modalBody.className = 'modal-body p-2';
    modalContent.appendChild(modalBody);

    var totalCountDiv = document.createElement('div');
    totalCountDiv.id = 'totalCount';
    modalBody.appendChild(totalCountDiv);

    var visitorGraphModal = document.createElement('div');
    visitorGraphModal.id = 'visitorGraphModal';
    modalBody.appendChild(visitorGraphModal);

    var yearlyCountDiv = document.createElement('div');
    yearlyCountDiv.id = 'yearlyCount';
    modalBody.appendChild(yearlyCountDiv);

    footer.appendChild(modalDiv);

    document.getElementById('counter').textContent = siteData.total;
    document.getElementById('modalPageName').textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    setupModalListener(siteData);
    return true;
}

// Function to check if ad blockers are likely enabled
function isAdBlockerActive() {
    const adBlockerCheck = () => {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = '&nbsp;';
        testDiv.className = 'adsbox adsbygoogle ad ad-300x250 ad-banner ad-header ad-sidebar';
        testDiv.style.position = 'absolute';
        testDiv.style.top = '-100px';
        testDiv.style.left = '-100px';
        document.body.appendChild(testDiv);
        const isAdBlocked = testDiv.offsetHeight === 0 || testDiv.offsetWidth === 0;
        document.body.removeChild(testDiv);
        return isAdBlocked;
    };
    return adBlockerCheck();
}

// Initialize the counter
function counterInit() {
    // Run the function to update the visitor count
    pageName = location.href.split('/')[location.href.split('/').length - 1].toLowerCase();
    // Don't log when pages end in .html
    // // if (pageName.endsWith('.html')) {
    // //	 pageName = pageName.substring(0, pageName.length - 5);
    // // }
    if (pageName === '') {
        pageName = 'index';
    }
    let supportedPages = ['index', 'projects', 'publications', 'gallery', 'resume', 'contact', 'submitted', '404'];
    // if (supportedPages.includes(pageName)) {
    //     fetchCounterStats(pageName);
    // }
    if (!isAdBlockerActive() && typeof navigator.sendBeacon !== 'undefined') {
        let id = 'G-LGHB6S47PK'
        makeScriptTag(scriptTag, 'https://www.googletagmanager.com/gtag/js?id=' + id, true, (msg) => { });
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', id);
    }
}