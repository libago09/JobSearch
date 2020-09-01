const express = require('express');
const app = express();
const axios = require('axios');
const fetch = require('node-fetch');
const traverse = require('traverse')
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));





    app.post('/api', async (request,response) => {
       
        let replaceComma = request.body.inputLoc.replace(/,/g, '%2C');  //asccii format
            let replaceSpaces = replaceComma.replace(/\s/g, '%20'); //
            let location = replaceSpaces;
            let arrayNewArr = new Array();
            let jobCategory = "";

            if(request.body.inputJobb != ''){
                let replaceAnd = request.body.inputJobb.replace(/&/g,'%26');
                let replaceSpaceForJob = replaceAnd.replace(/\s/g, '%20');
                jobCategory = replaceSpaceForJob;   

                let searchResultsPage1 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=1&location="+ location + "&category=" + jobCategory);
                let jsonPage1 = await searchResultsPage1.json();
                let searchResultsPage2 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=2&location="+ location + "&category=" + jobCategory);
                let jsonPage2 = await searchResultsPage2.json();
                let searchResultsPage3 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=3&location="+ location + "&category=" + jobCategory);
                let jsonPage3 = await searchResultsPage3.json();
                for(let i=0;i<60;i++){
                    if(i<20){
                        arrayNewArr[i] = jsonPage1.results[i]
                    }
                    else if((i>=20) && i<40){
                        var temp1 = i-20;
                        arrayNewArr[i] = jsonPage2.results[temp1];
                    }
                    else if((i>=40) && i<60){
                        var temp2 = i-40;
                        arrayNewArr[i] = jsonPage3.results[temp2];
                    }        
                };
            } else {
                let searchResultsPage1 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=1&location="+ location);
                let jsonPage1 = await searchResultsPage1.json();
                let searchResultsPage2 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=2&location="+ location);
                let jsonPage2 = await searchResultsPage2.json();
                let searchResultsPage3 =  await fetch("https://www.themuse.com/api/public/jobs?api_key=7b1b33b48f99107a2711e6757a78d9b76d50516a4069b9967a2e4f97fccf0136&page=3&location="+ location);
                let jsonPage3 = await searchResultsPage3.json();
                for(let i=0;i<60;i++){
                    if(i<20){
                        arrayNewArr[i] = jsonPage1.results[i]
                    }
                    else if((i>=20) && i<40){
                        var temp1 = i-20;
                        arrayNewArr[i] = jsonPage2.results[temp1];
                    }
                    else if((i>=40) && i<60){
                        var temp2 = i-40;
                        arrayNewArr[i] = jsonPage3.results[temp2];
                    }        
                };
            }
             

        let fullResults = {
            results: arrayNewArr
        };

        response.json(fullResults); 

    });
    




