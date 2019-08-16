import crypto from 'crypto'

export const cryptoMd5 = (data) => {
  const md5 = crypto.createHash('md5')
  return md5.update(data).digest('hex')
}