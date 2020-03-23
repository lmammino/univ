import react from 'react'
import Router from 'react-router-component'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'
const h = react.createElement

export class FourOhFourPage extends react.Component {
  render () {
    // indicates SSR that this component was rendered so
    // that the response status code can be set accordingly
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404
    }

    return h('div', { className: 'container' },
      h(Header),
      h('div', { className: 'text-center' },
        h('h2', null, '404'),
        h('h3', null, this.props.error || 'Page not found'),
        h(Router.Link, { href: '/' }, 'Go back to the home page')
      ),
      h(Footer)
    )
  }
}
