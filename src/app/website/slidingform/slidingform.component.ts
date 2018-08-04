import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
    selector: 'app-slidingform',
    templateUrl: './slidingform.component.html',
    styleUrls: ['./slidingform.component.scss']
})
export class SlidingformComponent implements OnInit {

    constructor() {
        //     $(document).ready(function() {
        //       $("#my-profile").click(function() {
        //           if ($(".slidable-nav").hasClass("opened")) {
        //               $(".slidable-nav, .overlay").removeClass("opened");
        //           } else {
        //               $(".slidable-nav, .overlay").addClass("opened");
        //           }
        //       });

        //       $(".slidable-close, .overlay").click(function() {
        //           $(".slidable-nav, .overlay").removeClass("opened");
        //       });
        //   });
        $(function () {
            $("#feedback-tab").click(function () {
                $("#feedback-form").toggle("slide");
            });

        
            // $("#feedback-form form").on('submit', function (event) {
            //     var $form = $(this);
            //     $.ajax({
            //         type: $form.attr('method'),
            //         url: $form.attr('action'),
            //         data: $form.serialize(),
            //         success: function () {
            //             $("#feedback-form").toggle("slide").find("textarea").val('');
            //         }
            //     });
            //     event.preventDefault();
            // });
        });

    }

    ngOnInit() {
    }
    feedback(){
        
    }


    


}
