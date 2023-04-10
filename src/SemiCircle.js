import React from "react";

const DotSemiCircle = (players) => {
  const dotCount = 14;
  const dotRadius = 5;
  const radius = 100;
  const centerX = 170;
  const centerY = 75;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;

  const dots = [];

  for (let i = 0; i < dotCount; i++) {
    const angle = ((i + 1) * Math.PI) / (dotCount + 1);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    let playerAtSeat;
    let color = `black`;

    if (players) {
      players.forEach((player) => {
        if (player.seat == i + 1) {
          playerAtSeat = player;
        }
      });

      if (playerAtSeat && playerAtSeat.alive == "Alive") {
        if (playerAtSeat.role === "Cop") color = "blue";
        if (playerAtSeat.role === "Vig") color = "green";
        if (playerAtSeat.role === "Medic") color = "pink";
        if (playerAtSeat.role === "Mafia") color = "red";
        if (playerAtSeat.role === "Town") color = "tan";
      }
    }

    dots.push(
      <div
        key={i}
        style={{
          position: "absolute",
          top: y - dotRadius,
          left: x - dotRadius,
          width: dotRadius * 2,
          height: dotRadius * 2,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transform: "scaleX(-1) scaleY(-1)",
      }}
    >
      {dots}
    </div>
  );
};

export default DotSemiCircle;
