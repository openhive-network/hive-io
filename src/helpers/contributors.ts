import {IContributor, ContributorLabel} from '~/types'

/**
 * id: Hive account name
 * name: Display name
 */
export const CONTRIBUTORS: IContributor[] = [
  {
    id: 'blocktrades',
    name: 'Dan Notestein',
    social: {
      hive: 'blocktrades',
      linkedin: 'dannotestein',
    },
    labels: [ContributorLabel.coreDeveloper, ContributorLabel.blockProducer],
  },
  {
    id: 'mahdiyari',
    name: 'Mahdi Yari',
    social: {
      hive: 'mahdiyari',
      twitter: 'MahdiYari4',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'gtg',
    name: 'Gandalf',
    social: {
      hive: 'gtg',
    },
    labels: [ContributorLabel.coreDeveloper, ContributorLabel.blockProducer],
  },
  {
    id: 'bartekwrona',
    name: 'Bartek Wrona',
    image: 'bartekwrona.png',
    social: {
      hive: 'bartek',
    },
    labels: [ContributorLabel.coreDeveloper],
  },
  {
    id: 'wolf',
    name: 'Wolf',
    social: {
      hive: 'therealwolf',
      twitter: 'nftimo',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'brianoflondon',
    name: 'Brian of London',
    social: {
      hive: 'brianoflondon',
    },
    labels: [ContributorLabel.marketing, ContributorLabel.developer],
  },
  {
    id: 'goodkarma',
    name: 'Good Karma',
    social: {
      hive: 'good-karma',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'roelandp',
    name: 'Roeland P.',
    social: {
      hive: 'roelandp',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'howo',
    name: 'Howo',
    social: {
      hive: 'howo',
    },
    labels: [ContributorLabel.coreDeveloper, ContributorLabel.blockProducer],
  },
  {
    id: 'ausbitbank',
    name: 'Ausbitbank',
    social: {
      hive: 'ausbitbank',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'pharesim',
    name: 'Pharesim',
    social: {
      hive: 'pharesim',
    },
    labels: [ContributorLabel.blockProducer],
  },
  {
    id: 'themarkymark',
    name: 'Marky',
    social: {
      hive: 'themarkymark',
    },
    labels: [ContributorLabel.blockProducer],
  },
  {
    id: 'arcange',
    name: 'Arcange',
    social: {
      hive: 'arcange',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'yabapmatt',
    name: 'Matt Rosen',
    social: {
      hive: 'yabapmatt',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'anyx',
    name: 'Anyx',
    social: {
      hive: 'anyx',
    },
    labels: [ContributorLabel.blockProducer],
  },
  {
    id: 'someguy123',
    name: 'Someguy',
    social: {
      hive: 'someguy123',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'stoodkev',
    name: 'Stoodkev',
    social: {
      hive: 'stoodkev',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'abit',
    name: 'Abit',
    social: {
      hive: 'abit',
    },
    labels: [ContributorLabel.coreDeveloper, ContributorLabel.blockProducer],
  },
  {
    id: 'emrebeyler',
    name: 'Emre',
    social: {
      hive: 'emrebeyler',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'aggroed',
    name: 'Aggroed',
    social: {
      hive: 'aggroed',
    },
    labels: [ContributorLabel.marketing, ContributorLabel.blockProducer],
  },
  {
    id: 'drakos',
    name: 'Drakos',
    social: {
      hive: 'drakos',
    },
    labels: [ContributorLabel.developer, ContributorLabel.blockProducer],
  },
  {
    id: 'crimsonclad',
    name: 'Crimsonclad',
    social: {
      hive: 'crimsonclad',
    },
    labels: [ContributorLabel.marketing, ContributorLabel.blockProducer],
  },
  {
    id: 'theycallmedan',
    name: 'Dan Hensley',
    social: {
      hive: 'theycallmedan',
    },
    labels: [ContributorLabel.marketing],
  },
  {
    id: 'fredrikaa',
    name: 'Fredrikaa',
    social: {
      hive: 'fredrikaa',
    },
    labels: [ContributorLabel.marketing, ContributorLabel.blockProducer],
  },
  {
    id: 'guiltyparties',
    name: 'Guiltyparties',
    social: {
      hive: 'guiltyparties',
    },
    labels: [ContributorLabel.blockProducer],
  },
  {
    id: 'acidyo',
    name: 'Acid',
    social: {
      hive: 'acidyo',
    },
    labels: [ContributorLabel.blockProducer],
  },
  {
    id: 'lordbutterfly',
    name: 'Lord Butterfly',
    social: {
      hive: 'lordbutterfly',
    },
    labels: [ContributorLabel.marketing],
  },
  {
    id: 'smooth',
    name: 'Smooth',
    social: {
      hive: 'smooth',
    },
    labels: [ContributorLabel.blockProducer],
  },
]

export const CONTRIBUTOR_LABELS = {
  [ContributorLabel.coreDeveloper]: {
    background: '#7eaafa8c',
    text: 'rgb(54 100 182)',
  },
  [ContributorLabel.marketing]: {
    background: '#faa07e8c',
    text: 'rgb(166 77 43)',
  },
  [ContributorLabel.developer]: {
    background: '#7ed2fa8c',
    text: '#0426378c',
  },
  [ContributorLabel.blockProducer]: {
    background: '#917efa8c',
    text: '#0c062d8c',
  },
}

/*
[ContributorLabel.coreDeveloper]: {
    background: '#faea7e8c',
    text: 'rgb(117 104 20)',
  },
  social: {
    background: '#7efac08c',
    text: 'rgb(20 121 75)',
  },
  */