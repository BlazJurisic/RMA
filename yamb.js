// Napišite program koji omogućuje igranje igre Jamb (engl. Yahtzee). Poštujte SOLID načela. Poštujte pravila OOP dizajna. Razdvojite funkcionalnost u klase. Treba postojati:
// bacanje kockice, provjera stanja
// igra se sa 6 kockica, omogućiti bacanje svih kockica, zaključavanje 0-6 kockica, bacanje samo otključanih kockica
// provjeru rezultata bacanja - podržati barem 3 provjere za jamb (jamb, poker, skala)
// pogonski program za provjeru napisane funkcionalnosti

const prompts = require('./prompts')
const { Checker, CubeHelper, Constants } = require('./helpers')

const printScore = cubes => {
  const checker = Checker(cubes)

  const isYamb = checker(Constants.ScoreChecks.YAMB)
  const isPoker = checker(Constants.ScoreChecks.POKER)
  const isScale = checker(Constants.ScoreChecks.SCALE)
  console.log('FINAL CUBES ARE: ', cubes, '\n')
  console.log(`YAMB: ${isYamb} \n POKER: ${isPoker} \n SCALE: ${isScale}`)
}

async function main () {
  const sixSideCubes = CubeHelper.resetCubes(Constants.CubesSetup.CubeSides)
  const numCubes = parseInt(6)
  let cubes = sixSideCubes(numCubes)

  await prompts.firstTurn.run()
  cubes = CubeHelper.throwCubes(
    Constants.CubesSetup.NumCubes,
    Constants.CubesSetup.CubeSides
  )
  console.log(cubes)

  let cubesToSave = await prompts.freeze(cubes).run()
  cubesToSave = cubesToSave.map(val => val.slice(-1)).map(Number)
  let toThrowAgain = Constants.CubesSetup.NumCubes - cubesToSave.length

  //2nd turn

  let choice = await prompts.secondTurn.run()
  if (choice === 'Submit') {
    printScore(cubes)
    return
  }
  cubes = CubeHelper.throwCubes(toThrowAgain, Constants.CubesSetup.CubeSides)
  cubes = cubes.concat(cubesToSave)
  cubesToSave = await prompts.freeze(cubes).run()
  cubesToSave = cubesToSave.map(val => val.slice(-1)).map(Number)
  toThrowAgain = Constants.CubesSetup.NumCubes - cubesToSave.length
  console.log(cubes)

  //3rd turn
  choice = await prompts.thirdTurn.run()
  if (choice === 'Submit') {
    printScore(cubes)
    return
  }
  cubes = CubeHelper.throwCubes(toThrowAgain, Constants.CubesSetup.CubeSides)
  cubes = cubes.concat(cubesToSave)

  choice = await prompts.submit.run()
  printScore(cubes)

  return
}

main()
