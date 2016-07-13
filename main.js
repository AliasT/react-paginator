import Paginator from "./src/paginator"
import ReactDom from 'react-dom'
import React from 'react'

ReactDom.render(<Paginator pages={20} current={3}/>, document.querySelector('#main'))

