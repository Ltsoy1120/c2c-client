interface MyFrames extends Window {
  c2c: Window | undefined
}

interface DataToFrame {
  xin: string
  token: string
}

export const frame = {
  startFrame: (data: DataToFrame) => {
    const frame: HTMLIFrameElement | null = document.getElementById(
      "frame"
    ) as HTMLIFrameElement | null

    let frames = window.frames as MyFrames
    let win: Window = frames.c2c!

    if (win && frame) {
      frame.style.display = "block"
      win.postMessage(JSON.stringify(data), "*")
    }

    // Функция-обработчик события message
    const messageHandler = function (event: MessageEvent<string>) {
      const data = event.data
      console.log("MESSAGE FROM C2C =====", data)
      if (data === "FAIL") {
        if (frame) {
          ;(frame as HTMLIFrameElement).style.display = "none" // Закрываем фрейм
        }
        return
      }
      if (data === "SUCCESS") {
        if (frame) {
          ;(frame as HTMLIFrameElement).style.display = "none" // Закрываем фрейм
        }
        return
      }
      // if (
      //   data &&
      //   typeof data === "object" &&
      //   (data.status === "IDENTIFIED" ||
      //     data.status === "NOT_IDENTIFIED" ||
      //     data.status === "BLOCKED") &&
      //   state.userId
      // ) {
      //   if (data.subStatus && data.subStatus !== "UNFINISHED") {
      //     // Вызываем пользовательскую функцию для получения персональных данных
      //     getPersonalData(state.userId)
      //   }

      //   frame.style.display = "none" // Закрываем фрейм

      //   window.removeEventListener("message", messageHandler)
      // }
    }

    window.addEventListener("message", messageHandler, false)
  }
}
