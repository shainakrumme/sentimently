// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {


subscription_key = "592b4136ebff42608f4ca5e1b661d087";

    text_analytics_base_url = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?Ocp-Apim-Subscription-Key=592b4136ebff42608f4ca5e1b661d087";

    text = document.body.innerText;
    arr = text.split(".");
var i;
sentiments = [];
    documents={'documents':[]};
for (i= 0;i<100; i++){

   

    headers   = {"Ocp-Apim-Subscription-Key": subscription_key};
  

    console.log(arr[i]);
    console.log("here is the iteration: ", i);

   // sentiment_api_url = text_analytics_base_url + "sentiment";

    documents['documents']= documents['documents'].push({'id': i.toString(), 'language': 'en', 'text': arr[i]});


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
        response = JSON.parse(xhr.responseText)
        sentiment=response.documents["0"].score;
        console.log('here is the response***: ', response);
        // console.log("HERE IS CURRENT SENTIMENT", sentiment.toString());
        // console.log("HERE ARE THE SENTIMENTS ARR: ", window.sentiments);
        window.sentiments.push(sentiment);
    }
}
xhr.send( documents);

    final_calc =senti_calculation(window.sentiments);
    console.log("this is the array: ", window.sentiments);
    console.log("FINAL CALC **: ", final_calc);
    return final_calc
   
    // chrome.storage.sync.set({key: value}, function() {
    //       console.log('Value is set to ' + value);
    //     });
   
}

function senti_calculation(text_arr) {
    var sum = 0; //total sum
    var sum_p = 0;
    var nP = 0; //number of positive scores
    var i = 0;
    while(i < text_arr.length) {
        score = text_arr[i];
        console.log('here is the local score bich: ', score);
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
            }
            sum_p = 0;
            nP = 0;
        }
        console.log('current sum" ', sum);
        i++;
    }
    return sum / (1.0 * text_arr.length);

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});