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

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// We need to narrow down the scope of what we want to check against for a collision.
// If we implement scoring, then we could effectively narrow it down to three items to check.
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

    // TODO: Assume that our initial potential collisions are obstacle-1, and the ground.
    // When the score has been updated, that means we successfully passed another obstacle
    // So we should update our potential collisions to obstacle-2, and so on...
    hasCharacterCollided: function() {
      if (this.props.character.props.position > window.innerHeight) {
        // TODO: The character has gone off the bottom screen.
      }

      // Relevant obstacle to check against for collisions.
      var obstacleId = scoreManager.props.score + 1;
      var obstacle = obstacleManager.getObstacleById(obstacleId);

      var characterX = window.innerWidth / 2;
      var characterY = this.props.character.props.position;
      var characterHeight = 95;
      var characterWidth = 150;

    },
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
      this.props.obstacles.forEach(function(obstacle) {
        if (obstacle.props.obstacleId == id) {
          return obstacle;
        }
      });
    }
  };
}

window.addEventListener("onresize", function(event) {
  // TODO: Implement obstacle resizing at position.
});
