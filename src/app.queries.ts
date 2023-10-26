/** Types generated for queries found in "src/app.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUser' parameters type */
export interface IGetUserParams {
  id: number;
}

/** 'GetUser' return type */
export interface IGetUserResult {
  email: string | null;
  id: number;
}

/** 'GetUser' query type */
export interface IGetUserQuery {
  params: IGetUserParams;
  result: IGetUserResult;
}

const getUserIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":46}]}],"statement":"SELECT\n\tid,\n\temail\nFROM\n\tusers\nWHERE\n\tid = :id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 * 	id,
 * 	email
 * FROM
 * 	users
 * WHERE
 * 	id = :id!
 * ```
 */
export const getUser = new PreparedQuery<IGetUserParams,IGetUserResult>(getUserIR);


