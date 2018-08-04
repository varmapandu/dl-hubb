import {Image} from './image.entity';
import {Video} from './video.entity';

export class Page {
   name: string;
   title: string;
   description: string;
   meta: Object;
   image: Image[] = [];
   video: Video[] = [];
   slug:string;
   updateBy: string;
   updateDate: Date;
}