import { authApiClient } from "~/api/clients";

export const ApiConfig = {
  getDatatable: "/reservable/index",
  getRelationDatatable: (id: string, relation: string) =>
    `/reservable/${id}/${relation}`,
  index: "/reservable",
  store: "/reservable",
  update: (id: string) => `/reservable/${id}`,
  show: (id: string) => `/reservable/${id}`,
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

export function requestIndex() {
  return authApiClient()
    .get(ApiConfig.index)
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
