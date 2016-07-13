import React from 'react'
import ReactDom from 'react-dom'
import '../sass/paginator.scss'

/**
 * 当总页数少于5页时，不显示省略号
 * 当总页数少于9页：只显示一个省略号，省略号前或后允许2,5个链接
 *
 */

function noop () {}

class PaginatorLink extends React.Component {
  render () {
    let index = this.props.index
    return (
      <a className="cell" key={index} href={index} onClick={ e => this.props.onClick(e, index) }>{index}</a>
    )
  }
}

class PaginatorLinkCom extends React.Component {
  render () {
    let props = this.props
    const start = props.start
    const end = props.end
    const onClick = props.onClick

    let pages = []
    for (let i = start; i <= end; i++) {
      pages.push(<PaginatorLink index={i} onClick={onClick} key={i}></PaginatorLink>)
    }
    return <div className="clearfix">{pages}</div>
  }
}


export default class Paginator extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      pages: this.props.pages,  // 总页数
      current: this.props.current // 当前所在页
    }
  }

  render () {
    return (
      <div className="clearfix paginator">
        <a href="prev" className="cell" onClick={ (e) => this.handleClickSpecial(e, -1) }>prev</a>
        <PaginatorLinkCom start={1} end={3} onClick={this.handleClick} />
        <PaginatorLinkCom start={this.state.current} end={this.state.current} onClick={this.handleClick} />
        <PaginatorLinkCom start={6} end={10} onClick={this.handleClick} />
        <a href="next" className="cell" onClick={ (e) => this.handleClickSpecial(e, 1) }>next</a>
      </div>
    )
  }

  /**
   * prev和next的操作
   *
   * @param{object} event 点击事件
   * @param{number} direction prev或者next
   */
  handleClickSpecial (event, direction) {
    event.preventDefault()
    this.setState({
      current: this.state.current + direction
    })
  }

  /**
   * 数字按钮点击
   *
   * @param{object} event 点击事件
   * @param{number} index 按钮索引
   */
  handleClick (event, index) {
    event.preventDefault()

  }

}
