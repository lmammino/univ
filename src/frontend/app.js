import react from 'react'
import { Switch, Route } from 'react-router-dom'
import { routes } from './routes.js'

const h = react.createElement

export class App extends react.Component {
  constructor (props) {
    super(props)
    this.state = { date: new Date() }
  }

  render () {
    return h(Switch, null,
      routes.map(routeConfig => (
        h(Route, { key: routeConfig.path, ...routeConfig })
      ))
    )
  }
}
