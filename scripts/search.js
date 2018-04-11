$(document).ready(function(){
	$('#searchSubmit').click(function(){
		//clear searchResults div
		$('#searchResults').empty();
		$('#paginationNumber').empty().append(0);
		$("#Previous").show();
		$("#firstPage").show();
		$("#secondPage").show();
		$("#thirdPage").show();
		$("#fourthPage").show();
		$("#fifthPage").show();
		$("#Previous").show();

		//api call
		var searchText = getSearchField();
		var searchValue = getSearchType();
		appendSearchValues(searchText, searchValue);
		var url = getUrl(searchText, searchValue);

		$.ajax({
			url: url,
			success:function(data){
				var searchData = parseJson(data);
				var paginationNumber = getPaginationNumber();
				setPaginationNumber(searchData, paginationNumber);
				var searchResults = displaySearchResults(searchData, paginationNumber);
				$("#searchResults").append(searchResults);
				determinePaginationPages(searchData);
			},
			error:{

			}
		});
	});
	$('#firstPage').click(function(){

		$('#first').addClass('visible-pagination').removeClass('hidden-pagination');
		$('#second').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#third').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fourth').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fifth').removeClass('visible-pagination').addClass('hidden-pagination');
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").removeClass('active');
		$("#Previous").hide();
		$("#Next").show();
	});
	$('#secondPage').click(function(){
		$('#first').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#second').addClass('visible-pagination').removeClass('hidden-pagination');
		$('#third').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fourth').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fifth').removeClass('visible-pagination').addClass('hidden-pagination');
		$("#firstPage").removeClass('active');
		$("#secondPage").addClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").removeClass('active');
		$("#Previous").show();
		$("#Next").show();
	});
	$('#thirdPage').click(function(){
		$('#first').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#second').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#third').addClass('visible-pagination').removeClass('hidden-pagination');
		$('#fourth').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fifth').removeClass('visible-pagination').addClass('hidden-pagination');
		$("#firstPage").removeClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").addClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").removeClass('active');
		$("#Previous").show();
		$("#Next").show();
	});
	$('#fourthPage').click(function(){
		$('#first').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#second').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#third').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fourth').addClass('visible-pagination').removeClass('hidden-pagination');
		$('#fifth').removeClass('visible-pagination').addClass('hidden-pagination');
		$("#firstPage").removeClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").addClass('active');
		$("#fifthPage").removeClass('active');
		$("#Previous").show();
		$("#Next").show();
	});
	$('#fifthPage').click(function(){
		$('#first').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#second').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#third').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fourth').removeClass('visible-pagination').addClass('hidden-pagination');
		$('#fifth').addClass('visible-pagination').removeClass('hidden-pagination');
		$("#firstPage").removeClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").addClass('active');
		$("#Previous").show();
		$("#Next").hide();
	});
	$('#Previous').click(function(){
		var current = $('.active');
		var previous = current.prev();
		var testForFirstPage = previous["0"].innerText.substring(0,1);

		if(testForFirstPage == "1"){
			$('#Previous').hide();
		}		

		current.removeClass('active');
		previous.addClass('active');

		var currentResults = $('.visible-pagination');
		var previousResults = currentResults.prev();
		currentResults.removeClass('visible-pagination').addClass('hidden-pagination');
		previousResults.removeClass('hidden-pagination').addClass('visible-pagination');
		$('#Next').show();
	});
	$('#Next').click(function(){
		var current = $('.active');
		var next = current.next();
		var testForLastPage = next["0"].innerText.substring(0,1);

		if(testForLastPage == "5"){
			$('#Next').hide();
		}

		current.removeClass('active');
		next.addClass('active');
		
		var currentResults = $('.visible-pagination');
		var nextResults = currentResults.next();
		currentResults.removeClass('visible-pagination').addClass('hidden-pagination');
		nextResults.removeClass('hidden-pagination').addClass('visible-pagination');
		$('#Previous').show();

	});		
});

function parseJson(data){
	var parse = JSON.parse(data);
	return parse.results;
}

function getResultNumber(data){
	return data.length;
}

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
		return "https://itunes.apple.com/search?term=" + searchField + "&limit=125";
	}
	else if(searchValue == "Songs"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=song + &limit=125"
	}
	else if(searchValue == "Videos"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=musicVideo + &limit=125"
	}
	else if(searchValue == "Albums"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=album + &limit=125"
	}
	else if(searchValue == "Videos"){
		return "https://itunes.apple.com/search?term=" + searchField + "&entity=musicVideo + &limit=125"
	}
}

