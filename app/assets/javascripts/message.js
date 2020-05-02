$(function(){

  function buildHTML(message){
    if ( message.image) {
      var html = 
        `<div class="chat-contents" data-message-id=${message.id}>
        <div class="chat-message-user">
            <div class="chat-message-user__user-name">
            ${message.user_name}
            </div>
            <div class="chat-message-user__day">
              ${message.created_at}
              </div>
              </div>
            <div class="chat-message-user-message">
            <p class="chat-message-user-message__content">
            ${message.content}
            </p>
            <img class="chat-message__image" src=${message.image}>
            </div>   
            </div>`
            return html;
          }   else {
            var html =
            `<div class="chat-contents" data-message-id=${message.id}>
            <div class="chat-message-user">
            <div class="chat-message-user__user-name">
            ${message.user_name}
            </div>
            <div class="chat-message-user__day">
                    ${message.created_at}
                  </div>
                  </div>
                  <div class="chat-message-user-message">
                  <p class="chat-message-user-message__content">
                    ${message.content}
                    </p>
                    </div>`
                    return html;
                  };
    }
    
    
    $('#new_message').on ('submit', function(e){
      e.preventDefault();   
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type:"POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-message').append(html);
        $('form')[0].reset();
        $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
      .always(function() {
        $(".submit-btn").prop('disabled', false);
      });
    })
    
    var reloadMessages = function(){
      var last_message_id = $('.chat-contents:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        url:"api/messages",
        type:'get',
        dataType:'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        console.log(messages)
        if (messages.length !==0){
          var insertHTML ='';
          $.each(messages,function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.chat-message').append(insertHTML);
          $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages,7000);
  }
});