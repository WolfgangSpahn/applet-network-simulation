import Tooltip from "./Tooltip";

const Bridge = (props) => {
  return (
    <Tooltip x={10} y={480} text="Switch Funktion des WLAN-Routers">
      <g transform={`translate(${props.x-25}, ${props.y-25}) scale(${props.scale})`} onClick={props.onClick}>
            <path
                fill="#1a202c"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linejoin="round"
                stroke-linecap="butt"
                d="m 1.5,9.636646 v 0 C 1.5,5.1429007 5.1429005,1.5 9.636646,1.5 H 42.74918 v 0 c 2.157974,0 4.227562,0.8572514 5.753479,2.3831685 1.525917,1.5259168 2.383167,3.5955045 2.383167,5.753477 V 42.18225 c 0,4.493748 -3.642898,8.136646 -8.136646,8.136646 H 9.6366463 c -4.4937453,0 -8.136646,-3.642899 -8.136646,-8.136646 z"
                fill-rule="evenodd"
                id="path2" />
            <path
                fill="#ffffff"
                stroke="none"
                stroke-width="1.87726"
                stroke-linejoin="round"
                stroke-linecap="butt"
                d="M 27.467192,9.3368497 H 38.081364 V 6.6590449 l 6.078743,5.3556111 -6.078743,5.355609 V 14.692459 H 27.467192 Z"
                fill-rule="evenodd"
                id="path3" />
            <path
                fill="#ffffff"
                stroke="none"
                stroke-width="1.87726"
                stroke-linejoin="round"
                stroke-linecap="butt"
                d="m 28.351706,29.007584 h 10.614172 v -2.677807 l 6.078743,5.35561 -6.078743,5.355608 v -2.6778 H 28.351706 Z"
                fill-rule="evenodd"
                id="path4" />
            <path
                fill="#ffffff"
                stroke="none"
                stroke-width="1.87726"
                stroke-linejoin="round"
                stroke-linecap="butt"
                d="M 23.860893,19.267895 H 13.246719 v -2.677807 l -6.07874,5.355612 6.07874,5.355609 v -2.677806 h 10.614174 z"
                fill-rule="evenodd"
                id="path5" />
            <path
                fill="#ffffff"
                stroke="none"
                stroke-width="1.87726"
                stroke-linejoin="round"
                stroke-linecap="butt"
                d="M 23.860893,36.9079 H 13.246719 v -2.677804 l -6.07874,5.355609 6.07874,5.355609 v -2.677808 h 10.614174 z"
                fill-rule="evenodd"
                id="path6" />
            <path fill="lightblue" transform="translate(8,5)" d="M9.12 8c0 .49-.4.89-.89.89s-.89-.4-.89-.89.4-.89.89-.89.89.4.89.89zm-3.2-2.42.84.84c.38-.38.89-.62 1.46-.62s1.08.24 1.46.62l.84-.84c-.59-.59-1.41-.96-2.3-.96s-1.71.37-2.3.96zm-1.67-1.67.84.84c.81-.81 1.92-1.31 3.16-1.31 1.24 0 2.35.5 3.16 1.31l.84-.84c-1.08-1.08-2.58-1.75-4.25-1.75s-3.17.67-4.25 1.75zm4.25-4.25c-2.62 0-5 1.06-6.72 2.79l.84.84c1.46-1.46 3.48-2.37 5.72-2.37s4.26.91 5.72 2.37l.84-.84c-1.72-1.73-4.1-2.79-6.72-2.79z" fill-rule="evenodd"/>
            <text x="37" y="43.5" fill="white" stroke="white" stroke-width="0.4" font-size="5" text-anchor="middle" >DHCP</text>
      </g>
    </Tooltip>
  );
};

export default Bridge;
