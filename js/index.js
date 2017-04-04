 var reqNo = 0;
 var accessToken = "3993ef03dda953b6bb63b71e0c0bfaa4bc0fa1a3";
  function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
   xmlHttp.onreadystatechange = function() {
     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
       callback(xmlHttp.responseText);
   }
   xmlHttp.open("GET", url, true);
   xmlHttp.send(null);
    reqNo += 1;
  }
$(function(){
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username+'?per_page=100&access_token=3993ef03dda953b6bb63b71e0c0bfaa4bc0fa1a3';
    var repouri  = 'https://api.github.com/users/'+username+'/repos?per_page=100&access_token=3993ef03dda953b6bb63b71e0c0bfaa4bc0fa1a3';
    var stared = 'https://api.github.com/users/'+username+'/starred?per_page=100&access_token=3993ef03dda953b6bb63b71e0c0bfaa4bc0fa1a3';
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        var starurl = json.starred_url;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">'+'<div class="repolists clearfix">';
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });  
        var staredrepo;
        $.getJSON(stared, function(json){
          staredrepo = json;   
          outputPageContents();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List | Forks:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '&nbsp|&nbsp'+repositories[index].forks_count+'</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#ghapidata').html(outhtml);
        } 
        function outputPageContents() {
          if(staredrepo.length == 0) { outhtml = outhtml + '<p>No starred repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Starred Repo | Forks:</strong></p> <ul>';
            $.each(staredrepo, function(index) {
              outhtml = outhtml + '<li><a href="'+staredrepo[index].html_url+'" target="_blank">'+staredrepo[index].name +'&nbsp|&nbsp'+staredrepo[index].forks_count+'</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#ghapidata').html(outhtml);
        } 
      } 
    }); 
  }); 
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});