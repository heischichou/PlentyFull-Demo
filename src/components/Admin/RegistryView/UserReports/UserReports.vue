<template>
  <div id="userReports" v-if="reports.length > 0">
    <Reports
      class="mb-5"
      :headers="headers"
      :reports="
        reports.slice((currentPage - 1) * perPage, currentPage * perPage)
      "
    />
    <Pagination
      :maxVisibleButtons="visibleButtons"
      :totalReports="totalReports"
      :perPage="perPage"
      :currentPage="currentPage"
      @pageChanged="onPageChange"
    />
  </div>

  <div v-else>
    <h3 class="text-white">No reports found.</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import Reports from "@/components/Admin/RegistryView/UserReports/ReportsTable.vue";
import Pagination from "@/components/Admin/RegistryView/UserReports/ReportsPagination.vue";

declare interface Header {
  key: string;
  label: string;
}

declare interface Report {
  notificationId: string;
  reportId: string;
  senderId: string;
  violatorId: string;
  type: string;
  subject: string;
  message: string;
  violatorName: string;
  reporterName: string;
  reportType: string;
  resolved: boolean;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "RegistryView",
  components: {
    Reports,
    Pagination,
  },
  data() {
    return {
      headers: [
        { key: "violatorName", label: "Violator" },
        { key: "reporterName", label: "Reporter" },
        { key: "reportType", label: "Report Type" },
        { key: "subject", label: "Subject" },
        { key: "actions", label: "" },
      ] as Header[],
      reports: [] as Array<Report>,
      visibleButtons: 0,
      totalReports: 0,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    getTotalReports: function (): number {
      return this.reports.length;
    },
    setVisibleButtons: function (): number {
      const pages = Math.ceil(this.totalReports / this.perPage);
      return this.totalReports > 0 && pages >= 3 ? 3 : pages;
    },
  },
  methods: {
    onPageChange(page: number) {
      this.currentPage = page;
    },
  },
  beforeMount() {
    this.reports = [
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Phallus in Donation Post",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Cebu Food Bank",
        reporterName: "Hippodromo Barangay Hall",
        reportType: "Inappropriate Content",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Berating Pick-up Staff",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Hippodromo Barangay Hall",
        reporterName: "Mayeen's Catering Services",
        reportType: "Harassment/Ill Conduct",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Donating Expired Goods",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Itaewon",
        reporterName: "JPIC-IDC Inc.",
        reportType: "Health & Safety Violations",
        resolved: false,
        anonymous: false,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Lorem Ipsum",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Donor A",
        reporterName: "Charity A",
        reportType: "Other",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Lorem Ipsum",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Donor B",
        reporterName: "Charity B",
        reportType: "Other",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Lorem Ipsum",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Donor C",
        reporterName: "Charity C",
        reportType: "Other",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        notificationId: uuid.v1(),
        reportId: uuid.v1(),
        senderId: uuid.v1(),
        violatorId: uuid.v1(),
        type: "Report",
        subject: "Lorem Ipsum",
        message:
          "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
        violatorName: "Donor D",
        reporterName: "Charity D",
        reportType: "Other",
        resolved: false,
        anonymous: true,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
    ];
    this.totalReports = this.getTotalReports;
    this.visibleButtons = this.setVisibleButtons;
  },
});
</script>

<style scoped lang="scss"></style>
