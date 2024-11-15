import { z } from 'zod'

export const sanitySoftwareLibraryDocumentSchema = z.object({
	_type: z.literal('software-library'),
	_id: z.string(),
	slug: z.object({
		current: z.string(),
	}),
})

export type SanitySoftwareLibraryDocument = z.infer<
	typeof sanitySoftwareLibraryDocumentSchema
>

export const sanityVersionedSoftwareLibraryObjectSchema = z.object({
	_type: z.literal('versioned-software-library'),
	_key: z.string(),
	library: z.object({
		_type: z.literal('reference'),
		_ref: z.string(),
	}),
})

export type SanityVersionedSoftwareLibraryObject = z.infer<
	typeof sanityVersionedSoftwareLibraryObjectSchema
>

export const sanityCollaboratorDocumentSchema = z.object({
	_type: z.literal('collaborator'),
	role: z.enum(['instructor', 'staff', 'illustrator']),
	_id: z.string(),
	eggheadInstructorId: z.string(),
})

export type SanityCollaboratorDocument = z.infer<
	typeof sanityCollaboratorDocumentSchema
>

export const sanityCollaboratorReferenceObjectSchema = z.object({
	_type: z.literal('reference'),
	_key: z.string(),
	_ref: z.string(),
})

export type SanityCollaboratorReferenceObject = z.infer<
	typeof sanityCollaboratorReferenceObjectSchema
>

export const sanityVideoResourceDocumentSchema = z.object({
	_createdAt: z.string().datetime().optional(),
	_id: z.string().optional(),
	_rev: z.string().optional(),
	_type: z.literal('videoResource'),
	_updatedAt: z.string().datetime().optional(),
	filename: z.string().optional(),
	mediaUrls: z.object({
		hlsUrl: z.string(),
		dashUrl: z.string().optional(),
	}),
	muxAsset: z
		.object({
			muxAssetId: z.string().optional(),
			muxPlaybackId: z.string().optional(),
		})
		.optional(),
	transcript: z
		.object({
			srt: z.string(),
			text: z.string(),
		})
		.optional(),
})

export type SanityVideoResourceDocument = z.infer<
	typeof sanityVideoResourceDocumentSchema
>

export const sanityLessonDocumentSchema = z.object({
	_type: z.literal('lesson'),
	_id: z.string().nullish(),
	title: z.string(),
	slug: z.object({
		_type: z.literal('slug'),
		current: z.string(),
	}),
	description: z.string().nullish(),
	railsLessonId: z.string().or(z.number()).nullish(),
	softwareLibraries: z
		.array(sanityVersionedSoftwareLibraryObjectSchema)
		.nullish(),
	collaborators: z.array(sanityCollaboratorReferenceObjectSchema).nullish(),
	status: z.string().nullish(),
	accessLevel: z.enum(['free', 'pro']).nullish(),
})

export type SanityLessonDocument = z.infer<typeof sanityLessonDocumentSchema>

export const keyGenerator = () => {
	return [...Array(12)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join('')
}
