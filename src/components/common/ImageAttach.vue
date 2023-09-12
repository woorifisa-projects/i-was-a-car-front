<template>
  <article class="uploadFiles">
    <div class="uploadFiles__form">
      <div class="uploadFiles__form-attach">
        <label :for="attachName">
          <v-icon icon="mdi-camera"></v-icon>
        </label>
        <input
          type="file"
          ref="input"
          :id="attachName"
          :name="attachName"
          @change="$emit('changeFiles', $event.target.files)"
          accept="image/*"
          multiple
        />
      </div>
      <div class="uploadFiles__form-thumbnail" v-if="images.length > 0">
        <div v-for="(path, idx) in images" :key="path">
          <div
            :style="{
              background: `url(${path}) no-repeat center / cover`,
            }"
            class="thumb"
          ></div>
          <v-btn variant="text" @click="$emit('deleteImage', idx)">
            <v-icon icon="mdi-close-circle"></v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';

const input = ref(null);
defineProps({
  images: Array,
  attachName: String,
});
defineEmits(['changeFiles', 'deleteImage']);
defineExpose({ input });
</script>

<style lang="scss" scoped>
.uploadFiles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .uploadFiles__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .uploadFiles__form-attach {
      width: 100px;
      font-size: 30px;
      label {
        display: inline-flex;
        width: 100px;
        height: 100px;
        align-items: center;
        justify-content: center;
        border: 3px dashed gray;
        border-radius: 10px;
        cursor: pointer;
      }
      input {
        height: 0;
        widows: 0;
      }
      // @media (max-width: 980px) {
      //   width: 100px;
      //   font-size: 18px;
      //   label {
      //     width: 100px;
      //     height: 100px;
      //   }
      // }
    }
    .uploadFiles__form-thumbnail {
      width: 450px;
      margin-left: 20px;
      display: flex;
      flex: 1;
      gap: 20px;
      overflow-x: scroll;
      > div {
        position: relative;
        margin-top: 20px;
        .thumb {
          min-width: 120px;
          height: 120px;
          border-radius: 10px;
        }
        button {
          position: absolute;
          min-width: 20px;
          min-height: 20px;
          aspect-ratio: 1 / 1;
          padding: 0;
          top: -17px;
          right: -17px;
          font-size: 30px;
        }
      }
      @media (max-width: 980px) {
        > div {
          .thumb {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
}
</style>
