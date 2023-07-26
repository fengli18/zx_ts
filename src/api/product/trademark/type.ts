export interface tradeMarkDate {
  records: Array<recordsType>
  total: number
  size: number
  current: number
  optimizeCountSql: boolean
  hitCount: boolean
  searchCount: boolean
  pages: number
}

export interface recordsType {
  id?: number
  tmName: string
  logoUrl: string
}
