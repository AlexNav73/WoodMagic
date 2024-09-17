import Link from "next/link"

type ProductDetails = {
    name: string,
    imageUrl: string,
    price: number,
    rate: number
}

function Star({ rate }: { rate: boolean }) {
    const classNames = rate ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600'

    return <svg className={`w-4 h-4 ${classNames}`} aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
}

function Rating({ rate }: { rate: number }) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(<Star rate={i + 1 <= rate} />)
    }

    return <div className="flex items-center mt-2.5 mb-5">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {stars}
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rate}</span>
    </div>
}

function Product({ product }: { product: ProductDetails }) {
    return <div className="w-40 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href="#">
            <img className="p-8 rounded-t-lg" src={product.imageUrl} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
            <Link href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
            </Link>
            <Rating rate={product.rate} />
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}$</span>
                <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
            </div>
        </div>
    </div>
}

export default async function ProductList() {
    if (!process.env.BACKEND_URL) {
        throw new Error("The backend url is not valid")
    }

    console.log(process.env.BACKEND_URL)

    const data = await fetch(process.env.BACKEND_URL, { cache: 'no-store' })
        .then(r => r.json())
        .catch(_ => { throw new Error("Something went wrong during data fetching") })

    return (<>
        <div className="flex w-full h-full mx-5">
            {data.map((i: ProductDetails, idx: number) => <li key={idx}><Product product={i} /></li>)}
        </div>
    </>)
}