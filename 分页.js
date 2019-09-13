const arr = [
  {
    id: 1,
    hasS: true,
  },
  {
    id: 2,
    hasS: true,
  },
];
let val = false
const n = arr.map((item) => {
  item.hasS = val;
  return item;
});
n
