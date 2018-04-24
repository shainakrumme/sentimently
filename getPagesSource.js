

function DOMtoString(document_root) {


subscription_key = "592b4136ebff42608f4ca5e1b661d087";

    text_analytics_base_url = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?Ocp-Apim-Subscription-Key=592b4136ebff42608f4ca5e1b661d087";

    text = document.body.innerText;
    arr = text.split(".");
    updated_arr = [];
    for(j = 0; j<arr.length; j++){
      if(arr[j].length>10){
      updated_arr.push(arr[j]);
    }
    }
var i;
scores = [];
    documents={'documents':[]};
for (i= 0;i<updated_arr.length; i++){ //adding all sentences to the "document" dictionary

   

    headers   = {"Ocp-Apim-Subscription-Key": subscription_key};
  


   // sentiment_api_url = text_analytics_base_url + "sentiment";
    documents['documents'].push({'id': i.toString(), 'language': 'en', 'text': updated_arr[i]});


//     headers   = {"Ocp-Apim-Subscription-Key": subscription_key}
    


}
// documents = JSON.stringify({'documents' : [
//       {'id': i, 'language': 'en', 'text': arr[i]}]});

        var xhr = new XMLHttpRequest();
        xhr.open('POST',    text_analytics_base_url , false);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        xhr.setRequestHeader("Ocp-Apim-Subscription-Key",subscription_key);
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        response = JSON.parse(xhr.responseText);
        console.log(response.documents.length);


        for( k=0;k<response.documents.length;k++){
          console.log('TEXT:', documents['documents'][k],'    |  SCORE:',response['documents'][k]['score']);
          scores.push(response['documents'][k]['score']);
        }
        // console.log('here is the response***: ', response);
        // console.log('here are the scores***: ', scores);

        //window.sentiments.push(sentiment);
    }
}
json_docs = JSON.stringify(documents);
// console.log('here are the documents:**', json_docs);
xhr.send( json_docs);

    final_calc =senti_calculation(scores);
    console.log("FINAL CALC **: ", final_calc);

    temp = "";





//  chrome.storage.local.set({ "articles":[0.5]}, function() {
    chrome.storage.local.get( "articles", function(result) {
      console.log('here is result: ', result);
      temp= result['articles'];
      temp.push(final_calc);
      console.log("here is the pushed array: ", temp);

      var sum = 0;
for( var i = 0; i < temp.length; i++ ){
    sum += temp[i]; //don't forget to add the base
}

var avg = sum/temp.length;
  console.log("HERE IS AVERAGE THUS FAR: ", avg);

      chrome.storage.local.set({ "articles":temp}, function() {
        console.log('The sentiment of this page has been recorded.');
       });
     });



      console.log('The sentiment of this page has been recorded.');
    // });
//******




//first element is current page, second eelement is average sentiment
avg = 50+(final_calc/5);
    return [final_calc, avg, getEmoji(final_calc),getEmoji(avg)] //YOU NEED TO CHNAGE THIS VALUE
}

function getEmoji(num){
  if(num<10){
    return '0.0.png';
  }
  else if (num<20){
    return '0.2.png';
  }
  else if (num<40){
    return '0.4.png';
  }
  else if (num<60){
    return '0.5.png';
  }
  else if (num<70){
    return '0.6.png';
  }
  else if (num<80){
    return '0.8.png';
  }
  else if (num<100){
    return '1.png';
  }
}

function senti_calculation(text_arr) {
    var sum = 0; //total sum
    var sum_p = 0;
    var nP = 0; //number of positive scores
    var i = 0;
    var length = text_arr.length;
    while(i < text_arr.length) {
        score = text_arr[i];
        if(score == 0.5){
            if(i == text_arr.length - 1){
                sum += sum_p + score;
                break;
            }
            sum += score;
        }
        else if(score > 0.5) {
            if(i == text_arr.length - 1){
                sum += sum_p + score;
                break;
            }
            sum_p += score;
            nP += 1;
        }
        else {
            if(nP == 0) {
                sum += score;
            }
            else {
                sum += (sum_p + (score - 0.5) * nP) / (1.0*(nP + 1));
                length -= nP + 1;
                nP = 0;
                sum_p = 0;
            }

        }
        i++;
    }
    calculation = sum / (1.0 * length);
    // Turns calculation into an integer 0-100
    calculation = Math.round(calculation * 100);
    if (calculation<49 && calculation>20){
      calculation-=17;
    }
    else if( calculation>55 && calculation<65){
      calculation+=15;
    }
    console.log("here is the calculation: ", calculation);
    return calculation

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
