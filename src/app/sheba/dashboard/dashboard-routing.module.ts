import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {WalletTransactionsService} from './wallet-transactions.service';
import {AuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            // {
            //     path: '',
            // },
            {
                path: 'rfq',
                loadChildren: './rfq/rfq.module#RfqModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'quick-purchase',
                loadChildren: './quick-purchase/quick-purchase.module#QuickPurchaseModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'order/subscription',
                loadChildren: './subscription/subscription.module#SubscriptionModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#OrdersModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'subscriptions',
                loadChildren: './subscription-orders/subscription-orders.module#SubscriptionOrdersModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'vendors',
                loadChildren: './vendors/vendors.module#VendorsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'my-account',
                loadChildren: './my-account/my-account.module#MyAccountModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'fleet-management',
                loadChildren: './fleet-management/fleet-management.module#FleetManagementModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'procurement',
                loadChildren: './procurement/procurement.module#ProcurementModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'notifications',
                loadChildren: './notifications/notifications.module#NotificationsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            // {
            //     path: 'co-workers',
            //     loadChildren: './co-workers/co-workers.module#CoWorkersModule',
            //     canLoad: [AuthGuard],
            //     data: {
            //         userAccess: false
            //     }
            // },
            {
                path: 'co-workers',
                loadChildren: './hrm-solution/co-workers/co-workers.module#CoWorkersModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'departments',
                loadChildren: './hrm-solution/departments/departments.module#DepartmentsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'transactions',
                loadChildren: './wallet-transactions/wallet-transactions.module#WalletTransactionsModule',
                canLoad: [AuthGuard],
                resolve: {
                    transaction: WalletTransactionsService
                },
                data: {
                    name: 'Transactions',
                    userAccess: false
                }
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'support',
                loadChildren: './support/support.module#SupportModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'announcements',
                loadChildren: './announcements/announcements.module#AnnouncementsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'attendance',
                loadChildren: './attendance/attendance.module#AttendanceModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'leave',
                loadChildren: './leave/leave.module#LeaveModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'expense',
                loadChildren: './expense/expense.module#ExpenseModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: '',
                redirectTo: 'rfq',
                data: {
                    userAccess: false
                }
            },
            {
                path: 'bill',
                data: {
                    comingSoon: true
                }
            },
            // {
            //     path: '**',
            //     redirectTo: 'rfq',
            //     data: {
            //         userAccess: true
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
