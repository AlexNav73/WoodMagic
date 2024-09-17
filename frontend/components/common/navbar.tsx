import Link from "next/link";

export default function NavBar() {
    return <nav className="fixed w-full z-20 top-0 start-0 bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Wood Magic</Link>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul className="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link href="#" className="navbar-button" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link href="#" className="navbar-button">About</Link>
                    </li>
                    <li>
                        <Link href="#" className="navbar-button">Services</Link>
                    </li>
                    <li>
                        <Link href="#" className="navbar-button">Pricing</Link>
                    </li>
                    <li>
                        <Link href="#" className="navbar-button">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}