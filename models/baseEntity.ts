export abstract class BaseEntity<T> {
  id: string
  createdAt: Date | null

  requireValue(v: any) {
    return !!v || '必須項目です'
  }

  get hasId(): boolean {
    return Boolean(this.id)
  }
}
