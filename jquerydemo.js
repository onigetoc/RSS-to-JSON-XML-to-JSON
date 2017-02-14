$(document).ready(function() {

  $('#rssForm').on('submit', function(e) {
    e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

    var rssfeed = $('#rssurl').val();
    getfeed(rssfeed);

  });
});


function getfeed(rssfeed) {

  var itemenclosure = '';

  $.ajax({
    url: 'http://website.com/xml-to-json.php',
    method: 'GET',
    dataType: 'json',
    data: {
      url: rssfeed,
      //url: 'https://www.rt.com/rss',
      //api_key: 'z6hgvtruazf0ghcv27xrgo6ieyznezyet0i9khad', // put your api key here
      // count: 5
    }
  }).done(function(data) {

    $('#result').html('<h2>' + data.title + '</h2>');

    console.log('====== title ' + data.title + ' ======');
    console.log('====== description ' + data.description + ' ======');
    console.log('====== author ' + data.author + ' ======');
    //console.log('====== url ' + data.url + ' ======');
    console.log('====== link ' + data.link + ' ======');
    console.log('====== lastBuildDate ' + data.lastBuildDate + ' ======');
    console.log('====== language ' + data.language + ' ======');
    console.log('====== image ' + data.image + ' ======');

    $.each(data.item, function(i, item) {

      // Enclosure error handling
      if (item.hasOwnProperty('enclosure')) {
        //itemenclosure = item.enclosure.url;
        if (item.enclosure.type == 'audio/mpeg')
          itemenclosure = '<br><audio controls><source src="' + item.enclosure.url + '" type="' + item.enclosure.type + '"></audio>';
        else if (item.enclosure.type == 'video/mp4')
          itemenclosure = '<br><video width="400" controls><source src="' + item.enclosure.url + '" type="' + item.enclosure.type + '"></video>';
        else
          itemenclosure = '<br><div>Enclosure:</div><img src="' + item.enclosure.url + '" alt="' + item.title + '" >';
      }
      
      $('#result').append('<b>' + item.title + '</b><br>' + item.description + '<br>' + itemenclosure + '<hr><br>');

    });

  });

}
