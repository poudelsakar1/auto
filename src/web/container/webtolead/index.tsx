import React, { useState } from 'react'
import PageHeader from '../../component/page-header'
import './style.scss'
import ReCAPTCHA from 'react-google-recaptcha'

const WebToLeadPage: React.FC = () => {
  const [captured, setCaptured] = useState(false)

  const colorchoicesList = [
    'Almandine Brown Metallic',
    'Alpine White',
    'Atlas Cedar Metallic',
    'Azurite Black Metallic',
    'Barrel Brown Metallic',
    'Birch Light Metallic',
    'Black Sapphire Metallic',
    'Black Stone',
    'Black w/Blue Stitching w/Dakota Leather Upholstery [Black]',
    'Black w/Dark Oyster Highlight w/Dakota Leather Upholstery [Black]',
    'Black w/Red Highlight/Stitching w/Dakota Leather Upholstery [Black]',
    'Black w/Red Stitching w/SensaTec Upholstery [Black]',
    'Black w/SensaTec Upholstery [Black]',
    'Bluestone Metallic',
    'Bright Silver Metallic',
    'Brilliant Silver Metallic',
    'Bursting Blue Metallic',
    'Carbon Black Metallic',
    'Carrara White',
    'Cashmere Silver Metallic',
    'Cayenne Red',
    'Champagne Quartz Metallic',
    'Chronos Gray',
    'Cobra Beige Metallic',
    'Cognac w/Dark Brown Highlight w/Dakota Leather Upholstery [Orange]',
    'Coral Red w/Black Highlight w/Dakota Leather Upholstery [Red]',
    'Cosmos Blue Metallic',
    'Crystal White Pearl',
    'Crystal White Pearl /Black Contrast',
    'Dark Graphite Metallic',
    'Dark Olive Metallic',
    'Deep Blue Pearl Metallic',
    'Deep Crystal Blue Mica',
    'Denim Blue',
    'Electric Silver Metallic',
    'Estoril Blue Metallic',
    'Florett Silver Metallic',
    'Fusion Red Metallic',
    'Galaxy Blue Metallic',
    'Galvanic Gold',
    'Glacier Silver Metallic',
    'Glacier White Metallic',
    'Gun Metallic',
    'Ibis White',
    'Ice White',
    'Imperial Blue Metallic',
    'Ivory White w/Dark Oyster Highlight w/Dakota Leather Upholstery [Off-white]',
    'Jatoba Brown Metallic',
    'Jet Black',
    'Jet Black Mica',
    'Long Beach Blue Metallic',
    'Machine Gray Metallic',
    'Magic Blue Metallic',
    'Magnetic Black Metallic',
    'Mediterranean Blue Metallic',
    'Melbourne Red Metallic',
    'Mineral White Metallic',
    'Misano Blue Metallic',
    'Mocha Almond',
    'Mocha w/Dakota Leather Upholstery [Brown]',
    'Mythos Black Metallic',
    'Nano Gray Metallic',
    'Navarra Blue Pearl Effect',
    'Night Black',
    'Night Blue w/Dark Oyster Highlight w/Dakota Leather Upholstery [Blue]',
    'Onyx Black',
    'Orca Black Metallic',
    'Osmium Grey Metallic',
    'Passion Red',
    'Pearl White Tricoat',
    'Pebble Grey Metallic',
    'Phytonic Blue Metallic',
    'Pine Gray Metallic',
    'Polymetal Gray Mica',
    'Pulse Orange',
    'Rhodonite Silver Metallic',
    'Samurai Gray Metallic',
    'Seaside Blue Metallic',
    'Snowflake White Pearl Mica',
    'Sonic Silver Metallic',
    'Soul Red Crystal',
    'Soul Red Crystal Metallic',
    'Sunset Drift ChromaFlair',
    'Sunset Orange Metallic',
    'Sunstone Metallic',
    'Super Black',
    'Tango Red Metallic',
    'Thunder Grey Metallic',
    'Turbo Blue',
    'Venetian Beige w/SensaTec Upholstery [Beige]',
    'Venetian Beige/Dark Oyster Highlight w/Dakota Leather Upholstery [Beige]',
    'Vicuna Beige Metallic',
    'Almandin Brown II Metallic',
    'Almandine Brown',
    'ALPINA Blue',
    'ALPINA Blue Metallic',
    'ALPINA Green Metallic',
    'Amazon Blue',
    'Amazon Blue/ White Contrast',
    'Ametrin Metallic',
    'Anthracite Gray',
    'Antigua Blue Metallic',
    'Apex Blue Pearl',
    'Arctic Gray',
    'Aspen White',
    'Aspen White/ Super Black',
    'Atomic Silver',
    'Austin Yellow Metallic',
    'Autumn Green Metallic',
    'Avalon Green Metallic',
    'Aventurin Red Metallic',
    'Azores Green Metallic',
    'Azores Green Metallic',
    'Azurite Black II Metallic',
    'Azurtie Black Metallic',
    'Barcelona Blue Metallic',
    'Basque Red Pearl II',
    'Bernina Grey Amber Effect',
    'Black Copper Pearl',
    'Black Obsidian',
    'Black Onyx',
    'Black Stone/ White Contrast',
    'Blue Ridge Mountain Metallic',
    'Brands Hatch Gray Metallic',
    'Brands Hatch Grey',
    'Bright Silver Metallic/ Black Contrast',
    'Bright Silver Metallic/Black Contrast',
    'Brilliant Black',
    'Brilliant Bronze',
    'Brilliant Silver',
    'Bursting Blue Metallic/ Black Contrast',
    'Bursting Blue Metallic/Black Contrast',
    'Cadmium Orange',
    'Canyon Bronze Metallic',
    'Carat Beige',
    'Caspian Blue',
    'Catalunya Red Metallic',
    'Caviar',
    'Ceramic Metallic',
    'Champagne Quartz',
    'Chestnut Bronze',
    'Chronos Gray Metallic',
    'Cinnamon Brown Pearl',
    'Citrin Black Metallic',
    'Claret Mica',
    'Cool Gray Khaki',
    'Coulis Red',
    'Crimson Red Pearl',
    'Crystal Black Pearl',
    'Crystal Black Silica',
    'Crystal White Metallic',
    'Crystal White Metallic/Black Contrast',
    'Crystal White Pearl/ Black Contrast',
    'Dark Blue',
    'Dark Blue Metallic',
    'Dark Blue Pearl',
    'Dark Gray Metallic',
    'Daytona Gray Pearl',
    'Daytona Gray Pearl Effect',
    'Denim Blue Metallic',
    'District Green',
    'Donington Grey Metallic',
    'Dravit Grey Metallic',
    'Dynamic Sunstone Red',
    'Electric Blue Metallic',
    'Eminent White Pearl',
    'Eternal Blue Mica',
    'Fathom Blue Pearl',
    'Firmament Blue Metallic',
    'Flamenco Red Metallic',
    'Florett Silver',
    'Florett Silver Matte',
    'Fresh Powder',
    'Frozen Bluestone',
    'Frozen Bluestone Metallic',
    'Frozen Bronze Metallic',
    'Frozen Dark Blue II',
    'Frozen Grey II Metallic',
    'Frozen Silver Metallic',
    'Fusion Red Metallic/ Black Contrast',
    'Fusion Red Metallic/ White Contrast',
    'Fusion Red Metallic/Black Contrast',
    'Glacier White',
    'Graphite Shadow',
    'Gun Metallic/ Super Black',
    'Gunmetal Metallic',
    'Hagane Blue',
    'Hermosa Blue',
    'Hockenheim Silver',
    'Horizon Blue',
    'Horizon Blue Pearl',
    'Ice Silver Metallic',
    'Imperial Black',
    'Iridium Blue',
    'Jasper Green Metallic',
    'Jatoba Metallic',
    'Java Brown Metallic',
    'Lagoon Blue Pearl',
    'Lime Rock Grey',
    'Liquid Platinum',
    'Lithium Red Pearl',
    'Luminous Sand Metallic',
    'Lunar Silver Metallic',
    'Lunar White',
    'Magellan Gray',
    'Magnetic Black',
    'Magnetite Gray Metallic',
    'Majestic Black Pearl',
    'Majestic White',
    'Manhattan Gray Metallic',
    'Manhattan Green',
    'Manhattan Green Metallic',
    'Maple Brown Metallic',
    'Marina Bay Blue Metallic',
    'Matador Red Mica',
    'Midnight Black',
    'Midnight Pine',
    'Mineral Black',
    'Mineral Grey Metallic',
    'Modern Steel Metallic',
    'Monarch Orange Metallic',
    'Monarch Orange/ Super Black',
    'Monsoon Gray Metallic',
    'Moonbeam Beige',
    'Moonlight Blue Metallic',
    'Moonstone Metallic',
    'Moonstone White',
    'Motegi Red',
    'Motegi Red Metallic',
    'Mussel Blue Metallic',
    'Navarra Blue Metallic',
    'Nebula Gray Pearl',
    'Nightfall Mica',
    'Nitro Lime',
    'Nori Green Pearl',
    'Obsidian',
    'Ocean Blue Pearl',
    'Onyx Black Metallic',
    'Onyx Black Metallic/ White Contrast',
    'Osmium Grey Metallic/ Black Contrast',
    'Osmium Grey Metallic/ White Contrast',
    'Performance Red Pearl',
    'Phytonic Blue',
    'Plasma Yellow Pearl',
    'Platinum White Pearl',
    'Portimao Blue Metallic',
    'Pure Red',
    'Pure White',
    'Quantum Gray Metallic',
    'Red Alert',
    'Red Bordeaux',
    'Riverside Blue Mettalic',
    'Rosewood',
    'Royal Burgundy Red Metallic',
    'Ruby Black Metallic',
    'Sakhir Orange II Metallic',
    'San Francisco Red',
    'San Marino Blue Metallic',
    'San Marino Red',
    'Savile Gray Metallic',
    'Scarlet Ember',
    'Scarlet Ember Tintcoat',
    'Sepia Bronze Metallic',
    'Seville Red Metallic',
    'Siam Beige Metallic',
    'Silver Lining Metallic',
    'Silverstone Metallic',
    'Singapore Gray Metallic',
    'Smoked Topaz Metallic',
    'Snapper Rocks Blue Metallic',
    'Sonic Speed Blue Metallic',
    'Space Gray Metallic',
    'Sparkling Brown Metallic',
    'Starfire Pearl',
    'Still Night Pearl',
    'Storm Bay Metallic',
    'Storm Blue',
    'Sunlit Green',
    'Tanzanite Blue II Metallic',
    'Tanzanite Blue Metallic',
    'Terra Brown Metallic',
    'Terra Gray Metallic',
    'Titanium Flash Mica',
    'Toronto Red Metallic',
    'Tungsten Metallic',
    'Typhoon Gray Metallic',
    'Ultra Black Pearl',
    'Ultra White',
    'Ultrasonic Blue Mica 2.0',
    'Vermont Bronze Metallic',
    'Vesuvius Gray Metallic',
    'White Diamond Pearl',
    'Yas Marina Blue Metallic',
  ]

  const interiorcolorList = [
    'Black',
    'White',
    'Grey',
    'Black cloth',
    'Black leatherette',
    'Silk Beige leatherette',
    'Black leather',
    'Parchment leather',
    'Caturra Brown Nappa Leather',
    'Amber',
    'Blond',
  ]
  const leadSourceList = [
    'Customer Event',
    'Employee Referral',
    'Google AdWords',
    'Other',
    'Partner',
    'Purchased List',
    'Trade Show',
    'Webinar',
    'Website',
    'PND',
  ]

  function onChange(value: any) {
    if (value) setCaptured(true)
  }

  return (
    <div>
      <PageHeader title='Web to lead'></PageHeader>
      <div className='max-w-screen-lg mx-auto flex flex-col py-10 text-gray-card-title'>
        <div className='text-center py-3'>
          <div className='px-20 sm:px-40 text-blue-main-text uppercase font-bold text-lg sm:text-md'>
            PLEASE COMPLETE THE FORM BELOW
          </div>
          <form
            className='mt-4 mx-3 sm:mx-0'
            action='https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
            method='POST'
          >
            <input type='hidden' name='oid' value='00D6g000005hbDS' />
            <input
              type='hidden'
              name='retURL'
              value='https://autoleaseninjas.net?formsuccess=true'
            />
            <div className='flex'>
              <div className='firstname w-full sm:w-1/2 relative mr-1'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  First Name
                </label>
                <input
                  name='first_name'
                  id='first_name'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='lastname w-full sm:w-1/2 relative ml-1'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Last Name
                </label>
                <input
                  name='last_name'
                  id='last_name'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>
            <div className='custom-display1'>
              <div className='email w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Email
                </label>
                <input
                  name='email'
                  id='email'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='region w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Region
                </label>
                <input
                  name='00N6g00000Tg84y'
                  id='00N6g00000Tg84y'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='carmaker w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Car Maker
                </label>
                <input
                  name='00N6g00000TgC8D'
                  id='00N6g00000TgC8D'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='carmodel w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Car Model
                </label>
                <input
                  name='00N6g00000TgAQI'
                  id='00N6g00000TgAQI'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='cartrim w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Car Trim
                </label>
                <input
                  name='00N6g00000Tg84A'
                  id='00N6g00000Tg84A'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='miles w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Miles
                </label>
                <input
                  name='00N6g00000Tg87O'
                  id='00N6g00000Tg87O'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='leasepayment w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Lease Payment
                </label>
                <input
                  name='00N3p000003nOWJ'
                  id='00N3p000003nOWJ'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='monthly1 w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  L H Monthly 1
                </label>
                <input
                  name='00N3p000003kKRw'
                  id='00N3p000003kKRw'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='montly2 w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  L H Monthly 2
                </label>
                <input
                  name='00N3p000003kKS1'
                  id='00N3p000003kKS1'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='monthly3 w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  L H Monthly 3
                </label>
                <input
                  name='00N3p000003kKS6'
                  id='00N3p000003kKS6'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='colorchoices w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Color Choices
                </label>
                <select
                  name='00N3p000003vYH7'
                  id='00N3p000003vYH7'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                >
                  <option value=''>Select Color Choices</option>
                  {colorchoicesList.map(color => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className='interiorcolor w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Interior Color
                </label>
                <select
                  name='00N3p000003vYHH'
                  id='00N3p000003vYHH'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                >
                  <option value=''>Select Interior Color</option>
                  {interiorcolorList.map(color => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='custom-display1'>
              <div className='msrp w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  MSRP
                </label>
                <input
                  name='00N3p000003veDk'
                  id='00N3p000003veDk'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='months w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Months
                </label>
                <input
                  name='00N6g00000TgC8c'
                  id='00N6g00000TgC8c'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='custom-display1'>
              <div className='residual w-full sm:w-1/2 relative mr-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Residual
                </label>
                <input
                  name='00N3p000003nOWn'
                  id='00N3p000003nOWn'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
              <div className='montyfactor w-full sm:w-1/2 relative ml-0 sm:ml-1 mt-4'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Money Factor
                </label>
                <input
                  name='00N3p000003vntk'
                  id='00N3p000003vntk'
                  type='text'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                />
              </div>
            </div>

            <div className='flex mt-4'>
              <div className='leadsource w-full relative'>
                <label className='block absolute tracking-wide text-gray-very-light text-xs mb-2 top-top-dropdown-label left-left-dropdown-label z-10 bg-white px-2 font-bold'>
                  Lead Source
                </label>
                <select
                  name='lead_source'
                  id='lead_source'
                  className='block bg-white appearance-none border border-gray-contact-border focus:outline-none focus:border-gray-500 w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight'
                >
                  <option value=''>Select Lead Source</option>
                  {leadSourceList.map(source => (
                    <option value={source} key={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='mt-2'>
              <ReCAPTCHA
                sitekey='6LccHnoaAAAAAHz-zF6I-K1dvNfqQgHRU6gZWqqH'
                onChange={onChange}
              />
            </div>

            <div className='flex mt-4'>
              <div className='cartrim w-full relative'>
                <button
                  type='submit'
                  name='submit'
                  disabled={!captured}
                  className='w-full mt-5 rounded-md px-10 py-3 bg-blue-main-text text-white font-bold focus:outline-none hover:bg-blue-700'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WebToLeadPage
