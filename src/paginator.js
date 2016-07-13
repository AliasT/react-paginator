import React from 'react'
import ReactDom from 'react-dom'
import '../sass/paginator.scss'

/**
 * 当总页数少于5页时，不显示省略号
 * 当总页数少于9页：只显示一个省略号，省略号前或后允许2,5个链接
 *
 */

function noop () {}

class NoopEle extends React.Component {
  render () {
    return <a className="cell" href="javascript:void(0);">...</a>
  }
}

class PaginatorLink extends React.Component {
  render () {
    let index = this.props.index
    const className = this.props.className ? "cell " + this.props.className : "cell"
    return (
      <a className={className} key={index} href={index} onClick={ e => this.props.onClick(e, index) }>{index}</a>
    )
  }
}


function createPageLink (start, end, onClick) {
  let pages = []
  for (let i = start; i <= end; i++) {
    pages.push(<PaginatorLink index={i} onClick={onClick} key={i}></PaginatorLink>)
  }
  return pages
}


export default class Paginator extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      pages: this.props.pages,  // 总页数
      current: this.props.current // 当前所在页
    }
  }

  /**
   * 主逻辑
   *
   */
  pagination () {
    const total = this.state.pages
    const current = this.state.current
    const handleClick = this.handleClick
    const currentEle = <PaginatorLink className="current" key="current-ele" index={current} onClick={handleClick}></PaginatorLink>
    const NoopLeft = <NoopEle key="left-ele"/>
    const NoopRight = <NoopEle key="right-ele"/>

    let result = null

    if (total < 7) {
      result = createPageLink(1, current - 1, handleClick)
      result.push(currentEle)
      result.push(createPageLink(current + 1, total, handleClick))
      return result
    }

    if (current - 2 <= 3) {
      result = createPageLink(1, current-1, handleClick)
      result.push(currentEle)
      result.push(createPageLink(current+1,  5, handleClick))
      result.push(NoopRight)
      result.push(createPageLink(total-1, total, handleClick))
      return result
    }

    if (current >= total - 5 && current <= total) {
      result = createPageLink(1, 2, handleClick)
      result.push(<NoopEle key="left-ele"/>)
      result.push(createPageLink(total - 5, current-1, handleClick))
      result.push(currentEle)
      result.push(createPageLink(current+1, total, handleClick))
      return result
    }

    result = createPageLink(1, 2, handleClick)
    result.push(<NoopEle key="left-ele"/>)

    result.push(createPageLink(current-2, current-1, handleClick))
    result.push(currentEle)
    result.push(createPageLink(current+1, current+2, handleClick))

    result.push(NoopRight)
    result.push(createPageLink(total-1, total, handleClick))
    return result
  }

  render () {
    return (
      <div className="clearfix paginator">
        <a href="prev" className="cell" onClick={ (e) => this.handleClickSpecial(e, -1) }>prev</a>
        {this.pagination()}
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
    if (this.state.current === this.state.pages && direction === 1) {
      return
    }

    if (this.state.current === 1 && direction == -1) {
      return
    }

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
    console.log(index)
  }

}
