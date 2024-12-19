interface MyFrames extends Window {
  c2c: Window | undefined
}

interface DataToFrame {
  xin: string
  token: string
}

export const frame = {
  start: (data: DataToFrame) => {
    const frame = document.getElementById("frame") as HTMLIFrameElement | null
    if (!frame) {
      console.error("Iframe с id 'frame' не найден.")
      return
    }

    let frames = window.frames as MyFrames
    let win = frames.c2c

    if (!win) {
      console.error("Окно c2c недоступно.")
      return
    }

    // Отображаем iframe и отправляем данные
    frame.style.display = "block"
    try {
      win.postMessage(JSON.stringify(data), "*")
    } catch (error) {
      console.error("Ошибка при отправке сообщения в iframe:", error)
    }

    // Функция-обработчик события message
    const handleMessage = function (event: MessageEvent<string>) {
      console.log("Сообщение от C2C: ", event.data)

      if (event.data === "FAIL" || event.data === "SUCCESS") {
        frame.style.display = "none" // Скрываем фрейм
        window.removeEventListener("message", handleMessage) // Удаляем обработчик
      }
    }

    window.addEventListener("message", handleMessage, false)
  }
}
