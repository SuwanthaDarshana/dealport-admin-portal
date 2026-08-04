'use client';

import StatCard from '@/components/StatCard';
import WeeklyReportChart from '@/components/WeeklyReportChart';
import TransactionTable from '@/components/TransactionTable';
import BestSellingWidget from '@/components/BestSellingWidget';
import UsersChartWidget from '@/components/UsersChartWidget';
import SalesByCountryWidget from '@/components/SalesByCountryWidget';
import TopProductsWidget from '@/components/TopProductsWidget';
import CategoriesWidget from '@/components/CategoriesWidget';
import QuickProductsWidget from '@/components/QuickProductsWidget';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 2-Column Grid Layout matching Figma spec */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              title="Total Sales"
              value="$350K"
              change="10.4%"
              isPositive={true}
              previousText="$235"
            />
            <StatCard
              title="Total Orders"
              value="10.7K"
              change="14.4%"
              isPositive={true}
              previousText="7.6k"
            />
            <StatCard
              title="Pending & Canceled"
              value=""
              dualStat={{
                label1: 'Pending',
                value1: '509',
                user1: '204',
                label2: 'Canceled',
                value2: '94',
                change2: '14.4%',
              }}
            />
          </div>

          {/* Weekly Performance Report Chart */}
          <WeeklyReportChart />

          {/* Transaction Table Widget */}
          <TransactionTable />

          {/* Best Selling Products Table (MUST load from NestJS API) */}
          <BestSellingWidget />
        </div>

        {/* Right Sidebar Column (1 Col) */}
        <div className="space-y-6">
          {/* Users in last 30 minutes widget */}
          <UsersChartWidget />

          {/* Sales by Country widget */}
          <SalesByCountryWidget />

          {/* Top Products Widget (MUST load from NestJS API) */}
          <TopProductsWidget />

          {/* Add New Product Categories List Widget */}
          <CategoriesWidget />

          {/* Quick Product Additions (MUST load from NestJS API) */}
          <QuickProductsWidget />
        </div>
      </div>
    </div>
  );
}
