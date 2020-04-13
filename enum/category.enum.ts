export enum CategoryEnum {
  MASK = 'マスク',
  ALCOHOL_GEL = 'アルコールジェル',
  ALCOHOL_SPRAY = 'アルコールスプレー',
  ALCOHOL_TISSUE = 'アルコールティッシュ'
}

enum CategoryIconEnum {
  MASK = '/icon/covid.png',
  ALCOHOL_GEL = '/icon/shampoo.png',
  ALCOHOL_SPRAY = '/icon/clean.png',
  ALCOHOL_TISSUE = '/icon/healthcare-and-medical.png'
}

export const CATEGORIES = [
  {
    name: CategoryEnum.MASK,
    icon: CategoryIconEnum.MASK
  },
  {
    name: CategoryEnum.ALCOHOL_GEL,
    icon: CategoryIconEnum.ALCOHOL_GEL
  },
  {
    name: CategoryEnum.ALCOHOL_SPRAY,
    icon: CategoryIconEnum.ALCOHOL_SPRAY
  },
  {
    name: CategoryEnum.ALCOHOL_TISSUE,
    icon: CategoryIconEnum.ALCOHOL_TISSUE
  }
]
