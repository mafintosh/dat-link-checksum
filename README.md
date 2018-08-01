# dat-link-checksum

Backwards compatible dat links that contain a checksum
so you know if made a typo.

```
npm install dat-link-checksum
```

## Usage

``` js
const datLink = require('dat-link-checksum')

// return dat://...
const link = datLink.encode(datKeyAsBuffer)

// checks the checksum and return the decoded link
const buf = datLink.decode(link)
```

The checksum is encoded as uppercase hex characters,
similar to ethereum keys, which makes the checksum
links backwards compatible since hex is case insensitive

## License

MIT
