var countstar=0,java=0,js=0,css=0,php=0,ruby=0,cpp=0,c=0,shell=0,others=0,chash=0,oc=0,r=0,viml=0,go=0,perl=0,cs=0,tex=0,swift=0,scala=0,clojure=0,rust=0,ps=0;
var lang;
$(function(){
  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    var stared = 'https://api.github.com/users/'+username+'/starred';
    var emoji = new EmojiConvertor();
    emoji.img_sets.apple.path = "http://cdn.mubaris.com/emojis/";
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var bio        = json.bio
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        var starurl = json.starred_url;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'<br>Bio: '+bio+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">'+'<div class="repolists clearfix">';
        outhtml = emoji.replace_colons(outhtml);

        
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
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '&nbsp|&nbsp<i class=\'fa fa-code-fork\'></i>'+repositories[index].forks_count+'&nbsp|<i class=\'fa fa-star\'></i>&nbsp'+repositories[index].stargazers_count+'&nbsp|&nbsp <i class=\'fa fa-database\'></i>&nbsp'+repositories[index].language+'</a></li>';
              countstar=countstar+repositories[index].stargazers_count;
              lang=repositories[index].language;
              switch(lang)
                  {
                case 'JavaScript' : js++;
                                     break;
                
                case 'Java' : java++;
                                     break;
                
                case 'CSS' : css++;
                                     break;
                
                case 'PHP' : php++;
                                     break;
                 
                case 'Ruby' : ruby++;
                                     break;
                
                case 'C++' : cpp++;
                                     break;
                
                case 'C' : c++;
                                     break;
                
                case 'Shell' : shell++;
                                     break;
                
                case 'c#' : chash++;
                                     break;
                
                case 'Go' : go++;
                                     break;
                 
                case 'Perl' : perl++;
                                     break;
                          
                case 'Swift' : swift++;
                                     break;
                 
                case 'Scala' : scala++;
                                     break;
                
                case 'Clojure' : clojure++;
                                     break;
                 
                case 'Rust' : rust++;
                                     break;
                
                case 'PowerShell' : ps++;
                                     break;
                  default : others++;
                            break;
                  }
            });https://api.github.com/repos/robconery/capistrano-rails-server/languages
            outhtml = outhtml + '</ul></div>'; 
          }
          outhtml = outhtml + '<br><strong>Total Stars:</strong>'+countstar;
          $('#ghapidata').html(outhtml);
        } 
        function outputPageContents() {
          if(staredrepo.length == 0) { outhtml = outhtml + '<p>No starred repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Starred Repo:</strong></p> <ul>';
            $.each(staredrepo, function(index) {
              outhtml = outhtml + '<li><a href="'+staredrepo[index].html_url+'" target="_blank">'+staredrepo[index].name +'&nbsp|&nbsp<i class=\'fa fa-code-fork\'></i>'+staredrepo[index].forks_count+'&nbsp|&nbsp <i class=\'fa fa-star\'></i>'+repositories[index].stargazers_count+'</a></li>';
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