function displaySearchResults(parseData, paginationNumber){
	var searchResults ="";
	var endNumber = paginationNumber + 24;
	if(parseData.length	>= endNumber){		
		searchResults = "<div class='visible-pagination' id='first'>";
		searchResults = searchResults + buildHtmlWithPagination(parseData, paginationNumber, endNumber)
		searchResults= searchResults + "</div>";
		endNumber = endNumber + 24;
		paginationNumber = paginationNumber + 24;
	}
	else if(parseData.length != 0){
		searchResults = searchResults + "<div class='visible-pagination' id='first'>";
		searchResults = searchResults + buildHtmlWithArray(parseData, paginationNumber)
		searchResults= searchResults + "</div>";
	}
	else{
		searchResults="<h1>No Results</h1>"
	}

	if(parseData.length	>= endNumber){		
		searchResults = searchResults + "<div class='hidden-pagination' id='second'>";
		searchResults = searchResults + buildHtmlWithPagination(parseData, paginationNumber, endNumber)
		searchResults= searchResults + "</div>";
		endNumber = endNumber + 24;
		paginationNumber = paginationNumber + 24;
	}
	else if(parseData.length != 0){
		searchResults = searchResults + "<div class='hidden-pagination' id='second'>";
		searchResults = searchResults + buildHtmlWithArray(parseData, paginationNumber)
		searchResults= searchResults + "</div>";
	}

	if(parseData.length	>= endNumber){		
		searchResults = searchResults + "<div class='hidden-pagination' id='third'>";
		searchResults = searchResults + buildHtmlWithPagination(parseData, paginationNumber, endNumber)
		searchResults= searchResults + "</div>";
		endNumber = endNumber + 24;
		paginationNumber = paginationNumber + 24;
	}
	else if(parseData.length != 0){
		searchResults = searchResults + "<div class='hidden-pagination' id='third'>";
		searchResults = searchResults + buildHtmlWithArray(parseData, paginationNumber)
		searchResults= searchResults + "</div>";
	}

	if(parseData.length	>= endNumber){		
		searchResults = searchResults + "<div class='hidden-pagination' id='fourth'>";
		searchResults = searchResults + buildHtmlWithPagination(parseData, paginationNumber, endNumber)
		searchResults= searchResults + "</div>";
		endNumber = endNumber + 24;
		paginationNumber = paginationNumber + 24;
	}
	else if(parseData.length != 0){
		searchResults = searchResults + "<div class='hidden-pagination' id='fourth'>";
		searchResults = searchResults + buildHtmlWithArray(parseData, paginationNumber)
		searchResults= searchResults + "</div>";
	}

	if(parseData.length	>= endNumber){		
		searchResults = searchResults + "<div class='hidden-pagination' id='fifth'>";
		searchResults = searchResults + buildHtmlWithPagination(parseData, paginationNumber, endNumber)
		searchResults= searchResults + "</div>";
		endNumber = endNumber + 24;
		paginationNumber = paginationNumber + 24;
	}
	else if(parseData.length != 0){
		searchResults = searchResults + "<div class='hidden-pagination' id='fifth'>"
		searchResults = searchResults + buildHtmlWithArray(parseData, paginationNumber)
		searchResults= searchResults + "</div>";
	}
	return searchResults;
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

//pagination functions

function getPaginationNumber(){
	var paginationNumber = $('#paginationNumber').text();
	return parseInt(paginationNumber);
}
function setPaginationNumber(parseData, paginationNumber){
	var arrayCount = parseData.length;
	var newPaginationNumber = 0; 
	if (arrayCount >= (paginationNumber + 24)){
		newPaginationNumber = (paginationNumber + 24);
	}

	else{
		newPaginationNumber = paginationNumber + (paginationNumber + arrayCount);
	}
	$('#paginationNumber').empty(newPaginationNumber).append(newPaginationNumber);
}
function buildHtmlWithPagination(parseData, paginationNumber, endNumber){
	var resultString = "";
	for(paginationNumber; paginationNumber<endNumber; paginationNumber++){
		var result = "<div class='col-lg-4 d-inline-block py-2'><div class='col-11 mx-auto bg-white rounded-corners result-box'><div class='row'><div class='mx-auto' id='albumCover'>";
		var data = parseData[paginationNumber];
		var album = getAlbumCover(data);
		var artistInfo = getArtistInfo(data);
		resultString = resultString + result +  album + "</div></div><div class='row mx-auto'><div class='no-margin' id='artistInfo'>" + artistInfo + "</div></div></div></div>";
	}
	return resultString;
}
function buildHtmlWithArray(parseData, paginationNumber){
	var resultString = "";
	for(paginationNumber; paginationNumber<parseData.length; paginationNumber++){
		var result = "<div class='col-lg-4 d-inline-block py-2'><div class='col-11 mx-auto bg-white rounded-corners result-box'><div class='row'><div class='mx-auto' id='albumCover'>";
		var data = parseData[paginationNumber];
		var album = getAlbumCover(data);
		var artistInfo = getArtistInfo(data);
		resultString = resultString + result +  album + "</div></div><div class='row mx-auto'><div class='no-margin' id='artistInfo'>" + artistInfo + "</div></div></div></div>";
	}
	return resultString;
}
function determinePaginationPages(parseData){
	var arrayCount = parseData.length;

	if(arrayCount >= 125){
		$("#pagination").show();
		$("#Previous").hide();
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").removeClass('active');
	}
	else if(arrayCount <= 25){
		$("#pagination").show();
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active').hide();
		$("#thirdPage").removeClass('active').hide();
		$("#fourthPage").removeClass('active').hide();
		$("#fifthPage").removeClass('active').hide();
	}
	else if(arrayCount <= 50){
		$("#pagination").show();
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active').hide();
		$("#fourthPage").removeClass('active').hide();
		$("#fifthPage").removeClass('active').hide();
	}
	else if(arrayCount <= 75){
		$("#pagination").show();
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active').hide();
		$("#fifthPage").removeClass('active').hide();
	}
	else if(arrayCount <= 100){
		$("#pagination").show();
		$("#firstPage").addClass('active');
		$("#secondPage").removeClass('active');
		$("#thirdPage").removeClass('active');
		$("#fourthPage").removeClass('active');
		$("#fifthPage").removeClass('active').hide();
	}
}