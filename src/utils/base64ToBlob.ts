const base64ToBlob=(base64String: string, contentType = '', sliceSize = 512): Buffer =>{
     // Remove the data:image/png;base64, prefix if present
     base64String = base64String.replace(/^data:image\/png;base64,/, '');
    const byteCharacters = Buffer.from(base64String, 'base64');
    const byteArrays: Buffer[] = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      byteArrays.push(slice);
    }
  
    return Buffer.concat(byteArrays);
  }
  
  export {base64ToBlob};