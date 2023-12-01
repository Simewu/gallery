let siteData = {};

// Fetch visitor count from server and update counter
async function fetchAndUpdateCounter(pageName) {
    try {
        const urlPart1 = 'http://simewu-simple-';
        const urlPart2 = 'count.simewu.repl.co/';
        const response = await fetch(`${urlPart1}${urlPart2}${pageName}.json`);
        siteData = await response.json();
        document.getElementById('counter').textContent = siteData.total;
        document.getElementById('modalPageName').textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        setupModalListener();
    } catch (error) {
        console.error('Error fetching counter:', error);
        document.getElementById('counter').style.display = 'none';
    }
}

// Setup listener for modal
function setupModalListener() {
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
    let monthData = new Array(12).fill(0).map(() => []);
    let currentMonthIncluded = false;

    dailyData.forEach((count, index) => {
        let date = new Date();
        date.setDate(date.getDate() - (dailyData.length - 1 - index));
        let monthIndex = date.getMonth();
        monthData[monthIndex].push({ date, count });

        if (monthIndex === new Date().getMonth() && count > 0) {
            currentMonthIncluded = true;
        }
    });

    let sortedData = [];
    monthData.forEach((month, index) => {
        if (month.some(day => day.count > 0) || (!currentMonthIncluded && index === new Date().getMonth())) {
            month.forEach(day => {
                let dateString = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                sortedData.push([dateString, day.count]);
            });
            currentMonthIncluded = true; // Mark current month as included
        }
    });

    data.addRows(sortedData);

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

setTimeout(counter_init, 10);

// Initialize the counter
function counter_init() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-LGHB6S47PK');

    var footer = document.querySelector('footer');
    if (footer === null) {
        return;
    }

    var counterDiv = document.createElement('div');
    counterDiv.className = 'col-auto';
    var counterSpan = document.createElement('span');
    counterSpan.id = 'counter';
    counterSpan.className = 'badge badge-pill float-right text-color-dim';
    counterSpan.setAttribute('data-bs-toggle', 'modal');
    counterSpan.setAttribute('data-bs-target', '#visitorModal');
    counterDiv.appendChild(counterSpan);
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

    // Run the function to update the visitor count
    let page = location.href.split('/')[location.href.split('/').length - 1].toLowerCase();
    // Don't log when pages end in .html
    // // if (page.endsWith('.html')) {
    // //     page = page.substring(0, page.length - 5);
    // // }
    if (page === '') {
        page = 'index';
    }

    let supportedPages = ['index', 'projects', 'publications', 'gallery', 'resume', 'contact', 'submitted'];
    if (supportedPages.includes(page)) {
        fetchAndUpdateCounter(page);
    } else {
        document.getElementById('counter').display = 'none';
    }
}