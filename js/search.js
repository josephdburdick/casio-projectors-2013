var zips = new Array;
zips[11211] = new Array;
zips[21111] = new Array;
zips[22222] = new Array;

zips[11211].push({ 'name': 'AVI-SPL', 'address': "8 West 38th Street<br> New York, NY US 10018", 'phone': '(212) 840-4801', 'distance': '3.53'});
zips[11211].push({ 'name': 'Tele-Measurements, Inc.', 'address': "145 Main Ave. Clifton<br> NJ US 07014", 'phone': '(973) 473-8822', 'distance': '12.73'});
zips[11211].push({ 'name': 'AVI-SPL', 'address': "250 East Sandford Boulevard<br> Mount Vernon, NY US 10550", 'phone': '(914) 662-3715', 'distance': '14.66'});
zips[11211].push({ 'name': 'Touchboards.com', 'address': "1 Bethany Rd. Suite 58 Bldg 4<br> Hazlet, NJ US 07730", 'phone': '(732) 335-1535', 'distance': '23.45'});
zips[11211].push({ 'name': 'Colortone Camera, Inc.', 'address': "76 South Central Ave. Elmsford<br> NY US 10523", 'phone': '(914) 592-4151', 'distance': '24.63'});
zips[11211].push({ 'name': 'Visual EdTech, Inc', 'address': "3 Beaver Point Trail<br> Wharton, NJ US 07885", 'phone': '(888) 410-1380', 'distance': '36.77'});

zips[21111].push({ 'name': 'RTZ Audiovisual Associates', 'address': "6725 Santa Barbara Court<br> Elkridge, MD US 21075", 'phone': '(301) 419-3101', 'distance': '26.88'});
zips[21111].push({ 'name': 'AVI-SPL', 'address': "9160 Rumsey Road<br> Columbia, MD US 21045", 'phone': '(410) 964-8100', 'distance': '28.40'});
zips[21111].push({ 'name': 'AVI-SPL', 'address': "9180 Rumsey Road<br> Columbia, MD US 21045", 'phone': '(410) 992-0998', 'distance': '28.40'});
zips[21111].push({ 'name': 'American Amplifier & TV', 'address': "4481 Nicole Drive<br> Lanham, MD US 20706", 'phone': '(301) 459-8900', 'distance': '44.23'});
zips[21111].push({ 'name': 'AVI-SPL', 'address': "9701 Philadelphia Court<br> Lanham, MD US 20706", 'phone': '(301) 306-0120', 'distance': '44.23'});
zips[21111].push({ 'name': 'Visual Sound Inc.', 'address': "1235 S. Harrisburg St. Suite E<br> Harrisburg, PA US 17113", 'phone': '(717) 985-9551', 'distance': '48.69'});
zips[21111].push({ 'name': 'JP Lilley', 'address': "2009 N. Third Street<br> Harrisburg, PA US 17102", 'phone': '(717) 238-8123', 'distance': '49.77'});

zips[22222].push({ 'name': 'American Amplifier & TV', 'address': "4481 Nicole Drive<br> Lanham, MD US 20706", 'phone': '(301) 459-8900', 'distance': '12.97'});
zips[22222].push({ 'name': 'AVI-SPL', 'address': "9701 Philadelphia Court<br> Lanham, MD US 20706", 'phone': '(301) 306-0120', 'distance': '12.97'});
zips[22222].push({ 'name': 'AVI-SPL', 'address': "100 Carpenter Drive<br> Sterling, VA US 20164", 'phone': '(703) 796-9011', 'distance': '21.34'});
zips[22222].push({ 'name': 'The Karcher Group', 'address': "14221-A Willard Road<br> Chantillly, VA US 20151", 'phone': '(703) 631-6626', 'distance': '21.79'});
zips[22222].push({ 'name': 'AVI-SPL', 'address': "9160 Rumsey Road<br> Columbia, MD US 21045", 'phone': '(410) 964-8100', 'distance': '26.81'});
zips[22222].push({ 'name': 'AVI-SPL', 'address': "9180 Rumsey Road<br> Columbia, MD US 21045", 'phone': '(410) 992-0998', 'distance': '26.81'});
zips[22222].push({ 'name': 'RTZ Audiovisual Associates', 'address': "6725 Santa Barbara Court<br> Elkridge, MD US 21075", 'phone': '(301) 419-3101', 'distance': '28.83'});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
var zip = getUrlVars()["zip"]?getUrlVars()["zip"]:"";
var error_text = '';
var search_box = 1;
if (zip!='' && zip != '11211' && zip != '21111' && zip != '22222') {
  error_text = "I'm sorry there were no results that match your request.";
} else if (zip!='' && (zip == '11211' || zip == '21111' || zip == '22222')) {
  search_box = 0;
}

function showhide() {
  document.getElementById('error_text').innerHTML = error_text;
  document.getElementById('zip').value = zip;
  fix_placeholder();
  if (search_box == 0) {
    $.each($("#slide-wrap .grid_4"), function() {
      $(this).animate( { left: '-=300' }, 300);
    });
  } else {
    document.getElementById('startbox').style.left = "0px";
    document.getElementById('resultbox').style.left = "0px";
  }
}

function fillAddresses() {
  var result_addresses = document.getElementById('result_addresses');
  var len = zips[zip].length;
  for (i=0; i<len; ++i) {
    var div = document.createElement("div");
    result_addresses.appendChild(div);
    var link = document.createElement("a");
    var linkText = document.createTextNode(zips[zip][i].name);
    var span = document.createElement("span");
    var spanText = document.createTextNode(zips[zip][i].distance + ' miles');
    span.appendChild(spanText);
    link.appendChild(linkText);
    link.appendChild(span);
    link.title = zips[zip][i].name;
    link.href = "#";
    link.setAttribute('id', 'link'+i);
    link.setAttribute('onclick', "open_close(\""+i+"\");");
    link.className = "link open";
    div.appendChild(link);
    var info_div = document.createElement("div");
    info_div.className = "info";
    info_div.style.display = "none";
    info_div.setAttribute('id', 'info'+i);
    div.appendChild(info_div);
    var address_div = document.createElement("div");
    address_div.className = "address";
    address_div.innerHTML=zips[zip][i].address;
    info_div.appendChild(address_div);
    var phone_div = document.createElement("div");
    phone_div.className = "phone";
    var phoneText = document.createTextNode(zips[zip][i].phone);
    phone_div.appendChild(phoneText);
    info_div.appendChild(phone_div);
  }
}
function open_close(i) {
  var infoWindowDiv = document.getElementById('info'+i);
  var link = document.getElementById('link'+i);
  if (infoWindowDiv.style.display == 'none') {
    jQuery("#"+'info'+i).show('normal');
    link.className = "link close";
  }
  else {
    jQuery("#"+'info'+i).hide('normal');
    link.className = "link open";
  }
}
function fix_placeholder () {
$('input[placeholder]').each(function(){  
    var input = $(this);        
    $(input).val(input.attr('placeholder'));
                
    $(input).focus(function(){
        if (input.val() == input.attr('placeholder')) {
           input.val('');
           input.style.color = "#444";
        }
    });
        
    $(input).blur(function(){
       if (input.val() == '' || input.val() == input.attr('placeholder')) {
           input.val(input.attr('placeholder'));
           input.style.color = "#444";
       }
    });
});
}
//window.onload = fillAddresses();
