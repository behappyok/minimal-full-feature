/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-02-01 16:57:25
 * @LastEditTime : 2023-03-21 18:11:49
 * @FilePath     : \\my-vue-app\\src\\utils\\ossfile.util.ts
 */

import { ref, computed } from "vue";
import { UploadProps } from "ant-design-vue/es/upload/interface";

import dayjs   from "dayjs";
import { message } from "ant-design-vue";

import defHttp from '../utils/defHttp'
 
enum Api {
  getTemporarySignature = "/pms-portal/web/oss/getTemporarySignature",
  uploadCallback = "/pms-portal/web/file/saveFile",
  getStsTemporaryAuth = "/pms-portal/web/oss/getStsTemporaryAuth",
}
/**
 * 获取STS签名
 */
const getStsTemporaryAuth = () => {
  return defHttp.request({ url: Api.getStsTemporaryAuth, method: "get" });
};
/**
 * 获取签名
 */
const getTemporarySignature = (params) => {
  return defHttp.request({
    url: Api.getTemporarySignature,
    params,
    method: "get",
  });
};
/**
 * 补完附件信息
 */
const getUploadCallback = (params) => {
  return defHttp.request({
    url: Api.uploadCallback,
    data: params,
    method: "post",
  });
};

interface OSSDataType {
  dir: string;
  host: string;
  policy: string;
  accessId: string;
  expire: string | number;
  signature: string;
}
const OSSData = ref<OSSDataType>({
  dir: "",
  host: "",
  policy: "",
  accessId: "",
  expire: 0,
  signature: "",
});

interface CredentialType {
  securityToken: string;
  accessKeySecret: string;
  accessKeyId: string;
  expiration: string;
}
interface STSDataType {
  credentials: CredentialType;
}
const STSData = ref<STSDataType>({
  credentials: {
    securityToken: "",
    accessKeySecret: "",
    accessKeyId: "",
    expiration: "",
  },
});
/**
 * 生成随机字符串
 */
const random_string = (len) => {
  len = len || 32;
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
/**
 * 获取OSS签名相关数据
 */
const initOssSignature = async (dir) => {
  const result = (await getTemporarySignature({
    dir,
  })) as unknown as OSSDataType
  OSSData.value = result;
};
/**
 * 获取OSS_STS签名
 */
const initStsSignature = async () => {
  const result = (await getStsTemporaryAuth()) as unknown as STSDataType;
  STSData.value = result;
};

/**
 * 获取地址前检查一次签名的有效期
 */
export const getUrl = async (fileName, isThumbUrl = false) => {
  // const host = `https://wmpms-oss.oss-cn-beijing.aliyuncs.com/`;
  const expire = Number.isNaN(
    dayjs(STSData.value.credentials.expiration).unix()
  )
    ? 0
    : dayjs(STSData.value.credentials.expiration).unix() * 1000;
  if (expire < Date.now()) {
    await initStsSignature();
  }
  // @ts-ignore
  const client = new OSS({
    // 使用自定义域名作为Endpoint。
    endpoint: import.meta.env.VITE_OSS_ENDPOINT,
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    // region: 'oss-cn-beijing',
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: STSData.value.credentials.accessKeyId,
    accessKeySecret: STSData.value.credentials.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: STSData.value.credentials.securityToken,
    // 填写Bucket名称。
    bucket: "wmpms-oss",
    cname: true,
  });

  // 填写Object完整路径。Object完整路径中不能包含Bucket名称。文件URL的有效时长默认为1800秒，即30分钟。

  const suffix = fileName.substring(
    fileName.lastIndexOf(".") + 1,
    fileName.length
  );
  // 图片格式
  const imglist = [
    "png",
    "jpg",
    "jpeg",
    "bmp",
    "gif",
    "PNG",
    "JPG",
    "JPEG",
    "BMP",
    "GIF",
  ];

  const imageProcessArgs = "image/resize,w_180,m_lfit/format,webp/quality,q_80";
  const args = isThumbUrl ? { process: imageProcessArgs } : {};
  const url = imglist.some((item) => item == suffix)
    ? client.signatureUrl(fileName, { expires: 1800, ...args })
    : client.signatureUrl(fileName, { expires: 1800 });

  return url;
};
/**
 * 上传前检查一次签名的有效期
 */
export const checkOssSignature = async (file, dir = "") => {
  if (!OSSData.value) return false;
  const expire = Number(OSSData.value.expire) * 1000;
  if (expire < Date.now()) {
    await initOssSignature(dir);
  }
  // @ts-ignore
  const filename =
    String(new Date().getTime()).split("").reverse().join("") +
    "_" +
    (file.name.lastIndexOf(".") === -1
      ? file.name
      : file.name.slice(0, file.name.lastIndexOf("."))) +
    "_" +
    random_string(10) +
    (file.name.lastIndexOf(".") === -1
      ? ""
      : file.name.slice(file.name.lastIndexOf("."))); 
  file.url = OSSData.value?.dir + filename;
};
/**
 * 上传成功后补完附件信息
 */
export const afterSuccess = async (info) => {
  const data = {};
  data["fieldName"] = info.file?.fieldName;
  data["fileName"] = info.file.name;
  data["filePath"] = info.file.url;
  data["fileType"] = info.file.type;
  data["size"] = info.file.size;

  const result = await getUploadCallback(data);
  info.file.fileId = result["id"]; 
  // info.fileList.find((file) => file.url == info.file.url).fileId = result.id;
  // console.log(info);
};
export const action = computed(() => {
  console.log(223,OSSData.value?.host);
  return OSSData.value?.host;
});

export const getExtraData: UploadProps["data"] = (file) => { 
  return {
    key: file.url,
    OSSAccessKeyId: OSSData.value?.accessId,
    policy: OSSData.value?.policy,
    Signature: OSSData.value?.signature,
    success_action_status: "200", //让服务端返回200,不然，默认会返回204
  };
};

/**
 * 上传前事件
 */
export const beforeUpload = async (file) => {
  try {
    await checkOssSignature(file);
  } catch {
    return false;
  }
  return true;
};

// 上传附件改变时
export const handleChange = async (info, name) => { 
  if (info.file.status === "uploading") {
    return;
  }
  if (info.file.status === "done") {
    info.file.fieldName = name;
    console.log('on afterSuccess')
    await afterSuccess(info);
  }
  if (info.file.status === "error") {
    message.error("upload error");
  }
};
