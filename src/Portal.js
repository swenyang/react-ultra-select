import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

let totalSerial = 1

// a simple portal referenced from
// http://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions
export default class Portal extends Component{
    static propTypes = {
        portalId: PropTypes.string
    }

    _portalElement
    _serial

    constructor(props) {
        super(props)
        this._serial = totalSerial++
    }

    render() {
        return null
    }

    componentDidMount() {
        let id = this.props.portalId || `portal${this._serial}`
        var p = document.getElementById(id)
        if (!p) {
            var p = document.createElement('div')
            p.id = id
            document.body.appendChild(p)
        }
        this._portalElement = p
        this.componentDidUpdate()
    }
    
    componentWillUnmount() {
        document.body.removeChild(this._portalElement)
    }
    
    componentDidUpdate() {
        ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this._portalElement)
    }
}