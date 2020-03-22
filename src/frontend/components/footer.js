import react from 'react'

const h = react.createElement

export class Footer extends react.Component {
  render () {
    return (
      h('footer', null,
        'Made with ♥ by ',
        h('a', { target: '_blank', href: 'https://twitter.com/loige' }, '@loige'),
        ' for ',
        h('a', { target: '_blank', href: 'https://www.nodejsdesignpatterns.com/' }, 'Node.js Design Patterns (the book)')
      )
    )
  }
}
