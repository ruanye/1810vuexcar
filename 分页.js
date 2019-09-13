function fn({ name }) {
  console.log(name);
}
fn({ name: 'lilei', age: 3 });
function fn1([, ...a]) {
  console.log(a);
}
fn1([1, 2, 3, 4]);
