//Game Logic
function Game(table) {
    var _grid = [],
        _playerPos = [4, 4],
        _game,
        _width,
        _height,
        _key,
        _countDown,
        _inventory = document.querySelector("#inventory"),
        _score = 0, // number of fires put out
        _hiScore = localStorage.getItem("_hiScore") || 0,
        _water = 0,
        _timer = 60,
        _tds = document.querySelectorAll("td"),
        _draw = new Draw(table),
        obj = {
            start: start
        };

    // Loads the highscore in from local storage
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
        countDown();
        _countDown = setInterval(countDown, 1000);
        _game = setInterval(gameTick, 100);
    }

    // Randomly spawn fires and spawn water when nessisary
    // JSON Deep copy hack found on http://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
    function gameTick() {
        movePlayer(_key);
        gameCheck();
        spawn.water();
        spawn.fire();

        var newarr = JSON.parse(JSON.stringify(_grid)); //Deep copy of the array
        _draw.draw(newarr, _playerPos, _tds);
        _draw.drawScore(_score)
    }

    function countDown() {
        _timer--;
        _draw.drawTimer(_timer);
        if (!_timer) {
            gameOver("You ran out of time and didn't get the highscore");
        }
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
                    gameOver("You died in a fire and didn't even get the highscore");
                } else {
                    _score++;
                    _water--;
                    _inventory.removeChild(_inventory.childNodes[1]); // childNodes[0] is some sort of context node
                    spawn(_playerPos[0], _playerPos[1], "g");
                }
                break;

            case "w":
                _water++;
                spawn(_playerPos[0], _playerPos[1], "g");
                _inventory.appendChild(document.createElement("div"));
                break;
        }
    }

    function spawn(x, y, obj) {
        _grid[x][y] = obj;
    }

    // Spawns a fire randomly in the room
    spawn.fire = function() {
        if (Math.random() < 0.04) {
            var rand2 = randomInt(0, _height - 1);
            var rand1 = randomInt(0, _width - 1);
            if ((rand1 === _playerPos[0] && rand2 === _playerPos[1]) || !(_grid[rand1][rand2] == "g")) {
                return;
            }
            spawn(rand1, rand2, "f");
        }
    }

    // Spawns water randomly in the room
    spawn.water = function() {
        if (Math.random() < 0.032) {
            var rand2 = randomInt(0, _height - 1);
            var rand1 = randomInt(0, _width - 1);
            if ((rand1 === _playerPos[0] && rand2 === _playerPos[1]) || !(_grid[rand1][rand2] == "g")) {
                return;
            }
            spawn(rand1, rand2, "w");
        }
    }

    // Ends the game setting the highscore in a cookie
    function gameOver(msg) {
        clearInterval(_game);
        clearInterval(_countDown);
        _game = null;
        _countDown = null;
        if (_score > _hiScore) {
            alert("Congrats you got the new highscore of: " + _score);
            localStorage.setItem("_hiScore", _score);
        } else {
            alert(msg);
        }
    }

    function movePlayer(key) {
        switch (key) {
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
    }

    // Key stuff found on https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    window.addEventListener("keydown", function(event) {
        if (event.defaultPrevented || _game === null) {
            return; // Do nothing if the event was already processed
        } else {
            _key = event.key;
        }
    });

    return obj;
}

//Visual Module
function Draw() {
    var obj = {
        draw: draw,
        drawScore: drawScore,
        drawTimer: drawTimer
    }

    function drawScore(score) {
        document.querySelector("#test").innerHTML = '<h2>' + "Score: " + score + '</h2>';
    }

    function drawTimer(count) {
        document.querySelector("#countDown").innerHTML = '<h2>' + "Time: " + count + '</h2>';
    }

    function draw(worldArray, playerPosArray, table) {
        var counter = 0;
        //var table = document.querySelectorAll("td");
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
    }
    return obj;
}
