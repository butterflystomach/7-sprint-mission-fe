const BASE_URL = 'https://sprint-mission-api.vercel.app/products';

export async function getProductList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (page) queryParams.append('page', page);
    if (pageSize) queryParams.append('pageSize', pageSize);
    if (keyword) queryParams.append('keyword', keyword);
    
    const url = `${BASE_URL}?${queryParams.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('상품 목록 조회 중 오류 발생:', error);
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`상품 ${id} 조회 중 오류 발생:`, error);
    throw error;
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('상품 생성 중 오류 발생:', error);
    throw error;
  }
}

export async function patchProduct(id, updateData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`상품 ${id} 수정 중 오류 발생:`, error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json') && response.status !== 204) {
      return await response.json();
    } else {
      return { success: true, message: `Product ${id} successfully deleted` };
    }
  } catch (error) {
    console.error(`상품 ${id} 삭제 중 오류 발생:`, error);
    throw error;
  }
}