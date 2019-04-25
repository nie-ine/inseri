/**
 * This object defines the metadata for an image on a IIIF compatible image server.
 */
export class IIIFImage {

  /**
   * Protocol for access.
   */
  scheme = 'https';

  /**
   * The image server.
   */
  server: string;

  /**
   * Path on the server to the image.
   */
  prefix: string;

  /**
   * ID of the image.
   */
  identifier: string;

  /**
   * Maximal height of the image in pixels.
   */
  height: number;

  /**
   * Maximal width of the image in pixels.
   */
  width: number;

  /**
   * Constructor for this object.
   * @param imageUrl  An URL that defines a possible view of this image.
   * @param width  Maximal width of the image in pixels.
   * @param height  Maximal height of the image in pixels.
   */
  constructor(imageUrl: string, width: number, height: number) {
    this.height = Number(height);
    this.width = Number(width);

    const urlParts = imageUrl.split('/');

    this.scheme = urlParts[0];
    this.server = urlParts[2];
    this.identifier = urlParts[urlParts.length - 5];

    this.prefix = '';
    for (let i = 3; i < urlParts.length - 5; i++) {
      this.prefix = this.prefix + '/' + urlParts[i];
    }
  }

  /**
   * Formatted input for openseadragon.
   */
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
