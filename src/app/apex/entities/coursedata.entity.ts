import {Course} from './course.entity';
import {Page}  from './page.entity'
export class CourseData {
    course:Course = new Course();
    page:Page = new Page();
    projects:any[] = [];
    subCourse:any[] = [];
    subModules:any[] = [];
    
}