var character = createCharacter("#character");
var scoreManager = new ScoreManager().init();
var obstacleManager = new ObstacleManager(scoreManager).init();
var collisionHandler = new CollisionHandler(character, scoreManager, obstacleManager).init();

var TICKS_PER_SECOND = 60;

window.onload = function() {
  obstacleManager.spawnObstacle();

  var gameTickLoop = setInterval(function() {
    character.applyGravity();
    obstacleManager.applyMovementAll();
    obstacleManager.shouldSpawnObstacle();
    collisionHandler.hasCharacterCollided();
  }, 1000 / TICKS_PER_SECOND);
}

function CollisionHandler(characterToHandle, scoreManager, obstacleManager) {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      character: characterToHandle,
    },

    init: function() {
      return this;
    },

    /**
     * Checks various cases where the character could potentially collide with its environment.
     * For example: It has gone off the bottom of the screen, or hit a lower/upper pipe.
     **/
    hasCharacterCollided: function() {
      if (this.props.character.props.position > window.innerHeight) {
        // TODO: The character has gone off the bottom screen.
      }

      var obstacleId = scoreManager.props.score + 1;
      var obstacle = obstacleManager.getObstacleById(obstacleId);

      var lowerPipe = obstacle.props.lowerPipe;
      if (this.checkForCollision(character, lowerPipe)) {
        // TODO: Collision has been detected.
        console.log(`Character has collided with the lower pipe.`);
      }

      var upperPipe = obstacle.props.upperPipe;
      if (this.checkForCollision(character, upperPipe)) {
        // TODO: Collision has been detected.
        console.log(`Character has collided with the upper pipe.`);
      }
    },

    /**
     * Utility function that takes in a character and pipe object, and determines if a collision has happened.
     **/
    checkForCollision: function(character, pipe) {
      // TODO: Maybe implement the same positional structure here as we did for obstacles.
      var characterX = window.innerWidth / 2;
      var characterY = this.props.character.props.position;
      var characterHeight = 95;
      var characterWidth = 150;
      return characterX < (pipe.x + pipe.width) && (characterX + characterWidth) > pipe.x &&
          characterY < (pipe.y + pipe.height) && (characterHeight + characterY) > pipe.y;
    }
  };
}

function ScoreManager() {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      score: 0
    },

    init: function() {
      return this;
    },

    incrementScore: function() {
      this.props.score++;
      this.updateScoreDisplay();
    },

    updateScoreDisplay: function() {
      var scoreEl = document.getElementById('score');
      scoreEl.innerHTML = `Score: ${this.props.score}`;
    }
  };
}

function ObstacleManager(scoreManager) {
  return {
    /**
     * Internal properties, DO NOT write directly to them, used to maintain internal state.
     **/
    props: {
      obstacles: [],
      leadIndex: 1
    },


    init: function() {
      return this;
    },

    /**
     * Iterates through the array of obstacles this instance of ObstacleManager is managing,
     * and updates their positions every tick to create the forward-moving animation.
     **/
    applyMovementAll: function() {
      this.props.obstacles.forEach(function(obstacle) {
        obstacle.applyMovement();
      });
    },

    /**
     * Creates a new Obstacle object, initializes it and inserts it into the DOM.
     * Adds the new obstacle to the array of obstacles managed by this instance, and updates the lead index.
     **/
    spawnObstacle: function() {
      var obstacle = createObstacle(this.props.leadIndex, scoreManager).init();
      obstacle.insert();
      this.props.obstacles.push(obstacle);
      this.props.leadIndex++;
    },

    /**
     * Distance-based function that determines whether it's time to spawn a new obstacle into the game.
     * Cleans up obstacles that have run off the page so we don't spend processing time updating them.
     **/
    shouldSpawnObstacle: function() {
      var lastSpawnedObstacle = this.props.obstacles[this.props.obstacles.length - 1];
      // Distance between each obstacle is 500px, the starting position is -300px.
      if (lastSpawnedObstacle.props.position >= 200) {
        this.spawnObstacle();
      }

      var firstSpawnedObstacle = this.props.obstacles[0];
      if (firstSpawnedObstacle.props.position > window.innerWidth) {
        this.props.obstacles.splice(0, 1);
        firstSpawnedObstacle.remove();
      }
    },

    /**
     * Searches through the array of obstacles this instance of ObstacleManager manages,
     * and returns the first that has a matching obstacle id to the id parameter provided.
     **/
    getObstacleById: function(id) {
      var result;
      this.props.obstacles.forEach(function(obstacle) {
        if (obstacle.props.id == id) {
          result = obstacle;
        }
      });
      return result;
    }
  };
}

window.addEventListener("resize", function(event) {
  // TODO: Implement obstacle resizing at position.
});
