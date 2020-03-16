import react from 'react'
import Router from 'react-router-component'
const h = react.createElement

export class AuthorsIndex extends react.Component {
  render () {
    const { authors } = this.props
    return h('div', null,
      h('h2', { className: 'text-center' }, 'Books by author'),
      h('div', { className: 'row' },
        authors.map(
          (author) => h('div', { key: author.id, className: 'col text-center' },
            h(Router.Link, { href: `/author/${author.id}` },
              h('img', { src: `/public/authors/${author.picture}` }),
              h('p', null, author.name)
            )
          )
        )
      )
    )
  }
}
