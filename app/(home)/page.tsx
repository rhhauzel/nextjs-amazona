import React from 'react'
import  HomeCarousel  from '@/components/shared/home/home-carousel'
import data from '@/lib/data'

const Page = () => {
  return <HomeCarousel items={data.carousels} />
}

export default Page
