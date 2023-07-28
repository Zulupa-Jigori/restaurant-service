import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const uploadImageValidator = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 500000 }), // 500kb
    new FileTypeValidator({ fileType: /^image\/(jpg|jpeg|png)$/ }),
  ],
});
