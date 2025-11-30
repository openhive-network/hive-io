export interface IVideo {
  videoId: string;
  title: string;
  description: string;
  featured?: boolean;
}

export const ABOUT_VIDEOS: IVideo[] = [
  {
    videoId: 'llIRm5XxeRA',
    title: 'To Gas Or Not To Gas?',
    description:
      'Gas fees shape how people experience blockchains. Some ecosystems remove them, others sponsor or hide them, and some make them so tiny they nearly disappear. This session compares four approaches.',
    featured: true,
  },
  {
    videoId: 'cBjfIJB9XTo',
    title: 'Chain Culture',
    description:
      'A full day of cross-chain talks, creative showcases, penguins, and pure good vibes at HiveFest 10.',
  },
  {
    videoId: 'oPwuUofvf_0',
    title: 'HardFork 28 - The Future of Hive',
    description:
      "The CoreDev team on HF28, scalability and governance behind Hive's tech engine.",
  },
];
