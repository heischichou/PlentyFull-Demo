<template>
  <div
    ref="actionsModal"
    class="modal fade"
    id="actionsModal"
    tabindex="-1"
    aria-labelledby="actionsModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content rounded-2">
        <div class="modal-header">
          <h5
            class="modal-title"
            v-text="
              action !== 'Delete' ? action + ' Users' : action + ' Accounts'
            "
          ></h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body text-start">
          <form>
            <div id="userlistSection" class="mb-3">
              <small
                class="fs-6 fw-semibold"
                v-text="'Users to ' + action"
              ></small>
              <div
                v-if="selectedUsers.length > 0"
                class="d-flex gap-2 flex-wrap align-content-start mt-2"
              >
                <div
                  id="userList"
                  v-for="(user, index) in selectedUsers"
                  :key="user.userId"
                  :index="index"
                >
                  <UserTag
                    :id="`userTag-${index}`"
                    :userId="user.userId"
                    :name="user.name"
                    @removeSelected="onRemoveSelected"
                  />
                </div>
              </div>

              <div v-else>
                <div class="form-text text-danger">
                  No users selected. Please select users to perform this action.
                </div>
              </div>
            </div>

            <div v-if="action === 'Warn'">
              <div id="subjectSection" class="mb-3">
                <label for="subject" class="form-label"
                  ><small class="fs-6 fw-semibold">Subject</small></label
                >
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="subject"
                  placeholder="Specify what your warning is about"
                />
              </div>

              <div id="descSection" class="mb-3">
                <label for="description" class="form-label"
                  ><small class="fs-6 fw-semibold">Description</small></label
                >
                <textarea
                  type="text"
                  class="form-control rounded-0"
                  id="description"
                  rows="4"
                  placeholder="Write a decriptive warning message for these users."
                />
              </div>
            </div>

            <div v-else-if="action === 'Suspend'">
              <div v-show="selectedUsers.length > 0" class="form-text mb-3">
                Please confirm if you would like to suspend the accounts of
                these users.
              </div>
            </div>

            <div v-else>
              <div v-show="selectedUsers.length > 0" class="form-text mb-3">
                Please confirm if you would like to delete the accounts of these
                users.
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger rounded-0 p-2"
            :class="selectedUsers.length === 0 ? 'disabled' : ''"
          >
            {{ action }}
          </button>
          <button
            type="button"
            class="btn btn-outline-dark rounded-0 p-2"
            data-bs-dismiss="modal"
            @click="cancelAction"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserTag from "./UserTag.vue";

declare interface User {
  userId: string;
  name: string;
  address: string;
  contact: string;
  userType: string;
  verified: string;
}

export default defineComponent({
  name: "ActionsModal",
  components: {
    UserTag,
  },
  props: {
    isVisible: {
      type: Boolean,
    },
    action: {
      type: String,
      required: true,
    },
    selectedUsers: {
      type: Array as () => User[],
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    onRemoveSelected(id: string) {
      this.$emit("removeSelected", id);
    },
    cancelAction() {
      this.$emit("cancelAction");
    },
  },
});
</script>

<style lang="scss" scoped></style>
