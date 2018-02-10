function getData() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/db";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myarr = JSON.parse(this.responseText);
		
			var no_of_words_standard= JSON.stringify(myarr.myjsonobj.no_of_words.standard);
			var no_of_words_user= JSON.stringify(myarr.myjsonobj.no_of_words.user_doc);
			var word_limit_ok= JSON.stringify(myarr.myjsonobj.word_limit_ok);
			var remark_to_reject= JSON.stringify(myarr.myjsonobj.remark_to_reject);
			var similarity= JSON.stringify(myarr.myjsonobj.similarity_btw_document);
			var no_of_mistakes= JSON.stringify(myarr.myjsonobj.spelling.no_of_mistakes);
      var incorrect_words= JSON.stringify(myarr.myjsonobj.spelling.incorrect_words);
			var extra_marks= JSON.stringify(myarr.myjsonobj.coreconcept.no_extra_marks);
      var concept_covered= JSON.stringify(myarr.myjsonobj.core_concept.concept_covered);
			
			document.getElementById('no_of_words_standard').innerHTML = no_of_words_standard;
			document.getElementById('no_of_words_user').innerHTML = no_of_words_user;
			document.getElementById('word_limit_ok').innerHTML = word_limit_ok;
			document.getElementById('remark_to_reject').innerHTML = remark_to_reject;
			document.getElementById('similarity').innerHTML = similarity;
			document.getElementById('no_of_mistakes').innerHTML = no_of_mistakes;
			document.getElementById('incorrect_words').innerHTML = incorrect_words;
			document.getElementById('extra_marks').innerHTML = extra_marks;
			document.getElementById('concept_covered').innerHTML = concept_covered;
		}
	};
}
