const scale = ['', 'thousand', 'million', 'billion', 'trillion']

export const toScale = num => {
  if (num === 'unknown') {
    return num
  }

  const mult = Math.floor((num.length -1) /3)
  const sc = scale[Math.max(0, mult)]
  const n = Math.floor(num /Math.pow(1000, mult))

  console.log(num, mult, sc, n)
  
  return `${n} ${sc}`
}

export const getIdFromUrl = url => {
  const [ all, id ] = /^.+?(\d+)\/?$/.exec(String(url))
  return id
}
