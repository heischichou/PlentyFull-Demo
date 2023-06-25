<template>
  <div class="container-fluid" v-if="queuers.length === 0">
    <div class="container">
      <h1
        class="text-start fw-bold pt-5 pb-4 border-0 border-3 border-bottom border-dark"
      >
        Donate Food Surplus
      </h1>

      <div
        class="accordion accordion-flush border-0 border-2 border-bottom"
        id="foodItems"
        v-if="foodItems.length > 0"
      >
        <div
          v-for="(item, index) in foodItems"
          :key="item.itemId"
          :index="index"
          class="accordion-item border-0"
        >
          <div class="d-flex align-items-center py-3">
            <button
              class="btn flex-fill ps-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#item-${index}`"
              aria-expanded="false"
              :aria-controls="`item-${index}`"
            >
              <div class="d-flex flex-column text-start">
                <h6 class="fw-semibold m-0">{{ item.name }}</h6>
                <small class="text-muted"
                  >{{ item.quantity * item.weight }}kg • {{ item.type }}</small
                >
              </div>
            </button>
            <button type="button" class="btn py-3" @click="removeItem(index)">
              <em class="bi bi-trash3 h5"></em>
            </button>
            <button
              class="accordion-button bg-transparent shadow-none w-auto collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#item-${index}`"
              aria-expanded="false"
              :aria-controls="`item-${index}`"
            ></button>
          </div>
          <div
            :id="`item-${index}`"
            class="accordion-collapse collapse px-3"
            data-bs-parent="#foodItems"
          >
            <div class="accordion-body">
              <div class="row my-3 text-start">
                <div class="col-12 col-sm-6 col-md-4 mt-2">
                  <small class="fw-semibold">Name</small>
                  <p>{{ item.name }}</p>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mt-2">
                  <small class="fw-semibold">Food Item Type</small>
                  <p>{{ item.type }}</p>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mt-2">
                  <small class="fw-semibold">Life Cycle Stage</small>
                  <p>{{ item.stage }}</p>
                </div>
                <div class="col-12 col-sm-6 col-md-4 mt-2">
                  <small class="fw-semibold">Quantity</small>
                  <p>{{ item.quantity }} pc.</p>
                </div>
                <div class="col-12 col-md mt-2">
                  <small class="fw-semibold">Weight (in kilograms)</small>
                  <p>{{ item.weight }} kilograms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion accordion-flush" id="newFoodItem">
        <div class="accordion-item mt-2 py-3">
          <div class="d-flex align-items-center">
            <button
              class="btn flex-fill ps-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#itemForm"
              aria-expanded="true"
              aria-controls="itemForm"
            >
              <div class="d-flex flex-column text-start">
                <h5 class="fw-semibold m-0">New Food Item</h5>
                <small class="text-muted"
                  >Add a food item to the donation list</small
                >
              </div>
            </button>
            <button type="button" class="btn py-3" @click="createItem">
              <em class="bi bi-plus-lg h5"></em>
            </button>
            <button
              class="accordion-button bg-transparent shadow-none w-auto collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#itemForm"
              aria-expanded="true"
              aria-controls="itemForm"
            ></button>
          </div>
          <div
            id="itemForm"
            class="accordion-collapse collapse show"
            data-bs-parent="#newFoodItem"
          >
            <div class="accordion-body">
              <div class="row my-2 text-start">
                <div class="col-12 col-md-4 my-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter food item name here"
                      id="itemName"
                      v-model="newItem.name"
                    />
                    <label for="itemName" class="fw-medium text-black"
                      >Name</label
                    >
                  </div>
                </div>
                <div class="col-12 col-md-4 my-3">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="itemType"
                      aria-label="Select food item type"
                      v-model="newItem.type"
                    >
                      <option value="Eggs and Dairy">Eggs and Dairy</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Meat and Poultry">Meat and Poultry</option>
                      <option value="Fish and Seafood">Fish and Seafood</option>
                      <option value="Grains and Nuts">Grains and Nuts</option>
                    </select>
                    <label for="itemType" class="fw-medium text-black"
                      >Food Item Type</label
                    >
                  </div>
                </div>
                <div class="col-12 col-md-4 my-3">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="itemStage"
                      aria-label="Select life cycle stage"
                      v-model="newItem.stage"
                    >
                      <option value="In Storage">In Storage</option>
                      <option value="Prepared">Prepared</option>
                      <option value="Cooked">Cooked</option>
                    </select>
                    <label for="itemStage" class="fw-medium text-black"
                      >Life Cycle Stage</label
                    >
                  </div>
                </div>
                <div class="col-12 col-md-6 my-3">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter food item quantity here"
                      id="itemQuantity"
                      v-model="newItem.quantity"
                    />
                    <label for="itemQuantity" class="fw-medium text-black"
                      >Quantity</label
                    >
                  </div>
                </div>
                <div class="col-12 col-md-6 my-3">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter food item weight here"
                      id="itemWeight"
                      v-model="newItem.weight"
                    />
                    <label for="itemWeight" class="fw-medium text-black"
                      >Weight (in kilograms)</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion accordion-flush" id="deliveryMethod">
        <div class="accordion-item">
          <div class="accordion-header">
            <button
              class="accordion-button bg-transparent text-black ps-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#deliveryForm"
              aria-expanded="true"
              aria-controls="deliveryForm"
            >
              <div class="d-flex flex-column">
                <h5 class="fw-semibold m-0">Delivery Method</h5>
                <small class="text-muted"
                  >Change the delivery mode for your donation</small
                >
              </div>
            </button>
          </div>
          <div
            id="deliveryForm"
            class="accordion-collapse collapse show"
            data-bs-parent="#deliveryMethod"
          >
            <div class="accordion-body">
              <div class="my-3">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="deliveryMode"
                    aria-label="Select delivery mode"
                  >
                    <option value="For Pickup" selected>For Pick-up</option>
                    <option value="Hand Delivery">Hand Delivery</option>
                  </select>
                  <label for="deliveryMode" class="fw-medium text-black"
                    >Delivery Mode</label
                  >
                </div>
              </div>
              <div class="mt-4 mb-3">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Write delivery details here"
                    id="deliveryNotes"
                    style="height: 120px"
                  ></textarea>
                  <label for="itemType" class="fw-medium text-black"
                    >Delivery Notes</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion accordion-flush mt-2" id="optionalNotes">
        <div class="accordion-item">
          <div class="accordion-header">
            <button
              class="accordion-button bg-transparent text-black ps-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#notesForm"
              aria-expanded="false"
              aria-controls="notesForm"
            >
              <div class="d-flex flex-column">
                <h5 class="fw-semibold m-0">Notes (Optional)</h5>
                <small class="text-muted"
                  >Leave a message if you'd like...</small
                >
              </div>
            </button>
          </div>
          <div
            id="notesForm"
            class="accordion-collapse collapse"
            data-bs-parent="#deliveryMethod"
          >
            <div class="accordion-body">
              <div class="my-3">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Write delivery details here"
                    id="deliveryNotes"
                    style="height: 120px"
                  ></textarea>
                  <label for="itemType" class="fw-medium text-black"
                    >Optional Notes</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="d-flex flex-column flex-md-row gap-3 justify-content-start my-5"
      >
        <button
          type="submit"
          class="btn btn-secondary text-white rounded-0 flex-fill flex-md-grow-0 p-3"
          data-bs-toggle="modal"
          data-bs-target="#searchingForCharities"
        >
          Open Donation
        </button>
        <button
          type="reset"
          class="btn btn-outline-dark rounded-0 flex-fill flex-md-grow-0 p-3"
          @click="resetForm"
        >
          Reset
        </button>
      </div>
    </div>
  </div>

  <SearchingFor :foundQueuers="queuers.length > 0" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";
