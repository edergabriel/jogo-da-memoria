import {Component, OnInit, AfterViewInit} from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'google-adsense',
  template: ` <div>
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-XXXXXXXXXXXXXX"
                    data-ad-slot="8184819393"
                    data-ad-format="auto"></ins>
            </div>   
            <br>            
  `,

})

export class TopBannerComponent implements AfterViewInit {

  constructor() {    
  } 

  ngAfterViewInit() {
     setTimeout(()=>{
      try{
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      }catch(e){
        console.error("error");
      }
    },2000);
 }     
}