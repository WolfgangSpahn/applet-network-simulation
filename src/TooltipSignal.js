// TooltipSignal.js
import { createSignal } from "solid-js";

export const [tooltip, setTooltip] = createSignal({x: 30, y: 40, text: "-"});

