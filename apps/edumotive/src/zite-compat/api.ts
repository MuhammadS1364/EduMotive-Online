import type { z } from 'zod';
import type getSiteEndpoint from '../api/getSite';
import type getCatalogEndpoint from '../api/getCatalog';
import type getMeEndpoint from '../api/getMe';
import type getArticleEndpoint from '../api/getArticle';
import type getNewsEndpoint from '../api/getNews';
import type getAdsEndpoint from '../api/getAds';
import type saveProfileEndpoint from '../api/saveProfile';
import type saveSubmissionEndpoint from '../api/saveSubmission';
import type createSubscriptionEndpoint from '../api/createSubscription';
import type submitAdEndpoint from '../api/submitAd';
import type submitLetterEndpoint from '../api/submitLetter';
import { getAuthHeaders } from './auth';

type Out<T extends { outputSchema: z.ZodTypeAny }> = z.infer<T['outputSchema']>;
type In<T extends { inputSchema: z.ZodTypeAny }> = z.infer<T['inputSchema']>;

export type GetSiteOutputType = Out<typeof getSiteEndpoint>;
export type GetCatalogOutputType = Out<typeof getCatalogEndpoint>;
export type GetMeOutputType = Out<typeof getMeEndpoint>;
export type GetArticleOutputType = Out<typeof getArticleEndpoint>;
export type GetNewsOutputType = Out<typeof getNewsEndpoint>;
export type GetAdsOutputType = Out<typeof getAdsEndpoint>;
export type SaveProfileOutputType = Out<typeof saveProfileEndpoint>;
export type SaveSubmissionOutputType = Out<typeof saveSubmissionEndpoint>;
export type CreateSubscriptionOutputType = Out<typeof createSubscriptionEndpoint>;
export type SubmitAdOutputType = Out<typeof submitAdEndpoint>;
export type SubmitLetterOutputType = Out<typeof submitLetterEndpoint>;

async function call<TIn, TOut>(name: string, input: TIn): Promise<TOut> {
  const res = await fetch(`/api/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(input ?? {}),
  });
  const text = await res.text();
  let data: Record<string, unknown> = {};
  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      const ct = res.headers.get('content-type') || 'unknown';
      throw new Error(`API /api/${name} returned invalid response (${res.status}, ${ct})`);
    }
  }
  if (!res.ok) {
    const errMsg =
      (typeof data?.error === 'string' && data.error) ||
      (typeof data?.message === 'string' && data.message) ||
      `Request failed (${res.status})`;
    throw new Error(errMsg);
  }
  return data as TOut;
}

export const getSite = (input: In<typeof getSiteEndpoint>) =>
  call<In<typeof getSiteEndpoint>, GetSiteOutputType>('getSite', input);

export const getCatalog = (input: In<typeof getCatalogEndpoint>) =>
  call<In<typeof getCatalogEndpoint>, GetCatalogOutputType>('getCatalog', input);

export const getMe = (input: In<typeof getMeEndpoint>) =>
  call<In<typeof getMeEndpoint>, GetMeOutputType>('getMe', input);

export const getArticle = (input: In<typeof getArticleEndpoint>) =>
  call<In<typeof getArticleEndpoint>, GetArticleOutputType>('getArticle', input);

export const getNews = (input: In<typeof getNewsEndpoint>) =>
  call<In<typeof getNewsEndpoint>, GetNewsOutputType>('getNews', input);

export const getAds = (input: In<typeof getAdsEndpoint>) =>
  call<In<typeof getAdsEndpoint>, GetAdsOutputType>('getAds', input);

export const saveProfile = (input: In<typeof saveProfileEndpoint>) =>
  call<In<typeof saveProfileEndpoint>, SaveProfileOutputType>('saveProfile', input);

export const saveSubmission = (input: In<typeof saveSubmissionEndpoint>) =>
  call<In<typeof saveSubmissionEndpoint>, SaveSubmissionOutputType>('saveSubmission', input);

export const createSubscription = (input: In<typeof createSubscriptionEndpoint>) =>
  call<In<typeof createSubscriptionEndpoint>, CreateSubscriptionOutputType>('createSubscription', input);

export const submitAd = (input: In<typeof submitAdEndpoint>) =>
  call<In<typeof submitAdEndpoint>, SubmitAdOutputType>('submitAd', input);

export const submitLetter = (input: In<typeof submitLetterEndpoint>) =>
  call<In<typeof submitLetterEndpoint>, SubmitLetterOutputType>('submitLetter', input);
