function DigitComponent({digit,dispatch}) {
  return (
    <button onClick={() => dispatch({type:"add-digit",payload:{digit}})}>{digit}</button>
  )
}

export default DigitComponent