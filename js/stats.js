var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

const stats = (() => {

  var pp = document.getElementById("pp");
  var worldRank = document.getElementById("worldRank");
  var countryRank = document.getElementById("countryRank");
  var steamid = query.get('steamid');



return {

 update() {
  getJSON('/stats/'+steamid,
  function(err, data) {
    if (err !== null) {
      console.log('Something went wrong: ' + err);
    } else {
      pp.innerText = data.pp;
      countryRank.innerText = data.countryRank;
      worldRank.innerText = data.worldRank;
    }
  });

  }
}


})();


stats.update();
