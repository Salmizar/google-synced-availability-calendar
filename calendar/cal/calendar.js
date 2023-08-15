var calendarId = 'calendar';
var calElement;
const daysOfWeek = ['S','M','T','W','T','F','S'];
var calDate = new Date();
function setupCalendar(config) {
    if (config.id) {
        calendarId = config.id;
    }
    //Load CSS
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './cal/calendar.css';
    // Append link element to HTML head
    document.head.appendChild(link);
    //Load config file
    var script = document.createElement('script');
    script.onload = function () {
        renderCalendar();
    };
    script.src = config.file;
    document.head.appendChild(script);
}
function renderCalendar() {
    let startOfMonth = new Date(calDate.getFullYear(), calDate.getMonth(),1);
    startOfMonth = new Date(calDate.getFullYear(), calDate.getMonth(),1-startOfMonth.getDay());
    calElement = document.getElementById(calendarId);
    calElement.className = 'calendar';
    console.log(data);
    let tbl = document.createElement('table');
    let row = tbl.insertRow(0);
    row.className = 'header';
    daysOfWeek.map((day, i) => {
        let col = row.insertCell(i);
        col.innerHTML = day;
    });
    for (let week=1;week<=5;week++) {
        let row = tbl.insertRow(week);
        row.className = 'week';
        for (let day=1;day<=7;day++) {
            let col = row.insertCell(day - 1);
            col.className = 'day';
            col.innerHTML = startOfMonth.getDate();
            startOfMonth.setDate(startOfMonth.getDate()+1);
        }   
    }
    calElement.appendChild(tbl);
}

export { setupCalendar }