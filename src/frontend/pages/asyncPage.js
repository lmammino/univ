import react from 'react'

export class AsyncPage extends react.Component {
  static async loadData () {
    throw new Error('Must implemented by sub class')
  }

  constructor (props) {
    super(props)
    const url = props.match.url
    this.hasData = false

    let data

    if (typeof window !== 'undefined') {
      // client side check for data passed from SSR
      if (window.__ASYNC_DATA__ && window.__ASYNC_DATA__[url]) {
        data = window.__ASYNC_DATA__[url]
        this.hasData = true
      }
    } else {
      // server side rendering: check for preloaded data
      if (this.props.data) {
        data = this.props.data
        this.hasData = true
      }
    }

    this.state = { data, loading: !this.hasData }
  }

  async componentDidMount () {
    // browser only
    if (!this.hasData) {
      const data = await this.constructor.loadData(this.props)
      this.setState({ loading: false, data })
    }
  }

  render () {
    throw new Error('Must implemented by sub class')
  }
}
