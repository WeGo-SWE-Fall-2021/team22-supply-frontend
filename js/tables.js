$(() => {
  let cloud = window.location.hostname.split('.')[0]
  let cloudURL = `https://${cloud}.team22.sweispring21.tk`

  //Get vehicles from database
  fetch( cloudURL + "/api/v1/supply/returnVehicles", {
      method: "GET"
  }).then((response) => {
      console.log(response);
      return response.json()
  }).then((mydata) => {
      console.log(typeof (mydata));
      console.log(mydata);
      
      //function to create header of table
      function addHeaders(table, keys) {
        table.tHead = document.createElement('thead');
        const tHeadTR = table.tHead.insertRow(-1);
        //	var row = table.insertRow();
        for (var i = 0; i < keys.length; i++) {
          //var cell = row.insertCell();
          //cell.appendChild(document.createTextNode(keys[i]));
          const th = document.createElement('th');
          th.textContent = keys[i] 
          tHeadTR.appendChild(th);
        }
      }

      //iterate through array
      for (let i = 0; i < mydata.length; i++) {
        let section = mydata[i];
        // console.log("first loop", section
        let table = document.createElement('table');

      //create each row and header of table
        for (let m = 0; m < Object.keys(section).length; m++) {
          let obj = section[m];
        // console.log("second loop", obj)
          if (m === 0) {
            let h = document.createElement("HEADER");
            document.getElementById('container').appendChild(h);
            let h2 = document.createElement("H2");
            let txt = document.createTextNode("Fleet " + i);
            h2.appendChild(txt);
            h.appendChild(h2);
            addHeaders(table, Object.keys(obj));
          }
          let row = table.insertRow();
          Object.keys(obj).forEach(function(k) {
          // console.log(k);
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(obj[k]));
          })

          document.getElementById('container').appendChild(table)
          document.getElementById('container').appendChild(document.createElement("br"));

        }
      }
  }).catch(err => {
      throw err
  });

  $("table tr").click(function() {
    $(this).addClass('selected').siblings().removeClass('selected');
    let vType = $(this).find('td:last').html();
    let id = $(this).find('td:first').html();

  if (confirm("Are you sure you want to remove Vehicle: " +  id + "\nIts is of type: " + vType)) {
    console.log("delete");
  } else {
    console.log("cancel");
  }
  });
});
