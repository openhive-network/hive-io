import {Developers} from '@/components/developers/Developers'
import {getDevActivity, getDeveloperFacts} from '@/lib/developer-facts'

export default async function DevelopersPage() {
  const [facts, activity] = await Promise.all([
    getDeveloperFacts(),
    getDevActivity(),
  ])
  return <Developers facts={facts} activity={activity} />
}
