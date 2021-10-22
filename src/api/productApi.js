import axiosClient from "./axiosClient";

const productApi = {
  // api su dung strapi nen ko co paganition
  async getAll(params) {
    // Transform _page to _start
    //strapi khi goi getAll se ko tra data ma ko co paganation nen se can goi 2 lan de lay paganation
    //    GET /products?_start=40&_limit=20
    // _limit: nó là số lượng phần tử bạn muốn nhận ở mỗi trang.
    // _start: là số lượng item bạn muốn skip (bỏ qua), vd trang 3, bỏ 2 trang đầu, tức skip 40 items, nên
    // start=40
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0 //neu page <=1 or ko truyen vao thi _start=0
        : (params._page - 1) * (params._limit || 50); //nguoc lai thi lay start= page-1*limit  neu limit ko co thi default=50
    // Remove un-needed key
    delete newParams._page;
    // Fetch product list + count
    const productList = await axiosClient.get("/products", {
      params: newParams,
    });
    const count = await axiosClient.get("/products/count", {
      params: newParams,
    });
    // Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
