<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <SchemaField :schema="schema2" />
    <SchemaField :schema="schema3" />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>
<script  setup lang="tsx">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormButtonGroup,
  Space,
  Submit,
  Input,
  InputNumber,
  Upload,
  ArrayTable,
  ArrayItems,
ArrayCards
} from '@formily/antdv-x3'
import { Button } from 'ant-design-vue'

import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue'
import {schema,schema2,schema3} from './schema'
import { beforeUpload, getExtraData, handleChange } from '../utils/ossfile.util'
function log(...v) {
      console.log(...v)
    }
const NormalUpload = (props, { attrs }) => {
  return (
    <Upload
      {...props}
      {...attrs} 
 
    >
      <Button>
        <UploadOutlined />
        上传文件{' '}
      </Button>
    </Upload>
  )
}
const fields = createSchemaField({
  components: {
    FormItem,
    InputNumber,
    Space,
    Input,
    NormalUpload,
    ArrayTable,
    ArrayItems,
    ArrayCards
  },
})
console.log(fields)

const { SchemaField } = fields

const form = createForm()

</script>