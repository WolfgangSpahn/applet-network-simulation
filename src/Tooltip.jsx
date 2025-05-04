// Tooltip.jsx
import { onMount, onCleanup } from "solid-js";
import { tooltip, setTooltip } from "./TooltipSignal";

export default function Tooltip(props) {
  onMount(() => {
    setTooltip({ x: props.x, y: props.y, text: props.text });
  });

  onCleanup(() => {
    setTooltip(null);
  });

  const handleMouseEnter = (e) => {
    const bbox = e.currentTarget.getBoundingClientRect();
    const svg = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - svg.left;
    const y = e.clientY - svg.top;
    setTooltip({ x, y, text: props.text });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <g
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </g>
  );
}