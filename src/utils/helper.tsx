import CarLogos from '../widget/data/car-logo'
import _find from 'lodash/find'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { IDropdownItem } from '../web/component/dropdown/type'
import { getCarMakeList } from '../widget/data/search-data'
import { IHomeSearch } from '../widget/types/home-search-params'
import { IFormData, IUserCarOptions } from '../web/container/details'
import { ICarIncentive } from '../utils/api-types'

type IRawSObject = IUserCarOptions &
  IFormData &
  IHomeSearch & {
    meta: {
      carvin: string
      caroffmsrp: number
      cartrim: string
      caryear: number
      carnotes: string
      cardealerid: number
    }
    pricing: {
      carsellingprice: number
      cartotalcost: number
      carmonthlydefault: string
      cardasdefault: number
      carmsrp: number
      carmoneyfactor: string
      carresidualdefault: number
      cartotalrebate: number
      carresidualvalue: number

      fees: {
        carsumdod: number
        carupfronttax: number
        cardocfee: number
        carbankfee: number
        carregistrationfee: number
        carsumfees: number
        carmsdpayment: number
      }

      carincentivesapplied: ICarIncentive[]
    }
  }
export interface ISaleforceObject {
  Selected_Structure__c: string | undefined
  Email: string
  FirstName: string
  LastName: string
  Phone: string
  Car_ID__c: string
  Car_Notes__c: string
  Car_Maker__c: string
  Car_Model__c: string
  Max_Credit_Score__c: number

  Residual__c: number
  Residual_Value__c: number
  Money_Factor__c: string
  Total_Rebate__c: number

  Lease_Max_Payment__c: string
  Miles__c: number
  Money_Down__c: string
  Months__c: string
  Region__c: string
  Trade_In__c: string
  Search_Radius__c: number
  VIN__c?: string
  Lease_Payment__c: string
  Lease_Total_Cost__c: string
  Lease_APR__c: number
  Due_At_Signing__c: string
  Referral_Source__c: string
  Comment__c: string
  Color__c: string
  Interior_Color__c: string
  Timeframe_Weeks__c: number
  Car_Trim__c: string
  Car_Year__c: number
  MSRP__c: number
  Selling_Price__c: number
  Car_Dealer_ID__c: number
  Upfront_Taxes__c: number
  Doc_Fee__c: number
  Bank_Fee__c: number
  DMV_Fees__c: number
  Total_Fees__c: number
  Car_Off_MSRP__c: number
  MSD__c: number
  Security_Deposit_Value__c: number
  Applied_Rebates__c: string
}

interface ICarLogoItem {
  name: string
  url: string
  fileName: string
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const formatter1 = new Intl.NumberFormat('en-US', {
  style: 'percent',
})

const currencyFormat = (amount: number): string =>
  formatter.format(amount).replace(/\D00$/, '')

const percentFormat = (amount: number): string =>
  formatter1.format(amount).replace(/\D00%/, '')

const getCarLogo = (branchName: string): string => {
  const carItem: ICarLogoItem | undefined = _find(
    CarLogos,
    (item: ICarLogoItem) =>
      item.name.toLowerCase() === branchName.toLowerCase(),
  )

  if (typeof carItem !== 'undefined') {
    return `https://bentious.sirv.com/Images/car-logos/${carItem.fileName}?scale.width=100`
  }

  return ''
}

const getRandomCarMakes = (numberOfBranch: number): string[] => {
  const carMakes: IDropdownItem[] = getCarMakeList()
  const randomList: IDropdownItem[] = carMakes
    .sort(() => Math.random() - Math.random())
    .slice(0, numberOfBranch)

  return _map(randomList, (item: IDropdownItem) => item.value)
}

const saleForceObjectMapping = (body: IRawSObject): ISaleforceObject => {
  const { pricing, leasemonths } = body
  const { carmonthlydefault, carsellingprice, fees, carincentivesapplied } =
    pricing
  const leasepayment: string = carmonthlydefault
    ? carmonthlydefault
    : `${carsellingprice / leasemonths}`
  let appliedRebates = ''
  if (carincentivesapplied.length > 0) {
    carincentivesapplied.forEach(item => {
      !!appliedRebates
        ? (appliedRebates += ` ${item.name} ($${item.discount})`)
        : (appliedRebates += `${item.name} ($${item.discount})`)
    })
  }

  let result: ISaleforceObject = {
    Selected_Structure__c: body.leasepayupfront,
    Email: body.Email,
    FirstName: body.FirstName,
    LastName: body.LastName,
    Phone: body.Phone,
    Car_ID__c: body.a || '',
    Car_Notes__c: body.meta.carnotes,
    Car_Maker__c: body.carmake || '',
    Car_Model__c: body.carmodel || '',
    Max_Credit_Score__c: body.leasemaxcredit,

    Residual__c: body.pricing.carresidualdefault,
    Residual_Value__c: body.pricing.carresidualvalue,
    Money_Factor__c: body.pricing.carmoneyfactor,
    Total_Rebate__c: body.pricing.cartotalrebate,
    Applied_Rebates__c: appliedRebates,

    Lease_Max_Payment__c: body.leasemaxpayment.toString(),
    Miles__c: body.leasemiles,
    Money_Down__c: body.leasemoney.toString(),
    Months__c: `${body.leasemonths} months`,
    Region__c: body.leaseregion,
    Trade_In__c:
      body.leasetradein.toString().toLowerCase() === 'true' ? 'Yes' : 'No',
    Search_Radius__c: body.searchradius,
    Lease_Payment__c: leasepayment,
    Lease_Total_Cost__c: body.pricing.cartotalcost.toString(),
    Lease_APR__c: body.meta.caroffmsrp,
    Due_At_Signing__c: `${fees.carsumdod}`,
    Timeframe_Weeks__c: body.deliverTime || 0,
    Color__c: _get(body, 'exteriorColor', []).join(';'),
    Interior_Color__c: _get(body, 'interiorColor', []).join(';'),
    Comment__c: body.note || '',
    Referral_Source__c: body.referrer || 'Other',
    Car_Trim__c: body.meta.cartrim || '',
    Car_Year__c: body.meta.caryear,
    Car_Off_MSRP__c: body.meta.caroffmsrp,
    MSRP__c: body.pricing.carmsrp,
    Selling_Price__c: body.pricing.carsellingprice,
    Car_Dealer_ID__c: body.meta.cardealerid,
    Upfront_Taxes__c: body.pricing.fees.carupfronttax,
    Doc_Fee__c: body.pricing.fees.cardocfee,
    Bank_Fee__c: body.pricing.fees.carbankfee,
    DMV_Fees__c: body.pricing.fees.carregistrationfee,
    Total_Fees__c: body.pricing.fees.carsumfees,
    Security_Deposit_Value__c: body.pricing.fees.carmsdpayment,
    MSD__c: _isEmpty(body.leasemsds) === false ? _get(body, 'leasemsds', 0) : 0,
  }

  if (body.meta.carvin !== 'none' && body.meta.carvin !== 'null') {
    result = {
      ...result,
      VIN__c: body.meta.carvin,
    }
  }

  return result
}

export {
  currencyFormat,
  percentFormat,
  getCarLogo,
  getRandomCarMakes,
  saleForceObjectMapping,
}
