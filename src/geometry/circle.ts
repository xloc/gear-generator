import { applyToPoints, rotate } from "transformation-matrix";
import { linspace } from "../util/math";


export const make_semicircle_points = (
  pa: [number, number], pb: [number, number], n_point: number,
  stretch_ratio: number = 1
) => {
  const [ax, ay] = pa;
  const [bx, by] = pb;
  const [ox, oy] = [(ax + bx) / 2, (ay + by) / 2];
  const r = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)) / 2;

  let points: [number, number][] = linspace(0, -Math.PI, n_point)
    .map(rad => ([
      r * Math.cos(rad) + ox,
      r * Math.sin(rad) * stretch_ratio + oy
    ]));

  const rotate_rad = Math.atan2(ay - by, ax - bx)
  points = applyToPoints(rotate(rotate_rad, ox, oy), points);

  return { ox, oy, r, points };
}
