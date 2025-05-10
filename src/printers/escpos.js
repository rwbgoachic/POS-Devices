const ESC = 0x1B;
const GS = 0x1D;
const LF = 0x0A;

class ESCPOSProtocolHandler {
  constructor() {
    this.buffer = Buffer.alloc(0);
  }

  // Basic printer commands
  initialize() {
    return Buffer.from([ESC, '@']);
  }

  lineFeed(lines = 1) {
    const command = new Array(lines).fill(LF);
    return Buffer.from(command);
  }

  // Text formatting
  setTextSize(width = 1, height = 1) {
    return Buffer.from([GS, '!', (width - 1) | ((height - 1) << 4)]);
  }

  setBold(enabled) {
    return Buffer.from([ESC, 'E', enabled ? 1 : 0]);
  }

  setUnderline(mode = 1) {
    return Buffer.from([ESC, '-', mode]);
  }

  // Alignment
  setAlignment(alignment = 'left') {
    const alignments = {
      left: 0,
      center: 1,
      right: 2
    };
    return Buffer.from([ESC, 'a', alignments[alignment]]);
  }

  // Paper control
  cut(partial = false) {
    return Buffer.from([GS, 'V', partial ? 1 : 0]);
  }

  // Print text
  text(content) {
    return Buffer.from(content, 'utf8');
  }

  // Combine multiple commands
  async buildCommand(...commands) {
    return Buffer.concat(commands);
  }

  // Print text implementation
  printText(text) {
    return Buffer.from(text);
  }
}

module.exports = ESCPOSProtocolHandler;