import SearchingFor from "@/components/Donor/SearchingForCharities.vue";

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
  queuePos: string;
  queueWeight: string;
  distance: number;
  donationsReceived: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "DonateView",
  data() {
    return {
      queuers: [] as Queuer[],
      newItem: {
        itemId: uuid.v1(),
        name: "",
        type: "Eggs and Dairy",
        stage: "In Storage",
        quantity: 0,
        weight: 0,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      } as FoodItem,
      foodItems: [
        {
          itemId: uuid.v1(),
          name: "Chicken Breast",
          type: "Meat and Poultry",
          stage: "In Storage",
          quantity: 2,
          weight: 1,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Brussels Sprouts",
          type: "Vegetables",
          stage: "Prepared",
          quantity: 1,
          weight: 3,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Tuna Panga",
          type: "Fish and Seafood",
          stage: "In Storage",
          quantity: 2,
          weight: 0.25,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
        {
          itemId: uuid.v1(),
          name: "Duck Eggs",
          type: "Eggs and Dairy",
          stage: "Prepared",
          quantity: 2,
          weight: 0.2,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
      ] as FoodItem[],
    };
  },
  components: {
    SearchingFor,
  },
  methods: {
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
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        }
      );
    },
    removeItem(index: number) {
      console.log("food items before", this.foodItems);
      this.foodItems.splice(index, 1);
      console.log("food items after", this.foodItems);
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
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        }
      );
      this.foodItems = Object.assign([], []);
    },
  },
  mounted() {
    // this.queuers = Object.assign(
    //   [],
    //   [
    //     {
    //       queuerId: uuid.v1(),
    //       charityId: uuid.v1(),
    //       name: "Cebu Food Bank",
    //       status: "Pending",
    //       queuePos: "1",
    //       queueWeight: "1000",
    //       distance: 1.1,
    //       donationsReceived: 1,
    //       createdAt: Date.now().toString(),
    //       updatedAt: Date.now().toString(),
    //     },
    //     {
    //       queuerId: uuid.v1(),
    //       charityId: uuid.v1(),
    //       name: "Hippodromo Barangay Hall",
    //       status: "Pending",
    //       queuePos: "2",
    //       queueWeight: "1100",
    //       distance: 1.3,
    //       donationsReceived: 2,
    //       createdAt: Date.now().toString(),
    //       updatedAt: Date.now().toString(),
    //     },
    //     {
    //       queuerId: uuid.v1(),
    //       charityId: uuid.v1(),
    //       name: "JPIC-IDC Inc.",
    //       status: "Pending",
    //       queuePos: "3",
    //       queueWeight: "1200",
    //       distance: 1.8,
    //       donationsReceived: 2,
    //       createdAt: Date.now().toString(),
    //       updatedAt: Date.now().toString(),
    //     },
    //   ]
    // );
  },
});
</script>

<style lang="scss"></style>
