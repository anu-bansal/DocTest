function getData(){
  var xmlHttp = new XMLHttpRequest();
  var url = "http://localhost:3000/output";
  xmlHttp.open("GET", url, true);
  xmlHttp.send();  
  xmlHttp.onreadystatechange = function() { 
      if(this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(this.responseText);      
        var btn = document.getElementById('button');
        //hiding the button after click
        btn.classList.add("hide-me");
        //getting the variables from json file
        //details of standard document
        var standardNouns = obj[0].standard_nouns;
        var standardAdjectives = obj[0].standard_adjectives;
        var standardVerbs = obj[0].standard_verbs;
        var standardWordCount = obj[0].standard_wordCount;
        //details of eval document
        var evalNouns = obj[1].evaluate_nouns;
        var evalAdjectives = obj[1].evaluate_adjectives;
        var evalVerbs = obj[1].evaluate_verbs;
        var evalWordCount = obj[1].evaluate_wordCount;
        //commmon properties
        var commonNouns = obj[2].similar_nouns;
        var commonAdjectives = obj[2].similar_adjectives;
        var commonVerbs = obj[2].similar_verbs;      
        var total = standardAdjectives+standardNouns+standardVerbs;
        var marks = commonNouns+commonVerbs+commonAdjectives;
        var percentage = Math.round((marks/total)*100);
        //html code that needs to be fired on button click
        var html_code = "<p class = \"new_content\">Comparison complete!!<br> <table id = \"table\"><tr><th>Table</th><th>Word Count</th><th>Nouns</th><th>Adjectives</th><th>Verbs</th></tr><tr><th>Your Document</th><td>"+evalWordCount+"</td><td>"+evalNouns+"</td><td>"+evalAdjectives+"</td><td>"+evalVerbs+"</td></tr><tr><th>Standard Document</th><td>"+standardWordCount+"</td><td>"+standardNouns+"</td><td>"+standardAdjectives+"</td><td>"+standardVerbs+"</td></tr></table><br></p><p class = \"new-content\">Your document has<b> "+commonNouns+"</b> common nouns with our standard document.<br>Your document has<b> "+commonAdjectives+"</b> common adjectives with our standard document.<br>Your document has<b> "+commonVerbs+"</b> common verbs with our standard document.<br><br>Your final score : <b>"+percentage+"%</b></p>";
        //where the content shall be inserted
        document.getElementById('data').innerHTML=html_code;
    }  
  }
}
