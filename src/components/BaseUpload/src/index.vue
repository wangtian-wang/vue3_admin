<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="uploadUrl"
      multiple
      v-if="uploadType == 'drag'"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <!--     :on-preview="handlePictureCardPreview" -->
    <el-upload
      v-if="uploadType === 'fileList'"
      v-model:file-list="fileList"
      ref="upload"
      :on-error="uploadFileListError"
      action="#"
      list-type="picture-card"
      :on-remove="handleRemove"
      :auto-upload="false"
      :on-success="handleFilelistSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <div
      v-if="uploadType === 'avatar' || uploadType == 'image'"
      class="upload-avatar-container flex-container"
    >
      <el-upload
        class="avatar-uploader"
        action="false"
        ref="avatarRef"
        :limit="1"
        :show-file-list="false"
        :on-exceed="handleExceed"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUploadRequest"
        :on-change="hadleAvatarChange"
        :auto-upload="autoLoad"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-button type="primary" @click="hadleAvatarSubmit"> 上传 </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";
  import type { FormInstance } from "element-plus";
  import { UploadFilled } from "@element-plus/icons-vue";
  import type {
    UploadProps,
    UploadUserFile,
    UploadInstance,
    UploadRawFile,
    UploadRequestOptions,
  } from "element-plus";
  import { genFileId } from "element-plus";
  import axios from "axios";
  import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

  import type { UploadFile } from "element-plus";
  const disabled = ref(false);
  // const dialogImageUrl = ref('')
  // const dialogVisible = ref(false)

  // const handleRemove = (file: UploadFile) => {
  //   console.log(file)
  // }

  // const handlePictureCardPreview = (file: UploadFile) => {
  //   dialogImageUrl.value = file.url!
  //   dialogVisible.value = true
  // }

  const handleDownload = (file: UploadFile) => {
    console.log(file);
  };
  const props = defineProps({
    uploadType: {
      type: String,
      default: "avatar" || "image",
    },
    url: {
      type: String,
      default: "",
    },
    autoLoad: {
      type: Boolean,
      default: true,
    },
  });
  const upload = ref<UploadInstance>();
  const emits = defineEmits(["imgUploadSuccess"]);
  /**                类型 为 fileList 的 upload 的逻辑  fileList 类型的上传组件 双向绑定 fileList，文件长度自动会变化                       ** */

  const dialogImageUrl = ref("");
  const dialogVisible = ref(false);
  const uploadUrl = "/api/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"; // mock url

  const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles?) => {
    fileList.value = fileList.value.filter(
      (item: any) => item.name !== uploadFile.name
    );
  };

  const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
  };
  const fileList = ref<UploadUserFile[]>([
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },

    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
  ]);
  watch(
    fileList,
    (val) => {
      console.log(fileList, "watch");
    },
    {
      deep: true,
    }
  );
  const handleFilelistSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile
  ) => {
    console.log(response, uploadFile, " in file~~~~~~~~~~~");
  };
  const uploadFileListError = (err: any, file: any, files: any) => {
    console.log("err:", err, "file:", file);
  };
  /**                类型 为 avatar image 的 upload 的逻辑                         ** */
  const imageUrl = ref(""); // 回显的图片
  const avatarRef = ref<UploadInstance>();

  const avatarList = reactive({ fileList: [] }); // 选中的图片列表
  //  自动上传成功，上传到服务器，后执行的回调
  const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile,
    uploadFiles
  ) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  // 手动上传，识别到文件后，执行的回调
  const hadleAvatarChange = (uploadFile: any, uploadFiles: any) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    avatarList.fileList = uploadFiles;
    console.log("change", uploadFile, uploadFiles);
  };
  const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (rawFile.type !== "image/jpeg") {
      ElMessage.error("Avatar picture must be JPG format!");
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error("Avatar picture size can not exceed 2MB!");
      return false;
    }
    return true;
  };
  const hadleAvatarSubmit = () => {
    avatarRef.value![0].submit();
  };

  const handleExceed: UploadProps["onExceed"] = (files) => {
    console.log(avatarRef.value, "---");
    avatarRef.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    avatarRef.value!.handleStart(file);
  };
  // 手动上传文件执行的请求， formData 格式
  const handleUploadRequest = (options: UploadRequestOptions) => {
    const formData = new FormData();
    avatarList.fileList.forEach((item: any) => {
      formData.append(item.name, item.raw);
    });
    return axios.post("", formData);
  };
</script>
<stype lang="scss">
.upload-avatar-container {
}
.avatar-uploader {
  border: 1px #ccc dashed;
  border-radius: 10px;
  margin-bottom: 10px;
  .el-upload {
    width: 150px;
    height: 150px;
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</stype>
