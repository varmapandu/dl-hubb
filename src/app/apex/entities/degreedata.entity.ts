// import {Degree} from './degree.entity';
// export class DegreesData {
//     page:any[] = [];
//     degree:Degree = new Degree();
   
// }

import {Degree} from './degree.entity';
import {Page}  from './page.entity';
import {Program} from './program.entity';
export class DegreesData {
    degree:Degree = new Degree();
    page:Page = new Page();
    program:Program=new Program;

    
}