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
              .title('แผนประกันภัย (จัดกลุ่มตามชั้น)')
              .id('insurance-grouped')
              .child(
                S.list()
                  .title('เลือกชั้นประกัน')
                  .id('insurance-classes')
                  .items([
                    S.listItem()
                      .title('⭐ ประกันภัย ชั้น 1')
                      .id('class-1-item')
                      .child(
                        S.documentList()
                          .title('ประกันภัย ชั้น 1')
                          .id('class-1-list')
                          .filter('_type == "insurancePlan" && planType == "1"')
                      ),
                    S.listItem()
                      .title('🚗 ประกันภัย ชั้น 2+')
                      .id('class-2plus-item')
                      .child(
                        S.documentList()
                          .title('ประกันภัย ชั้น 2+')
                          .id('class-2plus-list')
                          .filter('_type == "insurancePlan" && planType == "2plus"')
                      ),
                    S.listItem()
                      .title('🛡️ ประกันภัย ชั้น 3+')
                      .id('class-3plus-item')
                      .child(
                        S.documentList()
                          .title('ประกันภัย ชั้น 3+')
                          .id('class-3plus-list')
                          .filter('_type == "insurancePlan" && planType == "3plus"')
                      ),
                    S.listItem()
                      .title('☂️ ประกันภัย ชั้น 3')
                      .id('class-3-item')
                      .child(
                        S.documentList()
                          .title('ประกันภัย ชั้น 3')
                          .id('class-3-list')
                          .filter('_type == "insurancePlan" && planType == "3"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('📋 แผนประกันภัยทั้งหมด (รวมทุกชั้น)')
                      .id('all-insurance-item')
                      .child(
                        S.documentTypeList('insurancePlan')
                          .id('all-insurance-list')
                      ),
                  ])
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
            ...S.documentTypeListItems().filter(
              (listItem) => !['insurancePlan', 'carModel', 'carBrand', 'customerLead'].includes(listItem.getId())
            ),
            S.divider(),
            S.listItem()
              .title('จัดการข้อมูลพื้นฐาน')
              .id('basic-data-management')
              .child(
                S.list()
                  .title('ข้อมูลพื้นฐาน')
                  .id('basic-data-list')
                  .items([
                    S.documentTypeListItem('carBrand').title('รายชื่อยี่ห้อรถ').id('brand-list-item'),
                    S.documentTypeListItem('carModel').title('รายชื่อรุ่นรถทั้งหมด').id('model-list-item'),
                    S.documentTypeListItem('customerLead').title('ข้อมูลลูกค้า (Leads)').id('leads-list-item'),
                  ])
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
