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
    video: 'https://www.youtube.com/watch?v=uoskscKWT-A',
    title: 'Core Dev Meeting #36',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=ikzao9_9Gl4',
    title: 'Core Dev Meeting #35',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=VEUJ4f0vxXc',
    title: 'Core Dev Meeting #34',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=r-MNCVYl8hU',
    title: 'Core Dev Meeting #33',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=7-iq0gj7pf4',
    title: 'Core Dev Meeting #32',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=9r1Sqhgd2_0',
    title: 'Core Dev Meeting #31',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=mGb0fMIFaHk',
    title: 'Core Dev Meeting #30',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=fhy7YfV1_sM',
    title: 'Core Dev Meeting #29',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=aD83Jpkg_iU',
    title: 'Core Dev Meeting #28',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=8DFXZPK9mQ0',
    title: 'Core Dev Meeting #27',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=UF-t2ra9kQI',
    title: 'Core Dev Meeting #26',
    type: UPDATE_TYPE.coreDevMeeting,
  },
  {
    video: 'https://www.youtube.com/watch?v=D2iS7B7-8rg',
    title: 'Core Dev Meeting #25',
    type: UPDATE_TYPE.coreDevMeeting,
  },
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
