import { CategoryEnum } from './category.enum'

const TAGS: Tag[] = [
  {
    category: CategoryEnum.MASK,
    name: '子ども用'
  },
  {
    category: CategoryEnum.MASK,
    name: '大人用'
  },
  {
    category: CategoryEnum.MASK,
    name: 'N95マスク'
  }
]

export interface Tag {
  category: CategoryEnum
  name: string
}

export const findTags = (category: CategoryEnum) => {
  return TAGS.filter((t) => t.category === category)
}
