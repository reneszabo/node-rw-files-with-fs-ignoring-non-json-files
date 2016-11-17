var fs = require('fs');
var tempArray = [];
var logStream;
var filesNumber;
var filesRead= 0;
fs.unlink('./output/save.json', function(err) {
  logStream = fs.createWriteStream('./output/save.json', {'flags': 'a'});
  fs.readdir('./voter_results', function(err, files) {
    filesNumber = files.length;
    files.forEach(function(file) {
      getContentFromFile(file);
    });
  });
});
function getContentFromFile(file){
  fs.readFile('./voter_results/'+ file, 'utf8', function (err,data) {
    if (err) {
      filesRead++;
      return console.log(err);
    }
    var obj;
    var hasError = false;
    try{
      obj = JSON.parse(data);
    }catch (e){
      hasError = true;
      obj = {};
    }
    if(!hasError){
      var result = {};
      result.name = obj && obj.name || null;
      result.votedFor = obj && obj.votedFor || null;
      result.occupation = obj && obj.occupation || null;
      result.Hobbies = obj && obj.Hobbies || null;
      tempArray.push(result);
    }
    filesRead++;
    if(filesNumber <= filesRead){
      logStream.write(JSON.stringify(tempArray));
      logStream.end();
    }
  });
}
