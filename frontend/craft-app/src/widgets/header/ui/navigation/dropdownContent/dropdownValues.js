import { ROUTE_NAMES } from "../../../../../routes/routeNames"

export const navLinks = [
    {
    type: 'hashlink',
    label: 'Виды ремесел',
    hash: "#"
    },
    {
      type: 'hashlink',
      label: 'Преимущества',
      hash: "#advantages",
      authHidden: true,
    },
    {
      type: 'hashlink',
      label: 'Статьи авторов',
      hash: "#articles"
    },
    {
      type: 'hashlink',
      label: 'Как это работает',
      hash: "#onboarding",
      authHidden: true,
    },
    {
      type: 'hashlink',
      label: 'Контакты',
      hash: "#contacts"
    },
    {
      type: 'link',
      label: 'О нас',
      pageRef: ROUTE_NAMES.ABOUT_US
    }
]
