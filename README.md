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

totalslots: Required. How many available slots are to be subtraced from.
days: Required. How many days to generate the data for.
categories: Required. The categories to filter offerings with.

```
Examples:
http://apiAddress/?totalslots=1&days=183&catgeories=Guest%20House

http://apiAddress/?totalslots=16&days=183&catgeories=Lodge%20Room
```

# Environment variables
```
PORT=3000
ICAL_URL='https://icaladdress'
```
