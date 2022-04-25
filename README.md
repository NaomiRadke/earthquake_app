# earthquake app
The earthquake app is a map-based web-app.

It sources world-wide earthquake data from the past day through the USGS's [earthquake feed API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) which provides the data in geojson format. The API is updated every minute.

It visualizes the fetched data on a [Leaflet](https://leafletjs.com/) map and displays earthquake event data on click.

Technologies used: [Vue 3](https://vuejs.org/)(JavaScript-based framework) and [Leaflet](https://leafletjs.com/) for geodata processing and visualization.

You can view the running app here: 


## Optional: Run locally
If you would like to run the app locally, follow these steps:

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
