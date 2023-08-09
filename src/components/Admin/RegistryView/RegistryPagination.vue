<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isInFirstPage === true ? 'disabled' : ''">
        <button
          class="previous page-link"
          aria-label="Previous"
          type="button"
          @click="onClickPreviousPage"
        >
          &laquo;
        </button>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="page.isDisabled === true ? 'active' : ''"
      >
        <a class="pageBtn page-link" @click="onClickPage(page.pageNum)">{{
          page.pageNum
        }}</a>
      </li>
      <li class="page-item" :class="isInLastPage === true ? 'disabled' : ''">
        <button
          class="next page-link"
          aria-label="Next"
          type="button"
          @click="onClickNextPage"
        >
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegistryPagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalItems: {
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
    startPage(): number {
      return this.currentPage === 1
        ? 1
        : this.currentPage === this.totalItems
        ? this.totalItems - this.maxVisibleButtons + 1
        : this.currentPage - 1;
    },
    getTotalPages(): number {
      return Math.ceil(this.totalItems / this.perPage);
    },
    pages(): object[] {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalItems);
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
    isInFirstPage(): boolean {
      return this.currentPage === 1;
    },
    isInLastPage(): boolean {
      return this.currentPage === this.getTotalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pageChanged", this.currentPage - 1);
    },
    onClickPage(page: number) {
      this.$emit("pageChanged", page);
    },
    onClickNextPage() {
      this.$emit("pageChanged", this.currentPage + 1);
    },
  },
});
</script>

<style lang="scss" scoped></style>
