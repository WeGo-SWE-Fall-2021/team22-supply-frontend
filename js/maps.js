// v 0.01
function adjust_coordinate(loc)
  {
    var array_strings = loc.split(",");
    var array_floats = [parseFloat(array_strings[0]), parseFloat(array_strings[1])];
    return array_floats;
  }
function
 let cloud = window.location.hostname.split('.')[0]
 let cloudURL = `https://${cloud}.team22.sweispring21.tk`
 let location_vehicle = ""
 let coordinate_vehicle = []
function loadMap()
{
$(() => {

   // Handle user data if there is someone is logged in, else redirect them to login page
   fetchLoggedInUser(cloud).then(response => {
    // Success getting user
    if (response.status == 200) {
        console.log("login success" + response)
    } else {
        console.log("Was unable to get user using cookies.")
        // Failed to get user with token, route them back to login
        window.location.replace(cloudURL + '/login.html')
    }
}).catch(error => {
    // Error fetching
    console.error("Error fetching: " + error)
    showAlert("There was an error getting information.")
});

// If a user clicks on the logout button, cookies will be empty and will be taken to main page
$('#logoutButton').click(() => {
  let data = {
      "cloud": cloud
  }
  fetch(cloudURL + "/api/v1/common-services/logout", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  }).then(response => {
      if (response.ok) {
          return response.json();
      }
      return Promise.reject(response);
  }).then(data => {
      window.location.replace(cloudURL);
  }).catch(error => {
      // Handle error
  })
});

    //Get vehicles from database
    fetch( cloudURL + "/api/v1/supply/returnVehicles", {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((mydata) => {
        //table creation - headers
        function addHeaders(table, keys) {
            table.tHead = document.createElement('thead');
            const tHeadTR = table.tHead.insertRow(-1);
            for (var i = 0; i < keys.length; i++) {
                const th = document.createElement('th');
                th.textContent = keys[i]
                tHeadTR.appendChild(th);
            }
        }

        var table = document.createElement('table');

        for (var i = 0; i < mydata.length; i++) {
            var section = mydata[i];
            for (let m = 0; m < Object.keys(section).length; m++) {
                let obj = section[m];
                if (m == 0 && i == 0) {
                    addHeaders(table, Object.keys(obj));
                }
                let row = table.insertRow();
                Object.keys(obj).forEach(function (k) {
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
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');

           });
        });

    })

  });
  }

function clearDiv(divName)
{
    document.getElementById(divName).innerHTML = "";
}

 function mainFunc()
{
    clearDiv("fullTable");
    clearDiv("map");
    loadMap();
    setTimeout(mainFunc, 15000);
}
