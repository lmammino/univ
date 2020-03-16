import react from 'react'
import Router from 'react-router-component'
const h = react.createElement

export class FourOhFourPage extends react.Component {
  render () {
    return h('div', { className: 'text-center' },
      h('h2', null, '404'),
      h('h3', null, this.props.error || 'Page not found'),
      h(Router.Link, { href: '/' }, 'Go back to the home page')
    )
  }
}
