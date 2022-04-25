# earthquake app
The earthquake app is a map-based web-app.

It sources world-wide earthquake data from the past day through the USGS's [earthquake feed API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) which provides the data in geojson format. The API is updated every minute.

It visualizes the fetched data on a [Leaflet](https://leafletjs.com/) map and displays earthquake event data on click.

Technologies used: [Vue 3](https://vuejs.org/)(JavaScript-based framework) and [Leaflet](https://leafletjs.com/) for geodata processing and visualization.

You can view the running app here: [https://naomiradke.github.io/earthquake_app/](https://naomiradke.github.io/earthquake_app/)


### Optional: Run locally
If you would like to run the app locally, follow these steps:

#### 1 - Clone this repository to your local machine
In your terminal move into your desired target directory and run:
```
git clone https://github.com/NaomiRadke/earthquake_app
```
#### 2 - Install dependencies
`cd` into the local app directory and run
```
cd earthquake_app
yarn install
```

#### 3 - Run the app on the development server
```
yarn serve
```

Questions? Feel free to contact me via naomiradke@hotmail.com.
