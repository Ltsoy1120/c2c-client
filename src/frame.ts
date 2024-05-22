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
    const frame: HTMLIFrameElement | null = document.getElementById(
      "frame"
    ) as HTMLIFrameElement | null

    let frames = window.frames as MyFrames
    let win: Window = frames.c2c!

    if (win && frame) {
      frame.style.display = "block"
      win.postMessage(JSON.stringify(data), "*")
    }
  }
}
