/**
 * model to handle pagination
 *
 * @author Osanda Wedamulla
 */

export interface Page {
  size?: number;
  totalElements?: number;
  totalPages?: number;
  number?: number;
}
