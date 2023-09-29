# Availability-calendar

Some friends run a guiding business and are looking for a simple availability calendar, so I decided to make one for them.

Themes are custom events ocurring during a given period of time. Opening Weekend, for example.

## Screenshot

![UI/UX Design](https://raw.githubusercontent.com/Salmizar/availability-calendar/main/UI-datastuctures-requirements/Availability%20Calendar.png)

## Demo

http://availability-calendar.s3-website.us-east-2.amazonaws.com

### Deploy to AWS
```
aws s3 sync ./dist s3://availability-calendar
```

## Built with:

Vanilla JS,CSS,HTML

## WebPack build and minify

```bash
npx webpack
```

## Run Locally

```bash

npm run build
npm start
```

## Usage Instructions

#### Implementation example

[index.html](https://github.com/Salmizar/availability-calendar/blob/main/calendar/public/index.html)

Parameters:

    id: 'id of the container, calendar will be rendered within' (required)
    file: 'data.js' (required, format below)
    theme: 1 or 2 (optional)
    themeId: 'id of the container, theme events will be rendered within' (optional)
 
#### Event data format

[data.js](https://github.com/Salmizar/availability-calendar/blob/main/calendar/src/data.js)
