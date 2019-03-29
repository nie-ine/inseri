export class IIIFImage {

  scheme = 'https';
  server: string;
  prefix: string;
  identifier: string;

  height: number;
  width: number;

  constructor(imageUrl: string, width: number, height: number) {
    this.height = height;
    this.width = width;

    const urlParts = imageUrl.split('/');

    this.scheme = urlParts[0];
    this.server = urlParts[2];
    this.identifier = urlParts[urlParts.length - 5];

    this.prefix = '';
    for (let i = 3; i < urlParts.length - 5; i++) {
      this.prefix = this.prefix + '/' + urlParts[i];
    }
  }

  tileSource() {

    return {
      'tileSource': {
        '@context': 'http://iiif.io/api/image/2/context.json',
        '@id': this.scheme + '//' + this.server + this.prefix + '/' + this.identifier,
        'height': this.height,
        'width': this.width,
        'profile': ['http://iiif.io/api/image/2/level2.json'],
        'protocol': 'http://iiif.io/api/image',
        'tiles': [{
          'scaleFactors': [1, 2, 4, 8, 16, 32],
          'width': 1024
        }]
      },
      'x': 0,
      'y': 0
    };
  }
}
