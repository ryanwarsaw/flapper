function createObstacle(obstacleId, scoreManager) {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      id: obstacleId,
      upperPipe: null,
      lowerPipe: null,
      randomChunk: -1,
      position: -300,
      hasPassed: false
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
      var CHARACTER_BODY_OFFSET = 75; // Transform scale offset in px.
      if (!this.props.hasPassed && (window.innerWidth / 2) + CHARACTER_BODY_OFFSET <= this.props.position) {
        scoreManager.incrementScore();
        this.props.hasPassed = true;
      }

      this.props.position = (this.props.position += 2);
      this.props.lowerPipe.x = this.props.position;
      this.props.upperPipe.x = this.props.position;
      var elArr = document.querySelectorAll(`#game #obstacle-${this.props.id} #pipe-${this.props.id}`);
      elArr[0].style.right = this.props.position + "px";
      elArr[1].style.right = this.props.position + "px";
    },

    /**
     * Inserts the obstacle (parent div and children) into the DOM.
     **/
    insert: function() {
      var obstacleDiv = document.createElement('div');
      obstacleDiv.id = `obstacle-${this.props.id}`;
      // TODO: Consolidate this into just one DOM write.
      document.getElementById('game').appendChild(obstacleDiv);
      document.getElementById(obstacleDiv.id).insertAdjacentHTML('beforeend', this.props.lowerPipe.svg);
      document.getElementById(obstacleDiv.id).insertAdjacentHTML('beforeend', this.props.upperPipe.svg);
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
      var PIPE_GAP_OFFSET = 360; // Accounts for pipe header, and gap.
      var totalPipeHeight = window.innerHeight - PIPE_GAP_OFFSET;
      var firstPipeHeight = (totalPipeHeight / 10) * this.props.randomChunk;
      var secondPipeHeight = totalPipeHeight - firstPipeHeight;

      if (this.props.randomChunk % 2 == 0) {
        this.props.lowerPipe = {
          x: -300,
          y: window.innerHeight - (firstPipeHeight + 40),
          height: firstPipeHeight + 40,
          width: 156,
          svg: this.createObstacleSVG(firstPipeHeight, false)
        };
        this.props.upperPipe = {
          x: -300,
          y: 0,
          height: secondPipeHeight + 40,
          width: 156,
          svg: this.createObstacleSVG(secondPipeHeight, true)
        };
      } else {
        this.props.upperPipe = {
          x: -300,
          y: 0,
          height: firstPipeHeight + 40,
          width: 156,
          svg: this.createObstacleSVG(firstPipeHeight, true)
        };
        this.props.lowerPipe = {
          x: -300,
          y: window.innerHeight - (secondPipeHeight + 40),
          height: secondPipeHeight + 40,
          width: 156,
          svg: this.createObstacleSVG(secondPipeHeight, false)
        };
      }
    },

    /**
     * Utility method that dynamically generates the obstacle (pipe) SVG given some information.
     * For example, if we want to generate an upside down pipe, or maybe we want to rescale a pipe.
     **/
    createObstacleSVG: function(pipeHeight, isUpper) {
      return `
      <svg id="pipe-${this.props.id}" width="156" height="${pipeHeight + 40}" viewBox="0 0 156 ${pipeHeight + 40}" class="${isUpper == true ? "upper-pipe" : "lower-pipe"}">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="pipe" transform="translate(6.000000, 56.000000)">
                <g id="pipe-border" fill="#333333">
                    <rect x="0" y="0" width="6" height="${pipeHeight}"></rect>
                    <rect x="138" y="0" width="6" height="${pipeHeight}"></rect>
                    <rect x="6" y="0" width="132" height="8"></rect>
                </g>
                <rect fill="#3399FF" x="24" y="8" width="6" height="${pipeHeight}"></rect>
                <rect fill="#3399FF" x="36" y="8" width="72" height="${pipeHeight}"></rect>
                <rect fill="#3399FF" x="114" y="8" width="6" height="${pipeHeight}"></rect>
                <rect fill="#59ACFF" x="6" y="8" width="18" height="${pipeHeight}"></rect>
                <rect fill="#59ACFF" x="30" y="8" width="6" height="${pipeHeight}"></rect>
                <rect fill="#0066CC" x="120" y="8" width="18" height="${pipeHeight}"></rect>
                <rect fill="#0066CC" x="108" y="8" width="6" height="${pipeHeight}"></rect>
            </g>
            <g id="pipe-wider" fill-rule="nonzero">
                <path d="M0,0 L156,0 L156,56 L0,56 L0,0 Z M6,8 L150,8 L150,48 L6,48 L6,8 Z" id="pipe-border-wider" fill="#333333"></path>
                <rect fill="#59ACFF" x="6" y="8" width="18" height="40"></rect>
                <rect fill="#59ACFF" x="30" y="8" width="6" height="40"></rect>
                <rect fill="#3399FF" x="36" y="8" width="84" height="40"></rect>
                <rect fill="#3399FF" x="126" y="8" width="6" height="40"></rect>
                <rect fill="#3399FF" x="24" y="8" width="6" height="40"></rect>
                <rect fill="#0066CC" x="132" y="8" width="18" height="40"></rect>
                <rect fill="#0066CC" x="120" y="8" width="6" height="40"></rect>
            </g>
          </g>
      </svg>`;
    }
  };
}
