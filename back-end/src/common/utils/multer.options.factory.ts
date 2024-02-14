import * as multer from 'multer';
import * as path from 'path';

export const multerOptionsFactory = (): multer.Options => {
  return {
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, path.join(process.cwd(), 'uploads'));
      },

      filename(req, file, cb) {
        const ext = path.extname(file.originalname); // 파일 확장자 추출
        cb(null, `dog-${Date.now()}${ext}`);

        // const DogID = req.params.DogID; // request에서 DogID를 가져옵니다.
        // done(null, `${DogID}${ext}`); // DogID와 확장자를 결합하여 파일 이름을 지정합니다.
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  };
};
