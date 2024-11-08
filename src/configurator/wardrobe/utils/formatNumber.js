export const formatNumber = (value) => {
  var inputValue = Number(value).toString()
  inputValue = inputValue.replace(/[^0-9.]/g, "")
  var decimalIndex = inputValue.indexOf(".")
  if (decimalIndex !== -1 && inputValue.length - decimalIndex > 2) {
    inputValue = inputValue.slice(0, decimalIndex)
  }
  return parseFloat(inputValue)
}

export const roundNumber = (value) => {
  return Math.round(value * 100) / 100
}
