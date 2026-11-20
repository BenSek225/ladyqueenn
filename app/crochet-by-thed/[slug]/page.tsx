import { productPage } from '@/lib/product-page'

const page = productPage('crochet-by-thed')

export const generateStaticParams = page.generateStaticParams
export const generateMetadata = page.generateMetadata
export default page.Page
