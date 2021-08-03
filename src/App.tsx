import React from 'react';
import svgjs, { Matrix, Svg } from '@svgdotjs/svg.js';
import _, { fill } from 'lodash';
import { scale, rotate, translate, compose, applyToPoints, applyToPoint } from 'transformation-matrix';

import { linspace } from './util/math';
import { make_semi_circle_points } from './geometry/circle';


const { sin, cos } = Math;





function App() {
  const draw = new Svg().viewbox(-10, -10, 20, 20).size(500, 500);
  const polygon = draw.polygon().fill('transparent').stroke({ color: 'tomato', width: 0.05 });

  const gp = {
    x_equation: (u: number) => 4.6985 * (cos(u) + u * sin(u)),
    y_equation: (u: number) => 4.6985 * (sin(u) - u * cos(u)),
    u_min: 0,
    u_max: 0.7942,
    u_step: 10,
    n_teeth: 10,
  }

  const curve: [number, number][] = linspace(gp.u_min, gp.u_max, gp.u_step)
    .map(u => [gp.x_equation(u), gp.y_equation(u)]);

  const tooth: [number, number][] = [
    ...curve,
    ...applyToPoints(
      rotate(Math.PI / gp.n_teeth),
      curve
        .reverse()
        .map(([x, y]) => [x, -y] as [number, number])
    )
  ];

  const p_tooth_last = tooth[tooth.length - 1];
  const p_next_first = applyToPoint(rotate(Math.PI * 2 / gp.n_teeth), tooth[0]);
  const { points: norch, r, ox, oy } = make_semi_circle_points(p_tooth_last, p_next_first, 12, -1);

  const pattern: [number, number][] = [
    ...tooth,
    ...norch.slice(1, norch.length - 1)
  ]

  draw.circle().radius(r).stroke({ color: '#f06', opacity: 0.6, width: 0.05 }).fill('#0000').move(ox - r, oy - r)






  let points = new Array<[number, number]>();
  _.range(gp.n_teeth).forEach((i) => {
    points.push(...applyToPoints(rotate(Math.PI * 2 / gp.n_teeth * i), pattern));
  })

  // points.push(...tooth);




  // points.push(...linspace(gp.u_min, gp.u_max, gp.u_step).map(u => {
  //   const a = 10;
  //   const p: Point = [gp.x_equation(u) * a, gp.y_equation(u) * a]
  //   return applyToPoint(compose(
  //     // rotate(Math.PI * 2 / gp.n_teeth)

  //   ), p);
  // }));
  polygon.plot(points);


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: 20 }} dangerouslySetInnerHTML={{ __html: draw.svg() }}></div>

      </header>
    </div>
  );
}

export default App;
