var apiKey = "AIzaSyAiqGTwgXefUmLuIAW6uWeSeD-binINUDY";
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

var coordinates;
var userLocation;
var queryUrl1;
var queryUrl2;
var coordinates2;
var map;
var marker;
var options;
var userIcon;
var infoWindow;
var iconImage;
var iconImage2;
var myLatlng;
var content;


function autocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    // Get value entered in location search box
    $("#searchBtn").on("click", function () {
        userLocation = $("#autocomplete").val();
        // Get the location's coordinates using Google Geolocation
        queryUrl1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${userLocation}&key=${apiKey}`;

        $.ajax({
            url: queryUrl1,
            method: "GET"
        }).then(function (response) {
            coordinates = {
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
            };
            initMap();

            function initMap() {
                // Map options
                options = {
                    zoom: 13,
                    center: coordinates
                }

                // Create new instance of map object from Google API
                map = new google.maps.Map(document.getElementById('map'), options)

                // Set custom icon for user's location
                userIcon = {
                    url: "/images/search-map-icon.jpg",
                    scaledSize: new google.maps.Size(30, 50)
                };

                // Create a marker for user location
                marker = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: userIcon
                });

                var geocoder = new google.maps.Geocoder();

                var markerBounds = new google.maps.LatLngBounds();

                var locssmithArray = [];

                // Get the bathroom data from the database
                $.ajax({
                    url: "api/examples",
                    async: true,
                    method: "GET",
                    dataType: 'json',
                    success: function (data) {
                        for (var j = 0; j < data.length; j++) {
                            var testId = {
                                id: data[j].id,
                                name: data[j].name,
                                rating: data[j].clientrating,
                                add: data[j].addr
                            }
                            locssmithArray.push(testId);
                        }

                        // Create a loop so that the addMarker function is called and executed for each bathroom from the database that
                        for (var i = 0; i < locssmithArray.length; i++) {
                            var id = locssmithArray[i].id;
                            var name = locssmithArray[i].name;
                            var rating = locssmithArray[i].rating;
                            var addy = locssmithArray[i].add;
                            console.log(addy)

                            // Get lat and long coordinates
                            var coordinates2 = function () {
                                var c = null;
                                queryUrl2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${apiKey}`;
                                $.ajax({
                                    async: false,
                                    method: "GET",
                                    url: queryUrl2,
                                    success: function (data) {
                                        c = data.results[0].geometry.location;
                                    }
                                });
                                return c;
                            }();
                            // markerBounds.extend(coordinates2);
                            // map.fitBounds(markerBounds);
                            console.log(coordinates2)
                            addMarker(coordinates2, name, rating, id)
                        }
                    }
                    // console.log(coordinates2) 
                    // put the result of this function into coordinates variable to run through loop
                    // } // end of for loop
                }); // end of ajax call to get table data from db

                // Function to dynamically add markers for each bathroom
                function addMarker(coord, contentName, contentRating, id) {

                    // Image for map bathroom markers
                    iconImage2 = {
                        url: "/images/Destination.jpg",
                        scaledSize: new google.maps.Size(25, 25) // scaled size
                    };

                    infoWindow = new google.maps.InfoWindow({
                        disableAutoPan: true
                    });

                    // myLatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(long));

                    marker2 = new google.maps.Marker({
                        position: coord,
                        map: map,
                        icon: iconImage2,
                        content: `<b>Name:  </b>${contentName}<br>
                        <b>Rating:  </b>${contentRating}`,
                        // Create pop up window for each bathroom location
                        // Need to go back and add a dynamic variable that will show name and rating from the database
                        noPan: { disableAutoPan: true }
                    });

                    // Add listener to the marker so that when user clicks on it, pop up window comes up
                    // Can I change this to mouse over??
                    marker2.addListener('mouseover', function () {
                        infoWindow.setContent(this.content);
                        infoWindow.open(map, this);
                    });

                    marker2.addListener('mouseout', function () {
                        infoWindow.close(map, this);
                    })

                    marker2.addListener('click', function () {
                        window.location.href = `/example/${id}`;
                        // marker.url 
                    });
                } // end of addMarker function

            } // end of initMap function
        }) // end of ajax call
            .catch(function (error) {
                console.log(error);
            }); // end of error handling in ajax call
    }); // end on click event

    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }
    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        };
    }
} // end of autocomplete
