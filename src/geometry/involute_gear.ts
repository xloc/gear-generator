import { applyToPoint, applyToPoints, rotate } from "transformation-matrix";
import _ from 'lodash';

import { linspace } from "../util/math";
import { make_semicircle_points } from "./circle";

const { sin, cos, sqrt, pow, PI } = Math;

export const calc_gear_parameters = (pressure_angle_deg: number, n_teeth: number, module: number) => {
  const pressure_angle_rad = pressure_angle_deg / 360 * (2 * PI);
  const base_circle_diameter = module * n_teeth * cos(pressure_angle_rad);
  const base_circle_radius = base_circle_diameter / 2;

  // Did not find reference
  const tip_diameter = module * n_teeth + 2 * module;
  const tip_radius = tip_diameter / 2;

  const x_equation = (u: number) => base_circle_radius * (cos(u) + u * sin(u));
  const y_equation = (u: number) => base_circle_radius * (sin(u) - u * cos(u));
  const x_equation_text = `${base_circle_radius} * (cos(u) + u * sin(u))`;
  const y_equation_text = `${base_circle_radius} * (sin(u) - u * cos(u))`;

  const u_min = 0;
  const u_max = sqrt(pow(tip_radius / base_circle_radius, 2) - 1);
  const u_step = 10;

  return {
    pressure_angle_rad,
    base_circle_diameter, base_circle_radius,
    tip_diameter, tip_radius,
    x_equation, y_equation, x_equation_text, y_equation_text,
    u_min, u_max, u_step
  };
}

export class InvoluteGear2D {
  public pressure_angle_rad: number;

  public base_circle_diameter: number;
  public base_circle_radius: number;

  public tip_diameter: number;
  public tip_radius: number;

  public x_equation: (u: number) => number;
  public y_equation: (u: number) => number;
  public x_equation_text: string;
  public y_equation_text: string;

  public u_min: number;
  public u_max: number;
  public u_step: number;

  public points: [number, number][];

  constructor(
    public n_teeth: number,
    public module: number,
    public pressure_angle_deg = 20,
    public stretch_ratio = 1.2
  ) {
    const derived = calc_gear_parameters(
      this.pressure_angle_deg,
      this.n_teeth,
      this.module
    );

    // assign calculated values

    this.pressure_angle_rad = derived.pressure_angle_rad;
    this.base_circle_diameter = derived.base_circle_diameter;
    this.base_circle_radius = derived.base_circle_radius;

    this.tip_diameter = derived.tip_diameter;
    this.tip_radius = derived.tip_radius;

    this.x_equation = derived.x_equation;
    this.y_equation = derived.y_equation;
    this.x_equation_text = derived.x_equation_text;
    this.y_equation_text = derived.y_equation_text;

    this.u_min = derived.u_min;
    this.u_max = derived.u_max;
    this.u_step = derived.u_step;

    // derive points

    const curve: [number, number][] = linspace(this.u_min, this.u_max, this.u_step)
      .map(u => [this.x_equation(u), this.y_equation(u)]);

    const tooth: [number, number][] = [
      ...curve,
      ...applyToPoints(
        rotate(Math.PI / this.n_teeth),
        curve
          .reverse()
          .map(([x, y]) => [x, -y] as [number, number])
      )
    ];

    const p_tooth_last = tooth[tooth.length - 1];
    const p_next_first = applyToPoint(rotate(Math.PI * 2 / this.n_teeth), tooth[0]);
    const { points: norch } = make_semicircle_points(p_tooth_last, p_next_first, this.u_step * 2 + 2, this.stretch_ratio);

    const pattern: [number, number][] = [
      ...tooth,
      ...norch.slice(1, norch.length - 1)
    ]

    let points = new Array<[number, number]>();
    _.range(this.n_teeth).forEach((i) => {
      points.push(...applyToPoints(rotate(Math.PI * 2 / this.n_teeth * i), pattern));
    });
    this.points = points;
  }
}