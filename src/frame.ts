interface MyFrames extends Window {
  c2c: Window | undefined
}

interface DataToFrame {
  userId: string
  iin: string
  token: string
}

export const frame = {
  startFrame: (data: DataToFrame) => {
    // const frame: HTMLIFrameElement | null = document.getElementById(
    //   "frame"
    // ) as HTMLIFrameElement | null
    // Создаем новый элемент iframe
    const newIframe = document.createElement("iframe")

    // Устанавливаем атрибуты iframe
    newIframe.id = "frame"
    newIframe.title = "Frame"
    newIframe.name = "c2c"
    newIframe.src = "https://test-c2c.paydala.kz"
    newIframe.frameBorder = "1"
    newIframe.width = "500px"
    newIframe.scrolling = "no"
    newIframe.style.display = "none"

    // Добавляем iframe в HTML-элемент с id "c2c-frame"
    const c2cFrame = document.getElementById("c2c-frame")
    if (c2cFrame) {
      c2cFrame.appendChild(newIframe)
    } else {
      console.error("Element with id 'c2c-frame' not found!")
    }

    let frames = window.frames as MyFrames
    let win: Window = frames.c2c!

    if (win) {
      // frame.style.display = "block"
      win.postMessage(JSON.stringify(data), "*")
    }
  }
}
