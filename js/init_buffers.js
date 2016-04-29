var vertices = [
  1.0,  1.0,  0.0,
  -1.0, 1.0,  0.0,
  1.0,  -1.0, 0.0,
  -1.0, -1.0, 0.0
];

var colours = [
  1.0,  1.0,  1.0,  1.0,    // white
  1.0,  0.0,  0.0,  1.0,    // red
  0.0,  1.0,  0.0,  1.0,    // green
  0.0,  0.0,  1.0,  1.0     // blue
];

var make_colours = function(gl){
  return function(vertices){
    var colours = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colours);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return colours;
  };
};


var make_square = function(gl){
  return function(vertices){
    var square = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, square);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    return square;
  };
};

var mutate = function(vertices){
  return vertices.map(function(value){
    return (Math.random() < 0.5) ? Math.random() : value;
  });
};

module.exports = function(gl) {

  return { 
    get_square: function(){
      var randomised_vertices = mutate(vertices);
      return make_square(gl)(vertices);
    },
    get_colours: function(){
      var random_colours = mutate(colours);
      return make_colours(gl)(random_colours);
    }
  };
};

