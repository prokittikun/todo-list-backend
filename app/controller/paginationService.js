// export class PaginationService {
/**
 * @param total
 * @param perPage
 * @param currentPage
 * @returns
 *
 */
function paginationCal(total, perPage, currentPage) {
  return {
    skips: perPage * currentPage - perPage,
    totalPages: Math.ceil(total / perPage),
    limit: perPage,
  };
}
// }
