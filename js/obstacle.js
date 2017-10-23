function createObstacle(obstacleId) {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      id: obstacleId,
      upperPipe: null,
      lowerPipe: null,
      randomChunk: -1,
      position: -300
    },

    init: function() {
      var minChunk = Math.ceil(2);
      var maxChunk = Math.floor(8);
      this.props.randomChunk = Math.floor(Math.random() * (maxChunk - minChunk + 1)) + minChunk;
      this.rescale();
      return this;
    },

    /**
    * Updates the location of the obstacle on the x-axis from right to left.
    * The renderer calls this method every tick to create a forward moving animation.
    */
    applyMovement: function() {
      this.props.position = (this.props.position += 2);
      var elArr = document.querySelectorAll(`#game #obstacle-${this.props.id} #pipe-${this.props.id}`);
      elArr[0].style.right = this.props.position;
      elArr[1].style.right = this.props.position;
    },

    /**
     * Inserts the obstacle (parent div and children) into the DOM.
     **/
    insert: function() {
      var obstacleDiv = document.createElement('div');
      obstacleDiv.id = `obstacle-${this.props.id}`;
      // TODO: Consolidate this into just one DOM write.
      document.getElementById('game').appendChild(obstacleDiv);
      document.getElementById(obstacleDiv.id).insertAdjacentHTML('beforeend', this.props.lowerPipe);
      document.getElementById(obstacleDiv.id).insertAdjacentHTML('beforeend', this.props.upperPipe);
    },

    /**
     * Removes the obstacle (parent div and children) from the DOM.
     **/
    remove: function() {
      var el = document.querySelector(`#obstacle-${this.props.id}`);
      el.parentNode.removeChild(el);
    },

    /**
     * Utility method that rescales the pipe length based on any changes to the viewport height.
     * For example, if the user scales their viewport down and the pipes now overlap and need rescaled.
     **/
    rescale: function() {
      var PIPE_GAP_OFFSET = 320; // Accounts for pipe header, and gap.
      var totalPipeHeight = window.innerHeight - PIPE_GAP_OFFSET;
      var firstPipeHeight = (totalPipeHeight / 10) * this.props.randomChunk;
      var secondPipeHeight = totalPipeHeight - firstPipeHeight;

      if (this.props.randomChunk % 2 == 0) {
        this.props.lowerPipe = this.createObstacleSVG(firstPipeHeight, false);
        this.props.upperPipe = this.createObstacleSVG(secondPipeHeight, true);
      } else {
        this.props.upperPipe = this.createObstacleSVG(firstPipeHeight, true);
        this.props.lowerPipe = this.createObstacleSVG(secondPipeHeight, false);
      }
    },

    /**
     * Utility method that dynamically generates the obstacle (pipe) SVG given some information.
     * For example, if we want to generate an upside down pipe, or maybe we want to rescale a pipe.
     **/
    createObstacleSVG: function(pipeHeight, isUpper) {
      var upperTransform = "scale(-0.75, 1) rotate(180)";
      var lowerTransform = "scale(0.75, 1)";
      return `
      <svg id="pipe-${this.props.id}" width="208" height="${pipeHeight + 40}" viewBox="0 0 208 ${pipeHeight + 40}" transform="${isUpper == true ? upperTransform : lowerTransform}" class="${isUpper == true ? "upper-pipe" : "lower-pipe"}">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="pipe" transform="translate(8.000000, 56.000000)">
                <g id="pipe-border" fill="#333333">
                    <rect x="0" y="0" width="8" height="${pipeHeight}"></rect>
                    <rect x="184" y="0" width="8" height="${pipeHeight}"></rect>
                    <rect x="8" y="0" width="176" height="8"></rect>
                </g>
                <rect fill="#3399FF" x="32" y="8" width="8" height="${pipeHeight}"></rect>
                <rect fill="#3399FF" x="48" y="8" width="96" height="${pipeHeight}"></rect>
                <rect fill="#3399FF" x="152" y="8" width="8" height="${pipeHeight}"></rect>
                <rect fill="#59ACFF" x="8" y="8" width="24" height="${pipeHeight}"></rect>
                <rect fill="#59ACFF" x="40" y="8" width="8" height="${pipeHeight}"></rect>
                <rect fill="#0066CC" x="160" y="8" width="24" height="${pipeHeight}"></rect>
                <rect fill="#0066CC" x="144" y="8" width="8" height="${pipeHeight}"></rect>
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
  };
}
