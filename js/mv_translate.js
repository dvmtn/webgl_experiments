function multMatrix(mvMatrix, m) {
  return mvMatrix.x(m);
}

function mvTranslate(mvMatrix, v) {
  return multMatrix(mvMatrix, Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

module.exports = mvTranslate;

