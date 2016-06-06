import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import UltraSelect from '../src/UltraSelect'
//import UltraSelect from '../dist/react-ultra-select'

import "./Example.less"

class Example extends Component {
    constructor(props) {
        super(props)
        this.onAsync = this.onAsync.bind(this)
        this.state = {
            serial: 1,
            repo: 'apple/swift',
            stargazers: {}
        }
    }

    componentWillMount() {
        if (!this.state.stargazers[this.state.repo]) {
            this.fetchStargazers(this.state.repo)
        }
    }

    onClick(e) {
        e.preventDefault()
        this.setState({
            serial: this.state.serial+1
        })
    }

    getTitle(selectedValues) {
        return <span>{selectedValues[0].value} Hello, I'm <b>{selectedValues[0].key}</b></span>
    }

    getStaticText(selectedValues) {
        return <div>Your favorite is <b>{selectedValues[0].key}</b></div>
    }

    onDidSelect(index, selectedValue) {
        console.log(`You have chosen ${selectedValue.key}, nice choice!`)
    }

    onAsync(index, selectedValue) {
        if (index === 0) {
            this.setState({
                ...this.state,
                repo: selectedValue.key,
            })
            if (!this.state.stargazers[selectedValue.key]) {
                this.fetchStargazers(selectedValue.key)
            }
        }
    }

    fetchStargazers(repo) {
        fetch(`https://api.github.com/repos/${repo}/stargazers?page=1`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ...this.state,
                    stargazers: {
                        ...this.state.stargazers,
                        [repo]: json
                    },
                })
            }).catch(error => {
            this.setState({
                stargazers: {
                    ...this.state.stargazers,
                    [repo]: []
                },
            })
        })
    }

    render() {
        // basic
        var basic = [
            {
                list: [
                    {key: 0, value: 'William Shakespeare'},
                    {key: 1, value: 'Henry Miller'},
                    {key: 2, value: 'Ernest Hemingway'},
                    {key: 3, value: 'Charles Dickens'},
                    {key: 4, value: 'Jane Austen'},
                    {key: 5, value: 'George Orwell'},
                    {key: 6, value: 'Mark Twain'},
                    {key: 7, value: 'Miguel de Cervantes Saavedra'},
                    {key: 8, value: 'Emily Jane Brontë'},
                    {key: 9, value: 'Franz Kafka'},
                ]
            }
        ]

        // multi rows
        var multiRows = [
            {
                list: [
                    {key: 1, value: 'U.S.'},
                    {key: 2, value: 'Canada'},
                    {key: 3, value: 'Mexico'},
                    {key: 4, value: 'China'},
                    {key: 5, value: 'Japan'},
                    {key: 6, value: 'Korean'},
                    {key: 7, value: 'British'},
                    {key: 8, value: 'Germany'},
                    {key: 9, value: 'France'},
                    {key: 10, value: 'Italy'},
                    {key: 11, value: 'Brazil'},
                ],
                defaultIndex: 2
            },
            {
                list: [
                    {key: 0, value: 'Male'},
                    {key: 1, value: 'Female'},
                ],
                defaultIndex: 1
            },
            {
                list: [
                    {key: 0, value: 'below 10'},
                    {key: 10, value: '10 to 20'},
                    {key: 20, value: '20 to 29'},
                    {key: 30, value: '30 to 39'},
                    {key: 40, value: '40 to 49'},
                    {key: 50, value: '50 to 59'},
                    {key: 60, value: '60 to 69'},
                    {key: 70, value: '70 to 79'},
                    {key: 80, value: 'over 80'},
                ],
                defaultIndex: 3
            },
        ]

        // dynamic changes
        var dynamic = [
            {
                list: [
                    {key: 0, value: `I'm option 0`}
                ]
            }
        ]
        for (let i = 1; i <= this.state.serial; i++) {
            dynamic[0].list.push({
                key: i, value: `I'm option ${i}`
            })
        }
        dynamic[0].defaultIndex = dynamic[0].list.length - 1

        // customizing visible rows and row-height
        // customizing text and titles
        var customize = [
            {
                list: [
                    {key: 'Cartman', value: <img src={require('./images/cartman.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Stan', value: <img src={require('./images/stan.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Kyle', value: <img src={require('./images/kyle.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Kenny', value: <img src={require('./images/kenny.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Butters', value: <img src={require('./images/butters.png')} className="avatar" alt="avatar"/>},
                    {key: 'Wendy', value: <img src={require('./images/wendy.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Shelley', value: <img src={require('./images/shelley.jpg')} className="avatar" alt="avatar"/>},
                    {key: 'Randy', value: <img src={require('./images/randy.png')} className="avatar" alt="avatar"/>},
                    {key: 'Chef', value: <img src={require('./images/chef.png')} className="avatar" alt="avatar"/>},
                    {key: 'Jimbo', value: <img src={require('./images/jimbo.jpg')} className="avatar" alt="avatar"/>},
                ],
                defaultIndex: 3
            }
        ]

        // async
        var asynColumn = [
            {
                list: [
                    {key: 'apple/swift', value: 'Swift'},
                    {key: 'golang/go', value: 'Go'},
                    {key: 'ruby/ruby', value: 'Ruby'},
                    {key: 'rust-lang/rust', value: 'Rust'},
                    {key: 'jashkenas/coffeescript', value: 'CoffeeScript'},
                ],
            }
        ]
        asynColumn[0].defaultIndex = asynColumn[0].list.findIndex(e => e.key === this.state.repo)
        let gazers = this.state.stargazers[this.state.repo] || []
        let list = []
        for (let i = 0, l = gazers.length; i < l; i++) {
            list.push({
                key: gazers[i].login,
                value: gazers[i].login,
            })
        }
        asynColumn.push({
            list
        })

        return <div id="example">
                <h2 id="header">React Ultra Selection Examples</h2>
                <div className="selection"><b>Basic selection </b><UltraSelect columns={basic}></UltraSelect></div>
                <div className="selection"><b>Multi-row selection </b><UltraSelect columns={multiRows}></UltraSelect></div>
                <div className="selection"><b>Dynamic selection </b><div>
                    <span>Click <a href="#" onClick={this.onClick.bind(this)}>here</a> to add a row in selection </span>
                    <UltraSelect columns={dynamic} backdrop={false}></UltraSelect></div>
                </div>
                <div className="selection"><b>Customizing </b>
                    <UltraSelect columns={customize} rowsVisible={3} rowHeight={4} rowHeightUnit="em" onDidSelect={this.onDidSelect}
                                 confirmButton="South Park!" getTitle={this.getTitle} getStaticText={this.getStaticText}></UltraSelect>
                </div>
                <div className="selection"><b>Load async data: </b>
                    <UltraSelect columns={asynColumn} onDidSelect={this.onAsync} getTitle={()=>'Language - Stargazers'}></UltraSelect></div>
        </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))
