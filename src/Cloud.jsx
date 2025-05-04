const Cloud = (props) => {
    return (
      <g transform={`translate(${props.x-50}, ${props.y-20}) scale(${props.scale})`} onClick={props.onClick}>
        <g
          fill="#1a202c"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="1.5"
          id="g3"
          transform="matrix(2.4257541,0,0,2.4257541,-3.1269462,-4.5157475)">
          <path
            d="m 7.26906,13.0098 c -0.53,-0.27 -1.12,-0.41 -1.72,-0.41 -4.679998,0.33 -4.679998,7.14 0,7.47 H 16.6391 c 1.35,0.01 2.65,-0.49 3.64,-1.4 3.29,-2.87 1.53,-8.64 -2.8,-9.19004 -1.56,-9.370003 -15.09004,-5.81 -11.88004,3.12004"
            id="path1" />

          <text x="9" y="15" stroke="none" fill="white" font-size="3">Internet</text>
        </g>
      </g>
    );
  };
  
  export default Cloud;