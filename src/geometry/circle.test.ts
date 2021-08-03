import { make_semi_circle_points } from "./circle";

it('generate points on centered circle', () => {
  const pa: [number, number] = [0, -1];
  const pb: [number, number] = [0, 1];

  const { points } = make_semi_circle_points(pa, pb, 5);

  const rt2 = Math.sqrt(2);
  const correct_points = [
    [0, -1],
    [rt2 / 2, -rt2 / 2],
    [1, 0],
    [rt2 / 2, rt2 / 2],
    [0, 1]
  ]

  points.forEach((p, i) => {
    expect(p[0]).toBeCloseTo(correct_points[i][0], 10);
    expect(p[1]).toBeCloseTo(correct_points[i][1], 10);
  })

})