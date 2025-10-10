import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { Note } from '../types/note';

// ================================================================

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

if (!token) {
  console.warn(
    'VITE_NOTEHUB_TOKEN is missing. Create .env and restart the dev server.'
  );
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});

// ================================================================

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface PagedNotes {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Note[];
}

type RawFetchNotesResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  notes?: Note[];
  results?: Note[];
  items?: Note[];
  data?: Note[];
};

export type CreateNoteInput = Pick<Note, 'title' | 'content' | 'tag'>;

// ================================================================

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<PagedNotes> {
  const { page = 1, perPage = 12, search } = params;

  const q = (search ?? '').trim();
  const queryParams: Record<string, unknown> = { page, perPage };

  if (q.length >= 2) {
    queryParams.search = q;
  }

  const res: AxiosResponse<RawFetchNotesResponse> = await api.get('/notes', {
    params: queryParams,
  });

  const data = res.data;
  const items =
    data.notes ?? data.results ?? data.items ?? data.data ?? ([] as Note[]);

  return {
    page: data.page ?? page,
    perPage: data.perPage ?? perPage,
    totalItems: data.totalItems ?? items.length,
    totalPages:
      data.totalPages ??
      Math.max(
        1,
        Math.ceil((data.totalItems ?? items.length) / (data.perPage ?? perPage))
      ),
    items,
  };
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post('/notes', input);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}
