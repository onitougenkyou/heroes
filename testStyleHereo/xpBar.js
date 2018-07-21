$(document).ready(function() {
  var $btn = $(".btn");
  var level = 1;

  $btn.click(function() {
    var t = this;
    var $span = $(".currentXp");
    var $progress = $(".progressbar");
    var maxXp = parseInt($progress.attr("max-perc"));
    console.log("xp Max " + maxXp);

    var $bar = $(".bar");

    var dataperc = $(".xp").val();
    if (dataperc > maxXp) {
      if (dataperc > 200) {
        dataperc = dataperc - 200;
        level = level + 2;
        console.log("DATA 200 ", dataperc, "level " + level);
      } else {
        dataperc = dataperc - 100;
        level = level + 1;
        console.log("data 100 " + dataperc, "level " + level);
      }
    }
    var barpec = Math.round(dataperc * 5.56);

      $bar.animate({ width: barpec }, dataperc * 25);

    function perc() {
        var length = $bar.css("width");
      var perc = Math.round(parseInt(length) / 5.56);
    }
    perc();
    setInterval(perc, 0);
    $span.html(dataperc + "/" + maxXp);
  });
});
