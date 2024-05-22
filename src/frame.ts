interface MyFrames extends Window {
  c2c: Window | undefined
}

export const frame = {
  startFrame: (token: string) => {
    const frame: HTMLIFrameElement | null = document.getElementById(
      "frame"
    ) as HTMLIFrameElement | null

    let frames = window.frames as MyFrames
    let win: Window = frames.c2c!

    if (win && frame) {
      frame.style.display = "block"
      win.postMessage(JSON.stringify(token), "*")
    }
  }
}
