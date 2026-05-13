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
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['insurancePlan'].includes(listItem.getId())
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
