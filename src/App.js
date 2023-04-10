import "./App.css";
import { useState, useEffect } from "react";
import DotSemiCircle from "./SemiCircle.js";

function App() {
  const [players, setPlayers] = useState([]);
  const [addPlayerInput, setAddPlayerInput] = useState("");

  const [countdown, setCountdown] = useState(0); // set initial time remaining to 10 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevTimeRemaining) => {
        if (prevTimeRemaining > 0) return prevTimeRemaining - 1;
        else return 0;
      });
    }, 1000);
    return () => clearInterval(intervalId); // clear interval on component unmount
  }, []);

  function addPlayer(name) {
    const newPlayer = {
      id: String(Date.now()),
      name: name,
      role: null,
      seat: players.length + 1,
      alive: "Alive",
    };

    setPlayers([...players, newPlayer]);
  }

  function addPlayerInputChange(e) {
    setAddPlayerInput(e.target.value);
  }

  function addPlayerKeyDown(e) {
    let key = e.key;
    if (key === "Enter") {
      addPlayer(addPlayerInput);
      setAddPlayerInput("");
    }
  }

  function handlePlayerRoleChange(e) {
    const playerId = e.target.parentNode.id;
    const newRole = e.target.value;

    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, role: newRole };
      } else {
        return player;
      }
    });

    setPlayers(updatedPlayers);
  }

  function handlePlayerSeatChange(e) {
    const playerId = e.target.parentNode.id;
    const newSeat = e.target.value;

    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, seat: newSeat };
      } else {
        return player;
      }
    });

    setPlayers(updatedPlayers);
  }

  function handlePlayerAliveChange(e) {
    const playerId = e.target.parentNode.id;
    const newValue = e.target.value;

    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, alive: newValue, seat: "None" };
      } else {
        return player;
      }
    });

    setPlayers(updatedPlayers);
  }

  function removePlayer(e) {
    const playerId = e.target.parentNode.id;
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(updatedPlayers);
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function resetCountdown() {
    setCountdown(600);
  }

  function newGame() {
    setPlayers([]);
  }

  return (
    <div className="App">
      <div className="graphics">
        <div className="mafiaContainer">
          <p className="mafiaTitle">Mafia</p>
          <div className="mafiaPlayers">
            {players.map((player) => {
              if (player.role === "Mafia")
                if (player.alive === "Alive") {
                  return <p className="playerInMafia">{player.name}</p>;
                } else {
                  return (
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: "black",
                      }}
                    >
                      <p className="playerInMafia">{player.name}</p>
                    </div>
                  );
                }
            })}
          </div>
        </div>
        <div className="townContainer">
          <p className="townTitle">Town</p>
          <div className="townPlayers">
            {players.map((player) => {
              if (player.role === "Cop")
                if (player.alive === "Alive") {
                  return <p className="cop playerInTown">{player.name}</p>;
                } else {
                  return (
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      {" "}
                      <p className="cop playerInTown">{player.name}</p>
                    </div>
                  );
                }
            })}

            {players.map((player) => {
              if (player.role === "Medic")
                if (player.alive === "Alive") {
                  return <p className="medic playerInTown">{player.name}</p>;
                } else {
                  return (
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      {" "}
                      <p className="medic playerInTown">{player.name}</p>
                    </div>
                  );
                }
            })}

            {players.map((player) => {
              if (player.role === "Vig")
                if (player.alive === "Alive") {
                  return <p className="vig playerInTown">{player.name}</p>;
                } else {
                  return (
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      <p className="vig playerInTown">{player.name}</p>
                    </div>
                  );
                }
            })}

            {players.map((player) => {
              if (player.role === "Town")
                if (player.alive === "Alive") {
                  return <p className="town playerInTown">{player.name}</p>;
                } else {
                  return (
                    <div
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      <p className="town playerInTown">{player.name}</p>
                    </div>
                  );
                }
            })}
          </div>
        </div>

        <div className="seats">{DotSemiCircle(players)}</div>
        <div className="countdown">
          <p className="countdownTitle">Countdown</p>
          <div className="countdownTime">{formatTime(countdown)}</div>
        </div>
      </div>
      <div className="console">
        <div className="generalInputArea">
          <div className="addPlayerContainer">
            <p>Add Player: </p>
            <input
              onChange={addPlayerInputChange}
              onKeyDown={addPlayerKeyDown}
              value={addPlayerInput}
            />
          </div>
          <div className="newGameContainer">
            <button onClick={newGame}>New Game</button>
          </div>
          <div className="resetCountdownContainer">
            <button onClick={resetCountdown}>Reset Countdown</button>
          </div>
        </div>
        <div className="playersContainer">
          {players.map((player) => (
            <div className="player" key={player.id} id={player.id}>
              <p>{player.name}</p>
              <button className="removePlayerButton" onClick={removePlayer}>
                X
              </button>

              <select
                className="playerRole"
                value={player.role}
                onChange={handlePlayerRoleChange}
              >
                <option value="None">None</option>
                <option value="Mafia">Mafia</option>
                <option value="Town">Town</option>
                <option value="Cop">Cop</option>
                <option value="Medic">Medic</option>
                <option value="Vig">Vig</option>
              </select>

              <select
                className="playerSeat"
                value={player.seat}
                onChange={handlePlayerSeatChange}
              >
                <option value="None">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
              </select>

              <select
                className="playerAlive"
                value={player.alive}
                onChange={handlePlayerAliveChange}
              >
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
