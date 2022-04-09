export const enum UPDATE_TYPE {
  coreDevMeeting = 'Core Dev Meeting',
  qAndA = 'Q&A',
}

export interface IUpdate {
  video?: string
  title: string
  type: UPDATE_TYPE
}

export const UPDATES: IUpdate[] = [
  {
    video: 'https://www.youtube.com/watch?v=FtyhMAWto90&t=825',
    title: 'HardFork 25 Q&A',
    type: UPDATE_TYPE.qAndA,
  },
  {
    video: 'https://www.youtube.com/watch?v=pxUvrI0pyPs',
    title: 'Core Dev Meeting #24',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=KS4yRaZtejE',
    title: 'Core Dev Meeting #23',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=WIHxpfBa2KE',
    title: 'Core Dev Meeting #22',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=2tOH_yCANCo',
    title: 'Core Dev Meeting #21',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=JmQU5czs98w',
    title: 'Core Dev Meeting #20',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=UIRR5gFfVYk',
    title: 'Core Dev Meeting #19',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=OL4tH5w5oYY',
    title: 'Core Dev Meeting #18',
    type: UPDATE_TYPE.coreDevMeeting,
  },
]
