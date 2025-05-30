/**
 * This exists so we can format a REST response in a consistent and predictable way.
 * ```
 * // example of a failed response
 * {
 *   success: false,
 *   payload: {},
 *   error: {
 *     code: 123,
 *     message: 'An error occurred!'
 *   }
 * }
 * ```
 */
export interface RestResponse<T> {
  success: boolean;
  payload?: T;
  error?: {
    code: number,
    message: string,
  };
}
