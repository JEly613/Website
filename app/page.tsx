import { HomepageHero } from '@/components/home/HomepageHero'
import { HomepageSections } from '@/components/home/HomepageSections'
import { BlogTeaserSection } from '@/components/home/BlogTeaserSection'
import { getAllPosts } from '@/lib/blog'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main>
      <HomepageHero />
      <HomepageSections />
      <BlogTeaserSection posts={posts} />
    </main>
  )
}
