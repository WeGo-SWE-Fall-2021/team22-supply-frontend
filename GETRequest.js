fetch('https://supply.team22.sweispring21.tk/api/v1/supply/returnVehicle')
    .then((response) => {
        console.log(response);
        return response.json()
    })
        .then((data) => {
                console.log(JSON.stringify(data));
            })
        .catch(err => { throw err });

    var jsondata = data