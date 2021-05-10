import csvToJson from 'convert-csv-to-json';

const file={
  "csv":{
    "url": "https://linktocsv",
    "select_fields": ["First Name", "Last Name", "Age"],
  }
}
console.log(file.csv.select_fields[0]=="First Name")
console.log(file.csv.select_fields[1]=="Last Name")
let fileInputName = 'data.csv'; 
let fileOutputName = 'myOutputFile.json';
csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);
// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);


let json = csvToJson.getJsonFromCsv("data.csv");
let solution = []
for(let i=0; i<json.length;i++){
  if(
    file.csv.select_fields[0]=="First Name" &&
    file.csv.select_fields[1]=="Last Name" 
    && file.csv.select_fields[2]=="Agme"
    
    ){
   solution.push(json[i])

    }else{
  //  console.log(solution)
  solution.push(file.csv.url)



    }
// {e
//     console.log(file.csv.url);
//   }else{
//    console.log(solution)}
  //  console.log(json[i])

}

   console.log(solution)

