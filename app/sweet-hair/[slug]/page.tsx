import { productPage } from '@/lib/product-page'

const page = productPage('sweet-hair')

export const generateStaticParams = page.generateStaticParams
export const generateMetadata = page.generateMetadata
export default page.Page
