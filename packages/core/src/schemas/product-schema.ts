import { z } from 'zod'

export const productSchema = z.object({
	id: z.string().max(191),
	name: z.string().max(191),
	key: z.string().max(191).optional(),
	metadata: z.record(z.any()).default({}),
	createdAt: z
		.string()
		.datetime()
		.default(() => new Date().toISOString()),
	status: z.number().int().default(0),
	quantityAvailable: z.number().int().default(-1),
})

export type Product = z.infer<typeof productSchema>
