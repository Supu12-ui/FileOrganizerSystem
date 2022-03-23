const fs= require('fs')
const path= require('path')
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };

function organizefn(dirPath) {//this function will help us to orgnaize the file
    let destPath;  
    if (dirPath==undefined) {  //if directory folder does not exist
  console.log("Please enter the valid directory path")
   return;       
}
       else{//if directory exists
           let doesExist = fs.existsSync(dirPath)
            //console.log(doesExist)
            if(doesExist == true) {
                destPath=path.join(dirPath,'organized_files')
             if(fs.existsSync(destPath)==false){ //we will create a folder if it does not exist 
                 fs.mkdirSync(destPath)
             } //if folder exit
             else{
                   console.log("This folder already exists")
             }
            }
            else{
                console.log("Please Enter a valid Path")
            }
        }
        organizeHelper(dirPath,destPath)
    }

        function organizeHelper(src,dest){
            let childNames = fs.readdirSync(src)
            for(let i = 0;i < childNames.length; i++) {
                let childAddress = path.join(src,childNames[i])
                let isFile = fs.lstatSync(childAddress).isFile()
               // console.log(childAddress + " "+ isFile)
             if(isFile==true)
             {
                 let fileCategory = getCategory(childNames[i])
                  console.log(childNames[i]+"belongs to "+fileCategory)
                 sendFiles(childAddress,dest,fileCategory)
                }
            }
        }
        function getCategory(name)
        {
            let ext = path.extname(name) //it will give us extension name 
              ext =ext.slice(1)
           // console.log(ext)
           for(let type in types ){
               let cTypeArr = types[type]
               for(let i=0;i<cTypeArr.length; i++)
               {
                    if(ext==cTypeArr[i]) //we matched the extension with the values present in ctypeARR
                    {
                        return type
                    }
               }
           }
           return "others"
        }
function sendFiles(srcFilePath,dest,fileCategory)
 {
let catPath = path.join(dest,fileCategory)
if(fs.existsSync(catPath)==false)  //checking for category folder path
{
    fs.mkdirSync(catPath)
}
let fileName = path.basename(srcFilePath) //we tool out the names of the files
let desFilePath = path.join(catPath,fileName) //here we created a path for the file category folder
 fs.copyFileSync(srcFilePath, desFilePath) //copied the files from src to dest
 console.log(fileName +" is copied to "+ fileCategory)
}
module.exports ={
    organizeKey:organizefn
}