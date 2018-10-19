
  // Gmap

    (function(){

        var map;  

        map = new GMaps({
            el: '#gmap',
            lat: 40.713273,   
            lng: -74.007368,
            scrollwheel:false,
            zoom: 12,
            zoomControl : false,
            panControl : false,
            streetViewControl : true,
            mapTypeControl: false,
            overviewMapControl: false,
            clickable: false
        });

        var image = 'images/others/map-icon.png';
        map.addMarker({
            lat: 40.713273,   
            lng: -74.007368,
            icon: image,
            animation: google.maps.Animation.DROP,
            verticalAlign: 'bottom',
            horizontalAlign: 'left',
            backgroundColor: '#efece0',
        });


        var styles = [ 

            {
                "featureType": "road",
                "stylers": [
                    { "color": "#ffffff" }
                ]
            },{
                "featureType": "water",
                "stylers": [
                    { "color": "#dedede" }
                ]
          },{
              "featureType": "landscape",
              "stylers": [
              { "color": "#ebebeb" }
              ]
            },{
                "elementType": "labels.text.fill",
                "stylers": [
                    { "color": "#a8a8a8" }
                ]
            },{
                "featureType": "poi",
                "stylers": [
                 { "color": "#cccccc" }
                ]
            },{
                "elementType": "labels.text",
                "stylers": [
                    { "saturation": 1 },
                    { "weight": 0.1 },
                    { "color": "#a8a8a8" }
                ]
            }

        ];

         map.addStyle({
            styledMapName:"Styled Map",
            styles: styles,
            mapTypeId: "map_style"  
        });

        map.setStyle("map_style");
    }());     
   
     