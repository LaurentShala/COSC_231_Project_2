function Game(table){

  var _grid = [],
      _playerPos = [0, 0],
      _game,
      _width,
      _height,
      _hiScore,
      _score, // number of fires put out
      _water = 0,
      _timer = 0,
      _draw = new Draw(table),
      obj = {
        start: start
      };

// Loads the highscore in from a cookie
// Layout the grid
  function start(){
    _height = document.querySelectorAll("#" + table + " tr").length;
    _width = document.querySelectorAll("#" + table + " td").length / _height;
    for (var i = 0; i < _height; i++){
      _grid.push([]);
      for (var j = 0; j < _width; j++){
        _grid[i][j] = "g";
      }
    }
    _game = setInterval(gameTick, 100);
  }

// Randomly spawn fires and spawn water when nessisary
// JSON Deep copy hack found on http://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
  function gameTick(){
    gameCheck();
    var newarr = JSON.parse(JSON.stringify(_grid)); //Deep copy of the array
    _draw.draw(newarr, _playerPos);
  }

// Checks to see if two items are overlapping and takes the nessisary action
  function gameCheck(){
    if(_grid[_playerPos[0]][_playerPos[1]] === "f"){
      if(_water === 0){
        gameOver();
      }else{
        _score++;
        spawn(_playerPos[0], _playerPos[1], "g");
      }

    }else if(_grid[_playerPos[0]][_playerPos[1]] === "w"){

    }
  }

  function spawn(x, y, obj){
    _grid[x][y] = obj;
  }

// Spawns a fire randomly in the room
  function spawnFire(){

  }

// Spawns water randomly in the room
  function spawnWater(){

  }

// Ends the game setting the highscore in a cookie
  function gameOver(){
    clearInterval(_game);
  }

// Key stuff found on https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
  window.addEventListener("keydown", function (event){
    if (event.defaultPrevented){
      return; // Do nothing if the event was already processed
    }

    switch (event.key){
      case "w": //w
        if(_playerPos[0] > 0){
          _playerPos[0] = _playerPos[0] -1;
        }
        break;

      case "a": //a
        if(_playerPos[1] > 0){
          _playerPos[1] = _playerPos[1] -1;
        }
        break;

      case "s": //s
        if(_playerPos[0] < _height -1){
          _playerPos[0] = _playerPos[0] +1;
        }
        break;

      case "d": //d
        if(_playerPos[1] < _width -1){
          _playerPos[1] = _playerPos[1] +1;
        }
        break;
    }
    gameCheck();
  });

  return obj;
}





















function Draw(){
  var obj = {
    draw: draw
  }

  function draw(worldArray, playerPosArray){
    worldArray[playerPosArray[0]][playerPosArray[1]] = "w";
    document.querySelector("#test").innerHTML = worldArray.join('<br />');
    //console.log(worldArray.join('\n'));

  }

  return obj;
}
