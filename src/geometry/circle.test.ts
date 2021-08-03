import { make_semicircle_points } from "./circle";

it('run without error', () => {
  const pa: [number, number] = [0, 1];
  const pb: [number, number] = [0, -1];

  const { points } = make_semicircle_points(pa, pb, 5, 1);
})

// it('generate points on centered circle', () => {
//   const pa: [number, number] = [0, 1];
//   const pb: [number, number] = [0, -1];

//   const { points } = make_semicircle_points(pa, pb, 5, 1);

//   // console.log(points);


//   const rt2 = Math.sqrt(2);
//   const correct_points = [
//     [0, 1],
//     [-rt2 / 2, rt2 / 2],
//     [-1, 0],
//     [-rt2 / 2, -rt2 / 2],
//     [0, -1]
//   ]

//   points.forEach((p, i) => {
//     expect(p[0]).toBeCloseTo(correct_points[i][0], 10);
//     expect(p[1]).toBeCloseTo(correct_points[i][1], 10);
//   })

// });

// it('can be stretched', () => {
//   const pa: [number, number] = [0, 1];
//   const pb: [number, number] = [0, -1];

//   const { points } = make_semicircle_points(pa, pb, 5, 2);

//   // console.log(points);

//   const rt2 = Math.sqrt(2);
//   const correct_points = [
//     [0, 1],
//     [-rt2, rt2 / 2],
//     [-2, 0],
//     [-rt2, -rt2 / 2],
//     [0, -1]
//   ]

//   points.forEach((p, i) => {
//     expect(p[0]).toBeCloseTo(correct_points[i][0], 10);
//     expect(p[1]).toBeCloseTo(correct_points[i][1], 10);
//   })

// });