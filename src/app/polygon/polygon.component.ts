import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.css']
})
export class PolygonComponent implements OnInit {

  zoneData:any;
  points: any[] = [];

  // @ViewChild('newPolygone') newPolygonediv:ElementRef;

  lastPt:any;
  polyline:any;
  svg:any;
  templine:any;
  newPolygone:any;
  isPopupopen=false;
  newZonenum= 101;
  constructor(private dbService: ServiceService,) { }

  ngOnInit(): void {
    this.getPolygones();
  }

  getPolygones() {   
      this.dbService.getPolygones().subscribe(
        (data) => {
          this.zoneData = data;
          console.log(data)

        },
        err => {
          throw err;
        }
      );
    }

    printOutSVGFormat(zone:any){
      return zone.points;
    }

    delete(zone:any){
      this.dbService.deleteZone(zone.id).subscribe(
        (data) => {
          this.zoneData = data;

        },
        err => {
          throw err;
        }
      );
    }

    create(){
      this.isPopupopen = !this.isPopupopen
      this.newPolygone = document.getElementById('newPolygone');
      this.newPolygone.style.display = "block";
      this.polyline = document.getElementById('polyline');
      this.svg = document.getElementById('newsvg');
      this.templine = document.getElementById('templine');

      this.svg.addEventListener('click',(e:any) =>{

        if(this.polyline.animatedPoints.length >= 4){
          alert("max 4 points alowed - Save or Close");
        }else{
          let pts = this.polyline.getAttribute('points') || ''
          const newPoint = `${e.clientX},${e.clientY} `;
          pts += newPoint;
          this.polyline.setAttribute('points',pts); 
          if(this.polyline.animatedPoints.length === 4){
            let pt = this.polyline.getAttribute('points') || '';
            const newPoint = `${this.polyline.animatedPoints[0].x},${this.polyline.animatedPoints[0].y} `;
            pt += newPoint;
            this.polyline.setAttribute('points',pt);
          }
      }
    })

    }

    save(){
      let points = this.polyline.animatedPoints;
      let arrPoints = [];
      for(let i=0; i<points.length-1; i++){
        let temparr = [points[i].x , points[i].y];
        arrPoints.push(temparr);
      }
      this.newZonenum++;
      let zone = {name:"zone"+this.newZonenum, "points":arrPoints}
      this.newPolygone.style.display = "none";

      this.dbService.createZone(zone).subscribe(
        (data) => {
          console.log(data);
          this.polyline.setAttribute('points',"");

        },
        err => {
          alert(err.message);
          this.polyline.setAttribute('points',"");

        }
      );
    }

    close(){
      this.isPopupopen = false;
      this.newPolygone.style.display = "none";
      this.polyline.setAttribute('points',"");

    }


  }

