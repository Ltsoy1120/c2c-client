import React, { useEffect, useState } from "react"
import "./App.css"
import { frame } from "./frame"

const API_URL = "https://test-c2c.paydala.kz/api/"
const BASE_URL = "https://test-c2c.paydala.kz"
const API_KEY = "your_api_key_1"
const API_SECRET = "your_api_key_1"

function App() {
  const [state, setState] = useState({
    userId: "",
    iin: "",
    token: ""
  })

  const [error, setError] = useState()

  useEffect(() => {
    if (state.token && state.userId && state.iin) {
      frame.startFrame(state)
    }
  }, [])

  const onClickHandler = () => {
    const getToken = async () => {
      await fetch(`${API_URL}client/token`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
          "X-API-SECRET": API_SECRET
        },
        body: JSON.stringify({ userId: state.userId })
      })
        .then(response => response.json())
        .then(data => {
          // setError(data)
          setState({ ...state, token: data.token })
        })
        .catch(error => {
          setError(error)
        })
    }
    getToken()
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setState({ ...state, [name]: value })
  }

  return (
    <div className="App">
      <form className="form">
        <div className="input-field">
          <label htmlFor="userId">Обязательное поле *</label>
          <input
            id="userId"
            name="userId"
            placeholder="Ваш userId"
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-field">
          <label htmlFor="iin">Обязательное поле *</label>
          <input
            id="iin"
            name="iin"
            placeholder="Ваш ИИН"
            onChange={onChangeHandler}
          />
        </div>
        <button type="button" onClick={onClickHandler} disabled={!state.userId}>
          Отправить запрос
        </button>
      </form>
      {state.token && <p>data: {JSON.stringify(state.token)}</p>}
      {error && <p>error: {JSON.stringify(error)}</p>}
      <iframe
        id="frame"
        title="Frame"
        name="c2c"
        src={`${BASE_URL}`}
        frameBorder="1"
        width="500px"
        // height="800px"
        scrolling="no"
        style={{ display: "none" }}
      ></iframe>
    </div>
  )
}

export default App
