import { useReducer } from 'react'
import './App.css'
import DigitComponent from './DigitComponent'
import OperationComponent from './OperationComponent'

function reduce(state,{type,payload}){
  switch(type){
    case "add-digit":
      if(state.currentOp === "0" && payload.digit === "0") return state
      if(state.currentOp === "." && payload.digit === ".") return state   
       return {
        ...state,
        currentOp: `${state.currentOp || ""}${payload.digit}`
      }
    case "operation":
        if(!state.currentOp && !state.previousOp) return state 
        if(!state.previousOp){
          return{
            ...state,
            previousOp: state.currentOp,
            operation:payload.operation,
            currentOp:null
          }
        }
        if(!state.currentOp){
          return {
            ...state,
            operation: payload.operation
          }
        }
       
        return{
          ...state,
          currentOp: null,
          previousOp: evaluate(state),
          operation: payload.operation
      }
    case "evaluate" : 
      if(!state.currentOp || !state.previousOp || !state.operation) return state
      return{
        ...state,
        currentOp: evaluate(state),
        previousOp: null,
        operation:null
      }
    case "clearAll" :
      return{
        ...state,
        currentOp:null,
        previousOp:null,
        operation:null
      }
    case "delete" : 
      if(!state.currentOp) return state
      return {
        ...state,
        currentOp:state.currentOp.slice(0,-1)
      }
      
  }
}
function evaluate ({currentOp,previousOp,operation}){
  let prev = parseFloat(previousOp)
  let curr = parseFloat(currentOp)
  let result = ""
  switch(operation){
    case "+":
     result =  prev + curr
      break
    case "-":
     result =  prev - curr
      break
    case "*":
     result =  prev * curr
      break
    case "/":
     result =  prev  / curr
      break
    }
    console.log(result)
    return result.toString()
}

function App() {
const [{currentOp,previousOp,operation},dispatch] = useReducer(reduce,{})


console.log(currentOp)
  return (
    <div className='calculator'>
      <div className='output'>
        <p className='previousOp'>{previousOp} {operation}</p>
        <p className='currentOp'>{currentOp}</p>
      </div>
      <div className='digits'>
        <div className='digits-row'>
          <DigitComponent digit="1" dispatch={dispatch}/>
          <DigitComponent digit="2" dispatch={dispatch}/>
          <DigitComponent digit="3" dispatch={dispatch}/>
          <OperationComponent operation="*" dispatch={dispatch}/>
        </div>
        <div className='digits-row'>
          <DigitComponent digit="4" dispatch={dispatch}/>
          <DigitComponent digit="5" dispatch={dispatch}/>
          <DigitComponent digit="6" dispatch={dispatch}/>
          <OperationComponent operation="+" dispatch={dispatch}/>
        </div>
        <div className='digits-row'>
          <DigitComponent digit="7" dispatch={dispatch}/>
          <DigitComponent digit="8" dispatch={dispatch}/>
          <DigitComponent digit="9" dispatch={dispatch}/>
            <OperationComponent operation="-" dispatch={dispatch}/>
        </div>
        <div className='digits-row'>
         <DigitComponent digit="0" dispatch={dispatch}/>
           <DigitComponent digit="." dispatch={dispatch}/>
         <OperationComponent operation="/" dispatch={dispatch}/>
         <button onClick={() => dispatch({type:"delete"})}>Del</button>
       </div>
        <div className='double'>
           
            <button className='double' onClick={() => dispatch({type:"clearAll"})}>AC</button>
            <button className='double' onClick={() => dispatch({type:"evaluate"})}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
