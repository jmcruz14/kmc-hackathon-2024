<template>
  <div class="h-full p-4">
    <!-- Stats Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Applicants Card -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div class="stat-title text-lg">Total Applicants</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="stat-value text-4xl mt-2">{{ dashboardData.totalApplicants }}</div>
          <div class="stat-desc text-success flex items-center gap-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {{ dashboardData.applicantGrowth }}% from last month
          </div>
        </div>
      </div>

      <!-- AI Processing Stats -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div class="stat-title text-lg">AI Processed</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="stat-value text-4xl mt-2">{{ dashboardData.aiProcessed }}</div>
          <div class="stat-desc mt-2">
            Average processing time: {{ dashboardData.avgProcessingTime }}
          </div>
        </div>
      </div>

      <!-- Acceptance Rate -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div class="stat-title text-lg">AI Acceptance Rate</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-success opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-value text-4xl mt-2">{{ dashboardData.acceptanceRate }}%</div>
          <div class="stat-desc mt-2">
            {{ dashboardData.acceptedCount }} candidates accepted
          </div>
        </div>
      </div>

      <!-- Rejection Rate -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div class="stat-title text-lg">AI Rejection Rate</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-error opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-value text-4xl mt-2">{{ dashboardData.rejectionRate }}%</div>
          <div class="stat-desc mt-2">
            {{ dashboardData.rejectedCount }} candidates rejected
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Applications Timeline -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title mb-4">Application Timeline</h2>
          <Line 
            :data="applicationChartData"
            :options="chartOptions"
          />
        </div>
      </div>

      <!-- AI Processing Results -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title mb-4">AI Processing Breakdown</h2>
          <Line 
            :data="processingChartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Recent Applications Table -->
    <div class="card bg-base-100 shadow-xl mt-6">
      <div class="card-body">
        <h2 class="card-title mb-4">Recent Applications</h2>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Position</th>
                <th>AI Status</th>
                <th>Processing Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in dashboardData.recentApplications" :key="app.id">
                <td>{{ app.name }}</td>
                <td>{{ app.position }}</td>
                <td>
                  <div class="badge" 
                       :class="getStatusBadgeClass(app.status)">
                    {{ app.status }}
                  </div>
                </td>
                <td>{{ app.processingTime }}</td>
                <td>
                  <button class="btn btn-ghost btn-xs" @click="viewApplication(app.id)">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'Dashboard',
  components: {
    Line
  },
  setup() {
    // Sample dashboard data
    const dashboardData = ref({
      totalApplicants: 1247,
      applicantGrowth: 12.5,
      aiProcessed: 1158,
      avgProcessingTime: '2.5 minutes',
      acceptanceRate: 68,
      acceptedCount: 787,
      rejectionRate: 32,
      rejectedCount: 371,
      recentApplications: [
        {
          id: 1,
          name: 'John Doe',
          position: 'Senior Developer',
          status: 'Accepted',
          processingTime: '2m 15s'
        },
        {
          id: 2,
          name: 'Jane Smith',
          position: 'UX Designer',
          status: 'Processing',
          processingTime: '1m 45s'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          position: 'Product Manager',
          status: 'Rejected',
          processingTime: '2m 30s'
        },
        {
          id: 4,
          name: 'Sarah Williams',
          position: 'Data Scientist',
          status: 'Accepted',
          processingTime: '3m 00s'
        }
      ]
    })

    // Chart.js options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    // Applications timeline chart data
    const applicationChartData = computed(() => ({
      labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29'],
      datasets: [
        {
          label: 'Applications',
          data: [45, 52, 61, 58, 63],
          borderColor: '#8b5cf6',
          tension: 0.1
        }
      ]
    }))

    // AI Processing breakdown chart data
    const processingChartData = computed(() => ({
      labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29'],
      datasets: [
        {
          label: 'Accepted',
          data: [35, 40, 45, 42, 48],
          borderColor: '#4ade80',
          tension: 0.1
        },
        {
          label: 'Rejected',
          data: [10, 12, 16, 16, 15],
          borderColor: '#f87171',
          tension: 0.1
        }
      ]
    }))

    const getStatusBadgeClass = (status) => {
      switch (status) {
        case 'Accepted':
          return 'badge-success'
        case 'Rejected':
          return 'badge-error'
        case 'Processing':
          return 'badge-warning'
        default:
          return 'badge-ghost'
      }
    }

    const viewApplication = (id) => {
      console.log('Viewing application:', id)
      // Implement view logic
    }

    return {
      dashboardData,
      chartOptions,
      applicationChartData,
      processingChartData,
      getStatusBadgeClass,
      viewApplication
    }
  }
}
</script>