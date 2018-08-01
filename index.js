const sodium = require('sodium-universal')

const key = Buffer.alloc(32)
sodium.crypto_generichash(key, Buffer.from('dat-link-checksum'))

exports.encode = encode
exports.decode = decode

function encode (hash) {
  if (typeof hash === 'string') hash = Buffer.from(hash, 'hex')

  const sip = Buffer.alloc(8)
  sodium.crypto_shorthash(sip, hash, key)

  var hex = hash.toString('hex')
  var idx = 63

  for (var i = sip.length - 1; i >= 0; i--) {
    var byte = sip[i]
    for (var j = 0; j < 8; j++) {
      const bit = byte & 1
      byte >>= 1
      const k = idx--
      if (bit) hex = hex.slice(0, k) + hex[k].toUpperCase() + hex.slice(k + 1)
    }
  }

  return 'dat://' + hex
}

function decode (link) {
  if (typeof link === 'string') {
    link = link.replace('dat://', '')
    link = link.replace(/\//g, '')
    if (!/^[0-9a-f]{64}$/i.test(link)) throw new Error('Invalid link')
    const checksummed = /[A-F]/.test(link)
    if (checksummed && 'dat://' + link !== encode(link)) {
      throw new Error('Invalid link checksum')
    }
    return Buffer.from(link, 'hex')
  }
  if (link.length !== 32) throw new Error('Invalid link')
  return link
}
