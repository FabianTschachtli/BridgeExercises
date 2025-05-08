import React, { useState } from "react";

interface CardDisplayProps {
    cardShort: string;       // "AS", "10H" и т.д.
    angle: number;           // угол в радианах
    radius: number;          // радиус дуги в px
    containerWidth: number;  // ширина контейнера
    containerHeight: number; // высота контейнера
}

const CardDisplay: React.FC<CardDisplayProps> = ({
                                                     cardShort, angle, radius, containerWidth, containerHeight
                                                 }) => {
    const [hovered, setHovered] = useState(false);

    const cardW = 80;   // ширина картинки карты
    const cardH = 100;  // высота картинки карты

    // pivot — точка центра дуги, помещаем её чуть **над** контейнером
    const cx = containerWidth / 2;
    const cy = containerHeight - 500;  // 10% радиуса выше нуля

    // координаты центра карты
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    // поворот: чтобы низ карты был по дуге, добавляем +90°
    const deg = (angle * 180) / Math.PI + 90;

    // при наведении выдвигаем карту вперёд (по нормали дуги)
    const pull = hovered ? 20 : 0;
    // смещение по нормали: в радианной системе нормаль на угол = angle + π/2
    const nx = Math.cos(angle + Math.PI/2) * pull;
    const ny = Math.sin(angle + Math.PI/2) * pull;

    return (
        <img
            src={`src/assets/cards/${cardShort}.svg`}
            alt={cardShort}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position:         "absolute",
                width:            `${cardW}px`,
                height:           "auto",
                left:             `${x - cardW / 2 + nx}px`,
                top: `${y - cardH / 2 + ny}px`,
                transform:        `rotate(${deg}deg)`,
                transformOrigin:  "bottom center",
                transition:       "all 150ms ease-out",
                zIndex:           Math.round(x),
            }}
        />
    );
};

export default CardDisplay;
