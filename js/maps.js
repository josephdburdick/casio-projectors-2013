var map;
var geocoder;
var address;
var addresses;
var bounds;
var globalatlng = new Array;
var is_load = 0;

function loadScriptMap() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize_map";
  document.body.appendChild(script);
}
function initialize_map() {
  addresses = parse_addresses();
  addresses.reverse();
  bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var length = addresses.length;
  var i;
  var latlng;
  for (i=0; i < length; ++i) {
    address = addresses[i][1];
    find_address();
  }
  map.fitBounds(bounds);
  var t=setTimeout(set_markers,100);
}
function set_markers () {
  if (is_load!=0) {var t=setTimeout(set_markers,100); return}
  var length = globalatlng.length;
  for (i=0; i < length; ++i) {
    var info_window = new google.maps.InfoWindow({content: ''});
    var address_text = addresses[i][1];
    address_text = address_text.replace('<br>', ";\n");
    var marker = new google.maps.Marker({
      position: globalatlng[i],
      map: map,
      title: addresses[i][0]+"\n"+address_text,
      icon: 'img/icons/ico.png'
    });
    var content = addresses[i][0]+"\n"+addresses[i][1];
    var infowindow = new google.maps.InfoWindow({
//      position:  globalatlng[i]
      content: addresses[i][0]+"<br>"+addresses[i][1]
    });
    google.maps.event.addListener(marker, 'click', function() {
      var content = this.title;
      content = content.replace("\n", '<br>');
      content = content.replace(";", '<br>');
      infowindow.content = content;
      infowindow.position = this.position;
      infowindow.open(map, this);
    });
    map.setCenter(globalatlng[i]);
  }
}
function find_address() {
  var latlngs = new Array;
  is_load++;
  geocoder.geocode( { 'address': address}, function(results, status) {
    is_load--;
    if (status == google.maps.GeocoderStatus.OK) {
      var ll = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      globalatlng.push(ll);
    }
  });
}
function parse_addresses() {
  var rows = document.getElementById('result_addresses').childNodes;
  var addresses = new Array();
  var i;
  var j;
  var len = rows.length
  for (i=1; i < len; ++i) {
    var nodes = rows[i].childNodes;
    var name = nodes[0].childNodes;
    var addr = nodes[1].childNodes;
    var name_addr = new Array(name[0].textContent||name[0].innerText, addr[0].innerHTML);
    addresses.push(name_addr);
  }
  return addresses;
}
