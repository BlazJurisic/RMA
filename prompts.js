const { Select } = require('enquirer')
const { MultiSelect } = require('enquirer')

const firstTurn = new Select({
  name: 'action',
  message: 'What would you like to do?',
  choices: ['Throw']
})

const secondTurn = new Select({
  name: 'action',
  message: 'What would you like to do?',
  choices: ['Throw', 'Submit']
})

const thirdTurn = new Select({
  name: 'action',
  message: 'What would you like to do?',
  choices: ['Throw', 'Submit']
})

const submit = new Select({
  name: 'action',
  message: 'What would you like to do?',
  choices: ['Submit']
})

const freeze = cubes => {
  const choices = cubes.map((num, idx) => ({ name: `cube ${idx + 1}: ${num}`}))
  return new MultiSelect({
    name: 'cubes',
    message: 'Freeze cubes',
    limit: 6,
    choices: choices
  })
}

module.exports = {
  firstTurn,
  secondTurn,
  thirdTurn,
  freeze,
  submit
}
