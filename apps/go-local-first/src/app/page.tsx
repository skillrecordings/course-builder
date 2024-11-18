import * as React from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { PricingWidget } from '@/app/_components/home-pricing-widget'
import Footer from '@/components/app/footer'
import LandingCopy from '@/components/landing-copy'
import { PrimaryNewsletterCta } from '@/components/primary-newsletter-cta'
import config from '@/config'
import { courseBuilderAdapter } from '@/db'
import { env } from '@/env.mjs'
import { getPage } from '@/lib/pages-query'
import { getPricingProps } from '@/lib/pricing-query'
import { cn } from '@/utils/cn'
import MuxPlayer from '@mux/mux-player-react'
import { CK_SUBSCRIBER_KEY } from '@skillrecordings/config'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { getCouponForCode } from '@coursebuilder/core/pricing/props-for-commerce'

import {
	BlueSection,
	CenteredTitle,
	CheckList,
	Instructor,
	Section,
	Spacer,
} from './admin/pages/_components/page-builder-mdx-components'

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const searchParams = await props.searchParams
	let ogImageUrl = `${env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent('Go Local-First')}`
	const codeParam = searchParams?.code
	const couponParam = searchParams?.coupon
	const couponCodeOrId = codeParam || couponParam
	if (couponCodeOrId) {
		const coupon = await getCouponForCode(
			couponCodeOrId,
			[],
			courseBuilderAdapter,
		)
		const validCoupon = Boolean(coupon && coupon.isValid)
		if (validCoupon)
			ogImageUrl = `${env.NEXT_PUBLIC_URL}/api/og?title=${encodeURIComponent('Go Local-First')}`
	}

	return {
		title: {
			template: `%s | ${config.defaultTitle}`,
			default: config.defaultTitle,
		},
		openGraph: {
			images: [
				{
					url: ogImageUrl,
				},
			],
		},
	}
}

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>
}

const Home = async (props: Props) => {
	const searchParams = await props.searchParams
	const { allowPurchase, pricingDataLoader, product, commerceProps } =
		await getPricingProps({ searchParams })
	const page = await getPage(allowPurchase ? 'home-z9ik9' : 'home-z9ik9')
	const cookieStore = await cookies()
	const ckSubscriber = cookieStore.has(CK_SUBSCRIBER_KEY)

	return (
		<div className="">
			<header className="relative mx-auto flex w-full flex-col items-center justify-center">
				<div className="relative z-10 mt-20 flex flex-col items-center justify-center px-5">
					<h1 className="leading-0 font-heading sm:fluid-3xl fluid-2xl w-full max-w-4xl text-center font-bold">
						{config.defaultTitle}
					</h1>
					<h2 className="font-heading sm:fluid-lg fluid-base text-muted-foreground mb-5 mt-7 items-center text-balance text-center font-normal !tracking-tight sm:inline-flex">
						Professional Course by{' '}
						<Image
							src={require('../../public/nik-graf.jpeg')}
							alt={config.author}
							priority
							className="ml-2 mr-1 inline-block rounded-full"
							width={32}
							quality={100}
							height={32}
						/>{' '}
						Nik Graf
					</h2>
				</div>
			</header>

			<main className="w-full pt-5 sm:pt-16">
				<article className="prose sm:prose-lg lg:prose-xl prose-headings:mx-auto prose-headings:max-w-4xl prose-p:mx-auto prose-p:max-w-4xl prose-ul:mx-auto prose-ul:max-w-4xl prose-img:mx-auto prose-img:max-w-4xl mx-auto max-w-none px-5">
					{page?.fields?.body ? (
						<MDXRemote
							source={page?.fields?.body}
							components={{
								CenteredTitle,
								Instructor,
								BlueSection,
								Spacer,
								Section,
								CheckList,
								// @ts-expect-error
								MuxPlayer,
							}}
						/>
					) : (
						<LandingCopy />
					)}
				</article>
				{product && allowPurchase && pricingDataLoader ? (
					<>
						<section id="buy" className="mt-10 sm:mt-24">
							<h2 className="fluid-2xl mb-10 text-balance px-5 text-center font-bold">
								{config.defaultTitle}
							</h2>
							<div className="flex items-center justify-center border-y">
								<div className="bg-background flex w-full max-w-md flex-col border-x p-8">
									<PricingWidget
										quantityAvailable={-1}
										pricingDataLoader={pricingDataLoader}
										commerceProps={{ ...commerceProps }}
										product={product}
									/>
								</div>
							</div>
						</section>
						<section className="flex items-center justify-center py-10">
							<img
								src={'/assets/money-back-guarantee-badge.svg'}
								width={100}
								height={100}
								alt="30-day money back guarantee"
							/>
						</section>
					</>
				) : ckSubscriber ? null : (
					<PrimaryNewsletterCta className="px-5 pt-10" />
				)}
			</main>
		</div>
	)
}

export default Home
