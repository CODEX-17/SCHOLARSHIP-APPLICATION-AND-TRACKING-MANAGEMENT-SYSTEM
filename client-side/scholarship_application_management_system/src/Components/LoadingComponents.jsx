import React from 'react'
import style from './LoadingComponents.module.css'

const LoadingComponents = ({ message }) => {
  return (
    <div className={style.container}>
      <span className={style.loader}></span>
      <h1>{message && message || 'Loading...'}</h1>
    </div>
  )
}

export default LoadingComponents
