import { ref } from "vue";
import { axios } from "@/request/axios/index";
interface ParamsOptions {
  startTime?: string | Date;
  endTime?: string | Date;
  keyWords?: string;
  status?: string;
}
interface DataParams {
  size?: number;
  page?: number;
  url: string;
  query?: string;
  methods: string;
  showLoading?: boolean;
  otherOptions?: ParamsOptions;
}
/**
 *
 * get 查询参数的拼接
 */
export const useGetData = async (params: DataParams) => {
  const dataList = ref([]);
  const totalCount = ref(0);
  const url = params.query
    ? `${params.url}?params=${params.query}`
    : params.url;
  let fetchRes: any;
  const getData = async () => {
    if (params.methods === "get") {
      fetchRes = await axios.get({ showLoading: true, url: params.url });
    } else if (params.methods === "post") {
      fetchRes = await axios.post({
        url,
        data: {
          ...params.otherOptions,
          url,
          size: params.size,
          page: params.page,
        },
        showLoading: params.showLoading,
      });
    }
    dataList.value = fetchRes.data;
    totalCount.value = fetchRes.total;
  };
  const deleteItem = async (id: number, url: string, callback: Function) => {
    const res: any = await axios.delete({
      url: url + `?id=${id}`,
      showLoading: true,
    });
    if (res.code == 0) {
      typeof callback == "function" && callback();
    }
  };
  await getData();
  return { dataList, totalCount, deleteItem };
};
