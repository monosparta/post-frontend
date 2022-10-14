import type { Ref } from "vue";
import { authApiClient } from "~/api/clients";

export function useModelIndex(
  indexApiUrl: string,
  page: Ref<number>,
  pageSize: Ref<number>,
  sorts?: Ref<{ field: string; order: string }[]>,
  filters?: Ref<{ field: string; value: string }[]>
) {
  const data = ref();

  async function mutate() {
    const response = await authApiClient().post(
      indexApiUrl,
      {
        sorts: sorts ? sorts.value : [],
        filters: filters ? filters.value : [],
      },
      { params: { page: unref(page), pageSize: unref(pageSize) } }
    );

    data.value = response.data;
  }

  onMounted(async () => {
    await mutate();
  });

  watchEffect(async () => {
    await mutate();
  });

  return { data, mutate };
}
