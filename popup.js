


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source[0];
    average.innerText = request.source[1];
    page_emoji.src = "emojis/"+request.source[2];
    user_average_emoji.src = "emojis/"+request.source[3];


  }
});


function onWindowLoad() {

  var message = document.querySelector('#message');
  var average = document.querySelector('#average');
  var page_emoji = document.querySelector('#page_emoji');
  var user_average_emoji = document.querySelector('#user_average_emoji');


  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
