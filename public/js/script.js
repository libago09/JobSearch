var slideImg=document.getElementById("slideImg");
var images=new Array(
    "img/image.jpg",
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg"
);
var len=images.length;
var i=0;
function slider(){
    if(i>len-1){
        i=0;
    }
    slideImg.src=images[i];
    i++;
    setTimeout('slider()',4000);
}

function search(){
    window.location.href = "result.html";
    var text="Result"
    var text2="Result2"
    //document.getElementById("hidden").style.display='block';
    document.getElementById("result").innerHTML=text;
    document.getElementById("result2").innerHTML=text2;
}

function toogle(){
    var blur=document.getElementById('blur');
    blur.classList.toggle('active');
    var popup=document.getElementById('popup');
    popup.classList.toggle('active');
}
window.onscroll = function() {myFunction()};
        
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

  // kani na code
async function clickToDisplayResults(){

  let inputJobb = document.getElementById("inputJob").value;
  let inputLoc = document.getElementById("inputLocation").value;
  console.log( inputJobb );
  console.log( inputLoc );
  let data = { inputJobb, inputLoc }
  let options = {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  };

  const response = await fetch('/api',options);
  let allSearchResults = await response.json(); 
  console.log(allSearchResults.results); // 60 results pani
  createBoxForEachResults(allSearchResults);
}



function createBoxForEachResults(jsonFile){

  var referenceNode = document.querySelector('#boxOne'); 
  var deleteFirstNode = document.querySelector('#boxOne'); 
  for (let jj=1; jj<jsonFile.results.length; jj++){ 
      if(jsonFile.results[jj] != null){    
        var codeBlock =  '<div class="box">' +
        '<p>'+ '<h4 style="color:Black;">'+ ' Company: ' + jsonFile.results[jj].company.name + '</h4> ' +'</p>'+
        '<p style="font-family:"Comic Sans MS", cursive, sans-serif !important;">'+ '<b>' + jsonFile.results[jj].name + '</b>' +'</p>'+
        '<a href="#" class="pull-right" onclick="toogle()">Read More</a>' +
        '</div>';

        var newGroup = document.createElement("div"); 
        referenceNode.parentNode.insertBefore(newGroup, referenceNode.nextSibling); 
        referenceNode = newGroup;
        newGroup.innerHTML = codeBlock;
        newGroup.getElementsByTagName("a")[0].addEventListener("click",function(){

          var deleteHtmlTags = "";
          deleteHtmlTags = jsonFile.results[jj].contents;
          const strippedStrings = deleteHtmlTags.replace(/(<([^>]+)>)/gi, ""); //removes all the tags from the content given by themuseapi 

          var linkToapply = "https://www.themuse.com/job/redirect/"+ jsonFile.results[jj].id;
          var codeBlock1 = 
          '<div style="color:black !important;"> <p style="color:black !important;> <h5 style="color:black !important;>'+ strippedStrings +'</h5> <p> </div>' +
          '<a href="#" class="pull-left"onclick="toogle()">Close</a>' +
          '<a href="'+linkToapply+'" class="pull-right">Apply</a>' ;
          var newRef = document.getElementById("popup");
          newRef.innerHTML = codeBlock1;
      });
    }
  }

  deleteFirstNode.parentNode.removeChild(deleteFirstNode);

}

// underconstruciton search by keyword
function filterResultsByKeyword(inputJob, jsonFileToBeFiltered){
  var results=[];
  for (var i=0 ; i < jsonFileToBeFiltered.results.length ; i++)
{ 
 let str = JSON.stringify(jsonFileToBeFiltered.results[i].contents);
    if (str.includes(inputJob) == true) {
        results.push(jsonFileToBeFiltered.results[i]);
    }
}
return results;
}
