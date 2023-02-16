## icon

- `@iconify/json` 是一个第三方的图标库 需要配合使用 `unplugin-icons`，
- 使用方式

```js
`{prefix}-{collection}-{icon}`;
// example:
<icon-carbon-accessibility />
<icon-carbon-account />
// 需要开启 vite.config.js 里面的配置项
        IconsResolver({
          prefix: "icon",
        }),
```

## button 的角色权限

### 关于 input 类型的 v-model

可以直接绑定来自父组件的 props

### v-model 的用法

- 和表单元素双向绑定
- 在组件上使用，动态更新父组件的值
- 绑定一个对象的时候， 必须先修改该对象的属性，然后 emits(update:key,props.modelValue) ，才能改变搞对象的某个属性

```js
 <Box v-model="formData"></Box>

    <div >{{ modelValue.name }}
         <button  @click="handleChangePerson">改变名称</button>
      </div>
       props: {
        modelValue: {
        type: Object,
        default: false,
       },
      },
      emits: ["update:modelValue"],

       const handleChangePerson = () => {
        props.modelValue.name += "P";
        emit("update:modelValue", props.modelValue);
      };
```

- 但是 vue 的数据流是单向数据流，在组件中不能改变父组件的数据 ❓

### 关于组件类型的 v-model

1.v-model 不能绑定来自父组件的非 proxy 类型对象的 key
2: 子组件必须使用来自父组件的值

- value='value'
- v-if='value'
  3: 子组件触发一个事件`update:value` 传递更新后的值

```js
// userPage.vue
<Person v-model="dialogVisible"></Person>
const dialogVisible = ref(false);

// person.vue
 <el-dialog
    v-model="dialogVisible"
    title="Tips" width="30%">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="changeState">Cancel</el-button>
        </span>
      </template>
 </el-dialog>
 const dialogVisible = computed(() => {
    return props.modelValue;
  });

  const emits = defineEmits(["update:modelValue"]);
  const changeState = () => {
    emits("update:modelValue", !props.modelValue);
  };

  /**
   person 是组件 被双向绑定了一个值 modelValue
   但是呢 modelValue 不能直接用于子组件的元素的双向绑定
    使用一个计算属性dialogVisible 代替
    去update计算属性的 [依赖项] 便可以更新计算属性 切换弹框的显示和隐藏

   */
```

### ref 包装一个原始值 在进行属性传递后，子组件收到的是一个 plain 原始值

### reactive 类型的变量 引用修改后，元数据的响应式 就会失效

### v-if v-model 作用于组件的区别

- v-if 是用一个表达式的计算结果 作为是否渲染 vnode 的条件
- v-model 作用于组件 ，绑定一个表达式的值 用该值作为组件是否出现的条件

```js
// fater.vue
<dialog  v-model="visiable"></dialog>
<button @click="btnClick" ></button>
const  btnClick = () => {
    visiable = true
}


// child.vue

<div v-if='showDialog'>
dialogShow
<button @click="handleCloseBtn"></button>
</div>

 props={
    modelValue: {
        type: boolean,
        default: false,
    }
 }
const showDialog = computed(() => {
    return props.modelValue;
  });
 const emits= defineEmits(['update:modelValue']);
 const handleCloseBtn = () => {
    emits('update:modelVlaue', !props.modelValue)
 }

```

- 父组件使用 v-model 绑定一个值，子组件 使用 v-if 进行动态渲染，然后更新这个值。在父组件内部就无需再去更新该变量

### script setup 与 hook 使用时的注意事项

- setup 中的函数 只在初始化的时候 执行一次 ，useHook 也只会执行一次 ，返回的 ref 类型的值，不会随着 原始的 ref 发生变化而改变

## 点击全局搜索，跳入指定的路由 defaultmenu 问题

- 页面刷新 menuNav 页面的入口函数都会再一次执行。会重新获取 currentRoute
- 点击菜单跳转， 路由会发生变化,但是 setup 中的函数不会重新执行
