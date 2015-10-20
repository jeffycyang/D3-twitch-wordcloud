// YOUR CODE HERE:

var app = {

  dataArray: [],

  init: function() {
    app.fetch();
  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: "https://api.twitch.tv/kraken/games/top?limit=100",
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // app.clearMessages();
        // app.displayMessage(data);
        app.setData(data);
        console.log('chatterbox received: ' + data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: ' + data);
      }
    });
  },

  setData: function(data) {
    // var dataArray = [];
    // debugger;
    for(var i=0;i<data.top.length;i++){
      // if(data.top[i].viewers<4000){
      //   app.dataArray[i]={
      //     text:data.top[i].game.name,
      //     size:200
      //   }
      // }else{
        app.dataArray[i]={
          text:data.top[i].game.name,
          size:data.top[i].viewers/500
        }
      // }
    }
    debugger;
    var fill = d3.scale.category20();

    var layout = d3.layout.cloud()
        .size([2000, 1500])
        .words(app.dataArray.map(function(d) {
          return d;
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 35; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select("body").append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
    }

  }

};

app.init();
