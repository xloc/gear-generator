import { calc_gear_parameters, InvoluteGear2D } from "./involute_gear"

it('fit result from the reference page', () => {
  // ref page:
  // http://www.otvinta.com/gear.html
  const { base_circle_radius, u_max } = calc_gear_parameters(20, 25, 1);

  expect(base_circle_radius).toBeCloseTo(11.7462, 4);
  expect(u_max).toBeCloseTo(0.5665, 4);
})

it('should run without any error', () => {
  new InvoluteGear2D(20, 1);
})