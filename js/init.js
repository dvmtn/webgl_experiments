require('./sylvester_extensions');
var initWebGL = require('./init_webgl');
var initShaders = require('./init_shaders');
var initBuffers = require('./init_buffers');
var make_perspective = require('./make_perspective');
var setMatrixUniforms = require('./set_matrix_uniforms');
var mvTranslate = require('./mv_translate');

var setup = function(){
  var canvas = document.getElementById('display');
  var gl = initWebGL(canvas);

  var set_dimensions = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height); 
  };

  if (gl) {
    window.addEventListener('resize', set_dimensions);
    set_dimensions();
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var shaders = initShaders(gl);
    var buffers = initBuffers(gl);
    var loop = function(){
      drawScene(gl, buffers, shaders, canvas);
      requestAnimationFrame(loop);
    };
    loop();
  }
};

var drawScene = function(gl, buffers, shaders, canvas){
  var distance = 45;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  var perspectiveMatrix = make_perspective(distance, canvas.width/canvas.height, 0.1, 100.0);

  var mvMatrix = Matrix.I(4);

  mvMatrix = mvTranslate(mvMatrix, [-0.0, 0.0, -6.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.get_square());
  gl.vertexAttribPointer(shaders.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.get_colours());
  gl.vertexAttribPointer(shaders.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

  setMatrixUniforms(gl, shaders.program, perspectiveMatrix, mvMatrix);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

window.addEventListener('load', setup);
