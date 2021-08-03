import React from 'react';
import { Svg } from '@svgdotjs/svg.js';
import _ from 'lodash';
import { InvoluteGear2D } from './geometry/involute_gear';


function App() {
  let gear_params = {
    n_teeth: 18,
    module: 1,
    pressure_angle_deg: 20,
    stretch_ratio: 1.2,
  }

  let g = new InvoluteGear2D(
    gear_params.n_teeth,
    gear_params.module,
    gear_params.pressure_angle_deg,
    gear_params.stretch_ratio
  );

  // view port size
  const vs = g.tip_diameter / 0.8;
  const draw = new Svg()
    .viewbox(-vs / 2, -vs / 2, vs, vs)
    .size(500, 500);

  const polygon = draw.polygon()
    .fill('transparent')
    .stroke({ color: 'tomato', width: 0.05 });

  polygon.plot(g.points);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: 20 }} dangerouslySetInnerHTML={{ __html: draw.svg() }}></div>
      </header>
    </div>
  );
}

export default App;
