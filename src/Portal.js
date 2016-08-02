import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

let totalSerial = 1

// a simple portal referenced from
// http://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions
export default class Portal extends Component {
    static propTypes = {
        portalId: PropTypes.string,
        children: PropTypes.node,
    }

    constructor(props) {
        super(props)
        this.mSerial = totalSerial++
    }

    componentDidMount() {
        /* global document */
        const id = this.props.portalId || `portal${this.mSerial}`
        let p = document.getElementById(id)
        if (!p) {
            p = document.createElement('div')
            p.id = id
            document.body.appendChild(p)
        }
        this.mPortalElement = p
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.mPortalElement)
    }

    componentWillUnmount() {
        document.body.removeChild(this.mPortalElement)
    }

    mPortalElement
    mSerial

    render() {
        return null
    }
}
