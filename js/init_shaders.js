var compile_shader = require("./compile_shader");
var create_program = require("./create_program");
var fragment = require("./shaders/fragment.glsl");
var vertex = require("./shaders/vertex.glsl");

module.exports = function(gl) {
  var fragmentShader = compile_shader(gl, fragment, gl.FRAGMENT_SHADER);
  var vertexShader = compile_shader(gl, vertex, gl.VERTEX_SHADER );
  
  // Create the shader program
  
  var shaderProgram = create_program(gl, vertexShader , fragmentShader);
  
  // If creating the shader program failed, alert
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  
  gl.useProgram(shaderProgram);
  
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);

  vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
  gl.enableVertexAttribArray(vertexColorAttribute);
  

  return {
    program:shaderProgram,
    vertexPositionAttribute: vertexPositionAttribute,
    vertexColorAttribute: vertexColorAttribute
  }
};

