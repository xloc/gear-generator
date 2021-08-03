
export const linspace = (st: number, ed: number, n_step: number) => {
  const step = (ed - st) / (n_step - 1);
  return new Array(n_step).fill(null).map((_, a) => st + step * a);
}