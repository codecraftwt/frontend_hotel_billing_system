import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, pairwise } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { convertUTCToIST } from './time-utils';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-kds',
  templateUrl: './kds.component.html',
  styleUrls: ['./kds.component.css']
})
export class KdsComponent implements OnInit {
  data: any

  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  // Store the previous data
  private previousData: any[] = [];

  constructor(private socketService: SocketService, private datePipe: DatePipe) {
    // Example data stream
    this.data$
      .pipe(
        pairwise(), // Pair current and previous values
        map(([previous, current]) => {
          // Compare data
          const changes = this.getChanges(previous, current);
          return { previous, current, changes };
        }),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev.changes) === JSON.stringify(curr.changes))
      )
      .subscribe(({ previous, current, changes }) => {
        if (changes.length > 0) {
          console.log('Data changed:', changes);
          console.log(JSON.stringify(changes), 'changes');
          const updatedValues = this.extractUpdatedValues(changes);
          console.log('Updated values:', updatedValues);
          // Handle data changes here
        }
      });

    // let data = convertUTCToIST('2024-09-05T09:04:29.281Z');
    // console.log(data,'timeeee');

  }

  ngOnInit(): void {
    this.socketService.getAllOrdersItems().subscribe(res => {
      console.log(res, 'res=========test');
      this.data = res
      // console.log(this.data, 'this.data');
      // console.log(JSON.stringify(this.data), 'this.data');
      // this.updateData(res);

      // setTimeout(() => {
      //   this.updateData({ key: 'value2' });
      // }, 5000);
    })
    let a = this.getTimeStatus('2024-09-05T10:06:30.044Z')
    console.log(a, 'a');

  }

  statusUpdate(tableNo: any, foodItemId: any, status: any) {
    this.socketService.updateFoodItemStatus(tableNo, foodItemId, status).subscribe(res => {
      console.log(res, 'update');

    })
  }

  updateData(newData: any[]) {
    this.dataSubject.next(newData);
  }
  // Method to compare and get changes
  getChanges(previous: any[], current: any[]): any[] {
    const changes: any = [];
    const previousMap = new Map(previous.map(item => [item._id, item]));
    const currentMap = new Map(current.map(item => [item._id, item]));

    // Find changes
    current.forEach(item => {
      const prevItem = previousMap.get(item._id);
      if (prevItem) {
        const differences = this.findDifferences(prevItem, item);
        if (Object.keys(differences).length > 0) {
          changes.push({ _id: item._id, changes: differences });
        }
      } else {
        changes.push({ _id: item._id, added: item });
      }
    });

    // Find removed items
    previous.forEach(item => {
      if (!currentMap.has(item._id)) {
        changes.push({ _id: item._id, removed: item });
      }
    });

    return changes;
  }

  // Find differences between two items
  findDifferences(prevItem: any, currentItem: any): any {
    const differences: any = {};
    for (const key in currentItem) {
      if (currentItem[key] !== prevItem[key]) {
        differences[key] = { old: prevItem[key], new: currentItem[key] };
      }
    }
    return differences;
  }

  extractUpdatedValues(changes: any[]): any[] {
    return changes
      .filter(change => change.changes && change.changes.ordersList) // Filter out entries with changes in ordersList
      .map(change => {
        const updatedOrders = change.changes.ordersList.new.map((newOrder: any) => {
          // Find the corresponding old order based on foodItemId
          const oldOrder = change.changes.ordersList.old.find((o: any) => o.foodItemId === newOrder.foodItemId);

          if (oldOrder) {
            // Compare old and new values for quantity and orderNote
            const updatedFields: any = {};

            if (oldOrder.quantity !== newOrder.quantity) {
              updatedFields.quantity = {
                old: oldOrder.quantity,
                new: newOrder.quantity
              };
            }

            if (oldOrder.orderNote !== newOrder.orderNote) {
              updatedFields.orderNote = {
                old: oldOrder.orderNote,
                new: newOrder.orderNote
              };
            }

            // If there are any changes, return them
            if (Object.keys(updatedFields).length > 0) {
              return {
                foodItemId: newOrder.foodItemId,
                changes: updatedFields
              };
            }
          }
          return null;
        }).filter((orderChange: any) => orderChange !== null); // Filter out null values

        // Return changes with the parent _id
        if (updatedOrders.length > 0) {
          return {
            _id: change._id,
            changes: updatedOrders
          };
        }
        return null;
      })
      .filter(change => change !== null); // Filter out null values
  }

  // convertToMumbaiTime(utcTime: string): string {
  //   // // Convert UTC time to Mumbai time
  //   // const mumbaiTime = moment.utc(utcTime).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A');
  //   // return mumbaiTime;
  //   // Convert UTC time to Mumbai time
  //   const mumbaiTime = moment.utc(utcTime).tz('Asia/Kolkata').format('hh:mm:ss A');
  //   return mumbaiTime;
  // }

  // Method to convert UTC time to Mumbai time
  convertToMumbaiTime(utcTime: string): moment.Moment {
    return moment.utc(utcTime).tz('Asia/Kolkata');
  }

  // Method to get current Mumbai time
  getCurrentMumbaiTime(): moment.Moment {
    return moment.tz('Asia/Kolkata');
  }

  // Method to check if time is 'just' or calculate the difference
  getTimeStatus(utcTime: string): string {
    const convertedTime = this.convertToMumbaiTime(utcTime);
    const currentTime = this.getCurrentMumbaiTime();

    // Calculate the difference in minutes
    const differenceInMinutes = currentTime.diff(convertedTime, 'minutes');

    // Determine the difference in hours and minutes
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const remainingMinutes = differenceInMinutes % 60;

    if (differenceInMinutes === 0) {
      return 'just';
    } else if (differenceInHours > 0) {
      return `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''} ago`;
    }

  }

}
