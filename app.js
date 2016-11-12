//Game Logic
function Game(table) {
    var _grid = [],
        _playerPos = [4, 4],
        _game,
        _width,
        _height,
        _hiScore,
        _score = 0, // number of fires put out
        _water = 0,
        _timer = 0,
        _draw = new Draw(table),
        obj = {
            start: start
        };

    // Loads the highscore in from a cookie
    // Layout the grid
    function start() {
        _height = document.querySelectorAll("#" + table + " tr").length;
        _width = document.querySelectorAll("#" + table + " td").length / _height;
        for (var i = 0; i < _height; i++) {
            _grid.push([]);
            for (var j = 0; j < _width; j++) {
                _grid[i][j] = "g";
            }
        }
        _game = setInterval(gameTick, 100);
    }

    // Randomly spawn fires and spawn water when nessisary
    // JSON Deep copy hack found on http://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
    function gameTick() {
        spawnWater();
        spawnFire();
        gameCheck();

        var newarr = JSON.parse(JSON.stringify(_grid)); //Deep copy of the array
        _draw.draw(newarr, _playerPos);

        //FIXME I dont know if this is the best way to do it
        _draw.drawScore(_score)
    }

    function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Checks to see if two items are overlapping and takes the nessisary action
    function gameCheck() {
        switch (_grid[_playerPos[0]][_playerPos[1]]) {
            case "f":
                if (_water === 0) {
                    gameOver();
                } else {
                    _score++;
                    _water--;
                    spawn(_playerPos[0], _playerPos[1], "g");
                }
                break;

            case "w":
                _water++;
                spawn(_playerPos[0], _playerPos[1], "g");

                 document.querySelector("#inventory").appendChild(document.createElement("div"));
                // document.querySelector("#inventory").innerHTML = '<tr id="inv"><td></td></tr>';
                break;
        }
    }

    function spawn(x, y, obj) {
        _grid[x][y] = obj;
    }

    // Spawns a fire randomly in the room
    function spawnFire() {
        if (Math.random() < 0.04 ) {
            var rand2 = randomInt(0, _height - 1);
            var rand1 = randomInt(0, _width - 1);
            if ((rand1 === _playerPos[0] && rand2 === _playerPos[1])  || !(_grid[rand1][rand2] == "g")) {
                return;
            }
            spawn(rand1, rand2, "f");
        }
    }

    // Spawns water randomly in the room
    function spawnWater() {
        if ( Math.random() < 0.032 ) {
            var rand2 = randomInt(0, _height - 1);
            var rand1 = randomInt(0, _width - 1);
            if ((rand1 === _playerPos[0] && rand2 === _playerPos[1]) || !(_grid[rand1][rand2] == "g")) {
                return;
            }
            spawn(rand1, rand2, "w");
        }

    }

    // Ends the game setting the highscore in a cookie
    function gameOver() {
        clearInterval(_game);
        alert("DIE");

    }

    // Key stuff found on https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    window.addEventListener("keydown", function(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case "w": //w
                if (_playerPos[0] > 0) {
                    _playerPos[0] = _playerPos[0] - 1;
                }
                break;

            case "a": //a
                if (_playerPos[1] > 0) {
                    _playerPos[1] = _playerPos[1] - 1;
                }
                break;

            case "s": //s
                if (_playerPos[0] < _height - 1) {
                    _playerPos[0] = _playerPos[0] + 1;
                }
                break;

            case "d": //d
                if (_playerPos[1] < _width - 1) {
                    _playerPos[1] = _playerPos[1] + 1;
                }
                break;
        }
        gameCheck();
    });

    return obj;
}









//Visual Module
function Draw() {
    var obj = {
        draw: draw,
        drawScore: drawScore
    }

    function drawScore(score) {
      document.querySelector("#test2").innerHTML = '<h2>' + "Score: " + score + '</h2>';
    }

    function draw(worldArray, playerPosArray) {
        var counter = 0;
        var table = document.querySelectorAll("td");
        worldArray[playerPosArray[0]][playerPosArray[1]] = "p";

        for (var i = 0; i < worldArray.length; i++) {
            for (var j = 0; j < worldArray[i].length; j++) {
                switch (worldArray[i][j]) {
                    case "g":
                        table[counter].style.backgroundImage = "url('images/grass.png')";
                        break;

                    case "f":
                        table[counter].style.backgroundImage = "url('images/fire.gif')";
                        break;

                    case "w":
                    table[counter].style.backgroundImage = "url('images/water.png')";
                        break;

                    case "p":
                        table[counter].style.backgroundImage = "url('images/player.png')";
                        break;
                }
                counter++;
            }
        }

        // document.querySelector("#test").innerHTML = worldArray.join('<br />');

        //console.log(worldArray.join('\n'));

    }

    return obj;
}
