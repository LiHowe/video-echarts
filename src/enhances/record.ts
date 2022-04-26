import { EnhancedChart } from '..'
import { invokeFnWithCatch } from '@ziho/suitcase'

export interface RecorderOptions extends BasicRecordOptions {
  mimeType?: string
  recorder?: MediaRecorder
}

export interface BasicRecordOptions {
  framerate?: number
}

const defaultOptions: RecorderOptions = {
  framerate: 25,
}

/**
 * 
 */
export default (ec: EnhancedChart, opts: RecorderOptions = defaultOptions) => {

  let stream: MediaStream | null = null
  let recorder: MediaRecorder | null = opts.recorder || null

  ec.listen('beforeReplay', () => {

    if (ec.__state__.isRecording) {
      if (recorder) {
        recorder.stop()
      } else {
        ec.__state__.isRecording = false
      }
    }

    const dom = ec.getDom()
    if (dom instanceof HTMLCanvasElement) {
      stream = dom.captureStream(opts.framerate)
    } else {
      const canvas = dom.querySelector('canvas')
      if (!canvas) {
        // throw new Error('Can not find canvas element')
        console.error('Can not find canvas element')
        return
      }
      stream = canvas.captureStream(opts.framerate)
    }

    if (!stream) {
      console.error('Can not record without stream.')
      return
    }

    if (!recorder) {
      recorder = new MediaRecorder(stream, opts)
      recorder.ondataavailable = (e: BlobEvent) => {
        const { data } = e
        const cbs = ec.__hooks__['videoAvaliable'] ?? []
        cbs.forEach(cb => invokeFnWithCatch(() => cb(data)))
      }
    }
    ec.__state__.isRecording = true
    recorder.start()
  })


  ec.listen('afterReplay', () => {
    if (ec.__state__.isRecording && recorder) {
      recorder.stop()
      ec.__state__.isRecording = false
    }
  })

}