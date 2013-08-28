$(function() {
	 Parse.initialize("pfEiSCI4ppOnqN15QSu3zo55o8WK4X5WTsNWgmww", "kQDon7XBDaUCTS287PxCzJsooDTLo0w04Y9SCym5");

    function fetchRow(result) {
      var userGeoPoint = result.get("location");
      pointsOfInterest.near("location", userGeoPoint);
      pointsOfInterest.first({
        success: function(locObj){
          $('#displayTable > tbody:last').append('<tr>' +
                                             '<td>' + 
                                              result.attributes.name +
                                             '</td>' + 
                                             '<td>' +
                                             result.attributes.mdn +
                                             '</td>' +
                                             '<td>' + 
                                             locObj.get("name") +
                                             '</td>' +
                                             '</tr>');
        },
        error: function(error){
          alert("things appear to have broken");
        }
      });
    }
    
    var Family = Parse.Object.extend("Family");
    var places;
    var pointsOfInterest = new Parse.Query("PointsOfInterest");
    var query = new Parse.Query("Family");
    query.find({
      success: function(results){
        for (var i = 0 ; i < results.length ; i++) {
          fetchRow(results[i]);
        }
      },
      error: function(error){
      }
    })
  </script>

});