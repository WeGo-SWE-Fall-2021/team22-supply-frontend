$(() => {
    let cloud = window.location.hostname.split('.')[0]
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`

    // Handle user data if there is someone is logged in, else redirect them to login page

    // fetchLoggedInUser().then(data => {
    //     if (data.status === 200) {
    //         // Success in fetching data now update dashboard with the new data
    //     } else {
    //         // Was not able to fetch user
    //         window.location.replace(cloudURL + "/login.html")
    //     }
    // })

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

    
    $("#addVehicleButton").click(() => {
        let vType = $("#vType").val();      
        let status = "oos";
        let dock = "-97.74562,30.256937";

        let data = {
            'cloud': cloud,
            'status' : status,
            'dock': dock,
            'vType' : vType
        };
    
            fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/supply/vehicle`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response)
            }).then(data => {
                console.log(data)
            }).catch(error => {
                throw error

            })
        });

        function trim(stringToTrim) {
            return stringToTrim.replace(/^\s+|\s+$/g,"");
        }

        $("#addFleetButton").click(() => {
            let vType = trim($("#fleetVType").val());      
            let totalVehicles = 0

            console.log(vType);

            fetch( cloudURL + "/api/v1/supply/getAllvTypes", {
                method: "GET"
            }).then((response) => {
                console.log(response);
                return response.json()
            }).then((mydata) => {
                console.log(typeof (mydata));
                console.log(mydata);
                if (vType == null || vType == undefined || vType.length == 0) {
                    alert("vehicle type cannot be empty");
                }
                else if (mydata.includes(vType)){
                    alert("That fleet already exsists");
                }
                else {

                    let data = {
                        'cloud': cloud,
                        'totalVehicles' : totalVehicles,
                        'vType' : vType
                    };
                
                        fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/supply/fleet`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            return Promise.reject(response)
                        }).then(data => {
                            console.log(data)
                        }).catch(error => {
                            throw error 
            
                        })
                    }
                })
            });
    });
    
