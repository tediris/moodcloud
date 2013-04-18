if (Meteor.isClient) {

  next_track = "";
  currentSound = null;
  var query = "";
  var trackCount = 0;
  var playedTracks = [];


  Meteor.startup(function() {

    $('#buttonTest').click(function () {
      loadNext();
    });

    console.log("document is ready...");

    $('#searchButton').click(function (){
      query = $("#query").val();
      console.log(query);
      trackCount = 0;
    });

    $('#query').keypress(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) { //Enter keycode
        //Do something
        query = $("#query").val();
        console.log(query);
        trackCount = 0;
      }
    });

  });

  

  setInterval(function () {
    if (currentSound != null && currentSound.playState == 0){
      loadNext();
    }
  }, 1000);

  setTimeout(function () {
    SC.stream("/tracks/293", function(sound){
      sound.play();
      currentSound = sound
    });
  }, 1000);

  function loadNext(){

    currentSound.stop();
    currentSound.unload();

    SC.stream("/tracks/" + next_track, function(sound){
      sound.play();
      currentSound = sound;
    });

    SC.get('/tracks', { q: query, license: 'cc-by-sa' }, function(tracks) {
      //console.log(tracks);
      console.log("trackCount:" + trackCount);
      next_track = tracks[trackCount].uri.split("/");
      next_track = next_track[next_track.length - 1];
      console.log(next_track);
      trackCount++;
      //console.log("playd tracks: " + playedTracks);
    });
  
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
