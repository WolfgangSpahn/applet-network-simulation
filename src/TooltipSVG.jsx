import { Show } from "solid-js";
import { tooltip } from "./TooltipSignal";

export default function TooltipSVG() {
    const deltaX = -25;
    const deltaY = -10;
  return (
    <Show when={tooltip()}>
      {(tip) => {
        const data = tip();
        return (
          <g transform={`translate(${data.x}, ${data.y - 10})`} pointer-events="none">
            <rect
              x={deltaX-2}
              y={deltaY-10}
              width={data.text.length * 7 + 20}
              height="35"
              fill="black"
              stroke="white"
              strokeWidth="1"
              rx="5"
            />
            <text x={deltaX+10} y={deltaY+13} fill="white" fontSize="8">
              {data.text}
            </text>
          </g>
        );
      }}
    </Show>
  );
}

