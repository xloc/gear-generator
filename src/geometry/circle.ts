import { linspace } from "../util/math";


export const make_semi_circle_points = (pa: [number, number], pb: [number, number], n_point: number, n_b_offset: number = 0) => {
  const [ax, ay] = pa;
  const [bx, by] = pb;
  const [ox, oy] = [(ax + bx) / 2, (ay + by) / 2];
  const r = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)) / 2;

  var [rad_a, rad_b] = [pa, pb].map(([x, y]) => Math.atan2(y - oy, x - ox));
  rad_b += n_b_offset * 2 * Math.PI;

  const points: [number, number][] = linspace(rad_a, rad_b, n_point)
    .map(rad => ([r * Math.cos(rad) + ox, r * Math.sin(rad) + oy]))


  return { ox, oy, r, points, rad_a, rad_b };

}
