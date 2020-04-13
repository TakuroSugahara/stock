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
  },

  {
    category: CategoryEnum.ALCOHOL_GEL,
    name: '高評価'
  },
  {
    category: CategoryEnum.ALCOHOL_GEL,
    name: '濃度70%以上'
  },

  {
    category: CategoryEnum.ALCOHOL_SPRAY,
    name: '携帯用'
  },
  {
    category: CategoryEnum.ALCOHOL_SPRAY,
    name: '高評価'
  },
  {
    category: CategoryEnum.ALCOHOL_SPRAY,
    name: '濃度70%以上'
  },

  {
    category: CategoryEnum.ALCOHOL_TISSUE,
    name: '濃度70%以上'
  },
  {
    category: CategoryEnum.ALCOHOL_TISSUE,
    name: '高評価'
  }
]

export interface Tag {
  category: CategoryEnum
  name: string
}

export const findTags = (category: CategoryEnum) => {
  return TAGS.filter((t) => t.category === category)
}
