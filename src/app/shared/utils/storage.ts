/** Storage  */
export class Storage {

    static setLocalItem(key:string, val: any){
        key = key;
        if(val) {
            if(typeof val === 'object'){
                val = JSON.stringify(val);
            }
            localStorage.setItem(key, val);
        }

    }
    static getLocalItem(key:string){
         key = key;
        let val:string = localStorage.getItem(key);
        if(val) {
            if(val.indexOf("{") > -1) {
                val = JSON.parse(val);
            } else if(val.indexOf("[") > -1) {
                val = JSON.parse(val);
            }
            return val;
        } else {
            return null;
        }
    }
    static  removeLocalItem(key: string) {
         key = key;
        localStorage.removeItem(key);
    }
    static setSessionItem(key:string, val: any){
         key = key;

        if(val) {
            //  console.log(key);
            // console.log(val);
            // console.log(Array.isArray(val));
            if(typeof val === 'object'){
                val = JSON.stringify(val);
            } else if(Array.isArray(val)){
                //console.log(val);
                val = JSON.stringify(val);   
                 //console.log(val);    
            }

            sessionStorage.setItem(key, val);
            //console.log(sessionStorage.getItem(key));
        }

    }

    static getSessionItem(key:string): any {
         key = key;
        let val:string = window.sessionStorage.getItem(key);
        if(val) {
            if(val.indexOf("{") > -1) {
                val = JSON.parse(val);
            } else if(val.indexOf("[") > -1) {
                val = JSON.parse(val);
            }
            return val;
        } else {
            return null;
        }
    }
    static  removeSessionItem(key: string) {
        key = key;
        sessionStorage.removeItem(key);
    }
    static sessionClear(){
        sessionStorage.clear();
    }

    static setSessionUser(val : string){
        if(val){
           this.setSessionItem('user', val);
        }
    }
    static getSessionUser(): any {
        return this.getSessionItem('user');
    }
    static setMenuList(val : string){
        if(val){
           this.setSessionItem('menu', val);
        }
    }
    static getMenuList(): any {
        //console.log(this.getSessionItem('menu'));
        return this.getSessionItem('menu');
    }
    // page info
    static setSessionPageInfo(val : string){
        if(val){
           this.setSessionItem('page', val);
        }
    }
    static getSessioPageInfo(): any {
        return this.getSessionItem('page');
    }
    //meta info
    static setMetaData(val : string){
        if(val){
           this.setSessionItem('meta', val);
        }
    }
    static getMetaData(): any {
        //console.log(this.getSessionItem('meta'));
        return this.getSessionItem('meta');
    }
    
    //clear data
    static clearSession(): void {
        this.sessionClear();
        this.removeSessionItem('user');
        this.removeSessionItem('menu');
        this.removeSessionItem('page');
        this.removeSessionItem('meta');
    }
}