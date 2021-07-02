// @ts-nocheck
import axios, { AxiosPromise } from 'axios'
import _random from 'lodash/random'
import _get from 'lodash/get'
import { getCache, cacheResquest } from './session-storage'
import { defaultSearchParams } from '../widget/widget-container'
import { getCarMakeList } from '../widget/data/search-data'
import { IDropdownItem } from '../web/component/dropdown/type'
import { IHomeSearch } from '../widget/types/home-search-params'
import { ISaleforceResponse } from './api-types'
import { saleForceObjectMapping } from './helper'
import { IStoreSubmission } from '../web/container/details'

// const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://aln-middleware.herokuapp.com/';
// prod 'https://autolease-ninja-middleware.herokuapp.com/'
// const BASE_URL = 'http://localhost:3000'
const BASE_URL = process.env.BASE_URL
const BASE_URL_FIREBASE = process.env.BASE_URL_FIREBASE
const _getRequest = (
  endpoint: string,
  params: any,
  ignoreCache: boolean = false,
) => {
  const cacheData: any = getCache(endpoint, params)

  if (cacheData !== null && ignoreCache === false) {
    return new Promise(resolve => resolve(cacheData))
  }

  const apiCall: AxiosPromise = axios.get(endpoint, {
    baseURL: BASE_URL,
    params,
  })
  apiCall.then(res => cacheResquest(endpoint, params, res))

  return apiCall
}

const _postRequest = (endpoint: string, data: any) => {
  const apiCall: AxiosPromise = axios.post(`${BASE_URL}/${endpoint}`, data)
  return apiCall
}

const saleforceSubmit = (body: any): AxiosPromise<ISaleforceResponse> =>
  axios.post('submit', saleForceObjectMapping(body), {
    baseURL: BASE_URL,
  })

export const storeItem = (params: IStoreSubmission) =>
  _getRequest('store-item', params)
// export const storeInfo = (params: Object) => _getRequest('store-info', params);
export const storeInfo = (params: Object) => {
  return new Promise((resolve, reject) => {
    axios
      .get('store/order', {
        baseURL: BASE_URL_FIREBASE,
        params,
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const searchCar = (params: any) => _getRequest('results', params)
const carDetails = (params: any) => _getRequest('details', params)
const relatedResults = (params: any) => _getRequest('related', params)
const getFeatureItems = (params: any) => _getRequest('feature-items', params)
const getMakeList = (data: any) => _postRequest('get-make-list', data)
const getModelList = (data: any) => _postRequest('get-model-list', data)
const getTrimList = (data: any) => _postRequest('get-trim-list', data)

const verifyDiscountCode = (data: any) => _getRequest('v1/client', data)
const getDiscountCodeInfo = (data: any) => _getRequest('meta', data)

const getCarsFromBranch = (
  carmake?: string,
  params: IHomeSearch = defaultSearchParams,
) => {
  if (typeof carmake !== 'undefined') {
    return _getRequest('results', { ...params, carmake })
  }

  const carMakes: IDropdownItem[] = getCarMakeList()
  const carMakeItem: IDropdownItem = _get(
    carMakes,
    _random(carMakes.length),
    carMakes[0],
  )

  return _getRequest('results', { ...params, carmake: carMakeItem.value })
}

export {
  searchCar,
  carDetails,
  getCarsFromBranch,
  saleforceSubmit,
  relatedResults,
  getFeatureItems,
  BASE_URL,
  getMakeList,
  getModelList,
  getTrimList,
  verifyDiscountCode,
  getDiscountCodeInfo,
}
