import { Component, Input } from '@angular/core';
import {ReportService} from '../service/report.service';
import {Props} from "../../apex/common/props";
import { DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'cc-payment',
    template: `<button (click)="payment()">PaymentGateway</button> 
    <iframe width="100%" height="300" [src]="ccFrame" *ngIf="ccFrame"></iframe>
    `,
    styles: ['']
})
export class CCPaymentComponent {
    public ccFrame:any = "";
    constructor(private sanitizer: DomSanitizer) { }

    payment() {
        this.loadHtml(null).then( (data:string) => {
            console.log(data);
            this.ccFrame = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        });
    }
    loadHtml(data) {
        let url = Props.API_END_POINT + 'ccpayment' ;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();;
            xhr.open("GET", url);
            xhr.setRequestHeader("Content-type", "text/plain");
            xhr.onreadystatechange = (() => {
                if (xhr.readyState == 0 || xhr.readyState == 4) {
                   // var data = JSON.parse(xhr.response);
                    // if (data.status == 1) {
                    //     resolve(data.data);
                    // } else {
                    //     this.errorMessage(data.error);
                    //     reject(data);
                    // }
                    var data = xhr.response;
                    return resolve(data);
                }
            });
            xhr.send();
        });
    }
    
    // payment(){
    //     var workingKey = "3292ABC75DDFE357A592744FC574B303"
    //     let data: any = {
    //         merchant_id: '142083',
    //         order_id: '1234',
    //         currency: 'INR',
    //         amount: '1.00'
    //     }
    //     let  ccavData=  qs.parse(data);
    //     var encCC = this.decrypt(ccavData,workingKey);
    //     this.ccFrame = this.returnHtml(encCC)

    // }

    // encrypt(plainText, workingKey) {
    //     var m = crypt.createHash('md5');
    //         m.update(workingKey);
    //        var key = m.digest("binary");
    //           var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
    //     var cipher = crypt.createCipheriv('aes-128-cbc', key, iv);
    //     var encoded = cipher.update(plainText,'utf8','hex');
    //     encoded += cipher.final('hex');
    //         return encoded;
    // };
    
    
    // decrypt(encText, workingKey) {
    //         var m = crypt.createHash('md5');
    //         m.update(workingKey)
    //         var key = m.digest('binary');
    //     var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
    //     var decipher = crypt.createDecipheriv('aes-128-cbc', key, iv);
    //         var decoded = decipher.update(encText,'hex','utf8');
    //     decoded += decipher.final('utf8');
    //         return decoded;
    // };
    
    // returnHtml(encCC: string){
    //     let merchant_id = "142083"
    //     let accessCode="AVDU72EG11BY96UDYB"
    //     var htmlcode = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+merchant_id+'&encRequest='+encCC+'&access_code='+accessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    // return htmlcode;
    // }
}