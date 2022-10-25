import { persianNumbers, englishNumbersFinder } from 'constants/constants'
import jMoment from 'moment-jalaali'

const tiers = [{ id: 1, tier: "silver" }, { id: 2, tier: "golden" }, { id: 3, tier: "Bronze" }, { id: 4, tier: "platinum" }]

const types = [{ id: 1, type: "live" }, { id: 2, type: "recorded" }]

export const toFaDigit = value => {
  let result = value
  for (let i = 0; i < 10; i += 1) {
    result = result
      .toString()
      .replace(englishNumbersFinder[i], englishNumbersFinder[i])
  }
  return result
}

export const getAdmin = authToken => {
  if (authToken) {
    const payload = authToken.split('.')[1]
    return JSON.parse(window.atob(payload))
  }
  return {}
}

export const getWebinarTiers = () => {
  return tiers
}
export const getWebinarTier = (id) => {
  return tiers.find(tier => tier.id === parseInt(id, 10)).tier
}

export const getWebinarTypes = () => {
  return types
}

export const getWebinarType = (id) => {
  return types.find(type => type.id === parseInt(id, 10)).type
}


export const convertToJalali = time => {
  // jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })
  // return jMoment(time).format('jYYYY/jM/jD')
  return time.format('YYYY/M/D')
}
export const convertToJalaliWithTime = time => {
  // jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })
  // return jMoment(time).format('HH:mm - jYYYY/jMM/jDD ')
  return time.format('HH:mm - YYYY/MM/DD ')
}

export const getAdminLevels = () => {
  return [
    { value: 'FULL', title: 'Full access level' },
    { value: 'LIVE', title: 'Live access level' },
    { value: 'CONTENT', title: 'Content access level' },
    { value: 'PRODUCT', title: 'Access level of products' },
  ]
}
