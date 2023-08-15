# Availability-calendar

Some friends run a guiding business and are looking for a simple availability calendar, so I decided to make one for them.

## Screenshot

![alt text](https://raw.githubusercontent.com/Salmizar/availability-calendar/main/UI-datastuctures-requirements/Availability%20Calendar.png)

### Deploy to AWS
```
aws s3 sync ./dist s3://availability-calendar
```

## Demo

http://availability-calendar.s3-website.us-east-2.amazonaws.com

## Built with Vanilla JS,CSS,HTML

```bash
npm start
```

## Usage Instructions

    <html>
    <head>
        <script type="module">
            import { setupCalendar, setupLegend, renderThemeEvents } from './cal/calendar.js';
            setupCalendar({ theme: 1, file: 'data.js', id: 'calendar', themeId: 'themes' });
            setupLegend({ id: 'legend' });
        </script>
    </head>
    <body>
        <div id="calendar" style="width: 330px; height: 370px;"></div>
        <div id="legend"></div>
        <div id="themes"></div>
    </body>
    </html>
