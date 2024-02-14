import React from 'react'
import { FaGift } from 'react-icons/fa'
import {useTranslations} from 'next-intl'

const GiftBanner = () => {
  const t =useTranslations('GiftBannerText')
  return (
    <div className="max-w-7xl flex justify-end">
      <div className="bg-primary text-white p-1 px-4 rounded-full flex items-center mx-2 mt-1">
        <FaGift className="text-white text-2l" />
        <span className="text-sm ml-2">
          {t('text')}
        </span>
      </div>
    </div>
  )
}

export default GiftBanner
