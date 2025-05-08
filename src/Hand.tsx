import React, { useRef, useState, useEffect } from "react";
import CardDisplay from "./CardDisplay";

interface HandProps {
    cardList: string;
}

const Hand: React.FC<HandProps> = ({ cardList }) => {
    const cards = cardList.split(",");
    const count = cards.length;

    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth]   = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        function measure() {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            setWidth(r.width);
            setHeight(r.height);
        }
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // полный полуоборот (180°), начальный угол 180°
    const arc        = Math.PI*0.5;
    const startAngle = Math.PI/2 + arc/2;
    const delta      = count > 1 ? arc / (count - 1) : 0;
    // радиус = половина ширины контейнера
    const radius     = width / 2;

    return (
        <div
            ref={ref}
            className="relative w-full h-[400px] overflow-visible"
        >
            {width > 0 && cards.map((card, i) => {
                const angle = startAngle - i * delta;
                return (
                    <CardDisplay
                        key={card}
                        cardShort={card}
                        angle={angle}
                        radius={radius}
                        containerWidth={width}
                        containerHeight={height}
                    />
                );
            })}
        </div>
    );
};

export default Hand;
