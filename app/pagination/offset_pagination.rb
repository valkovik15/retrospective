class OffsetPagination
  PER_PAGE = 50

  def call(relation, page: nil, per_page: nil)
    page = normalize_page(page)
    per_page = normalize_per_page(per_page)

    PaginatedCollection.new(
      data: relation.page(page).per(per_page).to_a,
      meta: {
        page: normalize_page(page),
        per_page: per_page,
        total_pages: relation.page(page).per(per_page).total_pages,
        total_count: relation.count
      }
    )
  end

  private

  def normalize_page(page)
    [page || 1, 1].max
  end

  def normalize_per_page(per_page)
    (per_page || PER_PAGE).to_i
  end
end
