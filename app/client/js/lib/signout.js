module.exports = function(){
  gapi.auth2.getAuthInstance().signOut();
}
