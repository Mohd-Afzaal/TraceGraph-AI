import { Jimp } from 'jimp';

/**
 * Computes a basic difference hash (dHash) for an image buffer.
 */
export async function computeDHash(buffer: Buffer): Promise<string> {
  try {
    const image = await Jimp.read(buffer);
    // Resize to 9x8 to compare adjacent pixels in a row (8 comparisons per row * 8 rows = 64 bits)
    image.resize({ w: 9, h: 8 });
    image.greyscale();

    let hash = '';
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        // Get pixel values
        const leftPixel = image.getPixelColor(x, y);
        const rightPixel = image.getPixelColor(x + 1, y);

        // Convert to RGBA and extract luminance
        const leftLuma = (leftPixel >> 24) & 255; 
        const rightLuma = (rightPixel >> 24) & 255;

        hash += leftLuma > rightLuma ? '1' : '0';
      }
    }
    return hash; // 64-bit string of 1s and 0s
  } catch (error) {
    console.error('Error computing hash:', error);
    // Fallback pseudo-hash for non-images (e.g. video placeholder)
    let fallback = '';
    for(let i=0; i<64; i++) { fallback += Math.random() > 0.5 ? '1' : '0'; }
    return fallback;
  }
}

/**
 * Computes Hamming distance between two binary strings of equal length.
 */
export function hammingDistance(hash1: string, hash2: string): number {
  if (hash1.length !== hash2.length) return 64; // Max distance
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }
  return distance;
}

export function similarityFromDistance(distance: number, hashLength: number = 64): number {
  return 1 - (distance / hashLength);
}
