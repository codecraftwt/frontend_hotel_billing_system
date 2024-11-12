import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spline-area',
  templateUrl: './spline-area.component.html',
  styleUrls: ['./spline-area.component.css']
})
export class SplineAreaComponent {
  @Input() totalOrders: { x: string, y: number }[] = []; // Dynamic input
  @Input()color:string|undefined
  chartOptions: any;
  show:boolean=false
  constructor(){
    // this.chartOptions = {
    //   animationEnabled: true,
    //   backgroundColor: "transparent", // Set background to transparent
    //   title: null, // Remove title
    //   axisY: {
    //     title: null, // Remove Y axis title
    //     labelFormatter: () => "", // Remove Y axis labels
    //     valueFormatString: "", // Remove value formatting
    //     lineThickness: 0, // Remove Y axis line
    //     gridThickness: 0, // Remove Y axis grid lines
    //   },
    //   axisX: {
    //     title: null, // Remove X axis title
    //     labelFormatter: () => "", // Remove X axis labels
    //     lineThickness: 0, // Remove X axis line
    //     gridThickness: 0, // Remove X axis grid lines
    //   },
    //   data: [{
    //     type: "splineArea",
    //     color: "rgba(0, 255, 0, 0.7)",
    //     xValueFormatString: "YYYY-MM-DD", // Keep date formatting as is for the X axis
    //     lineThickness: 2, // Remove the line for the spline area
    //     fillOpacity: 0.7, // Keeps the area but no lines
    //     dataPoints: [
    //       { x: new Date("2024-08-31T18:30:00.000Z"), y: 2506000 },
    //       { x: new Date("2024-09-30T18:30:00.000Z"), y: 2798000 },
    //       // { x: new Date("2024-10-31T18:30:00.000Z"), y: 3386000 },
    //       // ...this.dataPoints
    //       // {"x":"2024-08-31T18:30:00.000Z","y":7},{"x":"2024-09-30T18:30:00.000Z","y":5},{"x":"2024-10-31T18:30:00.000Z","y":7}
    //     ]?.map(point => {
    //       // Add indexLabel to highest and lowest points
    //       let label = "";
    //       if (point.y === Math.max(...this.getDataPoints().map(p => p.y))) {
    //         label = "Highest";
    //       } else if (point.y === Math.min(...this.getDataPoints().map(p => p.y))) {
    //         label = "Lowest";
    //       }
  
    //       return { ...point, indexLabel: label };
    //     })
    //   }]
    // };
  }
  dataPoints:any
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalOrders'] && this.totalOrders!=undefined) {
      this.updateChartOptions(); // Update the chart when input data changes
    }
  }
  updateChartOptions() {
    console.log(this.totalOrders,'totalOrders');
     this.dataPoints = this.totalOrders.map(order => ({
      x: new Date(order.x),  // Parse the x value as a Date object
      y: order.y
    }));
    console.log(this.dataPoints,'dataPoints');
    // console.log(JSON.stringify(this.dataPoints),'dataPoints');
    
  this.chartOptions = {
    animationEnabled: true,
    backgroundColor: "transparent", // Set background to transparent
    title: null, // Remove title
    axisY: {
      includeZero: true,
      gridThickness: 0, // Remove horizontal gridlines
      lineThickness: 0, // Remove Y-axis line
      tickThickness: 0, // Remove Y-axis ticks/dashes
      labelFontSize: 0, // Remove Y-axis labels
      visible: false,   // Hide Y-axis
    },
    axisX: {
      gridThickness: 0, // Remove vertical gridlines
      lineThickness: 0, // Remove X-axis line
      tickThickness: 0, // Remove X-axis ticks/dashes
      labelFontSize: 0, // Remove X-axis labels
      visible: false,   // Hide X-axis
    },
    data: [{
      type: "splineArea",
      color: this.color,
      xValueFormatString: "YYYY-MM-DD", // Keep date formatting as is for the X axis
      lineThickness: 2, // Remove the line for the spline area
      fillOpacity: 0.7, // Keeps the area but no lines
      dataPoints: [
        // { x: new Date("2024-08-31T18:30:00.000Z"), y: 2506000 },
        // { x: new Date("2024-09-30T18:30:00.000Z"), y: 2798000 },
        // { x: new Date("2024-10-31T18:30:00.000Z"), y: 3386000 },
        ...this.dataPoints
        // {"x":"2024-08-31T18:30:00.000Z","y":7},{"x":"2024-09-30T18:30:00.000Z","y":5},{"x":"2024-10-31T18:30:00.000Z","y":7}
      ]?.map(point => {
        // Add indexLabel to highest and lowest points
        let label = "";
        let labelColor = "";
        if (point.y === Math.max(...this.getDataPoints().map((p:any) => p.y))) {
          label = "Highest\u2191";
          labelColor = "white";
        } else if (point.y === Math.min(...this.getDataPoints().map((p:any) => p.y))) {
          label = "Lowest\u2193";
          labelColor = "white"; 
        }

        return { ...point, indexLabel: label ,indexLabelFontColor: labelColor};
      })
    }]
  };
  this.show=true

}

  getDataPoints() {
    console.log({ x: new Date("2024-08-31T18:30:00.000Z"), y: 2506000 });
    
    // return [
    //   // { x: new Date("2024-08-31T18:30:00.000Z"), y: 2506000 },
    //   // { x: new Date("2024-09-30T18:30:00.000Z"), y: 2798000 },
    //   // { x: new Date("2024-10-31T18:30:00.000Z"), y: 3386000 },
    //   // ...this.dataPoints
    //   // {"x":"2024-08-31T18:30:00.000Z","y":7},{"x":"2024-09-30T18:30:00.000Z","y":5},{"x":"2024-10-31T18:30:00.000Z","y":7}
    // ];
    return this.dataPoints
  }
}
