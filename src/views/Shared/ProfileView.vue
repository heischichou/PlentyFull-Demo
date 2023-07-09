<template>
  <div class="profile bg-header">
    <div
      class="container d-none d-lg-flex text-white text-start pt-5 pb-3"
      id="header"
    >
      <h1 class="fw-bold ps-2">Settings</h1>
    </div>
    <div class="container-fluid container-lg">
      <div class="row d-flex flex-column flex-lg-row">
        <div class="col-auto order-first col-lg-3 pb-3 px-0" id="sideNav">
          <ul
            class="nav nav-pills w-100 flex-row flex-lg-column flex-nowrap text-center justify-content-around align-items-center mt-0 mt-lg-4"
            :class="{
              'pb-1 border-bottom border-2 border-lightgreen':
                windowWidth >= 992,
            }"
          >
            <li
              id="profileTab"
              class="nav-item w-100 overflow-hidden mb-0 mb-lg-3"
              :class="{ 'nav-active': activeTab === 'Profile' }"
            >
              <button
                type="button"
                class="nav-link nav-highlight w-100 text-white rounded-0"
                :class="{
                  'text-start': windowWidth >= 992,
                  'py-3 px-4 text-center': windowWidth < 992,
                }"
                @click="setActiveTab('Profile')"
              >
                <em
                  class="bi bi-person-circle"
                  :class="windowWidth >= 992 ? 'fs-4' : 'fs-2'"
                ></em
                ><span class="fs-4 d-none d-block d-lg-inline ms-3"
                  >Profile</span
                >
              </button>
            </li>
            <li
              id="securityTab"
              class="nav-item w-100 overflow-hidden mb-0 mb-lg-3"
              :class="{ 'nav-active': activeTab === 'Security and Login' }"
            >
              <button
                type="button"
                class="nav-link nav-highlight w-100 text-white rounded-0"
                :class="{
                  'text-start': windowWidth >= 992,
                  'py-3 px-4 text-center': windowWidth < 992,
                }"
                @click="setActiveTab('Security and Login')"
              >
                <em
                  class="bi bi-shield-check"
                  :class="windowWidth >= 992 ? 'fs-4' : 'fs-2'"
                ></em
                ><span class="fs-4 d-none d-block d-lg-inline ms-3"
                  >Security</span
                >
              </button>
            </li>
          </ul>
        </div>

        <div
          class="col container-fluid d-flex justify-content-center pb-3 mb-5"
        >
          <div class="container text-white text-start mx-3 mx-sm-5">
            <h4 class="pt-3 pb-2">{{ activeTab }}</h4>
            <hr class="border-lightgreen border-2 opacity-100 mb-0" />
            <Profile v-if="activeTab === 'Profile'" />
            <SecurityAndLogin v-if="activeTab === 'Security and Login'" />
          </div>
        </div>

        <div
          class="col-auto d-flex justify-content-center justify-content-lg-start order-first order-lg-last my-4 my-lg-0 me-0 me-lg-5"
          id="userAvatar"
        >
          <input
            type="file"
            class="d-none"
            accept="image/png, image/gif, image/jpeg"
            ref="selectFile"
            @change="changeAvatarPreview($event.target)"
          />
          <div
            class="avatar rounded-circle bg-white position-relative"
            :style="{
              backgroundImage: `url(${
                isURL(avatar)
                  ? avatar
                  : require('@/assets/images/Shared/' + avatar)
              })`,
            }"
          >
            <button
              type="button"
              class="btn bg-secondary rounded-circle position-absolute bottom-0 end-0 d-flex justify-content-center align-items-center p-3"
              id="changeAvatar"
              @click="$refs.selectFile.click()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path
                  d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Profile from "@/components/Shared/ProfileView/EditProfile.vue";
import SecurityAndLogin from "@/components/Shared/ProfileView/SecurityAndLogin.vue";

export default defineComponent({
  name: "ProfileView",
  data() {
    return {
      activeTab: "Profile",
      windowWidth: window.innerWidth,
      avatar: "default_profile.png",
    };
  },
  components: {
    Profile,
    SecurityAndLogin,
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    isURL(image: string) {
      const urlcheck = /^(ftp|http|https):\/\/[^ "]+$/;
      return RegExp(urlcheck).exec(image) ? true : false;
    },
    changeAvatarPreview(event: HTMLInputElement) {
      if (event.files !== null) {
        const file = event.files[0];
        console.log(file);
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style scoped lang="scss">
.profile .nav-highlight {
  &:hover,
  &:active {
    background-color: rgba($color: lightgreen, $alpha: 0.4);
  }
}

#userAvatar .avatar {
  width: 175px;
  height: 175px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

#userAvatar .btn {
  width: 55px;
  height: 55px;
}

.profile :deep(input),
.profile :deep(textarea) {
  color: #ffffff !important;
}

.profile .nav-active {
  background-color: rgba($color: #45bf5d, $alpha: 0.4);
  border-right: 15px solid rgba($color: lightgreen, $alpha: 1);
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}

@media (max-width: 992px) {
  .profile .nav-active {
    border: 0 !important;
    border-radius: 0 !important;
  }
}
</style>
