//////******** Constants ********//////
const Constants = {
  CubesSetup: {
    CubeSides: 6,
    NumCubes: 6
  },
  ScoreChecks: {
    YAMB: 'YAMB',
    POKER: 'POKER',
    SCALE: 'SCALE'
  }
}

//////******** CHECKER ********//////

//CURRYING PATTERN, OPTIMIZATION AND CODE ORGANIZATION PATTERN IN FUNCTIONAL PARADIGM
//USEFUL FOR CODE REUSEMENT AND DEPENDENCY INJECTION
const countValueInList = list => value => list.filter(v => v === value).length
const checkYambPoker = list => value => {
  const counter = countValueInList(list)
  return (
    counter(1) >= value ||
    counter(2) >= value ||
    counter(3) >= value ||
    counter(4) >= value ||
    counter(5) >= value ||
    counter(6) >= value
  )
}
//BY CONSTRUCTING SET() ON LIST WE REMOVE DUPLICATES
//[...] syntax stands for spread operator in ES6
const checkScale = list => [...new Set(list)].length >= 5

const Checker = cubes => check => {
  const counter = checkYambPoker(cubes)
  switch (check) {
    case Constants.ScoreChecks.YAMB:
      return counter(5)
    case Constants.ScoreChecks.POKER:
      return counter(4)
    case Constants.ScoreChecks.SCALE:
      return checkScale(cubes)
  }
}

//////******** CUBE HELPERS ********//////
const getRandomCubeState = cubeSides =>
  Math.floor(Math.random() * cubeSides) + 1

//CURRYING PATTERN, OPTIMIZATION AND CODE ORGANIZATION PATTERN IN FUNCTIONAL PARADIGM
//USEFUL FOR CODE REUSEMENT AND DEPENDENCY INJECTION
const resetCubes = cubeSides => numCubes =>
  Array(numCubes)
    .fill()
    .map(_ => 1)

const throwCubes = (numCubes, cubeSides) =>
  Array(numCubes)
    .fill()
    .map(_ => getRandomCubeState(cubeSides))

const CubeHelper = {
  getRandomCubeState,
  resetCubes,
  throwCubes
}

module.exports = {
  Constants,
  Checker,
  CubeHelper
}
