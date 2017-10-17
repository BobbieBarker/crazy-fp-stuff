
const Box = x => ({
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  value: () => x,
  inspect: () => `Box(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: o => Left(x),
  inspect: () => `Left(${x})`
});

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  value: () => x,
  concat: o => o.fold(
    e => Left(e),
    r => Right(x.concat(r))
  ),
  inspect: () => `Right(${x})`
});



// explicitly using != to catch undefined values as well as null.
const Either = x => x == null ? Left(null) : Right(x); // eslint-disable-line no-eq-null, eqeqeq

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};


const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y)
});

Product.empty = () => Product(1);

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});

All.empty = () => All(true);

const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y)
});

Any.empty = () => Any(false);

const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y)
});

Max.empty = () => Max(-Infinity);

const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y)
});

Min.empty = () => Min(Infinity);

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

// const find = (xs, f) =>
//   List(xs)
//     .foldMap(x =>
//       First(f(x) ? Right(x) : Left()), First.empty())
//     .fold(x => x)

// find([3, 4, 5, 6, 7], x => x > 4)
// Right(5)



module.exports = {
  Box,
  Either,
  Right,
  Left,
  tryCatch,
  Sum,
  All,
  First
};

// revisit the collection of either examples compared to imperative code for testing material
