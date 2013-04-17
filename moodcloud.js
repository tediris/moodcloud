if (Meteor.isClient) {

  next_track = ""
  currentSound = null
  trackCount = 0;

  Template.hello.greeting = function () {
    return "Welcome to moodcloud.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log(next_track);
        loadNext();
    }
  });

  setTimeout(function () {
    SC.stream("/tracks/293", function(sound){
      sound.play();
      currentSound = sound
    });
  }, 1000);

  function loadNext(){

    currentSound.stop();

    SC.stream("/tracks/" + next_track, function(sound){
      sound.play({
        onfinish: function() {
          console.log("track finished");
          loadNext();
        }
      });
      currentSound = sound;
    });

    SC.get('/tracks', { q: 'zedd', license: 'cc-by-sa' }, function(tracks) {
      next_track = tracks[trackCount].uri.split("/");
      next_track = next_track[next_track.length - 1];
      trackCount++;
    });
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
