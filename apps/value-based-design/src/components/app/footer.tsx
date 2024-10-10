import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="relative mx-auto flex w-full max-w-screen-lg flex-col items-start justify-between gap-16 px-5 pb-48 pt-14 sm:flex-row sm:px-10 sm:pt-16 lg:px-5">
			<small className="absolute bottom-5 left-5 flex items-center gap-5">
				<span className="opacity-75">© valuebased.design</span>
				<Link
					className="opacity-75 transition hover:opacity-100"
					href="/privacy"
				>
					Terms & Conditions
				</Link>
			</small>
		</footer>
	)
}
