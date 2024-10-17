'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { redirectUrlBuilder, SubscribeToConvertkitForm } from '@/convertkit'
import { Subscriber } from '@/schemas/subscriber'
import { track } from '@/utils/analytics'
import { cn } from '@/utils/cn'
import { LockIcon, ShieldCheckIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import common from '../text/common'

type PrimaryNewsletterCtaProps = {
	onSuccess?: () => void
	title?: string
	byline?: string
	actionLabel?: string
	id?: string
	className?: string
	trackProps?: {
		event?: string
		params?: Record<string, string>
	}
}

export const PrimaryNewsletterCta: React.FC<
	React.PropsWithChildren<PrimaryNewsletterCtaProps>
> = ({
	children,
	className,
	id = 'primary-newsletter-cta',
	title = common['primary-newsletter-tittle'],
	byline = common['primary-newsletter-byline'],
	actionLabel = common['primary-newsletter-button-cta-label'],
	trackProps = { event: 'subscribed', params: {} },
	onSuccess,
}) => {
	const router = useRouter()
	const handleOnSuccess = (subscriber: Subscriber | undefined) => {
		if (subscriber) {
			track(trackProps.event as string, trackProps.params)
			const redirectUrl = redirectUrlBuilder(subscriber, '/confirm')
			router.push(redirectUrl)
		}
	}

	return (
		<section
			data-theme="elysium"
			id={id}
			aria-label="Newsletter sign-up"
			className={cn(
				'border-border/50 relative flex flex-col items-center border-b px-5 pb-[450px]',
				className,
			)}
		>
			<Image
				src={require('../../public/assets/mountain.jpg')}
				className="object-cover object-bottom"
				aria-hidden="true"
				quality={100}
				priority
				alt=""
				fill
			/>
			{children ? (
				children
			) : (
				<div className="relative z-10 flex max-w-2xl flex-col items-center justify-center pb-10">
					<h2 className="font-heading fluid-3xl text-muted-foreground text-center font-extrabold">
						{title}
					</h2>
					<h3 className="fluid-lg text-secondary pt-8 text-center font-sans font-light">
						{byline}
					</h3>
				</div>
			)}
			<SubscribeToConvertkitForm
				onSuccess={onSuccess ? onSuccess : handleOnSuccess}
				actionLabel={actionLabel}
				className="relative z-10 [&_input]:h-16"
			/>
			<p
				data-nospam=""
				className="text-muted-foreground inline-flex items-center pt-8 text-center text-sm opacity-75"
			>
				<ShieldCheckIcon className="mr-2 h-4 w-4" /> I respect your privacy.
				Unsubscribe at any time.
			</p>
		</section>
	)
}
