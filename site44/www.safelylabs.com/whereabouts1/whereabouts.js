$(function(){
	
	Parse.initialize("pfEiSCI4ppOnqN15QSu3zo55o8WK4X5WTsNWgmww", "kQDon7XBDaUCTS287PxCzJsooDTLo0w04Y9SCym5");
	
	var family = Parse.Object.extend("Family");
	var pointsOfInterest = new Parse.Query("PointsOfInterest");
	var query = new Parse.Query("Family");
	query.find({
		success: function(results){
			for (var i = 0 ; i < results.length ; i++) {
				fetchRow(results[i]);
			}
		},
		error: function(error){
			alert("Something appears to have gone seriously wrong");
		}
	})
	//update to only fetch rows based on familyId
	function fetchRow(result){
		var userGeoPoint = result.get("location");
		// pointsOfInterest.near("location", userGeoPoint)
		pointsOfInterest.withinMiles("location", userGeoPoint, 0.0568182);
		pointsOfInterest.first({
		    
			success: function(locObj){
				var pic = result.get("photoLink") ? result.get("photoLink") : "images/person1.png"
				$("#" + locObj.get("name")).append('<td width="100" id="first">' + 
													   '<img src=' +
														result.get("photoLink") +
														'></td>');
			},
			error: function(error){
				alert("Something appears to have broken in fetchRow");
			}
		})
	}
	
})