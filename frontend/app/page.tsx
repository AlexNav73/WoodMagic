import { Suspense } from 'react'

import Loading from './loading'

import ProductList from '@/components/home/products'

export const dynamic = 'force-dynamic'

export default async function Page() {
    return (<div className=''>
        <Suspense fallback={<Loading />}>
            <ProductList />
        </Suspense>
    </div>)
}