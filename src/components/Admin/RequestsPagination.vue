<template>
  <nav aria-label="SignUpRequestPagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isInFirstPage === true ? 'disabled' : ''">
        <button
          class="page-link"
          aria-label="Previous"
          type="button"
          @click="onClickPreviousPage"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="page.isDisabled === true ? 'active' : ''"
      >
        <a class="page-link" @click="onClickPage(page.pageNum)">{{
          page.pageNum
        }}</a>
      </li>
      <li class="page-item" :class="isInLastPage === true ? 'disabled' : ''">
        <button
          class="page-link"
          aria-label="Next"
          type="button"
          @click="onClickNextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RequestsPagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalRequests: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalRequests) {
        return this.totalRequests - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    getTotalPages() {
      return Math.ceil(this.totalRequests / this.perPage);
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalRequests
        );
        i++
      ) {
        if (i <= this.getTotalPages) {
          range.push({
            pageNum: i,
            isDisabled: i === this.currentPage,
          });
        }
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      const lastPage = this.getTotalPages;
      return this.currentPage === lastPage;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page: number) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination .page-link {
  color: #fff;
  background-color: transparent;
  border: 1px solid #6ef997;
}

.page-link:hover {
  z-index: 2;
  background-color: #57cd7a2e;
}

.page-link.disabled,
.disabled > .page-link {
  color: #afafaf;
  pointer-events: none;
  background-color: #57cd7a2e;
  border-color: #57cd7a2e;
}

.pagination .page-item.active .page-link {
  color: #000000;
  background-color: #57cd7a;
  border-color: #57cd7a;
}
</style>
