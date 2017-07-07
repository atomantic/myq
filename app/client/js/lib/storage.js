var storage = {
  test: function(){
    try {
      var test = 'test';
      localStorage.setItem(test, 1);
      localStorage.getItem(test);
      localStorage.removeItem(test);
    } catch(e) {
      return false;
    }
  },
  get: function(name){
    localStorage.getItem(name);
  },
  set: function(name, val){
    localStorage.setItem(name, val);
  },
  del: function(name){
    localStorage.removeItem(name);
  }
};
module.exports = storage;
