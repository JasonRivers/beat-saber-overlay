function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

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

  var pp1 = document.getElementById("pp1");
  var pp2 = document.getElementById("pp2");
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
      // Function doens't currently work with floats
      var _pp = data.pp.split(".");
      var _pp1 = pp1.innerText === '' ? 0 : parseInt(pp1.innerText,10);
      var _pp2 = pp2.innerText === '' ? 0 : parseInt(pp2.innerText,10);
      var _worldRank = worldRank.innerText === '' ? 0 : parseInt(worldRank.innerText, 10);
      var _countryRank = countryRank.innerText === '' ? 0 : parseInt(countryRank.innerText, 10);
      if (_worldRank != data.worldRank)
      {
        animateValue('worldRank', _worldRank, parseInt(data.worldRank, 10), 5000);
      }
      if (_countryRank != data.countryRank)
      {
        animateValue('countryRank', _countryRank, parseInt(data.countryRank, 10), 5000);
      }
      if (_pp1 != _pp[0] )
      {
        animateValue('pp1', _pp1, parseInt(_pp[0],10), 10);
      }
      if (_pp2 != _pp[1])
      {
        animateValue('pp2', _pp2, parseInt(_pp[1],10), 10);
      }
//      pp.innerText = data.pp;
    }
  });

  }
}
sh

})();


stats.update();
