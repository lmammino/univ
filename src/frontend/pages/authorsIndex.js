import react from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AsyncPage } from './asyncPage.js'
import { Header } from '../components/header.js'
import { Footer } from '../components/footer.js'
const h = react.createElement

export class AuthorsIndex extends AsyncPage {
  static async preloadAsyncData () {
    const { data } = await axios.get('http://localhost:3001/api/authors')
    return { authors: data }
  }

  render () {
    return h('div', { className: 'container' },
      h(Header),
      this.state.loading
        ? h('div', { className: 'text-center' }, 'Loading ...')
        : h('div', null,
          h('h2', { className: 'text-center' }, 'Books by author'),
          h('div', { className: 'row' },
            this.state.staticData.authors.map(
              (author) => h('div', { key: author.id, className: 'col text-center' },
                h(Link, { to: `/author/${author.id}` },
                  h('img', { src: `/public/authors/${author.picture}` }),
                  h('p', null, author.name)
                )
              )
            )
          )
        ),
      h(Footer)
    )
  }
}
