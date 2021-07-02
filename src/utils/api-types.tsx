export interface IRequestParams {
  [key: string]: string
}

export interface ISaleforceResponse {
  id: string
  success: boolean
  error: any[]
}

export interface ICarIncentive {
  AvailibleToAll: boolean
  ID: number
  Type: number
  discount: number
  name: string
}

export interface IMeta {
  carid: string
  cardealerid: number
  carnotes: string
  caroffmsrp: number
  carimg: string
  carcolor: string
  carmake: string
  carmodel: string
  cartrim: string
  caryear: number
  cartags: string
  cardefaultprogramid: string
  carvin: string
  carimages: string[]
  carenginecylinders: number
  carenginehp: number
  carenginetype: number
  carmspavg: number
  carmsrpcity: number
  carmsrphwy: number
  carinvoiceprice: number
  carcurbweight: number
  carshippingcost: number
  carexteriorcolor: string
  carinteriorcolor: string
}

export interface IPricing {
  carmonthlydefault: number
  cartotalcost: number
  carsellingprice: number
  carmsrp: number
  carmoneydown: string
  cardasdefault: number
  carincentivesapplied: ICarIncentive[]
  fees: IFees
}

export interface IFees {
  carregistrationfee: number
  carbankfee: number
  cardocfee: number
  carupfronttax: number
  carfirstmonthpayment: number
  carmsdpayment: number
  carsumfees: number
  carsumdod: number
}

export interface ITerms {
  carmoneydown: string
  carregion: string
  carmonthdefault: number
  carcreditminimum: number
  carmilesdefault: string
  carbudget: string
  cartradein: string
  carincentivedefault: string
}

export interface ICaroptionsItem {
  Code: string
  Name: string
}

export type IOptions = {
  caroptions: ICaroptionsItem[]
  carincentives: ICarIncentive[]
  monthoptions: string
  milesoptions: string
  carexteriorcolors: string[]
  carinteriorcolors: string[]
  msdoptions: string
}

export interface ICarResult {
  carid: string
  cargolive: boolean
  meta: IMeta
  pricing: IPricing
  terms: ITerms
  options: IOptions
}
