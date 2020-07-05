import React, { useState, useEffect } from 'react'
import calculate from './calculate'

const Card = ({ count, onHandle }) => {
  const [judge, setJudge] = useState([])
  const [index, setIndxe] = useState(0)
  const [title, setTitle] = useState('已用时间：')
  const [timing, setTiminge] = useState('00:00')
  let time = 0
  const [a, setA] = useState()
  function Time() {
    setTiminge(
      setInterval(() => {
        time += 1
        setA(calculate(time))
        console.log(a)
      }, 1000)
    )
  }

  function unSubscribe() {
    clearInterval(timing)
  }
  function handle(evt) {
    const e = document.getElementById(evt.target.id)
    const name = e.getAttribute('class')
    const img = e.getAttribute('name')
    if (!(name === 'card open match')) {
      if (judge.length === 0) {
        setIndxe(index + 1)
        behind(e, img, index)
        setJudge((v) => [{ ...v, id: e, name: img }])
      } else if (!(index === 2)) {
        setIndxe(index + 1)
        console.log(!(index === 2))
        behind(e, img, index)
        if (judge[0].name === img) {
          setTimeout(() => {
            match(judge[0].id, all)
            match(e, all)
            setIndxe(0)
            setJudge([])
            setTimeout(() => {
              all()
            }, 1000)
          }, 1000)
          console.log('相同')
        } else {
          setTimeout(() => {
            front(judge[0].id, all)
            front(e, all)
            setIndxe(0)
            setJudge([])
          }, 5000)
          console.log(judge, '不相同')
          console.log('index', index)
        }
      }
    }
  }

  function front(e, all) {
    e.setAttribute('class', 'card')
    e.style.backgroundImage = ''
  }
  function behind(e, img, index) {
    if (!(index === 2)) {
      e.setAttribute('class', 'card open show open')
      e.style.backgroundImage = `url(imags/${img})`
      e.style.backgroundSize = '125px'
      console.log('修改为反')
    } else {
      return console.log('第三卡不做处理')
    }
  }
  function match(e) {
    e.setAttribute('class', 'card open match')
    e.style.backgroundImage = ''
  }
  function all() {
    const all = document.querySelectorAll('div.match')
    console.log(all.length, '判断')
    if (all.length === 12) {
      setTitle('所花时间')
      unSubscribe()
      console.log('游戏结束')
    }
  }
  function begin() {
    // 重新开始游戏
    unSubscribe()
    total()
  }
  function total() {
    Time()
    setTitle('已用时间：')
    count.map((item) => {
      const e = document.getElementById(item.id)
      front(e, all)
    })
    setIndxe(0)
    setJudge([])
    onHandle()
  }
  useEffect(() => {
    total()
    console.log('组件刷新')

    // 副作用的处理方案
    return () => {
      // 清除掉定时器
      unSubscribe()
    }
  }, [])
  return (
    <div class="container">
      <header>
        <h1>
          {title}
          {a ? a : '00.00'}
        </h1>
      </header>
      <button onClick={begin}>重新开始游戏</button>
      <ul class="deck" id="deck">
        {count.map((item) => {
          return (
            <div
              key={item.id}
              id={item.id}
              name={item.title}
              onClick={handle}
              className="card"
            ></div>
          )
        })}
      </ul>
    </div>
  )
}
export default Card
