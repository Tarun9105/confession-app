import { z } from 'zod';

const idSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

export const createConfessionSchema = z.object({
  body: z.object({
    text: z.string().min(1, 'Confession text cannot be empty').max(1000, 'Confession cannot be more than 1000 characters'),
    type: z.enum(['deep', 'secret', 'funny', 'general']).optional(),
    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
    blurred: z.boolean().optional()
  })
});

export const updateConfessionSchema = z.object({
  params: z.object({
    id: idSchema
  }),
  body: z.object({
    text: z.string().max(1000, 'Confession cannot be more than 1000 characters').optional(),
    type: z.enum(['deep', 'secret', 'funny', 'general']).optional(),
    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
    blurred: z.boolean().optional()
  })
});

export const votePostSchema = z.object({
  params: z.object({
    id: idSchema
  }),
  body: z.object({
    type: z.enum(['like', 'dislike', 'reaction']),
    reactionValue: z.string().optional()
  })
});

export const addCommentSchema = z.object({
  params: z.object({
    id: idSchema
  }),
  body: z.object({
    text: z.string().min(1, 'Comment text cannot be empty').max(500, 'Comment cannot be more than 500 characters')
  })
});

export const reportConfessionSchema = z.object({
  params: z.object({
    id: idSchema
  }),
  body: z.object({
    reason: z.enum(['SPAM', 'HARASSMENT', 'OFFENSIVE', 'SELF_HARM', 'OTHER']),
    details: z.string().max(200, 'Details cannot be more than 200 characters').optional()
  })
});
