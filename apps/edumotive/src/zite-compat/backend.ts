import type { z } from 'zod';

export class ZiteError extends Error {
  code: string;
  userFacingMessage: string;

  constructor(opts: { code?: string; message: string; userFacingMessage?: string }) {
    super(opts.userFacingMessage || opts.message);
    this.name = 'ZiteError';
    this.code = opts.code ?? 'BAD_REQUEST';
    this.userFacingMessage = opts.userFacingMessage ?? opts.message;
  }
}

export interface AuthContextUser {
  id: string;
  email: string;
  name?: string;
}

export interface EndpointContext {
  user?: AuthContextUser | null;
}

export interface EndpointDefinition<
  TIn extends z.ZodTypeAny,
  TOut extends z.ZodTypeAny,
  TAuth extends boolean = false,
> {
  description?: string;
  authenticated?: TAuth;
  inputSchema: TIn;
  outputSchema: TOut;
  execute: (args: {
    input: z.infer<TIn>;
    context: TAuth extends true ? { user: AuthContextUser } : { user?: AuthContextUser | null };
  }) => Promise<z.infer<TOut>>;
}

export function createEndpoint<
  TIn extends z.ZodTypeAny,
  TOut extends z.ZodTypeAny,
  TAuth extends boolean = false,
>(def: EndpointDefinition<TIn, TOut, TAuth>) {
  return def;
}
