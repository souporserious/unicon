import React from 'react'

function Controls({
  scaleAuto,
  scaleAmount,
  onScaleAutoChange,
  onScaleAmountChange,
}) {
  return (
    <div style={{ display: 'flex', padding: 16 }}>
      <h4 style={{ margin: '0px 16px 0px 0px' }}>Scale:</h4>
      <label style={{ marginRight: 8 }}>
        Auto
        <input
          type="checkbox"
          checked={scaleAuto}
          onChange={onScaleAutoChange}
          style={{ marginLeft: 8 }}
        />
      </label>
      <label>
        Amount
        <input
          type="number"
          min={1}
          max={6}
          value={scaleAmount}
          onChange={onScaleAmountChange}
          style={{ marginLeft: 8 }}
        />
      </label>
    </div>
  )
}

export default Controls
