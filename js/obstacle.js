var pipes = 0;

function createObstaclePair() {
  var upperPipe;
  var lowerPipe;

  var totalPipeLength = window.innerHeight - 320;
  var splitIntoChunks = totalPipeLength / 10;


  var minChunk = Math.ceil(2);
  var maxChunk = Math.floor(8);
  var randomChunk = Math.floor(Math.random() * (maxChunk - minChunk + 1)) + minChunk;

  var firstPipeLength = splitIntoChunks * randomChunk;
  var secondPipeLength = totalPipeLength - firstPipeLength;
  var obstacleId = pipes += 1;


  if (randomChunk % 2 == 0) {
    // Assign to the bottom pipe.
    lowerPipe = generateObstacleSVG(obstacleId, firstPipeLength, false, "scale(0.75, 1)");
    upperPipe = generateObstacleSVG(obstacleId, secondPipeLength, true, "scale(-0.75, 1) rotate(180)");
  } else {
    // Assign to the top pipe (because it's odd);
    upperPipe = generateObstacleSVG(obstacleId, firstPipeLength, true, "scale(-0.75, 1) rotate(180)");
    lowerPipe = generateObstacleSVG(obstacleId, secondPipeLength, false, "scale(0.75, 1)");
  }

  // Install the pipes into the page, and fix them to the appropriate location of the page.
  document.getElementById('game').insertAdjacentHTML('beforeend', lowerPipe);
  document.getElementById('game').insertAdjacentHTML('beforeend', upperPipe);
}

/**
 * Template literal that takes in a couple of values, and generates the SVG definition.
 **/
function generateObstacleSVG(id, pipeLength, isUpper, transform) {
  return `
  <svg id="pipe-${id}" width="208" height="${pipeLength + 40}" viewBox="0 0 208 ${pipeLength + 40}" transform="${transform}" class="${isUpper == true ? "upper-pipe" : "lower-pipe"}">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="pipe" transform="translate(8.000000, 56.000000)">
            <path d="M0,0 L192,0 L192,424 L0,424 L0,0 Z M8,8 L184,8 L184,424 L8,424 L8,8 Z" id="pipe-border" fill="#333333"></path>
            <rect fill="#3399FF" x="32" y="8" width="8" height="${pipeLength}"></rect>
            <rect fill="#3399FF" x="48" y="8" width="96" height="${pipeLength}"></rect>
            <rect fill="#3399FF" x="152" y="8" width="8" height="${pipeLength}"></rect>
            <rect fill="#59ACFF" x="8" y="8" width="24" height="${pipeLength}"></rect>
            <rect fill="#59ACFF" x="40" y="8" width="8" height="${pipeLength}"></rect>
            <rect fill="#0066CC" x="160" y="8" width="24" height="${pipeLength}"></rect>
            <rect fill="#0066CC" x="144" y="8" width="8" height="${pipeLength}"></rect>
        </g>
        <g id="pipe-wider">
            <path d="M0,0 L208,0 L208,56 L0,56 L0,0 Z M8,8 L200,8 L200,48 L8,48 L8,8 Z" id="pipe-border-wider" fill="#333333"></path>
            <rect fill="#59ACFF" x="8" y="8" width="24" height="40"></rect>
            <rect fill="#59ACFF" x="40" y="8" width="8" height="40"></rect>
            <rect fill="#3399FF" x="48" y="8" width="112" height="40"></rect>
            <rect fill="#3399FF" x="168" y="8" width="8" height="40"></rect>
            <rect fill="#3399FF" x="32" y="8" width="8" height="40"></rect>
            <rect fill="#0066CC" x="176" y="8" width="24" height="40"></rect>
            <rect fill="#0066CC" x="160" y="8" width="8" height="40"></rect>
        </g>
      </g>
  </svg>`;
}
