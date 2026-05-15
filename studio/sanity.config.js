import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Insurance System',

  projectId: 'i67rmyw6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('ข้อมูลระบบ')
          .id('root')
          .items([
            S.listItem()
              .title('ยี่ห้อรถ')
              .id('car-brands')
              .child(
                S.documentTypeList('carBrand')
                  .title('ยี่ห้อรถ')
                  .id('car-brand-list')
              ),
            S.listItem()
              .title('รุ่นรถ (แยกตามยี่ห้อ)')
              .id('car-models-grouped')
              .icon(() => '🚗')
              .child(
                S.documentTypeList('carBrand')
                  .title('เลือกยี่ห้อรถ')
                  .child(brandId =>
                    S.documentList()
                      .title('รุ่นรถ')
                      .id(`models-${brandId}`)
                      .filter('_type == "carModel" && brand._ref == $brandId')
                      .params({ brandId })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('carModel-by-brand', { brandId })
                      ])
                  )
              ),
            S.divider(),
            S.listItem()
              .title('ข้อมูลลูกค้า (Leads)')
              .id('customer-leads')
              .child(
                S.documentTypeList('customerLead')
                  .title('ข้อมูลลูกค้า (Leads)')
                  .id('customer-lead-list')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'carModel-by-brand',
        title: 'Car Model by Brand',
        schemaType: 'carModel',
        parameters: [{ name: 'brandId', type: 'string' }],
        value: (params) => ({
          brand: { _type: 'reference', _ref: params.brandId }
        })
      }
    ]
  },
})
