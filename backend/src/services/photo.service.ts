import { Photo } from '../models/photo.model';

export class PhotoService {

  public async create(file: any) {
    return Photo.create(file);
  }

  public async getFilename(photoId: string) {
    const photo = await Photo.findOne({
      where: {
        id: photoId,
      },
    });
    return photo.fileName;
  }

}

export const photoService = new PhotoService();
