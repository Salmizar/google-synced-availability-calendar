var calendarId = 'calendar';
var calElement;
var theme = 1;
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const legend = [
    { color: '#93c47dff', min: 10, max: 50, label: 'Available' },
    { color: '#c9cf72ff', min: 5, max: 9, label: '< 10 spots' },
    { color: '#ffd966ff', min: 3, max: 4, label: '< 5 spots' },
    { color: '#f6b26bff', min: 1, max: 2, label: '< 3 spots' },
    { color: '#e06666ff', min: 0, max: 0, label: 'Booked' },
    { color: '#d9d9d9ff', min: -1, max: -1, label: 'Unavailable' }
];
var calDate = new Date();
function setupLegend(config) {
    let container = document.getElementById(config.id);
    container.innerHTML = '';
    if (theme === 1) {
        let tbl = document.createElement('table');
        container.appendChild(tbl);
        legend.map((item, index) => {
            let row = tbl.insertRow(index);
            let col = row.insertCell(0);
            col.className = 'legend-cell';
            col.style = 'background-color: ' + item.color;

            col = row.insertCell(1);
            col.innerText = item.label;
        });
    }
}
function renderThemeEvents(config) {
    let container = document.getElementById(config.themeId);
    container.innerHTML = '';
    if (data) {
        let tbl = document.createElement('table');
        container.appendChild(tbl);
        data.themeDates.map((event, index) => {
            let row = tbl.insertRow(index);
            let col = row.insertCell(0);
            col.className = 'theme-cell';
            col.style = 'background-color: ' + event.color;
            col.innerText = event.name;
        });
    }
}
function setupCalendar(config) {
    if (config.id) {
        calendarId = config.id;
    }
    if (!isNaN(config.theme)) {
        theme = config.theme;
    }
    //Load CSS
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './cal/calendar.css';
    document.head.appendChild(link);
    if (typeof data === "undefined") {
        //Load config file
        var script = document.createElement('script');
        script.onload = function () {
            renderCalendar();
            if (config.themeId) {
                renderThemeEvents(config);
            }
        };
        script.src = config.file;
        document.head.appendChild(script);
    } else {
        renderCalendar();
        if (config.themeId) {
            renderThemeEvents(config);
        }
    }
}
function changeMonth(e) {
    calDate.setMonth(calDate.getMonth() + ((e.currentTarget.id === 'next') ? 1 : -1));
    renderCalendar();
}
function getDateTheme(date) {
    for (let event of data.themeDates) {
        let eStart = event.strt.split('-');
        eStart = new Date(eStart[2], Number(eStart[1]) - 1, eStart[0]);
        let eEnd = event.ed.split('-');
        eEnd = new Date(eEnd[2], Number(eEnd[1]) - 1, eEnd[0]);
        if (eStart <= date && eEnd >= date) {
            return event.color;
        }
    };
    return null;
}
function getSlots(date) {
    return data.slots[date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()];
}
function getSlotColor(slots) {
    for (let slot of legend) {
        if (slot.min <= slots && slot.max >= slots) {
            return slot.color;
        }
    }
}
function renderCalendar() {
    let startOfMonth = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    startOfMonth = new Date(calDate.getFullYear(), calDate.getMonth(), 1 - startOfMonth.getDay());
    calElement = document.getElementById(calendarId);
    calElement.innerHTML = '';
    calElement.className = 'calendar';
    let tbl = document.createElement('table');
    calElement.appendChild(tbl);
    let row = tbl.insertRow(0);
    row.className = 'calendar-nav';
    let col = row.insertCell(0);
    col.className = 'change-month';
    col.id = 'previous';
    col.onclick = changeMonth;
    col.innerHTML = "<span title='Previous Month'><</span>";
    col = row.insertCell(1);
    col.className = 'date-display';
    col.colSpan = 5;
    col.innerText = calDate.toLocaleDateString("en-us", { month: "long", year: "numeric" });
    col = row.insertCell(2);
    col.className = 'change-month';
    col.id = 'next';
    col.onclick = changeMonth;
    col.innerHTML = "<span title='Next Month'>></span>";
    row = tbl.insertRow(1);
    row.className = 'day-of-week-header';
    daysOfWeek.map((day, i) => {
        let col = row.insertCell(i);
        col.className = 'day-of-week';
        col.innerText = day;
    });
    for (let week = 1; week <= 6; week++) {
        let row = tbl.insertRow(week + 1);
        row.className = 'week';
        for (let day = 1; day <= 7; day++) {
            let col = row.insertCell(day - 1);
            col.classList.add('day');
            let slotsAvailable = getSlots(startOfMonth);
            let themeColor = getDateTheme(startOfMonth);
            if (themeColor) {
                if (theme === 1) {
                    let theme = document.createElement('div');
                    theme.className = 'theme1-theme-event';
                    theme.style = 'background-color: ' + themeColor;
                    col.appendChild(theme);
                } else {
                    col.style = 'background-color: ' + themeColor;
                }
            }
            if (week === 1) {
                col.classList.add('first-week');
            }
            let div = document.createElement('div');
            div.classList.add('day-cell-theme' + theme);
            if (startOfMonth.getMonth() === calDate.getMonth()) {
                div.classList.add('highlight');
                col.classList.add('thisMonth');
            }
            div.innerText = startOfMonth.getDate();
            col.appendChild(div);
            if (slotsAvailable != undefined) {
                if (theme === 1) {
                    col.style = 'background-color: ' + getSlotColor(slotsAvailable);
                    col.title = slotsAvailable+' spots available';
                } else {
                    div = document.createElement('div');
                    div.className = 'highlight';
                    div.title = slotsAvailable+' spots available';
                    div.innerText = slotsAvailable;
                    col.appendChild(div);
                }
            }
            startOfMonth.setDate(startOfMonth.getDate() + 1);
        }
    }
}

export { setupCalendar, setupLegend, renderThemeEvents }