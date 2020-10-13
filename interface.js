let history = []
let candleBuffer = []
let timeScale = 60 // In Seconds

let poll = setInterval(main, 1000);

function quit() {
  clearInterval(poll)
}

function readPrice() {
  let integer = document.getElementsByClassName('ig-ticket-price-button_pre-emphasised-price')
  let decimal = document.getElementsByClassName('ig-ticket-price-button_emphasised-price')
  let pips = document.getElementsByClassName('ig-ticket-price-button_post-emphasised-price')
  
  sellPrice = integer[0].innerText + decimal[0].innerText + pips[0].innerText
  buyPrice = integer[1].innerText + decimal[1].innerText + pips[1].innerText
  
  spotPrice = (Number(sellPrice)*1000 + Number(buyPrice)*1000) / 2
  spread = Number(buyPrice)*1000 - Number(sellPrice)*1000
  
  return [spotPrice,spread]
}  

function selectDirection(action) {
  let selection = document.getElementsByClassName('ig-ticket-price-button_price-direction')

  if (action == "sell") {
    selection[0].click()
  } 
  else if (action == "buy"){
    selection[1].click()
  }
}


function main() {
  if (candleBuffer.length < timeScale) {
    candleBuffer.push(readPrice()[0])
  } else {
    let candleLow = candleBuffer[0];
    let candleHigh = candleBuffer[0];
    for (let i = 1; i < candleBuffer.length; i++){
      if (candleBuffer[i] < candleLow) {
        candleLow = candleBuffer[i]
      }
      if (candleBuffer[i] > candleHigh) {
        candleHigh = candleBuffer[i]
      }
    }
    history.push({
      open: candleBuffer[0],
      close: candleBuffer[candleBuffer.length-1],
      high: candleHigh,
      low: candleLow,
      color: candleBuffer[0] > candleBuffer[candleBuffer.length-1] ? "red" : "green"
    })
    candleBuffer = []
  }
}