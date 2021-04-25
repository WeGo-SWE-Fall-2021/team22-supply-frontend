// v 0.01
function adjust_coordinate(loc)
  {
    var array_strings = loc.split(",");
    var array_floats = [parseFloat(array_strings[0]), parseFloat(array_strings[1])];
    return array_floats;
  }
 let cloud = window.location.hostname.split('.')[0]
 let cloudURL = `https://${cloud}.team22.sweispring21.tk`
 let location_vehicle = ""
 let coordinate_vehicle = []
$(() => {
  
    //Get vehicles from database
    fetch( cloudURL + "/api/v1/supply/returnVehicles", {
        method: "GET"
    }).then((response) => {
        console.log(response);
        return response.json()
    }).then((mydata) => {
        console.log(typeof (mydata));
        console.log(mydata);
        
        //table creation - headers
        function addHeaders(table, keys) {
            table.tHead = document.createElement('thead');
            const tHeadTR = table.tHead.insertRow(-1);
            // 	var row = table.insertRow();
            for (var i = 0; i < keys.length; i++) {
                // var cell = row.insertCell();
                // cell.appendChild(document.createTextNode(keys[i]));
                const th = document.createElement('th');
                th.textContent = keys[i]
                tHeadTR.appendChild(th);
            }
        }
  
        var table = document.createElement('table');
  
        for (var i = 0; i < mydata.length; i++) {
            var section = mydata[i];
            // console.log("first loop", section)
            
            for (let m = 0; m < Object.keys(section).length; m++) {
                let obj = section[m];
                // console.log("second loop", obj)
  
                if (m == 0 && i == 0) {
                    addHeaders(table, Object.keys(obj));
                }
  
                let row = table.insertRow();
                Object.keys(obj).forEach(function (k) {
                    console.log(k);
                    let cell = row.insertCell();
                    cell.appendChild(document.createTextNode(obj[k]));
                })
            }
        }
        document.getElementById('fullTable').appendChild(table)
        $("table tr").click(function() {
          $(this).addClass('selected').siblings().removeClass('selected');
              let id = $(this).find('td:first').html();
              let vType = $(this).find('td:last').html();
              alert(id);
          fetch( cloudURL + "/api/v1/supply//getVehicleLocation?vehicleId=" + $("table tr.selected td:first").html()
           , {
             method: "GET"
             }).then((response) => {
                 console.log(response);
                 return response.json()
             }).then((mydata) => {
                 console.log(mydata);
                 location_vehicle = mydata['location'];
                 console.log(location_vehicle);
                 coordinate_vehicle = adjust_coordinate(location_vehicle);
                 console.log(coordinate_vehicle);
                  mapboxgl.accessToken = 'pk.eyJ1IjoibmRhbHRvbjEiLCJhIjoiY2tsNWlkMHBwMTlncDJwbGNuNzJ6OGo2ciJ9.QbcnC4OnBjZU6P6JN6m3Pw';

                  var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/light-v10',
                    center: coordinate_vehicle,
                    zoom: 15
                  });
                  map.on('load', function ()
                  {
      // Load an image from an external URL.
      map.loadImage(
      'https://cdn3.iconfinder.com/data/icons/transport-02-set-of-vehicles-and-cars/110/Vehicles_and_cars_12-512.png',
      function (error, image)
      {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage('vehicle', image);

        // Add a data source containing one point feature.
        map.addSource('point',
        {
          'type': 'geojson',
          'data':
          {
            'type': 'FeatureCollection',
            'features': [
            {
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': coordinate_vehicle
            }
            }
            ]
          }
        });

        // Add a layer to use the image to represent the data.
        map.addLayer(
        {
          'id': 'points',
          'type': 'symbol',
          'source': 'point', // reference the data source
          'layout':
          {
          'icon-image': 'vehicle', // reference the image
          'icon-size': 0.25
          }
        });
      }
      );
  });
  map.addControl(new mapboxgl.NavigationControl({position: 'top-left'}));

           });
        });

    })
    
  });



  
  
  
  
  
  
  