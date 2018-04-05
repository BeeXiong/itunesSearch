$(document).ready(function(){
	$('#searchSubmit').click(function(){
		//clear searchResults div
		$('#searchResults').empty();

		//api call
		var searchText = getSearchField();
		var searchValue = getSearchType();
		appendSearchValues(searchText, searchValue);
		var url = getUrl(searchText, searchValue);

		$.ajax({
			url: url,
			success:function(data){
				var searchData = parseJson(data);
				var searchResults = displaySearchResults(searchData);
				$("#searchResults").append(searchResults);

			},
			error:{

			}
		});
	});

});

function appendSearchValues(value, type){
	$("#searchValue").append(""+ value +"");
	$("#typeofSearch").append(""+ type +"");
}

function getSearchField(){
	var searchField;
	searchField = $('#searchBar').val();
	return searchField.replace(/ /g,"+");
}
function getSearchType(){
	return $('#searchType').val();
}
function getUrl(searchField, searchValue){
	if(searchValue == "Artist/All" || searchValue == ""){
		return "https://itunes.apple.com/search?term=" + searchField + "&limit=25";
	}
	else if(searchValue == "Songs"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=song + &limit=25"
	}
	else if(searchValue == "Videos"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=musicVideo + &limit=25"
	}
	else if(searchValue == "Albums"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=album + &limit=25"
	}
	else if(searchValue == "Videos"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=musicVideo + &limit=25"
	}
}
function parseJson(data){
	var parse = JSON.parse(data);
	return parse.results;
}


function displaySearchResults(parseData){
	var searchResults ="";
	for(i = 0; i<parseData.length; i++){
		var result = "<div class='col-md-4 d-inline-block py-2'><div class='col-11 mx-auto bg-white rounded-corners result-box'><div class='row'><div class='co-6 mx-auto' id='albumCover'>"
		var data = parseData[i];
		var album = getAlbumCover(data);
		var artistInfo = getArtistInfo(data);
		searchResults = searchResults + result +  album + "</div></div><div class='row mx-auto'><div class='no-margin' id='artistInfo'>" + artistInfo + "</div></div></div></div>"
	}
	return searchResults;



		// <div class="col-md-4 d-inline-block py-2">
		// 	<div class="col-11 mx-auto bg-white rounded-corners result-box">
		// 		<div class="row">
		// 			<div class="co-6 mx-auto" id="albumCover">
						
		// 			</div>
		// 		</div>
		// 		<div class="row mx-auto">
		// 			<div class="no-margin" id="artistInfo">
						
		// 			</div>
		// 		</div>
		// 	</div>

		// </div>	
}






function getAlbumCover(parseData){
	var albumCover = parseData.artworkUrl100;
	var appendedString = "";
	if(albumCover != undefined){
		appendedString = "<img class='album-cover rounded-corners' src="+albumCover+">";
	}
	else{
		appendedString = "<p>no image</p>"
	}
	
	return appendedString;
}
function getArtistInfo(parseData){
	var appendedString = "";
	var artistName = parseData.artistName;
	var collectionName = parseData.collectionName;
	var trackName = parseData.trackName;
	var songPreview = parseData.previewUrl;
	
	if(artistName != undefined){
		appendedString = appendedString + "<h6>"+ artistName +" </h6>";
	}
	if(collectionName != undefined){
		appendedString = appendedString + "<p><b>Album:</b> "+ collectionName +" </p>";
	}
	if(trackName != undefined){
		appendedString = appendedString + "<p><b>Song:</b> "+ trackName +" </p>";
	}
	if(songPreview != undefined){
		appendedString = appendedString + "<a href="+ songPreview +" target='_blank'>Preview Song</a>";
	}
	return appendedString;
}
