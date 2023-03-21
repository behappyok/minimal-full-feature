import {beforeUpload, handleChange,checkOssSignature, afterSuccess, action, getExtraData, getUrl } from '../utils/ossfile.util';
 
export const schema = {

  "type": "object",
  "properties": {
    "array": {
      "type": "array",
      "x-decorator": "FormItem",
      "x-component": "ArrayTable",
      "x-designable-id": "t2qblh3ehic",
      "x-index": 0,
      "x-validator": [],
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: 800 },
      },
      "x-decorator-props": {}, 
      "items": {
        "type": "object",
        "x-designable-id": "ys12rp8423z",
        "x-validator": [],
        "properties": {
          // "SORT-COLUMN": {
          //   "type": "void",
          //   "x-component": "ArrayTable.Column",
          //   "x-component-props": {
          //     "title": "拖动",
          //     "width": null
          //   },
          //   "x-designable-id": "qnl0dld7y2b",
          //   "x-index": 0,
          //   "name": "SORT-COLUMN",
          //   "properties": {
          //     "5yyvclolzmx": {
          //       "type": "void",
          //       "x-component": "ArrayTable.SortHandle",
          //       "x-designable-id": "5yyvclolzmx",
          //       "x-index": 0
          //     }
          //   }
          // },
          "INDEX-COLUMN": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "序号",
              "width": null
            },
            "x-designable-id": "z83blr2hvxy",
            "x-index": 1,
            "name": "INDEX-COLUMN",
            "properties": {
              "3o6gxhmbxkw": {
                "type": "void",
                "x-component": "ArrayTable.Index",
                "x-designable-id": "3o6gxhmbxkw",
                "x-index": 0
              }
            }
          },
          "NAME-COLUMN": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "姓名"
            },
            "name": "NAME-COLUMN",
            "x-designable-id": "o2qog7ik0am",
            "x-index": 2,
            "properties": {
              "name": {
                "type": "string",
                "x-decorator": "FormItem",
                "x-component": "Input",
                "x-validator": [],
                "x-component-props": {},
                "x-decorator-props": {},
                required:true,
                "x-designable-id": "580l53bzsc8",
                "x-index": 0
              }
            }
          },
          "AGE-COLUMN": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "年龄"
            },
            "name": "AGE-COLUMN",
            "x-designable-id": "8a3s3au9xgv",
            "x-index": 3,
            "properties": {
              "age": {
                required:true,
                "type": "number",
                "x-decorator": "FormItem",
                "x-component": "InputNumber",
                "x-designable-id": "e0kol2av1ns",
                "x-index": 0
              }
            }
          },
          "AVATAR-COLUMN": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "头像"
            },
            "name": "AVATAR-COLUMN",
            "x-designable-id": "lc1n0jmki1a",
            "x-index": 4,
            "properties": {
              "avatar": {
                required:true,
                "type": "Array<object>",
                "x-decorator": "FormItem",
                "x-component": "NormalUpload",
                "x-component-props": {
                  "textContent": "上传照片",
                  "style": {
                    "width": "100%"
                  },
                  data:getExtraData,
                  beforeUpload:beforeUpload,
                  action: import.meta.env.VITE_OSS_URL,
                  showUploadList:{ showPreviewIcon: false },
                  onChange:(infoList) => {const info = {file:infoList[0]};handleChange(info, 'avatar')},
                   
                },
                "x-validator": [],
                "x-decorator-props": {
                  "style": {
                    "width": "90%"
                  }
                },
                "x-designable-id": "xtmf10e34gc",
                "x-index": 0
              }
            }
          },
          "OPERATE-COLUMN": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "操作",
              "style": {
                "width": "0%"
              },
              "width": null
            },
            "x-designable-id": "pe2dx44aqtp",
            "x-index": 5,
            "name": "OPERATE-COLUMN",
            "properties": {
              "delete-btn": {
                "type": "void",
                "x-component": "ArrayTable.Remove",
                "x-designable-id": "3q67hhxqy90",
                "x-index": 0,
                "name": "delete-btn"
              },
              "down-btn": {
                "type": "void",
                "x-component": "ArrayTable.MoveDown",
                "x-designable-id": "1om6a532krg",
                "x-index": 1,
                "name": "down-btn"
              },
              "up-btn": {
                "type": "void",
                "x-component": "ArrayTable.MoveUp",
                "x-designable-id": "bvem4qqlodi",
                "x-index": 2,
                "name": "up-btn"
              }
            }
          }
        }
      },
      "properties": {
        "add-btn": {
          "type": "void",
          "title": "新增",
          "x-component": "ArrayTable.Addition",
          "x-designable-id": "vczzzfsfqcm",
          "x-index": 0,
          "x-component-props": {},
          "name": "add-btn"
        }
      }
    }
  },

}
 


export  const schema2 = {
  type: 'object',
  properties: {

    array2: {
      type: 'array',
      'x-component': 'ArrayItems',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: '对象数组',
      },
      items: {
        type: 'object',
        properties: {

          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayItems.Index',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'NormalUpload',
                required: true,
                'x-component': 'Input',
              },
              upload: {
                // type: 'string',
                'x-decorator': 'FormItem',
                title: 'NormalUpload',
                required: true,
                'x-component': 'NormalUpload',
                'x-component-props':{
                  data:getExtraData,
                  beforeUpload:beforeUpload,
                  action: import.meta.env.VITE_OSS_URL,
                  showUploadList:{ showPreviewIcon: false },
                  onChange:(infoList) => {const info = {file:infoList[0]};handleChange(info, 'avatar')},
                }
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayItems.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayItems.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayItems.MoveDown',
              },
            },
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}
export  const schema3 = {
  type: 'object',
  properties: {

    array3: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: '对象数组',
      },
      items: {
        type: 'object',
        properties: {

          // space: {
          //   type: 'void',
          //   'x-component': 'Space',
          //   properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCards.Index',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'NormalUpload',
                required: true,
                'x-component': 'Input',
              },
              upload: {
                // type: 'string',
                'x-decorator': 'FormItem',
                title: 'NormalUpload',
                required: true,
                'x-component': 'NormalUpload',
                'x-component-props':{
                  data:getExtraData,
                  beforeUpload:beforeUpload,
                  action: import.meta.env.VITE_OSS_URL,
                  showUploadList:{ showPreviewIcon: false },
                  onChange:(infoList) => {const info = {file:infoList[0]};handleChange(info, 'avatar')},
                }
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCards.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCards.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCards.MoveDown',
              },
          //   },
          // },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
}