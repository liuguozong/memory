import React, { useState } from 'react'
import card from './card'
import '../CSS/css.scss'
import Mine from './Mine'
// 洗牌算法
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default () => {
  const [count, setCount] = useState(card)

  function onHandle() {
    setCount(shuffle(card))
    console.log(count, '刷新')
  }
  return <Mine count={count} onHandle={onHandle}></Mine>
}
