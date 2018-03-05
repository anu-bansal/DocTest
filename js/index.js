//fs node js .. taking up only .txt files and natural
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
//pos tagger
var path = require("path");
 
var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';
 
var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
var rules = new natural.RuleSet(rulesFilename);
var tagger = new natural.BrillPOSTagger(lexicon, rules);
//pos tagger over

//global variables to be displayed in json at end
var evalNouns = [];
var standardNouns = [];
var evalAdjectives = [];
var standardAdjectives = [];
var evalVerbs = [];
var standardVerbs = [];
var similarNouns = [];
var similarAdjectives = [];
var similarVerbs = [];

//document to be evaluated
var evalDocument = fs.readFileSync('../documents/EvalDocument.txt','utf-8');
//standard document
var standardDocument = fs.readFileSync('../documents/StandardDocument.txt','utf-8');

//tokenizing to get the word count
//length of standard document
var standardTokens = tokenizer.tokenize(standardDocument);
var evalTokens = tokenizer.tokenize(evalDocument);
//twenty percent length relaxation
var range = (standardTokens.length*20)/100
//lengths of respective documents
var standardLength = standardTokens.length;
var evalLength = evalTokens.length;

if(evalLength <= standardLength-range || evalLength >= standardLength+range){
  console.log("Document size invalid");
  return;
}

else{
  //call for calculating everything
  calculate(standardTokens, evalTokens, end);
}

//counting nouns, adjectives and vers for both documents to compare
function calculate(standard, evaluate, callback){
  var standardTagged = tagger.tag(standard);
  var evalTagged = tagger.tag(evaluate);
  
  //for the counting of standard document
  for(var i=0; i < standardTagged.length; i++){ 
    //if its a noun
    if(standardTagged[i][1] == "NN"|"NNS"|"NNP"|"NNPS")
      standardNouns.push(standardTagged[i][0]);
    //if its an adjective
    else if(standardTagged[i][1] == "JJ"|"JJR"|"JJS")
      standardAdjectives.push(standardTagged[i][0]);
    //if its a verb
    else if(standardTagged[i][1] == "VB"|"VBD"|"VBG"|"VBN"|"VBP")
      standardVerbs.push(standardTagged[i][0]);
  }
    //for the counting of evaluation document
  for(var i=0; i < evalTagged.length; i++){ 
    //if its a noun
    if(evalTagged[i][1] == "NN"|"NNS"|"NNP"|"NNPS")
      evalNouns.push(evalTagged[i][0]);
    //if its an adjective
    else if(evalTagged[i][1] == "JJ"|"JJR"|"JJS")
      evalAdjectives.push(evalTagged[i][0]);
    //if its a verb
    else if(evalTagged[i][1] == "VB"|"VBD"|"VBG"|"VBN"|"VBP")
      evalVerbs.push(evalTagged[i][0]);
  
  }
  
   compareNouns();
   compareAdjectives();
   compareVerbs();
   end();
  }

//comparing nouns of both documents and calculating noun percentage
function compareNouns(){
  var corpus = standardNouns;
  var spellcheck = new natural.Spellcheck(corpus);
  //comparing each noun of evalDoc with corpus
  for(let i = 0; i < evalNouns.length; i++){
	if(spellcheck.isCorrect(evalNouns[i])){
		similarNouns.push(evalNouns[i]);
	}
}   
  
} 

function compareAdjectives(){
  var corpus = standardAdjectives;
  var spellcheck = new natural.Spellcheck(corpus);
  //comparing each noun of evalDoc with corpus
  for(let i = 0; i < evalAdjectives.length; i++){
	if(spellcheck.isCorrect(evalAdjectives[i])){
		similarAdjectives.push(evalAdjectives[i]);
	}
}   
} 

function compareVerbs(){
  var corpus = standardVerbs;
  var spellcheck = new natural.Spellcheck(corpus);
  //comparing each noun of evalDoc with corpus
  for(let i = 0; i < evalVerbs.length; i++){
	if(spellcheck.isCorrect(evalVerbs[i])){
		similarVerbs.push(evalVerbs[i]);
	}
} 
} 



//json file -- to be executed in the end
 function end(){
    var score = {
"output":[
        {
          wordCount : standardLength,
          nouns : standardNouns.length,
          adjectives : standardAdjectives.length,
          verbs : standardVerbs.length
        }, 
        {
          wordCount : evalLength,
          nouns : evalNouns.length,
          adjectives : evalAdjectives.length,
          verbs : evalVerbs.length
        }, {
          nouns : similarNouns.length,
          adjectives : similarAdjectives.length,
          verbs : similarVerbs.length
      }
    ]
    }
      //object to string
  var json = JSON.stringify(score, null, 2);
  //storing it in .json file
  fs.writeFileSync('../output.json',json)
 }
