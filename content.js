chrome.runtime.onMessage.addListener(function getMessage(request, sender, sendResponse) {
  resemble(request[0]).compareTo(request[1]).onComplete(function(data){
    console.log(data.misMatchPercentage);
    var img_dif = new Image();
    img_dif.src = data.getImageDataUrl();
    var threshold = data.misMatchPercentage;
    if (threshold > 1) {
      chrome.runtime.sendMessage({text: "Tabnabbing Detected"}, function(response) {
      });
        var win = window.open("Tabnabbing Anaylsis", "Tabnabbing Analysis");
        win.document.write("Tabnabbing has been detected! Mismatch percentage:"+threshold+"%");
        win.document.body.appendChild(img_dif);
    }
  });
});
