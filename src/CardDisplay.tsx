import React, { useState } from "react";

interface CardDisplayProps {
    cardShort: string;
    angle: number;
    radius: number;
    containerWidth: number;
    containerHeight: number;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
                                                     cardShort,
                                                     angle,
                                                     radius,
                                                     containerWidth,
                                                     containerHeight,
                                                 }) => {
    const [hovered, setHovered] = useState(false);

    const cardW = 100;
    const cardH = 150;

    const cx = containerWidth / 2;
    const cy = containerHeight / 2 + 90;

    const x = cx + Math.sin(angle) * radius;
    const y = cy - Math.cos(angle) * radius;

    const deg = (angle * 180) / Math.PI;

    const pull = hovered ? 20 : 0;

    const nx = Math.sin(angle) * pull;
    const ny = -Math.cos(angle) * pull;

    return (
        <img
            src={`src/assets/cards/${cardShort}.svg`}
            alt={cardShort}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                width: `${cardW}px`,
                height: "auto",
                left: `${x - cardW / 2 + nx}px`,
                top: `${y - cardH / 2 + ny}px`,
                transform: `rotate(${deg}deg)`,
                transformOrigin: "bottom center",
                transition: "all 150ms ease-out",
                zIndex: Math.round(x),
            }}
        />
    );
};

export default CardDisplay;
