import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CottagesComponent } from './pages/cottages/cottages.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { EntranceComponent } from './pages/entrance/entrance.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { SalesComponent } from './pages/sales/sales.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';

export const routes: Routes = [
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'cottages',         component: CottagesComponent },
    { path: 'customers',        component: CustomersComponent },
    { path: 'entrance',         component: EntranceComponent },
    { path: 'reservations',     component: ReservationsComponent },
    { path: 'sales',            component: SalesComponent },

    { path: 'customers/create-customers', component: CreateCustomerComponent },
];
