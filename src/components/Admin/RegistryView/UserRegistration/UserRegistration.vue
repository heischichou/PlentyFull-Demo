<template>
  <div id="userRegistration" v-if="registrants.length > 0">
    <Registrant
      v-for="registrant in registrants.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      )"
      class="mb-3"
      :key="registrant.id"
      :registrant="registrant"
      :dateDuration="
        convertToDuration(registrant.createdAt, new Date().toISOString())
      "
    />
    <Pagination
      aria-label="User Reports Pagination"
      :maxVisibleButtons="visibleButtons"
      :totalItems="totalRequests"
      :perPage="perPage"
      :currentPage="currentPage"
      @pageChanged="onPageChange"
    />
  </div>

  <div v-else>
    <h3 class="text-white">No registrants found.</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import { DateTime } from "luxon";
import { Account } from "@/types/";
import Registrant from "./SignUpRequest.vue";
import Pagination from "@/components/Admin/RegistryView/RegistryPagination.vue";

export default defineComponent({
  name: "RegistryView",
  components: {
    Registrant,
    Pagination,
  },
  data() {
    return {
      registrants: [] as Account[],
      visibleButtons: 0,
      totalRequests: 0,
      perPage: 3,
      currentPage: 1,
    };
  },
  methods: {
    onPageChange(page: number) {
      this.currentPage = page;
    },
    convertToDuration(date: string, current: string) {
      date = new Date(date).toISOString();
      const createdAt = DateTime.fromISO(date);
      const currentDate = DateTime.fromISO(current);
      const duration = currentDate
        .diff(createdAt, [
          "years",
          "months",
          "weeks",
          "days",
          "hours",
          "minutes",
          "seconds",
          "milliseconds",
        ])
        .toObject();
      const units = [
        { value: duration.years ?? 0, unit: "year" },
        { value: duration.months ?? 0, unit: "month" },
        { value: duration.weeks ?? 0, unit: "week" },
        { value: duration.days ?? 0, unit: "day" },
        { value: duration.hours ?? 0, unit: "hour" },
        { value: duration.minutes ?? 0, unit: "minute" },
        { value: duration.seconds ?? 0, unit: "second" },
      ];

      for (const unit of units) {
        if (unit.value >= 1) {
          return `${unit.value} ${
            unit.value === 1 ? unit.unit : unit.unit + "s"
          } ago`;
        }
      }

      return "Just now";
    },
  },
  beforeMount() {
    this.registrants = Object.assign(
      [],
      [
        {
          id: uuid.v1(),
          name: "Cebu Food Bank",
          type: "Charity",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
          address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
          email: "info@cebufoodbank.com",
          contact: "(32) 417 3322",
          proof: "https://my.alfred.edu/zoom/_images/foster-lake.jpg",
          createdAt: new Date().toString(),
        },
        {
          id: uuid.v1(),
          name: "JPIC-IDC Inc.",
          type: "Charity",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
          address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
          email: "info@JPIC.com",
          contact: "(32) 417 3322",
          proof: "https://www.imagelighteditor.com/img/bg-after.jpg",
          createdAt: "7/13/2023 2:00:00 AM",
        },
        {
          id: uuid.v1(),
          name: "Hipodromo Barangay Hall",
          type: "Charity",
          bio: "Lorem ipsum dolor sit amet ad nauseum, ad infinitium, ad profundis. This is a sample description. Text labels need to be distinct from other elements.",
          address: "CMG Bldg, M. C. Briones St, Tipolo, Mandaue City",
          email: "info@Hipodromo.com",
          contact: "(32) 417 3322",
          proof: "sampleImage.img",
          createdAt: "7/12/2023 1:50:00 AM",
        },
      ]
        .slice()
        .sort(
          (a, b) =>
            new Date(b["createdAt"]).getTime() -
            new Date(a["createdAt"]).getTime()
        )
    );
    this.totalRequests = this.getTotalRegistrants;
    this.visibleButtons = this.setVisibleButtons;
  },
  computed: {
    getTotalRegistrants: function (): number {
      return this.registrants.length;
    },
    setVisibleButtons: function (): number {
      const pages = Math.ceil(this.totalRequests / this.perPage);
      return this.totalRequests > 0 && pages >= 3 ? 3 : pages;
    },
  },
});
</script>

<style scoped lang="scss"></style>
