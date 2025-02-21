import React from 'react'
import HomeCarousel from '@/components/shared/home/home-carousel'
import data from '@/lib/data'
import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import HomeCard from '@/components/shared/home/home-card'
//import { getSettings } from '@/lib/actions/settings.actions'
import { toSlug } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/shared/product/product-slider'
import BrowsingHistoryList from '@/components/shared/browsing-hhistory-list'
//import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })
  const featured = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
      items: newArrivals,
    },
    {
      title: 'Discover Best Sellers',
      link: {
        text: 'View All',
        href: '/search?tag=best-seller',
      },
      items: bestSellers,
    },
    {
      title: 'Featured Products',
      link: {
        text: 'Shop Now',
        href: '/search?tag=featured',
      },
      items: featured,
    },
  ]

  const todaysDeals = await getProductsByTag({tag: 'todays-deal'})
  const bestSellingProducts = await getProductsByTag({tag: 'best-seller'})

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 item-center gap-3'>
            <ProductSlider title={"Today's Deals"} products={todaysDeals} />
          </CardContent>
        </Card>

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 item-center gap-3'>
            <ProductSlider title='Best Selling Products' products={bestSellingProducts} />
          </CardContent>
        </Card>
      </div>

      <div className='p-4 bg-background'>
        <BrowsingHistoryList />
      </div>
    </>
  )
}

export default Page
