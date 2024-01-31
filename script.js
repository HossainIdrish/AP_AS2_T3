require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {

      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
     var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');

     // Popup template for the CSV layer
    const template = {
        title: "Crime Incident",
        content: "Crime: {Crime}<br>District: {District}<br>Neighborhood: {Neighborhood}<br>Location: {ILEADSStreet}"
    };

    // CSV layer
    const csvLayer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Data",
        popupTemplate: template,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-marker", // Use simple-marker for 2D map
                color: "orange", // Symbol color
                size: "10px", // Symbol size
                outline: {  // autocasts as new SimpleLineSymbol()=
                  width: 1.5,
                  color: "black"
    }
            }
        },
        latitudeField: "Latitude", // Specify the latitude field
        longitudeField: "Longitude" // Specify the longitude field
    });

    // WebScene
    const map = new WebScene({
        basemap: "dark-gray" // Choose an appropriate basemap
    });

    map.add(csvLayer);

    // SceneView
    const view = new SceneView({
        container: "viewDiv",
        map: map,
        center: [-90.1994, 38.6270], // Center on St. Louis
        zoom: 12 // Adjust zoom level as needed
    });
});
