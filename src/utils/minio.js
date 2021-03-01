import { Client } from 'minio'

var minioClient = new Client({
  endPoint: process.env.VUE_APP_MINIO_ENDPOINT,
  port: 9000,
  useSSL: true,
  accessKey: 'minioadmin',
  secretKey: 'bmj123456'
})

export default minioClient
