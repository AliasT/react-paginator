import Paginator from "../index"
import ReactDom from 'react-dom'
import React from 'react'

ReactDom.render(<Paginator onClick={ (index) => console.log(index) } pages={20} current={1}/>, document.querySelector('#main'))
ReactDom.render(<Paginator pages={5} current={3}/>, document.querySelector('#main2'))
ReactDom.render(<Paginator pages={10} current={3}/>, document.querySelector('#main3'))

