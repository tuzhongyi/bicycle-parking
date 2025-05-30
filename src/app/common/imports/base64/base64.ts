import { base64decode, base64encode, utf16to8, utf8to16 } from './base64_1';

export class Base64 {
  static encode(str: string): string {
    return base64encode(str);
  }
  static decode(str: string): string {
    return base64decode(str);
  }
  static utf16to8(str: string): string {
    return utf16to8(str);
  }
  static utf8to16(str: string): string {
    return utf8to16(str);
  }
}
