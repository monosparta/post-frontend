import { authApiClient } from "~/api/clients";

export const ApiConfig = {
  getDatatable: "/reservation/index",
  store: "/reservation",
  update: (id: string) => `/reservation/${id}`,
  show: (id: string) => `/reservation/${id}`,
  cancel: "/reservation/cancel",
};

export function requestStore(payload: any) {
  return authApiClient()
    .post(ApiConfig.store, payload)
    .then((res) => res.data);
}

export function requestUpdate(id: string, payload: any) {
  return authApiClient()
    .put(ApiConfig.update(id), payload)
    .then((res) => res.data);
}

export function requestShow(id: string) {
  return authApiClient()
    .get(ApiConfig.show(id))
    .then((res) => res.data);
}

export function requestCancel(payload: {
  ids: string[];
  cancel_reason: string;
}) {
  return authApiClient()
    .put(ApiConfig.cancel, payload)
    .then((res) => res.data);
}

export function useDetail(id: string) {
  const data = ref();

  async function mutate() {
    const response = await authApiClient().get(ApiConfig.show(id));

    data.value = response.data;
  }

  onMounted(async () => {
    await mutate();
  });

  watchEffect(async () => {
    await mutate();
  });

  return { detail: data, mutate };
}
