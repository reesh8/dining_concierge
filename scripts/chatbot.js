$(document).ready(function(){
$('#action_menu_btn').click(function(){
    $('.action_menu').toggle();
});
});


function timeNow() {
  var d = new Date(),
    h = (d.getHours()<10?'0':'') + d.getHours(),
    m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
}


function gotoBottom() {
    let element = document.getElementById("sean_add");
    element.scrollTop = element.scrollHeight - element.clientHeight;
}


function sendLeft(sentence){
    if (sentence[0] == '"') {
        sentence = sentence.substr(1, sentence.length-2);
    } 

    $("#sean_add").append('\
        <div class=\"d-flex justify-content-start mb-4\">\
        <div class="img_cont_msg">\
        <img src="img/head.png" class="rounded-circle user_img_msg">\
        </div>\
        <div class="msg_cotainer">' +
        sentence +
        '<span class="msg_time">' + timeNow() + '</span>\
        </div>\
        </div>'
    );
    gotoBottom();
}


function sendRight(){
    var msg = document.getElementById("sean_text_area").value;
      
    $("#sean_add").append('\
        <div class="d-flex justify-content-end mb-4">\
        <div class="msg_cotainer_send">' +
        msg +
        '<span class="msg_time_send">' + timeNow() + '</span>\
        </div>\
        <div class="img_cont_msg">\
        <img src="img/head2.png" class="rounded-circle user_img_msg">\
        </div>\
        </div>'
    );
    document.getElementById("sean_text_area").value = "";
    gotoBottom();
    return msg;
}


$(document).keyup(function(event){
  if (event.keyCode == 13){
    // sendLeft('hi how is it going?');
    var msg = sendRight();
    var inputText = msg;
    var apigClient = apigClientFactory.newClient();
    var params = {};
    var body = {
        "message": inputText,
        };
    var additionalParams = {
        headers: {
        // 'Origin':'http://example.com'
        },
        queryParams: {}
    };        

    //  'x-api-key': 'Your API KEY'
    //  'Origin': 'http://example.com'
    
    apigClient.chatbotPost(params, body, additionalParams)
      .then(function(result) {
          console.log("eRRor:"+JSON.stringify(result));
        sendLeft(result.data.body);
      }).catch(function(err,result) {
        console.log(err);
      });
  }
});