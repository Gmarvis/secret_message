const btn = document.getElementById('btn')

const normalizeText = (text) => {
  return text.replace(/\s/g, '').toLocaleLowerCase()
}

function culumnAndRowslength (newText) {
  const N = newText.length
  const delta = 1 + 4 * N
  const row = Math.round((-1 + Math.sqrt(delta)) / 2)
  const nearMultipleOfr = Math.ceil(N / row) * row
  const column = nearMultipleOfr / row
  return [row, column]
}

// console.log("this is culumns and rows: ", culumnAndRowslength(newText));

// split text
const splitText = (newText, columns) => {
  if (newText.length > 50) {
    const newArray = []
    let usedStrings = []

    // split message into chunks
    for (let i = 0; i < newText.length; i += columns) {
      newArray.push(`"${newText.slice(i, i + columns)}"`)
    }
    // try to fill the gap of the last substring in case the rectangle is not perfect
    usedStrings = newArray
    const long2 = newArray.length
    // to get the before last element length of newArray
    const L2 = usedStrings[long2 - 2].length
    // to get the last element length of newArray
    const L1 = usedStrings[long2 - 1].length
    if (L2 > L1) {
      // append '$' character to the last substring
      usedStrings[long2 - 1] = usedStrings[long2 - 1].padEnd(L2, ' ')
      return usedStrings
    }
    return newArray
  }
}

// console.log(splitText(normalizeText(text), 7));

//* function to convert split text into chunks strings
function chunkToString (splitText) {
  return splitText.join('&nbsp; <br/> &nbsp;')
}

// console.log(chunkToString(splitText(normalizeText(text), 7)));

// generate secret message
function secretText (newArray) {
  const temp = []
  let i = 0
  let j = 1
  while (j < newArray[0].length - 1) {
    while (i < newArray.length) {
      temp.push(newArray[i][j])
      i++
    }
    // for the sake of termination, we need to go forward (next column) in the array
    j++
    // need to restart at the beginning (top line) of the array
    i = 0
  }
  // to show the secret text
  return temp.join('')
}

// console.log("secret message: ", secretText(splitText(normalizeText(text), 7)));

// add action to encode message

btn.addEventListener('click', (event) => {
  event.preventDefault()
  let textField = document.getElementById('textfield').value
  const errorField = document.getElementById('error')

  if (textField === '') {
    errorField.innerText = 'error! please input message...!'
    textField = ''
    return
  }

  if (textField.includes(' ') !== true) {
    errorField.innerText = 'error! text should be more than one word...!'
    textField = ''
    return
  }

  if (textField.length < 50) {
    errorField.innerText = 'error! text should be at least 50 characters...!'
    return
  }

  const text = normalizeText(textField)
  document.getElementById('nomalized').innerText = text

  const textInCulumnsAndRows = culumnAndRowslength(text)

  const splitedText = splitText(text, textInCulumnsAndRows[1])
  const toChunck = chunkToString(splitedText)
  document.getElementById('chucks').innerHTML = toChunck

  const secretmssg = secretText(splitedText)
  document.getElementById('encoded').innerHTML = secretmssg

  // split the secret message
  const splitSecretmsg = splitText(secretmssg, textInCulumnsAndRows[1])
  // chunt the splited message
  const secretmssChunk = chunkToString(splitSecretmsg)
  // add to the dom
  document.getElementById('secret-chunck').innerHTML = secretmssChunk

  errorField.innerText = ''
})
