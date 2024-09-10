import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  columnDefs = [
    { headerName: 'Order ID', field: '_id', sortable: true, filter: true },
    { headerName: 'Table No', field: 'tableNo', sortable: true, filter: true },
    { headerName: 'Total Price', field: 'totalPrice', sortable: true, filter: true },
    { headerName: 'Discount Percent', field: 'discountPercent', sortable: true, filter: true },
    { headerName: 'After Discount Price', field: 'afterDiscountPrice', sortable: true, filter: true },
    { headerName: 'Order Status', field: 'orderStatus', sortable: true, filter: true },
    { headerName: 'KOT Status', field: 'kotStatus', sortable: true, filter: true },
    { headerName: 'Customer Name', field: 'customerName', sortable: true, filter: true },
  ];

  rowData: any[] = [];
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    animateRows: true,
    domLayout: 'autoHeight',
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
      // Initialize chart after grid is ready
      this.createChart(params.api);
    }
  };

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getAllOrdersAdminItems().subscribe(res => {
      this.rowData = res.map(order => ({
        _id: order._id,
        tableNo: order.tableNo,
        totalPrice: order.totalPrice,
        discountPercent: order.discountPercent,
        afterDiscountPrice: order.afterDiscountPrice,
        orderStatus: order.orderStatus,
        kotStatus: order.kotStatus,
        customerName: order.customerName || 'N/A',
      }));
    });
  }

  createChart(api: any): void {
    const chartContainer = document.querySelector('#chartContainer');
    if (chartContainer) {
      api.createRangeChart({
        chartType: 'column', // or 'line', 'pie', etc.
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: this.rowData.length - 1,
          columnStartIndex: 0,
          columnEndIndex: this.columnDefs.length - 1
        },
        chartContainer: chartContainer,
        chartThemeName: 'ag-pastel'
      });
    } else {
      console.error('Chart container not found');
    }
  }
}
