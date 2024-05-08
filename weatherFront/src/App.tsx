import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const getWeather = async () => {
  const response = await fetch(`http://localhost:3000/`);
  // const weatherData = await fetch(`http://localhost:3000`);
  // const weatherData = await response.json().catch((e) => "error");
  // console.log(`response ${response}`)
  // console.log(response)
  console.log("response")
  console.log(response)

   return  "response";
}

 function App() {


  // const data = await getWeather();
  // console.log(data)

  const [count, setCount] = useState(0)
  // const [data, setData] = useState()
  // const [body, setBody] = useState()
  // const aha = await getWeather()
  // console.log(aha)

  // useEffect(()=>
  //   { 
  //     ( async () => 
  //       { const _body = await getWeather() 
  //         // setBody(_body)
  //        })() 
  //   },[count])

  // console.log(body)

  getWeather()


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <h1>{body}</h1> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
