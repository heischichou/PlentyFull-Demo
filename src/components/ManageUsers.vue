<template>
  <h1>Manage me</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";

declare interface FoodItem {
  itemId: string;
  name: string;
  type: string;
  stage: string;
  quantity: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

declare interface Queuer {
  queuerId: string;
  charityId: string;
  name: string;
  status: string;
  queuePos: number;
  queueWeight: string;
  distance: number;
  donationsReceived: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "ManageUsers",
  data() {
    return {
      windowWidth: window.innerWidth,
      queuers: [] as Queuer[],
      newItem: {
        itemId: uuid.v1(),
        name: "",
        type: "Eggs and Dairy",
        stage: "In Storage",
        quantity: 0,
        weight: 0,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      } as FoodItem,
      foodItems: [
        {
          itemId: uuid.v1(),
          name: "Chicken Breast",
          type: "Meat and Poultry",
          stage: "In Storage",
          quantity: 2,
          weight: 1,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Brussels Sprouts",
          type: "Vegetables",
          stage: "Prepared",
          quantity: 1,
          weight: 3,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Tuna Panga",
          type: "Fish and Seafood",
          stage: "In Storage",
          quantity: 2,
          weight: 0.25,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Duck Eggs",
          type: "Eggs and Dairy",
          stage: "Prepared",
          quantity: 2,
          weight: 0.2,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
      ] as FoodItem[],
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    createItem() {
      this.foodItems.push(this.newItem as FoodItem);
      this.newItem = Object.assign(
        {},
        {
          itemId: uuid.v1(),
          name: "",
          type: "Eggs and Dairy",
          stage: "In Storage",
          quantity: 0,
          weight: 0,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        }
      );
    },
    removeItem(index: number) {
      this.foodItems.splice(index, 1);
    },
    resetForm() {
      this.newItem = Object.assign(
        {},
        {
          itemId: uuid.v1(),
          name: "",
          type: "Eggs and Dairy",
          stage: "In Storage",
          quantity: 0,
          weight: 0,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        }
      );
      this.foodItems = Object.assign([], []);
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.queuers = Object.assign(
      [],
      [
        {
          queuerId: uuid.v1(),
          charityId: uuid.v1(),
          name: "Cebu Food Bank",
          status: "Pending",
          queuePos: 1,
          queueWeight: 1000,
          distance: 1100,
          donationsReceived: 1,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
        {
          queuerId: uuid.v1(),
          charityId: uuid.v1(),
          name: "Hippodromo Barangay Hall",
          status: "Pending",
          queuePos: 2,
          queueWeight: 1100,
          distance: 1300,
          donationsReceived: 2,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
        {
          queuerId: uuid.v1(),
          charityId: uuid.v1(),
          name: "JPIC-IDC Inc.",
          status: "Pending",
          queuePos: 3,
          queueWeight: 1200,
          distance: 1800,
          donationsReceived: 2,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
      ]
    );
  },
});
</script>

<style lang="scss"></style>
