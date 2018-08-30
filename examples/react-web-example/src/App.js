import React, { Component } from 'react'
import Graphic from 'unicon-react'
import * as Icons from './icons'
import Controls from './Controls'

import './App.css'

class App extends Component {
  state = {
    scaleAuto: false,
    scaleAmount: 4,
  }
  render() {
    const { scaleAuto, scaleAmount } = this.state
    return (
      <div>
        <Controls
          scaleAuto={scaleAuto}
          onScaleAutoChange={() =>
            this.setState(state => ({ scaleAuto: !state.scaleAuto }))
          }
          scaleAmount={scaleAmount}
          onScaleAmountChange={e =>
            this.setState({ scaleAmount: +e.target.value })
          }
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#3FA86B',
          }}
        >
          {Object.keys(Icons).map(key => (
            <div
              key={key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
            >
              <Graphic
                source={Icons[key]}
                scale={scaleAuto ? 'auto' : scaleAmount}
                fill="none"
              />
              <span style={{ marginTop: 16 }}>{key}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
