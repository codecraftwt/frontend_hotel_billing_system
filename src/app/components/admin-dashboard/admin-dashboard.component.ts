import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
// import { GridOptions } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  items: string;
  total: number;
  status: string;
}

interface Staff {
  id: number;
  name: string;
  position: string;
  shift: string;
  status: string;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  stock: number;
}

interface MenuItem {
  name: string;
  orderCount: number;
}

interface Reservation {
  name: string;
  time: string;
  guests: number;
}

interface FinancialInsight {
  name: string;
  value: string;
  trend: 'up' | 'down';
  icon: string;
}

interface CustomerFeedback {
  customerName: string;
  rating: number;
  comment: string;
}
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
  staffList:any[]=[]

  rowData: any;
  // gridOptions: GridOptions = {
  //   pagination: true,
  //   paginationPageSize: 10,
  //   defaultColDef: {
  //     sortable: true,
  //     filter: true,
  //     resizable: true
  //   },
  //   rowSelection: 'multiple',
  //   suppressRowClickSelection: true,
  //   animateRows: true,
  //   domLayout: 'autoHeight',
  //   onGridReady: (params) => {
  //     params.api.sizeColumnsToFit();
  //     // Initialize chart after grid is ready
  //     this.createChart(params.api);
  //   }
  // };

  constructor(private socketService: SocketService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.socketService.getAllUser().subscribe(res=>{
      console.log(res,'user=====');
      this.staffList=res
    })
    this.socketService.getAllOrdersAdminItems().subscribe(res => {
      this.rowData = res
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

  totalOrders = 1234;
  revenue = 23456;
  averageOrderValue = 19.50;
  customerSatisfaction = 4.8;

  recentOrders: Order[] = [
    {
      id: "ORD001",
      customerName: "Alice Johnson",
      customerAvatar: "/assets/placeholder.svg",
      items: "Burger, Fries, Soda",
      total: 15.99,
      status: "Completed"
    },
    {
      id: "ORD002",
      customerName: "Bob Smith",
      customerAvatar: "/assets/placeholder.svg",
      items: "Pizza, Salad, Beer",
      total: 22.50,
      status: "In Progress"
    },
    {
      id: "ORD003",
      customerName: "Carol Williams",
      customerAvatar: "/assets/placeholder.svg",
      items: "Steak, Mashed Potatoes, Wine",
      total: 35.99,
      status: "Completed"
    },
    {
      id: "ORD004",
      customerName: "David Brown",
      customerAvatar: "/assets/placeholder.svg",
      items: "Sushi Platter, Green Tea",
      total: 28.75,
      status: "In Progress"
    },
    {
      id: "ORD005",
      customerName: "Eva Davis",
      customerAvatar: "/assets/placeholder.svg",
      items: "Pasta, Garlic Bread, Tiramisu",
      total: 24.50,
      status: "Completed"
    }
  ];


  inventoryItems: InventoryItem[] = [
    { id: 1, name: "Chicken Breast", quantity: 50, unit: "lbs", stock: 60 },
    { id: 2, name: "Tomatoes", quantity: 30, unit: "lbs", stock: 40 },
    { id: 3, name: "Olive Oil", quantity: 5, unit: "liters", stock: 70 },
    { id: 4, name: "Pasta", quantity: 20, unit: "lbs", stock: 30 },
    { id: 5, name: "Red Wine", quantity: 10, unit: "bottles", stock: 15 }
  ];

  popularItems: MenuItem[] = [
    { name: "Margherita Pizza", orderCount: 145 },
    { name: "Chicken Caesar Salad", orderCount: 120 },
    { name: "Beef Burger", orderCount: 110 },
    { name: "Spaghetti Carbonara", orderCount: 95 },
    { name: "Grilled Salmon", orderCount: 85 }
  ];

  upcomingReservations: Reservation[] = [
    { name: "Johnson Family", time: "Today, 7:00 PM", guests: 4 },
    { name: "Sarah & Friends", time: "Today, 8:30 PM", guests: 6 },
    { name: "Mr. & Mrs. Smith", time: "Tomorrow, 6:45 PM", guests: 2 },
    { name: "Birthday Party", time: "Tomorrow, 7:30 PM", guests: 10 }
  ];

  financialInsights: FinancialInsight[] = [
    { name: "Daily Revenue", value: "$3,456", trend: "up", icon: "dollar-sign" },
    { name: "Monthly Expenses", value: "$12,345", trend: "down", icon: "shopping-cart" },
    { name: "Profit Margin", value: "22%", trend: "up", icon: "trending-up" },
    { name: "Average Table Turnover", value: "1.5 hours", trend: "up", icon: "clock" }
  ];

  customerFeedback: CustomerFeedback[] = [
    { customerName: "Emily W.", rating: 5, comment: "Excellent food and service! Will definitely come back." },
    { customerName: "Michael R.", rating: 4, comment: "Great atmosphere, but the wait was a bit long." },
    { customerName: "Sophia L.", rating: 5, comment: "The new menu items are fantastic. Loved the experience!" }
  ];

  convertToIST(utcDate: string | null): string {
    if (!utcDate) {
      return '--'; // Return '--' for null case
    }
    const date = new Date(utcDate);
    return this.datePipe.transform(date, 'medium', 'UTC+5:30') || '--'; // Return '--' for invalid date
  }

}
