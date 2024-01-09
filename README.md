# Availability-calendar

I created this project to support processing of remote iCal data and formatting it for another project that will display the data:

https://github.com/Salmizar/availability-calendar

Themes are custom events ocurring during a given period of time. Opening Weekend, for example.

### Deploy to AWS
```
aws s3 sync ./dist s3://availability-calendar
```
## Built with:

Node, Express, iCal

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

# Environment variables
```
PORT=3000
ICAL_URL='https://icaladdress'
```
